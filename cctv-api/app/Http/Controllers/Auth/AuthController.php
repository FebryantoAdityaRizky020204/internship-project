<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:100',
            'password' => 'required|string|min:8',
        ]);

        $user = Admin::where('username', $request->username)->first();
        if ($user && Hash::check($request->password, $user->password)) {
            return $user->createToken('auth_token')->plainTextToken;
        }

        throw ValidationException::withMessages([]);
    }

    public function logout(Request $request)
    {
        if ($request->user() && $request->user()->currentAccessToken()) {
            $request->user()->currentAccessToken()->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Logged out successfully'
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'No active token found',
            ], 400);
        }
    }
}