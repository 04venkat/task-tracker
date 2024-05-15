<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function signUp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string',
            'username' => 'required|string|unique:users',
            'password' => 'required|string|min:6|regex:"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"',
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);



        if ($request->hasFile('profile_picture')) {
            $image = $request->file('profile_picture');
            Log::info('Uploaded file name: ' . $image->getClientOriginalName());
            Log::info('Uploaded file extension: ' . $image->getClientOriginalExtension());
            Log::info('Uploaded file MIME type: ' . $image->getMimeType());
        }


        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }


        $imageUrl = null;
        $errorMessage = null;
        if ($request->hasFile('profile_picture')) {
            $image = $request->file('profile_picture');
            try {
                $imagePath = $image->store('', 'custom');
                $imageUrl = url('/assets/images/' . basename($imagePath));
                $imageUrl = $imagePath;
            } catch (Exception $e) {
                $errorMessage = 'Error uploading image: ' . $e->getMessage();
            }
        }

        if ($errorMessage) {
            return response()->json(['error' => $errorMessage], 422); // Specific error message for upload issue
        }
        $user = new User([
            'full_name' => $request->full_name,
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'profile_picture' => $imageUrl,
        ]);

        $user->save();

        return response()->json(['message' => 'User registered successfully'], 201);
    }

    public function signIn(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('username', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Invalid credentials'
            ], 400);
        }

        $data['token'] = $user->createToken($request->username)->plainTextToken;
        $data['user'] = $user;
        $role = $user->role_id;
        $response = [
            'status' => 'success',
            'message' => $role . '  logged in success.',
            'data' => $data,
        ];

        return response()->json($response, 200);
    }

    public function getUserDetails()
    {
        $user = Auth::user();
        if (is_null($user)) {
            return response()->json(['error' => 'User not found']);
        } else {
            return response()->json(['user' => $user], 200);
        }
    }

    public function signOut(Request $request)
    {
        $signOutMessage = auth()->user()->tokens()->delete();
        if (isset($signOutMessage)) {
            return response()->json([
                'status' => 'success',
                'message' => 'Logged out successfully.'
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to logout.'
            ], 500);
        }
    }

    public function deleteAccount()
    {
    }
}
