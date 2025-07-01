<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;

class VideoController extends Controller
{
    // Lấy tất cả video
    public function index()
    {
        return response()->json(Video::all());
    }

    // Lấy video theo id
    public function show($id)
    {
        $video = Video::find($id);
        if (!$video) {
            return response()->json(['message' => 'Video not found'], 404);
        }
        return response()->json($video);
    }
}
