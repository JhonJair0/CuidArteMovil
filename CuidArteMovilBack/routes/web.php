<?php

use Illuminate\Support\Facades\Route;


Route::view('/{any}', 'welcome')->where('any', '.*');

Route::get('/', function () {
    return view('welcome');
});