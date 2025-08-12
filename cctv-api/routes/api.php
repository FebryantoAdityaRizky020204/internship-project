<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/tests', function () {
    return response()->json(['message' => 'This is a test endpoint']);
});

Route::apiResource('cctv-locations', \App\Http\Controllers\CCTVLocationController::class);
Route::apiResource('admins', \App\Http\Controllers\AdminController::class);
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('cctv-locations', \App\Http\Controllers\CCTVLocationController::class)->except(['index', 'show']);
    Route::apiResource('admins', \App\Http\Controllers\AdminController::class)->except(['index', 'show']);
});