<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\Admin\ScanManagementController;
use Illuminate\Support\Facades\Route;

// Temporarily remove auth middleware for testing
Route::prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');

    // User Management
    Route::resource('users', UserManagementController::class)->except(['show']);
    Route::get('users/{user}', [UserManagementController::class, 'show'])->name('users.show');

    // Scan Management
    Route::get('scans/urls', [ScanManagementController::class, 'urlScans'])->name('scans.urls');
    Route::get('scans/malware', [ScanManagementController::class, 'malwareScans'])->name('scans.malware');
    Route::get('scans/urls/{scan}', [ScanManagementController::class, 'showUrlScan'])->name('scans.url.show');
    Route::get('scans/malware/{scan}', [ScanManagementController::class, 'showMalwareScan'])->name('scans.malware.show');
    Route::delete('scans/urls/{scan}', [ScanManagementController::class, 'deleteUrlScan'])->name('scans.url.delete');
    Route::delete('scans/malware/{scan}', [ScanManagementController::class, 'deleteMalwareScan'])->name('scans.malware.delete');
}); 