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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('logo', 120);
            $table->string('title', 120);
            $table->text('description');
            $table->string('category', 80)->nullable();               // optional
            $table->json('technologies')->nullable();                 // ["Laravel", "Vue", "Tailwind"] etc.
            $table->string('gradient', 60)->nullable();               // e.g. 'from-blue-600 to-purple-600'
            $table->string('image_color', 20)->nullable();            // fallback hex color #3b82f6
            $table->string('project_link')->nullable();                       // project URL / case study
            $table->string('accent')->nullable();                       // project URL / case study
            $table->string('slug')->nullable();                       // project URL / case study
            $table->date('completion_date')->nullable();                     // project URL / case study
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
