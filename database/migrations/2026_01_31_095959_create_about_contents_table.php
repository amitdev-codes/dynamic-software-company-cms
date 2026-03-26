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
        Schema::create('about_contents', function (Blueprint $table) {
            $table->id();
            $table->text('mission_text')->nullable();
            $table->integer('years_experience')->default(0);
            $table->integer('global_clients')->default(0);
            $table->json('other_stats')->nullable();       // {"projects_completed": 120, "coffee_cups": 5000, ...}
            $table->string('image_path')->nullable();      // hero/about photo
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about_contents');
    }
};
