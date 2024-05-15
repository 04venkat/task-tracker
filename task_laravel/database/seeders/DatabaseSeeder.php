<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\MenuItem;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();
        \App\Models\Task::factory(20)->create();
        \App\Models\Task_File::factory(30)->create();


        // \App\Models\User::factory()->create([
        //     'full_name' => 'Test User',
        //     'username' => 'Admin',
        //     'password' => bcrypt('Admin'),
        //     'role_id' => 2,
        // ]);
        // \App\Models\Role::factory()->create([
        //     'role_type' => 'User',

        // ]);
        // \App\Models\Role::factory()->create([
        //     'role_type' => 'Admin',

        // ]);
        // \App\Models\Status::factory()->create([
        //     'status_name' => 'Created',
        // ]);
        // \App\Models\Status::factory()->create([
        //     'status_name' => 'In Development',
        // ]);
        // \App\Models\Status::factory()->create([
        //     'status_name' => 'Staging',
        // ]);
        // \App\Models\Status::factory()->create([
        //     'status_name' => 'Pre-Prod',
        // ]);
        // \App\Models\Status::factory()->create([
        //     'status_name' => 'Prod',
        // ]);
        // \App\Models\Priority::factory()->create([
        //     'priority_level' => 'High',
        // ]);
        // \App\Models\Priority::factory()->create([
        //     'priority_level' => 'Medium',
        // ]);
        // \App\Models\Priority::factory()->create([
        //     'priority_level' => 'Low',
        // ]);
        // \App\Models\Category::factory()->create([
        //     'category_type' => 'Development',
        // ]);
        // \App\Models\Category::factory()->create([
        //     'category_type' => 'Design',
        // ]);
        // \App\Models\Category::factory()->create([
        //     'category_type' => 'Management',
        // ]);

        // \App\Models\Task::factory()->create([
        //     'title' => 'Test User',
        //     'description' => 'Admin',
        //     'category_id' => 2,
        //     'priority_id' => 1,
        //     'user_id' => 2,
        //     'deadline'=>'12-04-2024'
        // ]);



        // $menuItems = [

        //     ['label' => 'Dashboard', 'link' => 'dashboard', 'role_id' => 1],
        //     ['label' => 'My tasks', 'link' => 'my_tasks', 'role_id' => 1],
        //     [
        //         'label' => 'Dashboard',
        //         'link' => 'dashboard',
        //         'role_id' => 2
        //     ],
        //     [
        //         'label' => 'Users',
        //         'link' => 'users',
        //         'role_id' => 2
        //     ],
        //     ['label' => 'All tasks', 'link' => 'all_tasks', 'role_id' => 2],
        //     ['label' => 'Create Post', 'link' => 'create_task', 'role_id' => 2],


        // ];
        // foreach ($menuItems as $menuItem) {
        //     MenuItem::create([
        //         'label' => $menuItem['label'],
        //         'link' => $menuItem['link'],
        //         'role_id' => $menuItem['role_id']
        //     ]);
        // }
    }
}
