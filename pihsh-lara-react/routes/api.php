<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UrlScanController;
use App\Http\Controllers\Api\MalwareScanController;
use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // User routes
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    // URL Scan routes
    Route::prefix('url-scans')->group(function () {
        Route::get('/', [UrlScanController::class, 'index']);
        Route::post('/', [UrlScanController::class, 'store']);
        Route::get('/{scan}', [UrlScanController::class, 'show']);
        Route::delete('/{scan}', [UrlScanController::class, 'destroy']);
    });

    // Malware Scan routes
    Route::prefix('malware-scans')->group(function () {
        Route::get('/', [MalwareScanController::class, 'index']);
        Route::post('/', [MalwareScanController::class, 'store']);
        Route::get('/{scan}', [MalwareScanController::class, 'show']);
        Route::delete('/{scan}', [MalwareScanController::class, 'destroy']);
    });
}); 