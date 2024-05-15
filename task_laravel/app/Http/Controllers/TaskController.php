<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Priority;
use App\Models\Role;
use App\Models\Status;
use App\Models\Task;
use App\Models\User;
use App\Models\Task_File;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    public function createTask(Request $request)
    {
        $admin_access = Auth::user()->role_id == 2 ? true  : false;
        if ($admin_access) {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string',
                'description' => 'required|string',
                'category_id' => 'required|integer',
                'priority_id' => 'required|integer',
                'user_id' => 'required|integer',
                'deadline' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            try {
                DB::beginTransaction();
                $task = new Task([
                    'title' => $request->title,
                    'description' => $request->description,
                    'category_id' => $request->category_id,
                    'priority_id' => $request->priority_id,
                    'user_id' => $request->user_id,
                    'deadline' => $request->deadline
                ]);
                $task->save();

                if ($request->hasFile('image_url')) {
                    $files = $request->file('image_url');
                    if (!is_array($files)) {
                        $files = [$files];
                    }
                    foreach ($files as $image) {

                        $imagePath = $image->store('', 'custom');
                        $imageUrl = url('/assets/images/' . basename($imagePath));
                        $fileExtension = $image->getClientOriginalExtension();

                        $imageUrl = $imagePath;

                        $taskFile = new Task_File([
                            'file_name' => $imageUrl,
                            'task_id' => $task->id,
                            'file_type' => $fileExtension
                        ]);
                        $taskFile->save();
                    }
                }

                DB::commit();

                return response()->json(['message' => 'Task created successfully', 'task' => $task, 'taskFiles' => $taskFile], 201);
            } catch (Exception $e) {
                DB::rollBack();
                $errorMessage = 'Error uploading image: ' . $e->getMessage();
            }
            if ($errorMessage) {
                return response()->json(['error' => $errorMessage], 422); // Specific error message for upload issue
            }
        }
        return response()->json(['error' => 'Admin can create a task!'], 422);
    }

    public function totalTaskCount()
    {
        $user = Auth::user();
        if ($user->role_id == Role::USER_ROLE_ID) {
            $allTasks = Task::where('user_id', $user->id)->with(['priority:id,priority_level', 'category:id,category_type', 'status:id,status_name', 'user:id,full_name', 'task_file'])->orderBy('created_at', 'desc')->get();
            $totalTasks = $allTasks->count();
            $taskCount['totalTasks'] = $totalTasks;
            $groupKeys = ['priority.priority_level', 'status.status_name', 'category.category_type'];
            foreach ($groupKeys as $key) {
                $groupByCounts = $allTasks->groupBy($key)
                    ->map(function ($group) {
                        return $group->count();
                    });
                $taskCount[$key] = $groupByCounts;
            }
            return $taskCount;
        } else {
            $allTasks = Task::with(['priority:id,priority_level', 'category:id,category_type', 'status:id,status_name', 'user:id,full_name', 'task_file'])->orderBy('created_at', 'desc')->get();
            $totalTasks = $allTasks->count();
            $taskCount['totalTasks'] = $totalTasks;
            $groupKeys = ['priority.priority_level', 'status.status_name', 'category.category_type'];
            foreach ($groupKeys as $key) {
                $groupByCounts = $allTasks->groupBy($key)
                    ->map(function ($group) {
                        return $group->count();
                    });

                $taskCount[basename($key)] = $groupByCounts;
            }
            return $taskCount;
        }
    }

    public function getUserTasks(Request $request)
    {
        $perPage = $request->input('per_page', 8);
        $user = Auth::user();
        $tasks = Task::where('user_id', $user->id)->with(['priority:id,priority_level', 'category:id,category_type', 'status:id,status_name', 'user:id,full_name'])->orderBy('updated_at', 'desc')->paginate($perPage);
        foreach ($tasks as $task) {
            $description = $task['description'];
            $trimmedContent = Str::limit($description, 50);
            $task["trimmed_description"] = $trimmedContent;
        }
        $paginationInfo = [
            'current_page' => $tasks->currentPage(),
            'total_pages' => $tasks->lastPage(),
            'total_items' => $tasks->total(),
            'per_page' => $tasks->perPage()
        ];


        return response()->json(['data' => $tasks, 'paginationInfo' => $paginationInfo, 'taskCount' => Self::totalTaskCount()], 201);
    }

    public function getAllTasks(Request $request)
    {
        $perPage = $request->input('per_page', 6);
        $tasks = Task::with(['priority:id,priority_level', 'category:id,category_type', 'status:id,status_name', 'user:id,full_name,profile_picture'])
            ->orderBy('updated_at', 'desc')->paginate($perPage);

        foreach ($tasks as $task) {
            $description = $task['description'];
            $trimmedContent = Str::limit($description, 50);
            $task["trimmed_description"] = $trimmedContent;
        }
        $paginationInfo = [
            'current_page' => $tasks->currentPage(),
            'total_pages' => $tasks->lastPage(),
            'total_items' => $tasks->total(),
            'per_page' => $tasks->perPage()
        ];
        return response()->json(['data' => $tasks, 'paginationInfo' => $paginationInfo, 'taskCount' => Self::totalTaskCount()], 201);
    }
    public function updateTaskStatus(Request $request)
    {
        $user = Auth::user();
        $task_id = $request->task_id;
        $status_id = $request->status_id;
        $task = Task::find($task_id);
        if ($task->user_id == $user->id || $user->role_id == Role::ADMIN_ROLE_ID) {
            $task->status_id = $status_id;
            $task->save();
            return response()->json(['data' => $task, 'message' => 'Status changed'], 200);
        } else {
            return response()->json(['data'  => 'Unauthorized changed'], 400);
        }
    }

    public function fetchSelectOptions()
    {
        $users = User::where('role_id', 1)->get();
        $status = Status::all();
        $categories = Category::all();
        $priorities = Priority::all();

        return response()->json(['users' => $users, 'category' => $categories, 'priority' => $priorities, 'status' => $status], 200);
    }

    public function viewTask()
    {
        $task_id = request("task_id");
        $user = Auth::user();
        $taskFiles = Task_File::where("task_id", $task_id)->get();
        $taskDetails = Task::where('id', $task_id)->with(['priority:id,priority_level', 'category:id,category_type', 'status:id,status_name', 'user:id,full_name,profile_picture'])->get();
        foreach ($taskDetails as $task) {
            $description = $task['description'];
            $trimmedContent = Str::limit($description, 50);
            $task["trimmed_description"] = $trimmedContent;
        }
        $task["task_files"] = $taskFiles;

        $task['role_id'] = $user->role_id;
        if ($user->role_id == 2 || $task->user_id == $user->id) {

            return response()->json(['data' => $taskDetails], 201);
        } else {
            return response()->json(['data' => "Unauthorized"], 201);
        }
    }
}
