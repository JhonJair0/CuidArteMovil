<?php

use App\Http\Controllers\EditUserContoller;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use Illuminate\Support\Facades\Route;

Route::post('/insert', [RegisterController::class, 'insertPatient']);
Route::post('/insertCaregiver', [RegisterController::class, 'insertCaregiver']);
Route::post('/login', [LoginController::class, 'login'] );
Route::middleware('auth:sanctum')->get('/user',[UserController::class, 'getAuthenticatedUser']);
Route::get('/careviger', [UserController::class, 'getAllCareviger']);
Route::post('/updateUser/{id}', [EditUserContoller::class, 'updateUser'] );
Route::get('/carevigerData/{caregiverId}', [UserController::class, 'getDataCareviger']);