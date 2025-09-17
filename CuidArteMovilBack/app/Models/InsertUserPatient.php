<?php



namespace App\Models;



use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;


class InsertUserPatient extends Model

{

 use HasFactory;



    protected $table = 'users_client';



    protected $fillable = [

        'nombre',
        'cedula',
        'ciudad',
        'departamento',
        'direccion',
        'correo',
        'telefono',
        'contrasena',
        'fotoPerfil',
        'idRol'

    ];




    protected $attributes = [
        'idRol' => 2,
    ];

    public function setContrasenaAttribute($value)
    {
        // Solo encripta la contraseña si no está vacía
        if ($value) {
            $this->attributes['contrasena'] = Hash::make($value);
        }
    }




}