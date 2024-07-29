<%--
  Created by IntelliJ IDEA.
  User: thanhphung
  Date: 7/26/2024
  Time: 11:39 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <title>Explore NLU 360 - Green Tea</title>
    <script src="https://cdn.babylonjs.com/babylon.js"></script>
    <script src="https://cdn.babylonjs.com/photoDome.js"></script>
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }

        #renderCanvas {
            width: 100vw;
            height: 100vh;
            touch-action: none;
        }
    </style>
</head>
<body>
<canvas id="renderCanvas"></canvas>
<script>
    document.addEventListener("DOMContentLoaded", function () {
        var canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(canvas, true);

        // Function to create the Babylon.js scene
        var createScene = function () {
            var scene = new BABYLON.Scene(engine);

            var camera = new BABYLON.ArcRotateCamera(
                "camera",
                0,
                Math.PI / 2,
                10,
                BABYLON.Vector3.Zero(),
                scene
            );
            camera.attachControl(canvas, true);

            camera.angularSensibilityX = -10000; // Increase this value to slow down the rotation
            camera.angularSensibilityY = -10000; // Increase this value to slow down the rotation

            // Lock the camera to prevent flipping
            camera.lowerBetaLimit = 0.1;
            camera.upperBetaLimit = Math.PI - 0.1;

            // Set the limits for zoom
            camera.lowerRadiusLimit = 1; // Minimum distance from the target
            camera.upperRadiusLimit = 500; // Maximum distance from the target

            // Increase zoom speed
            camera.wheelPrecision = 0.5; // Decrease this value to increase zoom speed

            // Create a light
            var light = new BABYLON.HemisphericLight(
                "light",
                new BABYLON.Vector3(0, 1, 0),
                scene
            );
            light.intensity = 0.7;

            // Create a PhotoDome
            var dome = new BABYLON.PhotoDome(
                "testdome",
                "images/green-tea.jpg", // Use your stitched 360 image here
                {
                    resolution: 32,
                    size: 1000,
                },
                scene
            );

            return scene;
        };

        // Create the Babylon.js scene
        var scene = createScene();

        // Run the render loop
        engine.runRenderLoop(function () {
            scene.render();
        });

        // Handle window resize
        window.addEventListener("resize", function () {
            engine.resize();
        });
    });
</script>
</body>
</html>
