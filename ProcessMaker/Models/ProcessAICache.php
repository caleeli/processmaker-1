<?php

namespace ProcessMaker\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use ProcessMaker\Models\ProcessMakerModel;

class ProcessAICache extends ProcessMakerModel
{
    use HasFactory;

    protected $fillable = [
        'hash',
        'code',
    ];
}
