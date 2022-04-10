import React from 'react';
import './wgl-viewer.css';

export default class QaiWebGLControl extends React.Component
{
	constructor( props )
	{
		super( props );

        const _uid = Math.random().toFixed(5).toString().replace(".", "");
        this._instance_id = "qai-web-gl-id-" + _uid;

        this.WGL = undefined;
        this.Canvas = React.createRef();
        this.Animation_ID = undefined;

        this.state = {
            debug: false,
            canvasHeight: 0,
            canvasWidth: 0
        };
		return;
    };
    //   EVENT HANDLERS
    Capture_CanvasEvents( ev )
    {   //  console.debug( "TBD - Capture_CanvasEvents(ev)", ev.type );
        return;
    };

    // MAIN WEBGL TESTING FUNCTION
    RenderRotatingCube()
    {
        //  this.WGL = this.Canvas.current.getContext( "experimental-webgl" );

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
        {   //  
            _self.GetRenderedCanvasRect();

            const dt = time - time_old;

            rotateZ( mov_matrix, dt * 0.0011 );//time
            rotateY( mov_matrix, dt * 0.0012 );
            rotateX( mov_matrix, dt * 0.0013 );
            time_old = time;

            _self.WGL.enable( _self.WGL.DEPTH_TEST );
            _self.WGL.depthFunc( _self.WGL.LEQUAL );

            //  CONTROLS TRANSPARENCY
            //  RELATED TO BACKGROUND HTML
            _self.WGL.clearColor( 0, 0, 0, 1);
            _self.WGL.clearDepth( 1 );

            //  console.debug( "_self.state", _self.state.canvasWidth, _self.state.canvasHeight );
            _self.WGL.viewport( 0.0, 0.0, _self.state.canvasWidth, _self.state.canvasHeight );
            _self.WGL.clear( _self.WGL.COLOR_BUFFER_BIT | _self.WGL.DEPTH_BUFFER_BIT );
            _self.WGL.uniformMatrix4fv( Pmatrix, false, proj_matrix );
            _self.WGL.uniformMatrix4fv( Vmatrix, false, view_matrix );
            _self.WGL.uniformMatrix4fv( Mmatrix, false, mov_matrix );
            _self.WGL.bindBuffer( _self.WGL.ELEMENT_ARRAY_BUFFER, index_buffer );
            _self.WGL.drawElements( _self.WGL.TRIANGLES, indices.length, _self.WGL.UNSIGNED_SHORT, 0 );

            _self.Animation_ID = window.requestAnimationFrame( animate );
            //  console.debug( '_self.Animation_ID', _self.Animation_ID );
        }
        animate( 0 );
        return;
    };

    // CALLED ON BROWSER RESIZE
    GetRenderedCanvasRect()
    {   //  console.debug( 'GetRenderedCanvasRect ()' );
        let _root_div = document.getElementById( 'qai-webgl-container-app' );
        //  console.debug( '_root_div', _root_div.getBoundingClientRect() );

        this.setState( {
            canvasHeight: _root_div.getBoundingClientRect().height,
            canvasWidth: _root_div.getBoundingClientRect().width
        } );
        return;
    };

    //  REACT LIFECYCLE
    componentDidMount()
    {   //  console.debug("WebGLDemo.componentDidMount()", this.Canvas.current);
        // DO THIS FOR BROWSER RESIZING
        this.WGL = this.Canvas.current.getContext( "experimental-webgl" );

        const _self = this;
        _self.GetRenderedCanvasRect();
        window.addEventListener( 'resize', function ()
        {
            _self.GetRenderedCanvasRect();
        } );

        // START WEGBGL ANIMATION
        this.RenderRotatingCube();

        return;
    };
    componentWillUnmount()
    {   //  console.debug( "QaiWebGLControl.componentWillUnmount()", this.Animation_ID );
        window.cancelAnimationFrame( this.Animation_ID );
        window.removeEventListener( 'resize', this.GetRenderedCanvasRect );
        return;
    };
	render()
    {  
		return (
            <div
                id="qai-webgl-container-app"
                className="qai-webgl-viewer-container">
                <canvas
                    tabIndex="0"
                    className="qai-webgl-viewer-canvas"
                    id={ this._instance_id }
                    ref={ this.Canvas }
                    height={ this.state.canvasHeight }
                    width={ this.state.canvasWidth }
                    onMouseDown={ this.Capture_CanvasEvents.bind( this ) }
                    onMouseUp={ this.Capture_CanvasEvents.bind( this ) }
                    onMouseMove={ this.Capture_CanvasEvents.bind( this ) }
                    onClick={ this.Capture_CanvasEvents.bind( this ) }
                    onKeyDown={ this.Capture_CanvasEvents.bind( this ) }
                    onKeyUp={ this.Capture_CanvasEvents.bind( this ) }
                    onKeyPress={ this.Capture_CanvasEvents.bind( this ) }
                    onDrag={ this.Capture_CanvasEvents.bind( this ) }
                    onWheel={ this.Capture_CanvasEvents.bind( this ) }
                    ></canvas>
			</div>
		);
	};
};