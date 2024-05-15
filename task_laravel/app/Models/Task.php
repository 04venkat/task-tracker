<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model
{
    use HasFactory;

    public function priority(): BelongsTo
    {

        return $this->belongsTo(Priority::class, 'priority_id', 'id');
    }

    public function category(): BelongsTo
    {

        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
    public function status(): BelongsTo
    {

        return $this->belongsTo(Status::class, 'status_id', 'id');
    }
    public function user(): BelongsTo
    {

        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function task_file(): BelongsTo
    {

        return $this->belongsTo(Task_File::class, 'id', 'task_id');
    }

    protected $fillable = [
        'title',
        'description',
        'category_id',
        'priority_id',
        'user_id',
        'deadline'
    ];
}
