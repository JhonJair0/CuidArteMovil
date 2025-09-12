<?php

namespace App\Http\Controllers;

use App\Models\InsertUserCareviger;
use App\Models\InsertUserPatient;
use Illuminate\Http\Request;


class RegisterController extends Controller
{


    public function insertPatient(Request $request){
         // 1. Validación de los datos del formulario
        $request->validate([
            'fullName'       => 'required|string|max:255',
            'idCard'       => 'required|string|unique:users_client,cedula|max:20', // Asumiendo que la cédula es única
            'city'       => 'required|string|max:100',
            'department' => 'required|string|max:100',
            'address'    => 'required|string|max:255',
            'email'       => 'required|string|email|unique:users_client,correo|max:255', // Correo único y válido
            'phone'     => 'required|string|max:20',
            'password'   => 'required|string|min:8', 
            'image'           => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Opcional, imagen, tipos y tamaño máximo
        ]);

        $rutaFotoPerfil = null;
 
        if ($request->hasFile('image')) {
            $rutaFotoPerfil = $request->file('image')->store('fotos_perfil', 'public');
        }

        // 3. Creación del nuevo registro en la base de datos
        $paciente = InsertUserPatient::create([
            'nombre'       => $request->fullName,
            'cedula'       => $request->idCard,
            'ciudad'       => $request->city,
            'departamento' => $request->department,
            'direccion'    => $request->address,
            'correo'       => $request->email,
            'telefono'     => $request->phone,
            'contrasena'   => $request->password, // El mutator en el modelo se encargará de encriptarla
            'fotoPerfil'   => $rutaFotoPerfil, // Guarda la ruta obtenida
            'idRol'        => 2, // Asignar el valor por defecto directamente aquí si lo prefieres, o confiar en el modelo
        ]);

         return response()->json([
            'message' => 'Paciente registrado exitosamente',
            'cuidador' => $paciente,
        ], 201);

        // 4. Redireccionar con un mensaje de éxito
    }

    public function insertCaregiver (Request $request){

        $request->validate([
            'fullName'            => 'required|string|max:255',
            'phone'          => 'required|string|max:255',
            'email'            => 'required|string|unique:users_client,cedula|max:255',
            'idCard'            => 'required|string|unique:users_client,cedula|max:20',
            'department'      => 'required|string|max:255',
            'city'            => 'required|string|max:255',
            'address'         => 'required|string|max:255',
            'password'        => 'required|string|min:8',
            'tipoCuidador' => 'required|string|max:255',
            'age'              => 'required|string|max:255',
            'experience'       => 'required|string|max:255',
            'studies'          => 'required|string|max:255',
            'description'       => 'required|string|max:255',
            'sheetLife'          => 'required|file|mimes:pdf|max:2048',
            'certificate'          => 'required|file|mimes:pdf|max:2048',
            'image'        => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $rutaFotoPerfilCuidador = null;
 
        if ($request->hasFile('image')) {
            $rutaFotoPerfilCuidador = $request->file('image')->store('fotos_Perfil_Cuidador', 'public');
        }
        
        $rutaHojaVida = null;

        if ($request->hasFile('sheetLife')){
            $rutaHojaVida = $request->file('sheetLife')->store('hoja_vida_cuidador', 'public');
        }

        $rutaDiplomasCuidador = null;

        if($request->hasFile('certificate')){
            $rutaDiplomasCuidador = $request->file('certificate')->store('diplomas_Cuidador', 'public');
        }


        $cuidador = InsertUserCareviger::create([
            'nombre' => $request->fullName,
            'edad' => $request->age,
            'cedula' => $request->idCard,
            'ciudad' => $request->city,
            'descripcion' => $request->description,
            'departamento' => $request->department,
            'direccion' => $request->address,
            'correo' => $request->email,
            'tipoCuidador' => $request->tipoCuidador,
            'estudiosRealizados' => $request->studies,
            'anosExperiencia' =>$request->experience,
            'credenciales' => $rutaDiplomasCuidador,
            'hojaVida' => $rutaHojaVida,
            'telefono' => $request->phone,
            'contrasena' => $request->password,
            'fotoPerfil' => $rutaFotoPerfilCuidador,
            'idRol' => 3

        ]);

         return response()->json([
            'message' => 'Cuidador registrado exitosamente',
            'cuidador' => $cuidador,
        ], 201);


    }
}
