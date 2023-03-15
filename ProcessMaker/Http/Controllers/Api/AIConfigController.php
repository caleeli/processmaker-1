<?php

namespace ProcessMaker\Http\Controllers\Api;

use Illuminate\Http\Request;
use ProcessMaker\AI\Handlers\ProcessHandler;
use ProcessMaker\Http\Controllers\Controller;
use ProcessMaker\Http\Resources\ApiResource;
use ProcessMaker\Models\AiConfig;
use ProcessMaker\Models\AIModelRating;

class AIConfigController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $aiConfig = new AIConfig();
        $aiConfig->industry = $request->input('industry');
        $aiConfig->config = $request->input('config');
        $aiConfig->saveOrFail();

        return response()->json($aiConfig);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function currentConfig(Request $request)
    {
        $aiProcessHandler = new ProcessHandler();
        $aiProcessHandler->setIndustry($request->input('industry'));
        $config = $aiProcessHandler->getConfig();

        return response()->json($config);
    }

    public function ratingList(Request $request)
    {
        $ratings = AIModelRating::get();

        return response()->json($ratings);
    }
}
