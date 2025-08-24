<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dismantles', function (Blueprint $table) {
            $table->id();
            $table->string('PD')->unique();
            $table->string('nama');
            $table->text('alamat')->nullable();
            $table->string('no_telp')->nullable();
            $table->string('titik_kordinat')->nullable();
            $table->enum('perangkat', ['FIBERHOME', "ZTE", "RAISECOM", "HUAWEI", "AIS"])->nullable();
            $table->enum('status', ['PENDING', 'ON PROGRESS', 'SELESAI'])->default('PENDING');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dismantles');
    }
};