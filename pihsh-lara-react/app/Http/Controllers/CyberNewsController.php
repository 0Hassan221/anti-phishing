<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class CyberNewsController extends Controller
{
    public function index()
    {
        try {
            $apiKey = env('NEWS_API_KEY');
            
            $response = Http::withOptions([
                'verify' => false,
            ])->get('https://newsapi.org/v2/everything', [
                'q' => 'cybersecurity OR phishing OR hacking',
                'sortBy' => 'publishedAt',
                'language' => 'en',
                'pageSize' => 5,
                'apiKey' => $apiKey,
            ]);

            $news = [];
            if ($response->successful()) {
                $data = $response->json();
                if (isset($data['articles']) && is_array($data['articles'])) {
                    $news = array_map(function ($article) {
                        return [
                            'title' => $article['title'] ?? 'No title',
                            'description' => $article['description'] ?? 'No description',
                            'url' => $article['url'] ?? '#',
                            'image' => $article['urlToImage'] ?? 'https://via.placeholder.com/150',
                            'publishedAt' => isset($article['publishedAt']) ? date('F j, Y', strtotime($article['publishedAt'])) : 'No date',
                        ];
                    }, array_slice($data['articles'], 0, 5));
                }
            }
            
            return Inertia::render('Updates', [
                'news' => $news,
                'tip' => 'Think before you click: Hover over links to see where they lead.',
            ]);

        } catch (\Exception $e) {
            Log::error('NewsAPI Error: ' . $e->getMessage());
            return Inertia::render('Updates', [
                'news' => [],
                'tip' => 'Think before you click: Hover over links to see where they lead.',
                'error' => 'Failed to fetch news. Please try again later.'
            ]);
        }
    }
}
