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
        Schema::create('short_url_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('short_url_id')
                ->references('id')
                ->on('short_urls')
                ->onDelete('cascade');
            $table->string('device')->nullable();
            $table->string('device_type')->nullable();
            $table->string('platform')->nullable();
            $table->string('browser')->nullable();
            $table->string('referer')->nullable();
            $table->string('hash')->index();
            $table->boolean('is_bot')->index();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('short_url_logs');
    }
};
