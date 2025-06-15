<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SecurityNewsController extends Controller
{
    public function getSecurityNews()
    {
        try {
            $response = Http::get('https://newsapi.org/v2/everything', [
                'q' => 'cybersecurity OR "information security" OR "data breach" OR phishing',
                'language' => 'en',
                'sortBy' => 'publishedAt',
                'apiKey' => env('NEWS_API_KEY')
            ]);

            if ($response->successful()) {
                return response()->json($response->json());
            }

            return response()->json(['error' => 'Failed to fetch news'], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
} 