<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class VirusTotalService
{
    protected $apiKey;
    protected $cacheTtl;

    public function __construct()
    {
        $this->apiKey = env('VIRUS_TOTAL_API_KEY');
        $this->cacheTtl = env('VIRUS_TOTAL_CACHE_TTL', 3600); // 1 hour default
        
        // Validate API key and log warnings
        if (empty($this->apiKey) || strlen($this->apiKey) < 32) {
            Log::warning('VirusTotal API key may be invalid or missing', [
                'key_length' => $this->apiKey ? strlen($this->apiKey) : 0,
                'key_set' => !empty($this->apiKey)
            ]);
        }
    }

    public function submitUrl(string $url)
    {
        $response = Http::withHeaders([
            'x-apikey' => $this->apiKey
        ])->asForm()->post('https://www.virustotal.com/api/v3/urls', [
            'url' => $url
        ]);

        if (!$response->successful()) {
            Log::error('VirusTotal URL submission failed', [
                'url' => $url,
                'response' => $response->json()
            ]);

            throw new \Exception('Failed to submit URL for analysis: ' . ($response->json()['error']['message'] ?? 'Unknown error'));
        }

        return $response->json();
    }

    public function getAnalysis(string $analysisId)
    {
        $response = Http::withHeaders([
            'x-apikey' => $this->apiKey
        ])->get("https://www.virustotal.com/api/v3/analyses/{$analysisId}");

        if (!$response->successful()) {
            Log::error('VirusTotal analysis retrieval failed', [
                'analysisId' => $analysisId,
                'response' => $response->json()
            ]);

            throw new \Exception('Failed to retrieve analysis: ' . ($response->json()['error']['message'] ?? 'Unknown error'));
        }

        return $response->json();
    }

    public function getFileUploadUrl()
    {
        $response = Http::withHeaders([
            'x-apikey' => $this->apiKey
        ])->get('https://www.virustotal.com/api/v3/files/upload_url');

        if (!$response->successful()) {
            Log::error('VirusTotal file upload URL retrieval failed', [
                'response' => $response->json()
            ]);

            throw new \Exception('Failed to get file upload URL: ' . ($response->json()['error']['message'] ?? 'Unknown error'));
        }

        return $response->json()['data'];
    }

    public function uploadFile(string $uploadUrl, string $filePath, string $fileName)
    {
        $response = Http::withHeaders([
            'x-apikey' => $this->apiKey
        ])->attach(
            'file',
            file_get_contents($filePath),
            $fileName
        )->post($uploadUrl);

        if (!$response->successful()) {
            Log::error('VirusTotal file upload failed', [
                'fileName' => $fileName,
                'response' => $response->json()
            ]);

            throw new \Exception('Failed to upload file for analysis: ' . ($response->json()['error']['message'] ?? 'Unknown error'));
        }

        return $response->json();
    }

    /**
     * Get file report by hash directly from VirusTotal
     * 
     * @param string $hash SHA-256 hash of the file
     * @return array
     */
    public function getFileReportByHash(string $hash)
    {
        try {
            // First test the API connection to verify key is working
            $isApiWorking = $this->testApiConnection();
            
            if (!$isApiWorking) {
                Log::error('VirusTotal API connection test failed, API key may be invalid');
                return [
                    'data' => null,
                    'error' => 'VirusTotal API connection failed. API key may be invalid or rate limited.'
                ];
            }
            
            $response = Http::withHeaders([
                'x-apikey' => $this->apiKey
            ])->get("https://www.virustotal.com/api/v3/files/{$hash}");
            
            if ($response->successful()) {
                Log::info('Successfully retrieved file report by hash', [
                    'hash' => $hash,
                    'status' => $response->status()
                ]);
                
                // Validate response structure
                $responseData = $response->json();
                if (!isset($responseData['data']) || !isset($responseData['data']['attributes'])) {
                    Log::warning('VirusTotal response missing expected data structure', [
                        'hash' => $hash,
                        'response_keys' => array_keys($responseData)
                    ]);
                }
                
                return $responseData;
            }
            
            // If not found, return empty result with appropriate status
            if ($response->status() === 404) {
                Log::info('File hash not found in VirusTotal', [
                    'hash' => $hash,
                    'status' => $response->status()
                ]);
                
                return [
                    'data' => null,
                    'hash_not_found' => true,
                    'status_code' => 404
                ];
            }
            
            // Rate limit exceeded
            if ($response->status() === 429) {
                Log::error('VirusTotal API rate limit exceeded', [
                    'hash' => $hash,
                    'status' => $response->status()
                ]);
                
                return [
                    'data' => null, 
                    'error' => 'VirusTotal API rate limit exceeded. Please try again later.',
                    'rate_limited' => true,
                    'status_code' => 429
                ];
            }
            
            // Other error
            Log::error('VirusTotal hash lookup failed', [
                'hash' => $hash,
                'status' => $response->status(),
                'response' => $response->json()
            ]);
            
            return [
                'data' => null,
                'error' => 'Failed to get file report: ' . ($response->json()['error']['message'] ?? 'Unknown error'),
                'status_code' => $response->status()
            ];
        } catch (\Exception $e) {
            Log::error('Exception in getFileReportByHash', [
                'hash' => $hash,
                'error' => $e->getMessage()
            ]);
            
            // Return empty result with error status
            return [
                'data' => null,
                'error' => $e->getMessage()
            ];
        }
    }
    
    /**
     * Test the VirusTotal API connection using a simple request
     * 
     * @return bool Whether the API connection is working
     */
    public function testApiConnection()
    {
        try {
            $response = Http::withHeaders([
                'x-apikey' => $this->apiKey
            ])->get('https://www.virustotal.com/api/v3/users/current');
            
            // Check if we got a valid response 
            if ($response->successful()) {
                Log::info('VirusTotal API connection test successful');
                return true;
            }
            
            // Record specific issues for debugging
            if ($response->status() === 401) {
                Log::error('VirusTotal API key is invalid or unauthorized', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
                return false;
            }
            
            if ($response->status() === 429) {
                Log::error('VirusTotal API rate limit exceeded during connection test', [
                    'status' => $response->status()
                ]);
                return false;
            }
            
            Log::error('VirusTotal API connection test failed with unexpected status', [
                'status' => $response->status(),
                'body' => $response->body()
            ]);
            
            return false;
        } catch (\Exception $e) {
            Log::error('Exception during VirusTotal API connection test', [
                'error' => $e->getMessage()
            ]);
            
            return false;
        }
    }

    public function processResults(array $results, array $meta = [])
    {
        if (!isset($results['data']) || !isset($results['data']['attributes'])) {
            Log::error('Invalid result structure from VirusTotal', [
                'results' => $results,
                'meta' => $meta
            ]);

            return [
                'stats' => [
                    'harmless' => 0,
                    'malicious' => 0,
                    'suspicious' => 0,
                    'undetected' => 0,
                    'timeout' => 0,
                    'error' => 1
                ],
                'status' => 'error',
                'message' => 'Invalid response from VirusTotal API',
                'scanned_at' => now()->toIso8601String(),
                'meta' => $meta,
                'api_error' => true
            ];
        }

        $stats = $results['data']['attributes']['stats'] ?? [];

        Log::info('VirusTotal scan statistics', [
            'stats' => $stats,
            'file_name' => $meta['fileName'] ?? 'Unknown',
            'file_hash' => $meta['fileHash'] ?? 'Unknown'
        ]);

        $stats = array_merge([
            'harmless' => 0,
            'malicious' => 0,
            'suspicious' => 0,
            'undetected' => 0,
            'timeout' => 0
        ], $stats);

        $allZero = (array_sum(array_values($stats)) === 0);
        if ($allZero) {
            Log::warning('All scan statistics are zero', [
                'file_name' => $meta['fileName'] ?? 'Unknown',
                'file_hash' => $meta['fileHash'] ?? 'Unknown'
            ]);

            $stats['warning'] = 1;
        }

        return [
            'stats' => $stats,
            'status' => $results['data']['attributes']['status'] ?? 'unknown',
            'results' => $results['data']['attributes']['results'] ?? [],
            'scanned_at' => now()->toIso8601String(),
            'meta' => $meta,
            'all_zero' => $allZero
        ];
    }

    public function cacheResults(string $key, array $data)
    {
        Cache::put($key, $data, $this->cacheTtl);
    }

    public function getCachedResults(string $key)
    {
        return Cache::has($key) ? Cache::get($key) : null;
    }

    /**
     * Wait for analysis to complete by polling the API.
     *
     * @param string $analysisId
     * @param int $maxAttempts
     * @param int $delaySeconds
     * @return array
     * @throws \Exception
     */
    public function waitForAnalysisCompletion(string $analysisId, int $maxAttempts = 5, int $delaySeconds = 3)
    {
        for ($i = 0; $i < $maxAttempts; $i++) {
            $result = $this->getAnalysis($analysisId);

            $status = $result['data']['attributes']['status'] ?? 'unknown';

            if ($status === 'completed') {
                Log::info("Analysis completed after {$i} attempts", [
                    'analysis_id' => $analysisId
                ]);
                return $result;
            }

            Log::info("Analysis not complete yet, waiting...", [
                'attempt' => $i + 1,
                'status' => $status
            ]);

            sleep($delaySeconds);
        }

        throw new \Exception("Analysis not completed after {$maxAttempts} attempts.");
    }
}
