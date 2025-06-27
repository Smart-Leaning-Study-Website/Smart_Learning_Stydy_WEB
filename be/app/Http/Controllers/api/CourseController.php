<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function myCourses(Request $request)
    {
        try {
            $user = $request->user(); // Lấy user từ token Sanctum
            $courses = $user->courses; // Phải có quan hệ 'courses' trong User model

            return response()->json([
                'courses' => $courses
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
