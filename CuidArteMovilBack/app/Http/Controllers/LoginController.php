<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    /**
     * Maneja el intento de login para un usuario.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {

        $validatedData = $request->validate([
            'correo' => 'required|email|max:255',
            'contrasena' => 'required|string|min:6',
        ]);
        
        // Buscar el usuario y verificar la contraseña.
        $user = User::where('correo', $validatedData['correo'])->first();

        if (!$user || !Hash::check($validatedData['contrasena'], $user->contrasena)) {
            // Si el login falla, devuelve una respuesta 401.
            return response()->json(['message' => 'Credenciales no válidas.'], 401);
        }
        if ($user->fotoPerfil) {
            $user->fotoPerfil = asset('/storage/' . $user->fotoPerfil);
        }

        // Si el login es exitoso, crea el token y lo retorna con una respuesta 200.
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'Inicio de sesión exitoso.',
            'user' => $user,
            'token' => $token,
        ], 200);
    }
}
