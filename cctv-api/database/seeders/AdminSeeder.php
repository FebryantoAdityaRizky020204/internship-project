<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admins = [
            [
                'username' => 'admin1',
                'email' => 'admin1@email.com',
                'password' => Hash::make('password123'),
            ],
            [
                'username' => 'admin2',
                'email' => 'admin2@email.com',
                'password' => Hash::make('password456'),
            ],
            [
                'username' => 'admin3',
                'email' => 'admin3@email.com',
                'password' => Hash::make('password456'),
            ],
        ];

        foreach ($admins as $admin) {
            Admin::create($admin);
        }
        $this->command->info('Admin users seeded successfully.');
    }
}