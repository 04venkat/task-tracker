<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MenuItemController extends Controller
{


    public  function getAllMenuItems()
    {
        $role_id=Auth::user()->role_id;
        $menuItems = MenuItem::where('role_id',$role_id)->with(['role:id,role_type'])->get();
        return response()->json(['data' => $menuItems], 200);
    }
}
