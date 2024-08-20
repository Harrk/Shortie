<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('short_url_logs', function (Blueprint $table) {
            $table->string('country')->nullable();
            $table->string('city')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('short_url_logs', function (Blueprint $table) {
            $table->dropColumn([
                'country',
                'city',
            ]);
        });
    }
};
