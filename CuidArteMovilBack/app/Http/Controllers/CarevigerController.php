<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class CarevigerController extends Controller
{
     /**
     * Devuelve una lista de cuidadores.
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCareviger()
    {
        // Obtener todos los cuidadores (o los que tengan un rol específico, como 3)
        $userCareviger = User::where('idRol', 3)->get();

        // Mapear los datos para construir la URL completa de la imagen
        $userCareviger->map(function ($cuidador) {
            // Solo si el cuidador tiene un valor en fotoPerfil
            if ($cuidador->fotoPerfil) {
                // Construye la URL completa usando la función asset() o URL::to()
                $cuidador->fotoPerfil = URL::to('/') . '/storage/' . $cuidador->fotoPerfil;
            }
            return $cuidador;
        });

        // Devolver la respuesta JSON con las URLs completas
        return response()->json($userCareviger);
    }
}
