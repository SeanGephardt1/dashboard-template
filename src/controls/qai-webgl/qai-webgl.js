import React from 'react';
import './qai-webgl.css';

export default class QaiWebGLControl extends React.Component
{
	constructor( props )
	{
		super( props );

        const _uid = Math.random().toFixed(5).toString().replace(".", "");
        this._instance_id = "qai-web-gl-id-" + _uid;

		this.Canvas = React.createRef();
		this.WGL = undefined;
        this.CanvasSize = {
            height: 128,
            width: 128
        };

		this.state = { 
            debug: false
        };

		return;
    };

    RenderColorSquare ()
    {   //  console.debug( "RenderColorSquare()" );
        this.WGL = this.Canvas.current.getContext( "experimental-webgl" );

        let vertices = [
            -0.5, 0.5, 0.0,
            -0.5, -0.5, 0.0,
            0.5, -0.5, 0.0,
            0.5, 0.5, 0.0
        ];

        let colors = [ 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, ];

        let indices = [ 3, 2, 1, 3, 1, 0 ];

        // Create an empty buffer object and store vertex data
        var vertex_buffer = this.WGL.createBuffer();
        this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, vertex_buffer );
        this.WGL.bufferData( this.WGL.ARRAY_BUFFER, new Float32Array( vertices ), this.WGL.STATIC_DRAW );
        this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, null );


        // Create an empty buffer object and store Index data
        let Index_Buffer = this.WGL.createBuffer();
        this.WGL.bindBuffer( this.WGL.ELEMENT_ARRAY_BUFFER, Index_Buffer );
        this.WGL.bufferData( this.WGL.ELEMENT_ARRAY_BUFFER, new Uint16Array( indices ), this.WGL.STATIC_DRAW );
        this.WGL.bindBuffer( this.WGL.ELEMENT_ARRAY_BUFFER, null );

        // Create an empty buffer object and store color data
        let color_buffer = this.WGL.createBuffer();
        this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, color_buffer );
        this.WGL.bufferData( this.WGL.ARRAY_BUFFER, new Float32Array( colors ), this.WGL.STATIC_DRAW );

        /*======================= Shaders =======================*/
        // vertex shader source code
        let vertCode = 'attribute vec3 coordinates;' +
            'attribute vec3 color;' +
            'varying vec3 vColor;' +
            'void main(void) {' +
            ' gl_Position = vec4(coordinates, 1.0);' +
            'vColor = color;' +
            '}';

        // Create a vertex shader object
        let vertShader = this.WGL.createShader( this.WGL.VERTEX_SHADER );

        // Attach vertex shader source code
        this.WGL.shaderSource( vertShader, vertCode );

        // Compile the vertex shader
        this.WGL.compileShader( vertShader );

        // fragment shader source code
        let fragCode = 'precision mediump float;' +
            'varying vec3 vColor;' +
            'void main(void) {' +
            'gl_FragColor = vec4(vColor, 1.);' +
            '}';

        // Create fragment shader object
        var fragShader = this.WGL.createShader( this.WGL.FRAGMENT_SHADER );

        // Attach fragment shader source code
        this.WGL.shaderSource( fragShader, fragCode );

        // Compile the fragmentt shader
        this.WGL.compileShader( fragShader );

        // Create a shader program object to
        // store the combined shader program
        let shaderProgram = this.WGL.createProgram();

        // Attach a vertex shader
        this.WGL.attachShader( shaderProgram, vertShader );

        // Attach a fragment shader
        this.WGL.attachShader( shaderProgram, fragShader );

        // Link both the programs
        this.WGL.linkProgram( shaderProgram );

        // Use the combined shader program object
        this.WGL.useProgram( shaderProgram );

        /* ======== Associating shaders to buffer objects =======*/
        // Bind vertex buffer object
        this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, vertex_buffer );

        // Bind index buffer object
        this.WGL.bindBuffer( this.WGL.ELEMENT_ARRAY_BUFFER, Index_Buffer );

        // Get the attribute location
        let coord = this.WGL.getAttribLocation( shaderProgram, "coordinates" );

        // point an attribute to the currently bound VBO
        this.WGL.vertexAttribPointer( coord, 3, this.WGL.FLOAT, false, 0, 0 );

        // Enable the attribute
        this.WGL.enableVertexAttribArray( coord );

        // bind the color buffer
        this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, color_buffer );

        // get the attribute location
        let color = this.WGL.getAttribLocation( shaderProgram, "color" );

        // point attribute to the volor buffer object
        this.WGL.vertexAttribPointer( color, 3, this.WGL.FLOAT, false, 0, 0 );

        // enable the color attribute
        this.WGL.enableVertexAttribArray( color );

        /*============Drawing the Quad====================*/
        // Clear the canvas
        this.WGL.clearColor( 0.5, 0.5, 0.5, 0.9 );

        // Enable the depth test
        this.WGL.enable( this.WGL.DEPTH_TEST );

        // Clear the color buffer bit
        this.WGL.clear( this.WGL.COLOR_BUFFER_BIT );

        // Set the view port
        this.WGL.viewport( 0, 0, this.CanvasSize, this.CanvasSize );

        //Draw the triangle
        this.WGL.drawElements( this.WGL.TRIANGLES, indices.length, this.WGL.UNSIGNED_SHORT, 0 );
    };
    RenderRotatingCube ()
    {
        this.WGL = this.Canvas.current.getContext( "experimental-webgl" );

        var vertices = [
            -1, -1, -1,
            1, -1, -1,
            1, 1, -1,
            -1, 1, -1,
            -1, -1, 1,
            1, -1, 1,
            1, 1, 1,
            -1, 1, 1,
            -1, -1, -1,
            -1, 1, -1,
            -1, 1, 1,
            -1, -1, 1,
            1, -1, -1,
            1, 1, -1,
            1, 1, 1,
            1, -1, 1,
            -1, -1, -1,
            -1, -1, 1,
            1, -1, 1,
            1, -1, -1,
            -1, 1, -1,
            -1, 1, 1,
            1, 1, 1,
            1, 1, -1,
        ];

        var colors = [
            5, 3, 7,
            5, 3, 7,
            5, 3, 7,
            5, 3, 7,
            1, 1, 3,
            1, 1, 3,
            1, 1, 3,
            1, 1, 3,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 1, 0,
            1, 1, 0,
            1, 1, 0,
            1, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0
        ];

        var indices = [
            0, 1, 2,
            0, 2, 3,
            4, 5, 6,
            4, 6, 7,
            8, 9, 10,
            8, 10, 11,
            12, 13, 14,
            12, 14, 15,
            16, 17, 18,
            16, 18, 19,
            20, 21, 22,
            20, 22, 23
        ];

        // Create and store data into vertex buffer
        let vertex_buffer = this.WGL.createBuffer();
        this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, vertex_buffer );
        this.WGL.bufferData( this.WGL.ARRAY_BUFFER, new Float32Array( vertices ), this.WGL.STATIC_DRAW );
        this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, null );

        // Create an empty buffer object and store Index data
        let index_buffer = this.WGL.createBuffer();
        this.WGL.bindBuffer( this.WGL.ELEMENT_ARRAY_BUFFER, index_buffer );
        this.WGL.bufferData( this.WGL.ELEMENT_ARRAY_BUFFER, new Uint16Array( indices ), this.WGL.STATIC_DRAW );
        this.WGL.bindBuffer( this.WGL.ELEMENT_ARRAY_BUFFER, null );

        // Create an empty buffer object and store color data
        let color_buffer = this.WGL.createBuffer();
        this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, color_buffer );
        this.WGL.bufferData( this.WGL.ARRAY_BUFFER, new Float32Array( colors ), this.WGL.STATIC_DRAW );
        this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, null );

        /*======================= Shaders =======================*/
        let vertCode = 'attribute vec3 position;' +
            'uniform mat4 Pmatrix;' +
            'uniform mat4 Vmatrix;' +
            'uniform mat4 Mmatrix;' +
            'attribute vec3 color;' +//the color of the point
            'varying vec3 vColor;' +
            'void main(void) { ' +//pre-built function
            'gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);' +
            'vColor = color;' +
            '}';

        let fragCode = 'precision mediump float;' +
            'varying vec3 vColor;' +
            'void main(void) {' +
            'gl_FragColor = vec4(vColor, 1.);' +
            '}';

        let vertShader = this.WGL.createShader( this.WGL.VERTEX_SHADER );
        this.WGL.shaderSource( vertShader, vertCode );
        this.WGL.compileShader( vertShader );

        let fragShader = this.WGL.createShader( this.WGL.FRAGMENT_SHADER );
        this.WGL.shaderSource( fragShader, fragCode );
        this.WGL.compileShader( fragShader );

        let shaderProgram = this.WGL.createProgram();
        this.WGL.attachShader( shaderProgram, vertShader );
        this.WGL.attachShader( shaderProgram, fragShader );
        this.WGL.linkProgram( shaderProgram );

        /* ====== Associating attributes to vertex shader =====*/
        let Pmatrix = this.WGL.getUniformLocation( shaderProgram, "Pmatrix" );
        let Vmatrix = this.WGL.getUniformLocation( shaderProgram, "Vmatrix" );
        let Mmatrix = this.WGL.getUniformLocation( shaderProgram, "Mmatrix" );

        this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, vertex_buffer );
        let position = this.WGL.getAttribLocation( shaderProgram, "position" );
        this.WGL.vertexAttribPointer( position, 3, this.WGL.FLOAT, false, 0, 0 );

        // Position
        this.WGL.enableVertexAttribArray( position );
        this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, color_buffer );
        let color = this.WGL.getAttribLocation( shaderProgram, "color" );
        this.WGL.vertexAttribPointer( color, 3, this.WGL.FLOAT, false, 0, 0 );

        // Color
        this.WGL.enableVertexAttribArray( color );
        this.WGL.useProgram( shaderProgram );

        /*==================== MATRIX =====================*/
        function get_projection ( angle, a, zMin, zMax )
        {
            let ang = Math.tan( ( angle * .5 ) * Math.PI / 180 );//angle*.5
            return [
                0.5 / ang, 0, 0, 0,
                0, 0.5 * a / ang, 0, 0,
                0, 0, -( zMax + zMin ) / ( zMax - zMin ), -1,
                0, 0, ( -2 * zMax * zMin ) / ( zMax - zMin ), 0
            ];
        }
        //  var proj_matrix = get_projection(40, canvas.width/canvas.height, 1, 100);
        let proj_matrix = get_projection( 40, 128 / 128, 1, 100 );

        let mov_matrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
        let view_matrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

        // translating z
        view_matrix[ 14 ] = view_matrix[ 14 ] - 6; //zoom

        /*==================== Rotation ====================*/
        function rotateZ ( m, angle )
        {
            let c = Math.cos( angle );
            let s = Math.sin( angle );
            let mv0 = m[ 0 ], mv4 = m[ 4 ], mv8 = m[ 8 ];

            m[ 0 ] = c * m[ 0 ] - s * m[ 1 ];
            m[ 4 ] = c * m[ 4 ] - s * m[ 5 ];
            m[ 8 ] = c * m[ 8 ] - s * m[ 9 ];

            m[ 1 ] = c * m[ 1 ] + s * mv0;
            m[ 5 ] = c * m[ 5 ] + s * mv4;
            m[ 9 ] = c * m[ 9 ] + s * mv8;
        }

        function rotateX ( m, angle )
        {
            let c = Math.cos( angle );
            let s = Math.sin( angle );
            let mv1 = m[ 1 ], mv5 = m[ 5 ], mv9 = m[ 9 ];

            m[ 1 ] = m[ 1 ] * c - m[ 2 ] * s;
            m[ 5 ] = m[ 5 ] * c - m[ 6 ] * s;
            m[ 9 ] = m[ 9 ] * c - m[ 10 ] * s;

            m[ 2 ] = m[ 2 ] * c + mv1 * s;
            m[ 6 ] = m[ 6 ] * c + mv5 * s;
            m[ 10 ] = m[ 10 ] * c + mv9 * s;
        }

        function rotateY ( m, angle )
        {
            let c = Math.cos( angle );
            let s = Math.sin( angle );
            let mv0 = m[ 0 ], mv4 = m[ 4 ], mv8 = m[ 8 ];

            m[ 0 ] = c * m[ 0 ] + s * m[ 2 ];
            m[ 4 ] = c * m[ 4 ] + s * m[ 6 ];
            m[ 8 ] = c * m[ 8 ] + s * m[ 10 ];

            m[ 2 ] = c * m[ 2 ] - s * mv0;
            m[ 6 ] = c * m[ 6 ] - s * mv4;
            m[ 10 ] = c * m[ 10 ] - s * mv8;
        }

        /*================= Drawing ===========================*/
        let time_old = 0;
        const _self = this;

        let animate = function ( time )
        {   //  console.debug( "animate", time );
            let dt = time - time_old;
            rotateZ( mov_matrix, dt * 0.005 );//time
            rotateY( mov_matrix, dt * 0.002 );
            rotateX( mov_matrix, dt * 0.003 );
            time_old = time;

            _self.WGL.enable( _self.WGL.DEPTH_TEST );
            _self.WGL.depthFunc( _self.WGL.LEQUAL );
            _self.WGL.clearColor( 0.5, 0.5, 0.5, 0.9 );
            _self.WGL.clearDepth( 1.0 );

            ////  this.WGL.viewport( 0.0, 0.0, this.Canvas.width, this.Canvas.height );
            _self.WGL.viewport( 0.0, 0.0, _self.CanvasSize.width, _self.CanvasSize.height );
            _self.WGL.clear( _self.WGL.COLOR_BUFFER_BIT | _self.WGL.DEPTH_BUFFER_BIT );
            _self.WGL.uniformMatrix4fv( Pmatrix, false, proj_matrix );
            _self.WGL.uniformMatrix4fv( Vmatrix, false, view_matrix );
            _self.WGL.uniformMatrix4fv( Mmatrix, false, mov_matrix );
            _self.WGL.bindBuffer( _self.WGL.ELEMENT_ARRAY_BUFFER, index_buffer );
            _self.WGL.drawElements( _self.WGL.TRIANGLES, indices.length, _self.WGL.UNSIGNED_SHORT, 0 );

            window.requestAnimationFrame( animate );
        }
        animate( 0 );
        return;
    };
    componentDidMount ()
    {   //  console.debug("WebGLDemo.componentDidMount()", this.Canvas.current);
        this.WGL = this.Canvas.current.getContext("experimental-webgl");

        const vertices = [
            -1, -1, -1,
            1, -1, -1,
            1, 1, -1,
            -1, 1, -1,

            -1, -1, 1,
            1, -1, 1,
            1, 1, 1,
            -1, 1, 1,

            -1, -1, -1,
            -1, 1, -1,
            -1, 1, 1,
            -1, -1, 1,

            1, -1, -1,
            1, 1, -1,
            1, 1, 1,
            1, -1, 1,

            -1, -1, -1,
            -1, -1, 1,
            1, -1, 1,
            1, -1, -1,

            -1, 1, -1,
            -1, 1, 1,
            1, 1, 1,
            1, 1, -1,
        ];

        //  _self.WGL.clearColor( 0.36, 0.36, 0.36, 1.0 );
        //  rgba / 255 = found color for this format
        const colors = [
            // 1. purple graident, horizontal, dark-light, top-bottom
            0.43, 0.42, 1,
            0.43, 0.42, 1,
            0.22, 0.21, 0.5,
            0.22, 0.21, 0.5,

            // 2. purple graident, vertical, light-dark, left-right
            0.22, 0.21, 0.5,
            0.22, 0.21, 0.5,
            0.43, 0.42, 1,
            0.43, 0.42, 1,

            // 3. purple graident, horizontal, light-dark, top-bottom
            0.43, 0.42, 1,
            0.43, 0.42, 1,
            0.22, 0.21, 0.5,
            0.22, 0.21, 0.5,

            // 4. diagnal, light- left/top - dark-center
            0.22, 0.21, 0.5,
            0.22, 0.21, 0.5,
            0.43, 0.42, 1,
            0.43, 0.42, 1,

            // 5. vertical - light-left / dark right
            0.43, 0.42, 1,
            0.43, 0.42, 1,
            0.22, 0.21, 0.5,
            0.22, 0.21, 0.5,

            // 6. diagnal, dark- left/top - ligth-center
            0.22, 0.21, 0.5,
            0.22, 0.21, 0.5,
            0.43, 0.42, 1,
            0.43, 0.42, 1,
        ];

        const indices = [
            0, 1, 2,
            0, 2, 3,
            4, 5, 6,
            4, 6, 7,

            8, 9, 10,
            8, 10, 11,
            12, 13, 14,
            12, 14, 15,

            16, 17, 18,
            16, 18, 19,
            20, 21, 22,
            20, 22, 23
        ];

        // Create and store data into vertex buffer
        const vertex_buffer = this.WGL.createBuffer();
        this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, vertex_buffer );
        this.WGL.bufferData( this.WGL.ARRAY_BUFFER, new Float32Array( vertices ), this.WGL.STATIC_DRAW );
        this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, null );

        // Create an empty buffer object and store Index data
        const index_buffer = this.WGL.createBuffer();
        this.WGL.bindBuffer( this.WGL.ELEMENT_ARRAY_BUFFER, index_buffer );
        this.WGL.bufferData( this.WGL.ELEMENT_ARRAY_BUFFER, new Uint16Array( indices ), this.WGL.STATIC_DRAW );
        this.WGL.bindBuffer(this.WGL.ELEMENT_ARRAY_BUFFER, null);

        // Create an empty buffer object and store color data
        const color_buffer = this.WGL.createBuffer();
        this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, color_buffer );
        this.WGL.bufferData( this.WGL.ARRAY_BUFFER, new Float32Array( colors ), this.WGL.STATIC_DRAW );
        this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, null );

        /*======================= Shaders =======================*/
        const vertCode = 'attribute vec3 position;' +
            'uniform mat4 Pmatrix;' +
            'uniform mat4 Vmatrix;' +
            'uniform mat4 Mmatrix;' +
            'attribute vec3 color;' +//the color of the point
            'varying vec3 vColor;' +
            'void main(void) { ' +//pre-built function
            'gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);' +
            'vColor = color;' +
            '}';

        const fragCode = 'precision mediump float;' +
            'varying vec3 vColor;' +
            'void main(void) {' +
            'gl_FragColor = vec4(vColor, 1.);' +
            '}';

        const vertShader = this.WGL.createShader( this.WGL.VERTEX_SHADER );
        this.WGL.shaderSource( vertShader, vertCode );
        this.WGL.compileShader( vertShader );

        const fragShader = this.WGL.createShader( this.WGL.FRAGMENT_SHADER );
        this.WGL.shaderSource( fragShader, fragCode );
        this.WGL.compileShader( fragShader );

        const shaderProgram = this.WGL.createProgram();
        this.WGL.attachShader( shaderProgram, vertShader );
        this.WGL.attachShader( shaderProgram, fragShader );
        this.WGL.linkProgram( shaderProgram );

        /* ====== Associating attributes to vertex shader =====*/
        const Pmatrix = this.WGL.getUniformLocation( shaderProgram, "Pmatrix" );
        const Vmatrix = this.WGL.getUniformLocation( shaderProgram, "Vmatrix" );
        const Mmatrix = this.WGL.getUniformLocation( shaderProgram, "Mmatrix" );

        this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, vertex_buffer );

        const position = this.WGL.getAttribLocation( shaderProgram, "position" );
        this.WGL.vertexAttribPointer( position, 3, this.WGL.FLOAT, false, 0, 0 );

        // Position
        this.WGL.enableVertexAttribArray( position );
        this.WGL.bindBuffer( this.WGL.ARRAY_BUFFER, color_buffer );

        const color = this.WGL.getAttribLocation( shaderProgram, "color" );
        this.WGL.vertexAttribPointer( color, 3, this.WGL.FLOAT, false, 0, 0 );

        // Color
        this.WGL.enableVertexAttribArray( color );
        this.WGL.useProgram( shaderProgram );

        /*==================== MATRIX =====================*/
        function get_projection ( angle, a, zMin, zMax )
        {
            let ang = Math.tan( ( angle * 0.3 ) * Math.PI / 180 );//angle*.5
            return [
                0.5 / ang, 0, 0, 0,
                0, 0.5 * a / ang, 0, 0,
                0, 0, -( zMax + zMin ) / ( zMax - zMin ), -1,
                0, 0, ( -2 * zMax * zMin ) / ( zMax - zMin ), 0
            ];
        }

        //  var proj_matrix = get_projection(40, canvas.width/canvas.height, 1, 100);
        let proj_matrix = get_projection( 40, 128/128, 1, 100 );

        let mov_matrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
        let view_matrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

        // translating z
        view_matrix[ 14 ] = view_matrix[ 14 ] - 6; //zoom

        /*==================== Rotation ====================*/
        function rotateZ ( m, angle )
        {
            let c = Math.cos( angle );
            let s = Math.sin( angle );
            let mv0 = m[ 0 ], mv4 = m[ 4 ], mv8 = m[ 8 ];

            m[ 0 ] = c * m[ 0 ] - s * m[ 1 ];
            m[ 4 ] = c * m[ 4 ] - s * m[ 5 ];
            m[ 8 ] = c * m[ 8 ] - s * m[ 9 ];

            m[ 1 ] = c * m[ 1 ] + s * mv0;
            m[ 5 ] = c * m[ 5 ] + s * mv4;
            m[ 9 ] = c * m[ 9 ] + s * mv8;
        }

        function rotateX ( m, angle )
        {
            let c = Math.cos( angle );
            let s = Math.sin( angle );
            let mv1 = m[ 1 ], mv5 = m[ 5 ], mv9 = m[ 9 ];

            m[ 1 ] = m[ 1 ] * c - m[ 2 ] * s;
            m[ 5 ] = m[ 5 ] * c - m[ 6 ] * s;
            m[ 9 ] = m[ 9 ] * c - m[ 10 ] * s;

            m[ 2 ] = m[ 2 ] * c + mv1 * s;
            m[ 6 ] = m[ 6 ] * c + mv5 * s;
            m[ 10 ] = m[ 10 ] * c + mv9 * s;
        }

        function rotateY ( m, angle )
        {
            let c = Math.cos( angle );
            let s = Math.sin( angle );
            let mv0 = m[ 0 ], mv4 = m[ 4 ], mv8 = m[ 8 ];

            m[ 0 ] = c * m[ 0 ] + s * m[ 2 ];
            m[ 4 ] = c * m[ 4 ] + s * m[ 6 ];
            m[ 8 ] = c * m[ 8 ] + s * m[ 10 ];

            m[ 2 ] = c * m[ 2 ] - s * mv0;
            m[ 6 ] = c * m[ 6 ] - s * mv4;
            m[ 10 ] = c * m[ 10 ] - s * mv8;
        }

        /*================= Drawing ===========================*/
        let time_old = 0;
        const _self = this;

        let animate = function ( time )
        {   //  console.debug( "animate", time );
            let dt = time - time_old;

            //  timing
            let _new_x = ( Math.random() * 0.001 );
            let _new_y = ( Math.random() * 0.001 );
            let _new_z = ( Math.random() * 0.001 );
            //  console.debug( _new_x, _new_y, _new_z );

            rotateX( mov_matrix, dt * _new_x );
            rotateY( mov_matrix, dt * _new_y );
            rotateZ( mov_matrix, dt * _new_z );
            time_old = time;

            _self.WGL.enable( _self.WGL.DEPTH_TEST );
            _self.WGL.depthFunc( _self.WGL.LEQUAL );

            //   dbtemp PURPLE/GRAY
            _self.WGL.clearColor( 0.36, 0.36, 0.36, 1 );
            _self.WGL.clearDepth( 1 );

            ////  this.WGL.viewport( 0.0, 0.0, this.Canvas.width, this.Canvas.height );
            _self.WGL.viewport( 0.0, 0.0, 128, 128 );
            _self.WGL.clear( _self.WGL.COLOR_BUFFER_BIT | _self.WGL.DEPTH_BUFFER_BIT );
            _self.WGL.uniformMatrix4fv( Pmatrix, false, proj_matrix );
            _self.WGL.uniformMatrix4fv( Vmatrix, false, view_matrix );
            _self.WGL.uniformMatrix4fv( Mmatrix, false, mov_matrix );
            _self.WGL.bindBuffer( _self.WGL.ELEMENT_ARRAY_BUFFER, index_buffer );
            _self.WGL.drawElements( _self.WGL.TRIANGLES, indices.length, _self.WGL.UNSIGNED_SHORT, 0 );

            window.requestAnimationFrame( animate );
        }
        animate( 0 );
        return;
    };
    componentWillUnmount()
    {   
        //  this.WGL = undefined;   //  this.Canvas.current.getContext( "experimental-webgl" );
        return;
    };
	render()
    {
        return (
			<div className="qai-webgl-container">
				<canvas
                    className="qai-webgl-canvas"
                    id={ this._instance_id }
                    ref={ this.Canvas }
                    height="128"
                    width="128"></canvas>
			</div>
		);
	};
};