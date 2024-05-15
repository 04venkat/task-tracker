<?php

use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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


Route::post('signUp', [UserController::class, 'signUp']);
Route::post('signIn', [UserController::class, 'signIn']);



Route::middleware(['auth:sanctum'])->group(function () {
    //Menu Items
    Route::get('getAllMenuItems', [MenuItemController::class, 'getAllMenuItems']);
    //User Controller
    Route::get('getUserDetails',  [UserController::class, 'getUserDetails']);
    Route::get('signOut', [UserController::class, 'signOut']);
    //Task Controller
    Route::post('createTask', [TaskController::class, 'createTask']);
    Route::post('updateTaskStatus', [TaskController::class, 'updateTaskStatus']);
    Route::get('fetchSelectOptions', [TaskController::class, 'fetchSelectOptions']);
    Route::get('getAllTasks', [TaskController::class, 'getAllTasks']);
    Route::get('getUserTasks', [TaskController::class, 'getUserTasks']);
    Route::get('viewTask', [TaskController::class, 'viewTask']);
});
