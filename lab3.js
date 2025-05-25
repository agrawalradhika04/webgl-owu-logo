"use strict";

var gl;
var canvas;
var program;

var points = [];
var colors = [];
//const PI = 3.1415927;
var thetaLoc;
var scaleLoc;
var translateLoc;
var theta_O = 0.0;
var theta_W = 0.0;
var theta_U = 0.0;

var scale = 0.25;
var translate_O = [-0.5, 0.0, 0.0];
var translate_W = [0.0, 0.0, 0.0];
var translate_U = [0.5, 0.0, 0.0];

var modelViewMatrix;
var projectionMatrix;
var uModelViewMatrix;
var uProjectionMatrix;
var fixedpointLoc;
var axisLoc;
var angleLoc;
var eyePosition = 0.0;
var angle = 0.0;
var fixed_point = [0.0, 0.0, 0.0];
var axis = [1.0, 1.0, 0.0];

function main() {
  var canvas = document.getElementById("gl-canvas");

  gl = canvas.getContext('webgl2');
  if (!gl) { alert("WebGL 2.0 isn't available"); }

  var points_O = [
    // O Front Points
    vec3(-0.9, 0, 0.05),
    vec3(-0.8, 0, 0.05),
    vec3(-0.8, -0.6, 0.05),
    vec3(-0.7, -0.5, 0.05),
    vec3(-0.5, -0.9, 0.05),
    vec3(-0.4, -0.8, 0.05),
    vec3(0, -0.9, 0.05),
    vec3(0, -0.8, 0.05),
    vec3(0.5, -0.9, 0.05),
    vec3(0.4, -0.8, 0.05),
    vec3(0.8, -0.6, 0.05),
    vec3(0.7, -0.5, 0.05),
    vec3(0.9, 0, 0.05),
    vec3(0.8, 0, 0.05),
    vec3(0.8, 0.6, 0.05),
    vec3(0.7, 0.5, 0.05),
    vec3(0.5, 0.9, 0.05),
    vec3(0.4, 0.8, 0.05),
    vec3(0, 0.9, 0.05),
    vec3(0, 0.8, 0.05),
    vec3(-0.5, 0.9, 0.05),
    vec3(-0.4, 0.8, 0.05),
    vec3(-0.8, 0.6, 0.05),
    vec3(-0.7, 0.5, 0.05),
    vec3(-0.9, 0, 0.05),
    vec3(-0.8, 0, 0.05),


    vec3(-0.9, 0, -0.05),
    vec3(-0.8, 0, -0.05),
    vec3(-0.8, -0.6, -0.05),
    vec3(-0.7, -0.5, -0.05),
    vec3(-0.5, -0.9, -0.05),
    vec3(-0.4, -0.8, -0.05),
    vec3(0, -0.9, -0.05),
    vec3(0, -0.8, -0.05),
    vec3(0.5, -0.9, -0.05),
    vec3(0.4, -0.8, -0.05),
    vec3(0.8, -0.6, -0.05),
    vec3(0.7, -0.5, -0.05),
    vec3(0.9, 0, -0.05),
    vec3(0.8, 0, -0.05),
    vec3(0.8, 0.6, -0.05),
    vec3(0.7, 0.5, -0.05),
    vec3(0.5, 0.9, -0.05),
    vec3(0.4, 0.8, -0.05),
    vec3(0, 0.9, -0.05),
    vec3(0, 0.8, -0.05),
    vec3(-0.5, 0.9, -0.05),
    vec3(-0.4, 0.8, -0.05),
    vec3(-0.8, 0.6, -0.05),
    vec3(-0.7, 0.5, -0.05),
    vec3(-0.9, 0, -0.05),
    vec3(-0.8, 0, -0.05),




    vec3(-0.9, 0, 0.05),
    vec3(-0.9, 0, -0.05),
    vec3(-0.8, -0.6, 0.05),
    vec3(-0.8, -0.6, -0.05),
    vec3(-0.5, -0.9, 0.05),
    vec3(-0.5, -0.9, -0.05),
    vec3(0, -0.9, 0.05),
    vec3(0, -0.9, -0.05),
    vec3(0.5, -0.9, 0.05),
    vec3(0.5, -0.9, -0.05),
    vec3(0.8, -0.6, 0.05),
    vec3(0.8, -0.6, -0.05),
    vec3(0.9, 0, 0.05),
    vec3(0.9, 0, -0.05),
    vec3(0.8, 0.6, 0.05),
    vec3(0.8, 0.6, -0.05),
    vec3(0.5, 0.9, 0.05),
    vec3(0.5, 0.9, -0.05),
    vec3(0, 0.9, 0.05),
    vec3(0, 0.9, -0.05),
    vec3(-0.5, 0.9, 0.05),
    vec3(-0.5, 0.9, -0.05),
    vec3(-0.8, 0.6, 0.05),
    vec3(-0.8, 0.6, -0.05),
    vec3(-0.9, 0, 0.05),
    vec3(-0.9, 0, -0.05),

    vec3(-0.8, 0, 0.05),
    vec3(-0.8, 0, -0.05),
    vec3(-0.7, -0.5, 0.05),
    vec3(-0.7, -0.5, -0.05),
    vec3(-0.4, -0.8, 0.05),
    vec3(-0.4, -0.8, -0.05),
    vec3(0, -0.8, 0.05),
    vec3(0, -0.8, -0.05),
    vec3(0.4, -0.8, 0.05),
    vec3(0.4, -0.8, -0.05),
    vec3(0.7, -0.5, 0.05),
    vec3(0.7, -0.5, -0.05),
    vec3(0.8, 0, 0.05),
    vec3(0.8, 0, -0.05),
    vec3(0.7, 0.5, 0.05),
    vec3(0.7, 0.5, -0.05),
    vec3(0.4, 0.8, 0.05),
    vec3(0.4, 0.8, -0.05),
    vec3(0, 0.8, 0.05),
    vec3(0, 0.8, 0.05),
    vec3(-0.4, 0.8, 0.05),
    vec3(-0.4, 0.8, -0.05),
    vec3(-0.7, 0.5, 0.05),
    vec3(-0.7, 0.5, -0.05),
    vec3(-0.8, 0, 0.05),
    vec3(-0.8, 0, -0.05),

  ]

  var colors_O = [
    // Front Color - Red
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),

    // Back Color - Black
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),

    // Side color - white
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
  ];

  var points_W = [
    // W Front points
    vec3(-0.9, 1, 0.05),
    vec3(-0.8, 1, 0.05),
    vec3(-0.5, -1, 0.05),
    vec3(-0.4, -1, 0.05),
    vec3(-0.05, 1, 0.05),
    vec3(0.05, 1, 0.05),
    vec3(0.4, -1, 0.05),
    vec3(0.5, -1, 0.05),
    vec3(0.8, 1, 0.05),
    vec3(0.9, 1, 0.05),

    // W Back Points
    vec3(-0.9, 1, -0.05),
    vec3(-0.8, 1, -0.05),
    vec3(-0.5, -1, -0.05),
    vec3(-0.4, -1, -0.05),
    vec3(-0.05, 1, -0.05),
    vec3(0.05, 1, -0.05),
    vec3(0.4, -1, -0.05),
    vec3(0.5, -1, -0.05),
    vec3(0.8, 1, -0.05),
    vec3(0.9, 1, -0.05),

    // W Side Points
    vec3(-0.9, 1, 0.05),
    vec3(-0.9, 1, -0.05),
    vec3(-0.5, -1, 0.05),
    vec3(-0.5, -1, -0.05),
    vec3(-0.05, 1, 0.05),
    vec3(-0.05, 1, -0.05),
    vec3(0.4, -1, 0.05),
    vec3(0.4, -1, -0.05),
    vec3(0.8, 1, 0.05),
    vec3(0.8, 1, -0.05),

    vec3(-0.8, 1, 0.05),
    vec3(-0.8, 1, -0.05),
    vec3(-0.4, -1, 0.05),
    vec3(-0.4, -1, -0.05),
    vec3(0.05, 1, 0.05),
    vec3(0.05, 1, -0.05),
    vec3(0.5, -1, 0.05),
    vec3(0.5, -1, -0.05), 
    vec3(0.9, 1, 0.05),
    vec3(0.9, 1, -0.05),

  ];

  var colors_W = [
    // Front Color - Red
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),

    // Back Color - Black
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),

    // Side Color - White
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),

  ]

  var points_U = [
    // U Front Points
    vec3(-0.9, 1, 0.05),
    vec3(-0.8, 1, 0.05),
    vec3(-0.9, 0, 0.05),
    vec3(-0.8, 0, 0.05),
    vec3(-0.8, -0.6, 0.05),
    vec3(-0.7, -0.5, 0.05),
    vec3(-0.5, -0.9, 0.05),
    vec3(-0.4, -0.8, 0.05),
    vec3(0, -0.9, 0.05),
    vec3(0, -0.8, 0.05),
    vec3(0.5, -0.9, 0.05),
    vec3(0.4, -0.8, 0.05),
    vec3(0.8, -0.6, 0.05),
    vec3(0.7, -0.5, 0.05),
    vec3(0.9, 0, 0.05),
    vec3(0.8, 0, 0.05),
    vec3(0.9, 1, 0.05),
    vec3(0.8, 1, 0.05),

    // U Back Points
    vec3(-0.9, 1, -0.05),
    vec3(-0.8, 1, -0.05),
    vec3(-0.9, 0, -0.05),
    vec3(-0.8, 0, -0.05),
    vec3(-0.8, -0.6, -0.05),
    vec3(-0.7, -0.5, -0.05),
    vec3(-0.5, -0.9, -0.05),
    vec3(-0.4, -0.8, -0.05),
    vec3(0, -0.9, -0.05),
    vec3(0, -0.8, -0.05),
    vec3(0.5, -0.9, -0.05),
    vec3(0.4, -0.8, -0.05),
    vec3(0.8, -0.6, -0.05),
    vec3(0.7, -0.5, -0.05),
    vec3(0.9, 0, -0.05),
    vec3(0.8, 0, -0.05),
    vec3(0.9, 1, -0.05),
    vec3(0.8, 1, -0.05),

    // U Side Points
    vec3(-0.9, 1, 0.05),
    vec3(-0.9, 1, -0.05),
    vec3(-0.9, 0, 0.05),
    vec3(-0.9, 0, -0.05),
    vec3(-0.8, -0.6, 0.05),
    vec3(-0.8, -0.6, -0.05),
    vec3(-0.5, -0.9, 0.05),
    vec3(-0.5, -0.9, -0.05),
    vec3(0, -0.9, 0.05),
    vec3(0, -0.9, -0.05),
    vec3(0.5, -0.9, 0.05),
    vec3(0.5, -0.9, -0.05),
    vec3(0.8, -0.6, 0.05),
    vec3(0.8, -0.6, -0.05),
    vec3(0.9, 0, 0.05),
    vec3(0.9, 0, -0.05),
    vec3(0.9, 1, 0.05),
    vec3(0.9, 1, -0.05),
    vec3(-0.8, 1, 0.05),
    vec3(-0.8, 1, -0.05),
    vec3(-0.8, 0, 0.05),
    vec3(-0.8, 0, -0.05),
    vec3(-0.7, -0.5, 0.05),
    vec3(-0.7, -0.5, -0.05),
    vec3(-0.4, -0.8, 0.05),
    vec3(-0.4, -0.8, -0.05),
    vec3(0, -0.8, 0.05),
    vec3(0, -0.8, -0.05),
    vec3(0.4, -0.8, 0.05),
    vec3(0.4, -0.8, -0.05),
    vec3(0.7, -0.5, 0.05),
    vec3(0.7, -0.5, -0.05),
    vec3(0.8, 0, 0.05),
    vec3(0.8, 0, -0.05),
    vec3(0.8, 1, 0.05),
    vec3(0.8, 1, -0.05),
  ];

  var colors_U = [
    // Front Color - Red
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),
    vec4(1, 0, 0, 1),

    // Back Color - Black
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),
    vec4(0, 0, 0, 1),

    // Side Color - White
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
    vec4(1, 1, 1, 1),
  ];

  points = points_O.concat(points_W).concat(points_U);
  colors = colors_O.concat(colors_W).concat(colors_U);

  //  Configure WebGL
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.5, 1.0, 1.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // Load shaders and initialize attribute buffers
  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);


  // Supply points to GPU
  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

  var positionLoc = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(positionLoc);
  gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);

  // Supply colors to GPU
  var colorbufferID = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorbufferID);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

  var colorLoc = gl.getAttribLocation(program, "aColor");
  gl.enableVertexAttribArray(colorLoc);
  gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);

  scaleLoc = gl.getUniformLocation(program, "uScale");
  thetaLoc = gl.getUniformLocation(program, "uTheta");
  translateLoc = gl.getUniformLocation(program, "uTranslate");

  document.getElementById("slider").onchange = function (event) {
    scale = event.target.value / 100;
  };

  // Get uniform locations
  uModelViewMatrix = gl.getUniformLocation(program, 'uModelViewMatrix');
  uProjectionMatrix = gl.getUniformLocation(program, 'uProjectionMatrix');
  fixedpointLoc = gl.getUniformLocation(program, 'uFixedPoint');
  axisLoc = gl.getUniformLocation(program, 'uAxis');
  angleLoc = gl.getUniformLocation(program, 'uAngle');

  gl.uniform3fv(fixedpointLoc, fixed_point); 
  gl.uniform3fv(axisLoc, axis); 

  // Define matrices for model-view and projection transformation
  modelViewMatrix = lookAt(vec3(eyePosition, 0.0, 5.0), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0));
  projectionMatrix = ortho(-2.0, 2.0, -2.0, 2.0, -10.0, 10.0);

  gl.uniformMatrix4fv(uModelViewMatrix, false, flatten(modelViewMatrix));
  gl.uniformMatrix4fv(uProjectionMatrix, false, flatten(projectionMatrix));

  document.getElementById("left").onclick = function() {
      eyePosition -= 0.1; // Move eye to the left
      modelViewMatrix = lookAt(vec3(eyePosition, 0.0, 5.0), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0));
      gl.uniformMatrix4fv(uModelViewMatrix, false, flatten(modelViewMatrix));
  };

  document.getElementById("right").onclick = function() {
      eyePosition += 0.1; // Move eye to the right
      modelViewMatrix = lookAt(vec3(eyePosition, 0.0, 5.0), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0));
      gl.uniformMatrix4fv(uModelViewMatrix, false, flatten(modelViewMatrix));
  };
  
  render();
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  theta_O += 0.01;
  gl.uniform1f(scaleLoc, scale);
  gl.uniform1f(thetaLoc, theta_O);
  gl.uniform3fv(translateLoc, translate_O);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 104);

  theta_W += 0.01;
  gl.uniform1f(scaleLoc, scale);
  gl.uniform1f(thetaLoc, theta_W);
  gl.uniform3fv(translateLoc, translate_W);
  gl.drawArrays(gl.TRIANGLE_STRIP, 104, 40);

  theta_U += 0.01;
  gl.uniform1f(scaleLoc, scale);
  gl.uniform1f(thetaLoc, theta_U);
  gl.uniform3fv(translateLoc, translate_U);

  gl.drawArrays(gl.TRIANGLE_STRIP,  144, 72);

  requestAnimationFrame(render);

}

main();
