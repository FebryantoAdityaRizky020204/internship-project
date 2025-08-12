<?php

namespace App\Http\Controllers;

use App\Models\CCTVLocation;
use Illuminate\Http\Request;

class CCTVLocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cctvLocations = CCTVLocation::all();
        return response()->json($cctvLocations);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'street_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'stream_url' => 'required|url',
            'status' => 'required|boolean',
        ]);

        $cctvLocation = CCTVLocation::create($request->all());

        return response()->json($cctvLocation, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $cctvLocation = CCTVLocation::findOrFail($id);
        return response()->json($cctvLocation);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'street_name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'latitude' => 'sometimes|required|numeric',
            'longitude' => 'sometimes|required|numeric',
            'stream_url' => 'sometimes|required|url',
            'status' => 'sometimes|required|boolean',
        ]);

        $cctvLocation = CCTVLocation::findOrFail($id);
        $cctvLocation->update($request->all());

        return response()->json($cctvLocation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $cctvLocation = CCTVLocation::findOrFail($id);
        $cctvLocation->delete();

        return response()->json(null, 204);
    }
}