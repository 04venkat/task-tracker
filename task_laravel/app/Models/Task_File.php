<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task_File extends Model
{
    use HasFactory;


    protected $fillable = [
        'file_name',
        'task_id',
        'file_type'
    ];

    // public function task(): HasMany
    // {

    //     return $this->hasMany(Task::class, 'id', 'task_id');
    // }
}
