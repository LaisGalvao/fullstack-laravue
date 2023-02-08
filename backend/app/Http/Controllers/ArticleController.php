<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleResource;
use App\Models\Articles;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $artigos = Articles::paginate(15);
        return ArticleResource::collection($artigos);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $artigo = new Articles();
        $artigo->url = $request->input('url');
        $artigo->titulo = $request->input('titulo');
        $artigo->label = $request->input('label');

        if ($artigo->save()) {
            return new ArticleResource($artigo);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $artigo = Articles::findOrFail($id);
        return new ArticleResource($artigo);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $artigo = Articles::findOrFail($request->id);
        $artigo->url = $request->input('url');
        $artigo->titulo = $request->input('titulo');
        $artigo->label = $request->input('label');

        if ($artigo->save()) {
            return new ArticleResource($artigo);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $artigo = Articles::findOrFail($id);
        if ($artigo->delete()) {
            return new ArticleResource($artigo);
        }
    }
}
