<?php

use App\Http\Controllers\ProfileController;
//********** */
use App\Http\Controllers\ContactController;
use App\Http\Controllers\UrlScanController;
use App\Http\Controllers\MalwareDetectionController;
//********** */
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//********** */
Route::get('/contact', [ContactController::class, 'show'])->name('contact.show');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
//********** */

Route::get('/services', function () {
    return Inertia::render('Services');
})->name('service');

Route::get('/about', function () {
    return Inertia::render('AboutUs');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('ContactUs');
})->name('contact');

Route::get('/url-check', [UrlScanController::class, 'show'])->name('url.check');
Route::post('/url-scan', [UrlScanController::class, 'scan'])->name('url.scan');
Route::post('/url-status', [UrlScanController::class, 'checkStatus'])->name('url.status');
Route::match(['get', 'post'], '/url-report', [UrlScanController::class, 'generateReport'])->name('url.report');

// Malware Detection Routes with job-based processing and progress tracking
Route::get('/malware-detection', [MalwareDetectionController::class, 'show'])->name('malware.detection');
Route::post('/malware-scan', [MalwareDetectionController::class, 'scanFile'])->name('malware.scan');
Route::post('/malware-status', [MalwareDetectionController::class, 'checkStatus'])->name('malware.status');
Route::post('/malware-cancel', [MalwareDetectionController::class, 'cancelJob'])->name('malware.cancel');
Route::get('/malware-api-test', [MalwareDetectionController::class, 'testApiConnection'])->name('malware.api.test');

Route::get('/training', function () {
    return Inertia::render('TrainingContent');
})->name('training');

Route::get('/terms-of-use', function () {
    return Inertia::render('TermsOfUse');
})->name('terms');

// Simulation Routes
Route::get('/simulation', function () {
    return Inertia::render('Simulation');
})->name('simulation');

Route::get('/simulation/email', function () {
    return Inertia::render('EmailPhishingSimulation');
})->name('simulation.email');

Route::get('/simulation/results', function () {
    return Inertia::render('SimulationResult', [
        'score' => request()->session()->get('simulation_score', 80), // Default to 80 for now
        'totalSteps' => 5,
    ]);
})->name('simulation.results');

require __DIR__.'/auth.php';
require __DIR__.'/admin.php';