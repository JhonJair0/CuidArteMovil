<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class insertUserCareviger extends Model
{
    protected $table = 'users_caregiver';

    protected $fillable = [
        'nombre',
        'edad',
        'cedula',
        'ciudad',
        'descripcion',
        'anosExperiencia',
        'departamento',
        'direccion',
        'correo',
        'tipoCuidador',
        'estudiosRealizados',
        'credenciales',
        'hojaVida',
        'telefono',
        'contrasena',
        'fotoPerfil',
        'idRol'
    ];

    protected $attributes = [
        'idRol' => 3,
    ];

    public function setTipoCuidadorAttibute($value){
        $trimmedValue = trim($value);

        $capitalizedValue = ucfirst($trimmedValue);

        $this->attributes['tipoCuidador'] = $capitalizedValue;
    }

    public function setContrasenaAttribute($value)
    {
        // Solo encripta la contraseña si no está vacía
        if ($value) {
            $this->attributes['contrasena'] = Hash::make($value);
        }
    }
}
