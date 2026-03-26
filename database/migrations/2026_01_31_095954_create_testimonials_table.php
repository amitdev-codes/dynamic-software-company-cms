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
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('role', 100);                        // e.g. "CTO at TechCorp", "Freelance Designer"
            $table->text('content');
            $table->string('avatar_color', 100)->nullable();   // e.g. #8b5cf6 (fallback color)
            $table->string('avatar_image')->nullable();         // path or URL to uploaded avatar
            $table->tinyInteger('rating')->unsigned()->default(5); // 1–5
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
