<?php

use Illuminate\Database\Seeder;
use ProcessMaker\Models\ScreenCategory;
use ProcessMaker\Models\ScriptCategory;
use ProcessMaker\Models\ProcessCategory;

class CategorySystemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $name = __('Uncategorized');

        factory(ScreenCategory::class)->create([
            'name' => __('Uncategorized'),
            'status' => 'ACTIVE'
        ]);
        factory(ScriptCategory::class)->create([
            'name' => __('Uncategorized'),
            'status' => 'ACTIVE'
        ]);
        factory(ProcessCategory::class)->create([
            'name' => __('Uncategorized'),
            'status' => 'ACTIVE'
        ]);
    }
}
