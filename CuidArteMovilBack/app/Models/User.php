<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    // Sobreescribe el nombre de la tabla para que coincida con tu migración
    protected $table = 'users_client';

    // Agregamos el trait HasApiTokens para usar Sanctum
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Los atributos que son asignables masivamente.
     * Añade aquí todos los campos de tu migración.
     *
     * @var array<int, string>
     */
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
        'estudiosRealizados',
        'credenciales',
        'hojaVida',
        'telefono',
        'contrasena',
        'fotoPerfil',
        'idRol',
    ];

    /**
     * Los atributos que deben estar ocultos para la serialización.
     * Ocultamos la contraseña y el remember_token.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'contrasena',
        'remember_token',
    ];

    /**
     * Get the password for the user.
     *
     * @return string
     */
    public function getAuthPassword()
    {
        return $this->contrasena;
    }


}

