<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();

            $table->string('name', 100)->unique();           // short identifier e.g. ACA, ERP, CRM
            $table->string('title', 150);                    // display title
            $table->text('description')->nullable();

            $table->json('features')->nullable();            // array of strings
            $table->json('tech_stack')->nullable();          // object → will be cast to array

            $table->string('pricing', 60)->nullable();       // 'Free', 'NPR 25,000 / year', etc.
            $table->string('image')->nullable();             // relative path or full URL

            // Optional – useful for a real product catalog
            $table->string('slug')->unique()->nullable();    // for nice URLs: aca-accounting-system
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
