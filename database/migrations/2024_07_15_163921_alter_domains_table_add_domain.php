<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('domains', function (Blueprint $table) {
            $table->string('domain')
                ->default('NA')
                ->index();
        });

        // Update previously created domains with the domain value.
        DB::transaction(function () {
            DB::table('domains')
                ->orderBy('id')
                ->each(function($domain) {
                    $parsedUrl = parse_url($domain->url);
                    $host = Arr::get($parsedUrl, 'host');

                    DB::table('domains')
                        ->where('id', $domain->id)
                        ->update([
                            'domain' => $host,
                        ]);
                });

        });
    }

    public function down(): void
    {
        Schema::table('domains', function (Blueprint $table) {
            $table->dropColumn('domain');
        });
    }
};
