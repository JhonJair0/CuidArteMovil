<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class rolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //sirve para eliminar datos si existen para que no hayan duplicados
        DB::table('roles')->delete();

        DB::table('roles')->insert([
        [
            'rolType' => 'admin',
            'created_at' => now(),
            'updated_at' => now()
        ],[
            'rolType' => 'Paciente',
            'created_at' => now(),
            'updated_at' => now()
        ],[
            'rolType' => 'Cuidador',
            'created_at' => now(),
            'updated_at' => now()
        ]]);

    }
}
