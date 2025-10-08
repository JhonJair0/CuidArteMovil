<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class EditUserContoller extends Controller
{
    public function updateUser (Request $request, $id){
        $user = User::findOrFail($id);

    // Validación
    $validated = $request->validate([
        'nombre' => 'nullable|string|max:255',
        'correo' => 'nullable|email|max:255',
        'ciudad' => 'nullable|string|max:255',
        'departamento' => 'nullable|string|max:255',
        'cedula' => 'nullable|string|max:20',
        'telefono' => 'nullable|string|max:20',
        'direccion' => 'nullable|string|max:255',

        // Archivos
        'fotoPerfil'   => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        'hojaVida'     => 'nullable|mimes:pdf|max:5120',
        'credenciales' => 'nullable|mimes:pdf|max:5120',
    ]);

    // Actualizar campos de texto
    $user->fill($validated);

    // Manejo de archivos
    if ($request->hasFile('fotoPerfil')) {
        $path = $request->file('fotoPerfil')->store('fotos_perfil', 'public');
        $user->fotoPerfil = $path;
    }

    if ($request->hasFile('hojaVida')) {
        $path = $request->file('hojaVida')->store('hojas_vida_cuidador', 'public');
        $user->hojaVida = $path;
    }

    if ($request->hasFile('credenciales')) {
        $path = $request->file('credenciales')->store('diplomas_Cuidador', 'public');
        $user->credenciales = $path;
    }

    $user->save();
        if ($user->fotoPerfil) {
             $user->fotoPerfil = asset( '/storage/' . $user->fotoPerfil);
        }

    return response()->json($user);
    }
}
