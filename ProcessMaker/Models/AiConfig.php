<?php

namespace ProcessMaker\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use ProcessMaker\Models\ProcessMakerModel;

class AiConfig extends ProcessMakerModel
{
    use HasFactory;

    protected $table = 'a_i_configs';

    protected $casts = [
        'config' => 'array',
    ];
}
