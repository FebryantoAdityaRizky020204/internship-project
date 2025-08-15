<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CCTVLocationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/tests', function () {
    return response()->json(['message' => 'This is a test endpoint']);
});

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('cctv-locations', CCTVLocationController::class);
    Route::apiResource('admins', AdminController::class);
});


// Route::middleware('auth:sanctum')->group(function () {
//     Route::apiResource('cctv-locations', \App\Http\Controllers\CCTVLocationController::class)->except(['index', 'show']);
//     Route::apiResource('admins', \App\Http\Controllers\AdminController::class)->except(['index', 'show']);
// });