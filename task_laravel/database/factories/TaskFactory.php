<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' =>  fake()->name(),
            'description' =>  fake()->paragraph(),
            'category_id' =>  fake()->numberBetween($min = 1, $max = 3),
            'priority_id' =>  fake()->numberBetween($min = 1, $max = 3),
            'user_id' =>  fake()->numberBetween($min = 2, $max = 22),
            'deadline' => fake()->date($format = 'Y-m-d', $min = 'now', $max = '2025-01-31')
        ];
    }
}
