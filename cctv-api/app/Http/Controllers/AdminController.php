<?php

namespace App\Http\Controllers;

use App\Models\Admin;
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
                'status' => 'empty',
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

        if ($request->validate($rules)) {
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
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Validation failed'
            ];
            return response()->json($response, 422);
        }
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
                'data' => $admin
            ], 200);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Admin not found',
        ], 404);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Siapkan rules validasi
        $rules = [];

        if ($request->has('password')) {
            $rules['password'] = 'required|string|min:8';
        }

        if ($request->has('email')) {
            $rules['email'] = 'required|email|unique:admins,email,'.$id.',id_admin';
        }

        if ($request->has('username')) {
            $rules['username'] = 'required|string|max:100|unique:admins,username,'.$id.',id_admin';
        }

        // Validasi request (hanya kalau ada rules)
        if (! empty($rules)) {
            $validatedData = $request->validate($rules);
        } else {
            $validatedData = $request->all();
        }

        // Cari admin (findOrFail otomatis 404 kalau tidak ada)
        $admin = Admin::findOrFail($id);

        // Update field
        if (isset($validatedData['username'])) {
            $admin->username = $validatedData['username'];
        }

        if (isset($validatedData['email'])) {
            $admin->email = $validatedData['email'];
        }

        if (isset($validatedData['password'])) {
            $admin->password = Hash::make($validatedData['password']);
        }

        $admin->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Admin updated successfully',
            'data' => $admin
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $admin = Admin::findOrFail($id);
        if (! $admin) {
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
        return response()->json($response, 204);
    }
}