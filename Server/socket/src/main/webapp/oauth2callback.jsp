<%--
  Created by IntelliJ IDEA.
  User: thanhphung
  Date: 7/27/2024
  Time: 9:43 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Đếm ngược và tự động đóng</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #2c7a7b 0%, #2f4f4f 100%);
            font-family: "Arial", sans-serif;
        }
        .container {
            text-align: center;
            background: #ffffff;
            padding: 20px 40px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        #message {
            font-size: 24px;
            color: #333;
            margin-bottom: 10px;
        }
        #countdown {
            font-size: 48px;
            font-weight: bold;
            color: #e74c3c;
        }
    </style>
</head>
<body>
<div class="container">
    <div id="message">Đăng nhập thành công tự động đóng sau</div>
    <div id="countdown">3s</div>
</div>

<script>
    let countdown = 3;
    const messageElement = document.getElementById("message");
    const countdownElement = document.getElementById("countdown");

    const interval = setInterval(() => {
        countdown--;
        countdownElement.textContent = `${countdown}s`;

        if (countdown <= 0) {
            clearInterval(interval);
            window.close(); // Đóng tab hiện tại
        }
    }, 1000);
</script>
</body>
</html>
