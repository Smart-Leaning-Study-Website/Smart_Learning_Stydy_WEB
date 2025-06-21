// routes/api.php
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController; // Đảm bảo đã import đúng namespace

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Đây là nơi bạn có thể đăng ký các route API cho ứng dụng của mình.
| Các route này được tải bởi RouteServiceProvider và tất cả chúng
| sẽ được gán vào nhóm middleware "api".
|
*/

// Nhóm các API liên quan đến xác thực (Authentication)
// Các route này không yêu cầu người dùng phải đăng nhập trước
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});


// Nhóm các API cần xác thực (Protected routes)
// Các route trong nhóm này yêu cầu người dùng phải gửi kèm token hợp lệ
Route::middleware('auth:sanctum')->group(function () {
    
});