<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('race_distances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('race_id')->constrained()->onDelete('cascade');
            $table->string('distance_value'); // e.g. "50", "100"
            $table->enum('distance_unit', ['km', 'mi'])->default('km');
            $table->integer('elevation_gain')->nullable(); // in meters
            $table->string('difficulty'); // app/Enums/Difficulty.php
            $table->string('duration_hhmm')->nullable(); // e.g. "12:30"
            $table->decimal('price', 10, 2)->nullable();
            $table->string('currency')->default('USD');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('race_distances');
    }
};
