<?php

/* use App\Http\Resources\ArticleResource; */

use App\Http\Controllers\ArticleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/* use App\Models\Articles; */

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/* Route::get('/articles/{id}', function () {
 return new ArticleResource(Articles::find($id));
 }); */

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// List artigos
Route::get('artigos', [ArticleController::class, 'index']);

// List single artigo
Route::get('artigo/{id}', [ArticleController::class, 'show']);

// Create new artigo
Route::post('artigo', [ArticleController::class, 'store']);

// Update artigo
Route::put('artigo/{id}', [ArticleController::class, 'update']);

// Delete artigo
Route::delete('artigo/{id}', [ArticleController::class,'destroy']);
