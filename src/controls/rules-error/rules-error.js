import React from 'react';
import { ControlStatus } from '../../util/___old-sample-alerts-data.js';
import FullScreenButton from '../../controls/fullscreen-button/fs-btn.js';
import './rules-error.css';

export default class RulesErrorControl extends React.Component
{
	constructor( props )
	{
		super( props );

        const _uid = Math.random().toFixed(5).toString().replace(".", "");
        this._instance_id = "device-rules-error-ctrl-" + _uid;
        this._mask_id = "rules-error-mask-" + _uid;

		this.viewBoxW = 1920;
		this.viewBoxH = 1080;
		this._zoomScaleValue = 1;
		this._zoomTranslateValue = "0,0";
		this._error_controls = [];
        this.zoomImageTransform= `scale(${ this._zoomScaleValue }) translate(${ this._zoomTranslateValue })`;
        this.zoomCoords = { x: 100, y: 100, w: 1720, h: 880 };

		this.state = { 
            debug: false
        };

		return;
    };
    Transform_Data()
    {   //  console.debug( "Transform_Data", this.props.data );
        //  NEW ZOOM COORDS BASED ON ERROR RECT COORDS
        this._error_controls = this.props.data.controls.filter( ( item ) =>
        {
            return item.status === ControlStatus.Error;
        } );
        //  console.debug( "this._error_controls", this._error_controls );

        this._error_controls.map( function ( item )
        {
            item.r = parseInt( item.x + item.w );
            item.b = parseInt( item.y + item.h );
            return item;
        } );
        //  console.debug( "this._error_controls", this._error_controls );

        // GET TOP, LEFT
        let _x = [];
        let _y = [];
        let _r = [];
        let _b = [];

        this._error_controls.forEach( function ( v, i, a )
        {   //  console.debug( i, v );
            _x.push( v.x );
            _y.push( v.y );
            _r.push( v.r );
            _b.push( v.b );
            return;
        } );

        _x.sort( ( a, b ) => { return a - b; } );
        _y.sort( ( a, b ) => { return a - b; } );
        _r.sort( ( a, b ) => { return a - b; } );
        _b.sort( ( a, b ) => { return a - b; } );
        // console.debug( "_x", _x, "_y", _y, "_r", _r, "_b", _b );

        let _padding = 50;
        //  console.debug( "_padding", _padding );
        let _zoom_coords = {
            x: _x[ 0 ] - _padding,
            y: _y[ 0 ] - _padding,
            w: ( _r[ _r.length - 1 ] - _x[ 0 ] ) + ( _padding * 2 ),
            h: ( _b[ _b.length - 1 ] - _y[ 0 ] ) + ( _padding * 2 ),
        };

        //  console.debug( "TRANSLATE VALUES" );
        let _t1 = ( ( this.viewBoxW - ( _zoom_coords.w - _zoom_coords.x ) - _zoom_coords.x ) / 2 ) - _zoom_coords.x;
        let _t2 = ( ( this.viewBoxH - ( _zoom_coords.h - _zoom_coords.y ) - _zoom_coords.y ) / 2 ) - _zoom_coords.y;
        this._zoomTranslateValue = "" + _t1 + "," + _t2 + "";

        //  console.debug( "ZOOM SCALE" );
        if ( ( this.viewBoxW / ( _zoom_coords.w ) ) > ( this.viewBoxH / ( _zoom_coords.h ) ) )
        {
            this._zoomScaleValue = ( this.viewBoxH / ( _zoom_coords.h + ( 100 / 4 ) ) );
        }
        else if ( ( this.viewBoxW / ( _zoom_coords.w ) ) < ( this.viewBoxH / ( _zoom_coords.h ) ) )
        {
            this._zoomScaleValue = ( this.viewBoxW / ( _zoom_coords.w + ( 100 / 3 ) ) );
        }

        this.zoomImageTransform = `scale(${ this._zoomScaleValue }) translate(${ this._zoomTranslateValue })`;
        this.zoomCoords = _zoom_coords;
        return;
    };
	render()
    {   
        this.Transform_Data();

		return (
            <div
                id={ this._instance_id }
                className="rules-error-panel">
                <svg
                    viewBox={ "0 0 " + this.viewBoxW + " " + this.viewBoxH }
                    className="svg-report-image-main"
                    height="100%"
                    width="100%"
                    preserveAspectRatio="xMinYMin"
                    vectorEffect="non-scaling-stroke"
                    shapeRendering="geometricPrecision"
                    imageRendering="optimizeQuality"                    
                >
                    <defs>
                        <mask id={ this._mask_id } x="0" y="0" width="100%" height="100%">
                            <rect width="100%" height="100%" fill="rgba(255,255,255,1)" />
                            {
                                this._error_controls.length > 0 &&
                                this._error_controls.map( ( item, idx ) =>
                                    <rect
                                        key={ idx }
                                        x={ item.x }
                                        y={ item.y }
                                        width={ item.w }
                                        height={ item.h }
                                        fill="rgba(0,0,0,1)"
                                        vectorEffect="non-scaling-stroke"
                                        shapeRendering="geometricPrecision"
                                    />
                                )
                            }
                        </mask>
                    </defs>

                    <g
                        className="svg-report-g-transform"
                        transform={ this.zoomImageTransform }>

                        { /* BASE IMAGE*/ }
                        <image id="base-image"
                            href={ this.props.data.base_image }
                            x="0" y="0"
                            height="100%" width="100%"
                            preserveAspectRatio="xMidYMid"
                            vectorEffect="non-scaling-stroke"
                            imageRendering="optimizeQuality" />

                        { /*SVG MASK */ }
                        <rect
                            width="100%"
                            height="100%"
                            fill="rgba(0,0,0,0.4)"
                            mask={ `url(#${ this._mask_id}`}
                            preserveAspectRatio="xMidYMid"
                            vectorEffect="non-scaling-stroke"
                            imageRendering="optimizeQuality" />

                        { /* DEBUGGING OVERLAY FOR ZOOM SCALING */ }
                        {
                            this.state.debug === true &&
                            <rect
                                id="debug-zoom"
                                width={ this.zoomCoords.w }
                                height={ this.zoomCoords.h }
                                x={ this.zoomCoords.x }
                                y={ this.zoomCoords.y }
                                fill="rgba(255,255,0,0.1)"
                                stroke="rgba(255,255,255,0.1)"
                                preserveAspectRatio="xMidYMid"
                                vectorEffect="non-scaling-stroke"
                                imageRendering="optimizeQuality" />
                        }

                        { /* ERROR ELEMENTS - LINES AND RECT */}
                        {
                            this._error_controls.length > 0 &&
                            this._error_controls.map( ( item, idx ) => (
                                <g key={ idx } className="svg-g-viewer">
                                    { /* circle markers */ }
                                    { /* left top*/ }
                                    <circle cx={ item.x } cy={ item.y } r="5" />
                                    <circle cx={ item.x } cy={ item.y } r="10" />
                                    { /* left bottom */ }
                                    <circle cx={ item.x } cy={ item.y + item.h } r="5" />
                                    <circle cx={ item.x } cy={ item.y + item.h } r="10" />
                                    { /* right top*/ }
                                    <circle cx={ item.x + item.w } cy={ item.y } r="5" />
                                    <circle cx={ item.x + item.w } cy={ item.y } r="10" />
                                    { /* right bottom */ }
                                    <circle cx={ item.x + item.w } cy={ item.y + item.h } r="5" />
                                    <circle cx={ item.x + item.w } cy={ item.y + item.h } r="10" />

                                    { /* dotted line markers */ }
                                    { /* to top */ }
                                    <line x1={ item.x } y1={ item.y } x2={ item.x } y2="0" />
                                    <line x1={ item.x + item.w } y1={ item.y } x2={ item.x + item.w } y2="0" />
                                    { /* to left */ }
                                    <line x1={ 0 } y1={ item.y } x2={ item.x } y2={ item.y } />
                                    <line x1={ 0 } y1={ item.y + item.h } x2={ item.x } y2={ item.y + item.h } />
                                    { /* to right */ }
                                    <line x1={ item.x + item.w } y1={ item.y } x2="100%" y2={ item.y } />
                                    <line x1={ item.x + item.w } y1={ item.y + item.h } x2="100%" y2={ item.y + item.h } />
                                    { /* to bottom */ }
                                    <line x1={ item.x } y1={ item.y + item.h } x2={ item.x } y2="100%" />
                                    <line x1={ item.x + item.w } y1={ item.y + item.h } x2={ item.x + item.w } y2="100%" />

                                    { /* error hilite */ }
                                    <rect
                                        x={ item.x }
                                        y={ item.y }
                                        width={ item.w }
                                        height={ item.h }
                                        vectorEffect="non-scaling-stroke"
                                        shapeRendering="geometricPrecision"
                                    ><title>{ item.name }</title>
                                    </rect>
                                </g>
                            ) )
                        }
                    </g>

                    {
                        this.props.enableFullScreen === true &&
                        <FullScreenButton element={ this._instance_id } />
                    }

                    {
                        this.state.debug === true &&
                        <g id="debug-group-1">
                            <title>DEBUG CENTER</title>
                            { /*   X coords grid*/ }
                            <line x1="0" x2="100%" y1="50%" y2="50%" />
                            { /* Y coords grid */ }
                            <line x1="50%" x2="50%" y1="0%" y2="100%" />
                            { /* base location */ }
                            <circle
                                cx="50%"
                                cy="50%"
                                r="20">
                            </circle>
                        </g>
                    }
                </svg>


			</div>
		);
	};
};