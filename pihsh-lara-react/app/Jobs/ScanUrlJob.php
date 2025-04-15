<?php

namespace App\Jobs;

use App\Services\VirusTotalService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Event;

class ScanUrlJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $url;
    protected $userId;
    protected $jobId;
    
    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 3;
    
    /**
     * The number of seconds the job can run before timing out.
     *
     * @var int
     */
    public $timeout = 60;

    /**
     * Create a new job instance.
     *
     * @param string $url
     * @param string|int $userId
     * @return void
     */
    public function __construct(string $url, $userId, string $jobId)
    {
        $this->url = $url;
        $this->userId = $userId;
        $this->jobId = $jobId;
        
        // Set the queue this job should go to
        $this->onQueue('url-scanning');
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(VirusTotalService $virusTotalService)
    {
        $cacheKey = 'url-scan:' . md5($this->url);
        $statusKey = 'scan-status:' . $this->jobId;
        
        try {
            // Update status to processing
            Cache::put($statusKey, [
                'status' => 'processing',
                'progress' => 10,
                'message' => 'Starting URL analysis'
            ], 3600);
            
            // Check if we already have cached results
            $cachedResults = $virusTotalService->getCachedResults($cacheKey);
            if ($cachedResults) {
                // Update status to completed with fromCache flag
                Cache::put($statusKey, [
                    'status' => 'completed',
                    'progress' => 100,
                    'message' => 'Analysis completed (from cache)',
                    'results' => $cachedResults,
                    'fromCache' => true
                ], 3600);
                
                return;
            }
            
            // Update status
            Cache::put($statusKey, [
                'status' => 'processing',
                'progress' => 20,
                'message' => 'Submitting URL to VirusTotal'
            ], 3600);
            
            // Submit URL for scanning
            $submitResponse = $virusTotalService->submitUrl($this->url);
            $analysisId = $submitResponse['data']['id'] ?? null;
            
            if (!$analysisId) {
                throw new \Exception('Failed to get analysis ID');
            }
            
            // Update status
            Cache::put($statusKey, [
                'status' => 'processing',
                'progress' => 50,
                'message' => 'URL submitted, retrieving analysis'
            ], 3600);
            
            // Wait a few seconds to allow analysis to begin
            sleep(2);
            
            // Get analysis results
            $results = $virusTotalService->getAnalysis($analysisId);
            
            // Check if analysis is still in progress
            $status = $results['data']['attributes']['status'] ?? null;
            if ($status === 'queued') {
                // If still queued, retry with backoff
                $this->release(10);
                
                // Update status
                Cache::put($statusKey, [
                    'status' => 'processing',
                    'progress' => 60,
                    'message' => 'Analysis in progress, waiting for results'
                ], 3600);
                
                return;
            }
            
            // Process and cache results
            $processedResults = $virusTotalService->processResults($results, [
                'url' => $this->url,
                'scan_id' => $analysisId,
                'job_id' => $this->jobId
            ]);
            
            $virusTotalService->cacheResults($cacheKey, $processedResults);
            
            // Update status to completed
            Cache::put($statusKey, [
                'status' => 'completed',
                'progress' => 100,
                'message' => 'Analysis completed successfully',
                'results' => $processedResults,
                'fromCache' => false
            ], 3600);
            
            // Broadcast completion event (for real-time updates) - this would typically use Laravel Echo
            // Event::dispatch(new ScanCompleted($this->jobId, $processedResults));
            
        } catch (\Exception $e) {
            Log::error('URL scanning job failed', [
                'url' => $this->url,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            // Update status to failed
            Cache::put($statusKey, [
                'status' => 'failed',
                'progress' => 100,
                'message' => 'Analysis failed: ' . $e->getMessage()
            ], 3600);
            
            // If we should retry
            if ($this->attempts() < $this->tries) {
                $this->release(30 * $this->attempts()); // Exponential backoff
            }
        }
    }
} 