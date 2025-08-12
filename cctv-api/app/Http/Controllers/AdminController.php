<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admins = Admin::all();
        if ($admins->isEmpty()) {
            return response()->json(['message' => 'No admins found'], 404);
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
        $request->validate([
            'username' => 'required|string|max:100|unique:admins',
            'password' => 'required|string|min:8',
        ]);

        $admin = Admin::create([
            'username' => $request->username,
            'password' => bcrypt($request->password),
        ]);

        return response()->json($admin, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $admin = Admin::findOrFail($id);
        if (! $admin) {
            return response()->json(['message' => 'Admin not found'], 404);
        }

        return response()->json($admin);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'username' => 'sometimes|required|string|max:100|unique:admins,username,'.$id,
            'password' => 'sometimes|required|string|min:8',
        ]);

        $admin = Admin::findOrFail($id);
        $admin->username = $request->input('username', $admin->username);
        if ($request->has('password')) {
            $admin->password = bcrypt($request->password);
        }
        $admin->save();

        return response()->json($admin);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $admin = Admin::findOrFail($id);
        $admin->delete();

        return response()->json(null, 204);
    }
}