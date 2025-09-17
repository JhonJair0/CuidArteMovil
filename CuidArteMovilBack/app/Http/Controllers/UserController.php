<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class UserController extends Controller
{
     /**
     * Devuelve una lista de cuidadores.
     * @return \Illuminate\Http\JsonResponse
     */

    public function getAuthenticatedUser(Request $request)
    {
        $user = $request->user();

        // Construye la URL de la foto de perfil
        if ($user->fotoPerfil) {
            $user->fotoPerfil = asset( '/storage/' . $user->fotoPerfil);
        }

        return response()->json($user) ;
    }
    public function getAllCareviger()
    {
        // Obtener todos los cuidadores (o los que tengan un rol específico, como 3)
        $user = User::where('idRol', 3)->get();

        // Mapear los datos para construir la URL completa de la imagen
        $user->map(function ($cuidador) {
            // Solo si el cuidador tiene un valor en fotoPerfil
            if ($cuidador->fotoPerfil) {
                $cuidador->fotoPerfil = asset( '/storage/' . $cuidador->fotoPerfil);
            }
            return $cuidador;
        });

        // Devolver la respuesta JSON con las URLs completas
        return response()->json($user);
    }
}