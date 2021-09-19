function main() {
    var canvas = document.getElementById('canvas');
    var gl = canvas.getContext('webgl');

    // Define vertices
    
    var vertices = [ // Huruf E
        -0.375, 0.625,
         0.375, 0.625,
         0.375, 0.375,
        -0.125, 0.375,
        -0.125, 0.125,
         0.375, 0.125,
         0.375, -0.125,
         -0.125, -0.125,
         -0.125, -0.375,
         0.375, -0.375,
         0.375, -0.625,
         -0.375, -0.625
    ];

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertexShaderCode = `
        attribute vec2 a_Position;

        void main() {
            gl_Position = vec4(a_Position, 0.0, 1.0);
            gl_PointSize = 20.0;
        }
    `;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    // Fragment definition

    var fragmentShaderCode = `
        void main() {
            gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
        }
    `;

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(1.0, 1.0, 1.0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.LINE_LOOP, 0, 12);
}
