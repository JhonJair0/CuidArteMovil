<?php

use App\Http\Controllers\CarevigerController;
use Illuminate\Http\Request;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;

Route::post('/insert', [RegisterController::class, 'insertPatient']);
Route::post('/insertCaregiver', [RegisterController::class, 'insertCaregiver']);
Route::post('/login', [LoginController::class, 'login'] );

Route::middleware('auth:sanctum')->get('/user', function (Request $request){
    return $request->user();

    if ($user->fotoPerfil){
        $user->fotoPerfil = URL::to('/').'/storage/'. $user->fotoPerfil;
    }
    return $user;
});

Route::get('/careviger', [CarevigerController::class, 'getCareviger']);