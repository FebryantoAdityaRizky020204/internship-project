<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admins = Admin::all();
        if ($admins->isEmpty()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No admins found'
            ], 404);
        } else {
            $response = [
                'status' => 'success',
                'message' => 'Admins retrieved successfully',
                'data' => $admins
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
            'username' => 'required|string|max:100|unique:admins',
            'password' => 'required|string|min:8',
            'email' => 'required|email|unique:admins,email',
        ];

        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()){
            return response()->json([
                'status' => "failed",
                'message' => 'validasi error',
                'errors' => $validator->errors()
            ], 422);
        }

        $admin = Admin::create([
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'email' => $request->email,
        ]);

        $response = [
            'status' => 'success',
            'message' => 'Admin created successfully',
            'data' => $admin
        ];
        return response()->json($response, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $admin = Admin::find($id);

        if ($admin) {
            return response()->json([
                'status' => 'success',
                'message' => 'Admin retrieved successfully',
                'data' => $admin,
            ], 200);
        }

        return response()->json([
            'status' => 'failed',
            'message' => 'Admin not found',
        ], 404);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $rules = [
            'username' => 'sometimes|string|max:100|unique:admins',
            'password' => 'sometimes|string|min:8',
            'email' => 'sometimes|email|unique:admins,email',
        ];

        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()){
            return response()->json([
                'status' => "failed",
                'message' => 'validasi error',
                'errors' => $validator->errors()
            ], 422);
        }

        // Cari admin (findOrFail otomatis 404 kalau tidak ada)
        $admin = Admin::findOrFail($id);
        $admin->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Admin updated successfully',
            'data' => $admin,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $admin = Admin::findOrFail($id);
        if (!$admin) {
            return response()->json(['message' => 'Admin not found'], 404);
        }
        // Check if the admin is the last admin
        if (Admin::count() <= 1) {
            return response()->json(['message' => 'Cannot delete the last admin'], 403);
        }


        $admin->delete();
        $response = [
            'status' => 'success',
            'message' => 'Admin deleted successfully',
        ];
        return response()->json($response, 202);
    }
}