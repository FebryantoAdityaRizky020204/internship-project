<?php

namespace App\Http\Controllers;

use App\Models\CCTVLocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CCTVLocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cctvLocations = CCTVLocation::all();
        if($cctvLocations->isEmpty()){
            return response()->json([
                'status' => 'failed',
                'message' => 'No CCTV found'
            ], 404);
        } else {
            $response = [
                'status' => 'success',
                'message' => 'CCTV Locations retrieved successfully',
                'data' => $cctvLocations
            ];
            return response()->json($response, 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = [
            'street_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'stream_url' => 'required|url',
            'status' => 'required|in:aktif,nonaktif',
        ];

        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()){
            return response()->json([
                'status' => "failed",
                'message' => 'validasi error',
                'errors' => $validator->errors()
            ], 422);
        }

        $cctv = CCTVLocation::create($request->all());
        $response = [
            'status' => 'success',
            'message' => 'CCTV Added successfully',
            'data' => $cctv
        ];
        return response()->json($response, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $cctvLocation = CCTVLocation::findOrFail($id);
        if ($cctvLocation) {
            return response()->json([
                'status' => 'success',
                'message' => 'CCTV retrieved successfully',
                'data' => $cctvLocation,
            ], 200);
        }

        return response()->json([
            'status' => 'failed',
            'message' => 'CCTV not found',
        ], 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $rules = [
            'street_name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'latitude' => 'sometimes|numeric',
            'longitude' => 'sometimes|numeric',
            'stream_url' => 'sometimes|url',
            'status' => 'sometimes|boolean',
        ];

        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()){
            return response()->json([
                'status' => "failed",
                'message' => 'validasi error',
                'errors' => $validator->errors()
            ], 422);
        }

        $cctv = CCTVLocation::findOrFail($id);
        $cctv->update($request->all());
        $response = [
            'status' => 'success',
            'message' => 'CCTV Updated successfully',
            'data' => $cctv
        ];
        return response()->json($response, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $cctvLocation = CCTVLocation::findOrFail($id);
        $cctvLocation->delete();
        $response = [
            'status' => 'success',
            'message' => 'CCTV deleted successfully',
        ];

        return response()->json($response, 202);
    }
}