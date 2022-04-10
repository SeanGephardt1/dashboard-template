//	https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio
//	https://www.petercollingridge.co.uk/tutorials/svg/interactive/dragging/
//	view-source:http://www.codedread.com/dragtest2.svg
//	view-source:http://svg-whiz.com/svg/DragAndDrop.svg

import React from 'react';
import './rules-editor.css';
import Test_Image from './test-image-01.png';

export default class RuleEditorControl extends React.Component
{
	static ControlTypes = {
		Identifier: 0,
		Area: 1,
		ComplexArea: 2,
		RoundArea: 3
	};
	constructor( props )
	{
		super( props );

		this._current_image = Test_Image;
		this.ViewBox = "0 0 1920 1080";

		this._default_translate_value = "translate(0,0)";
		this._default_scale_value = "scale(1)";
		this._default_matix_value = "matrix()";

		this.state = {
			debug: false,
			isDirty: false,
			panXValue: 0,
			panYValue: 0,
			zoomValue: 0,
			svgGroupScaleValue: this._default_scale_value,
			svgGroupTranslateValue: this._default_translate_value,
			svgGroupTransformValue: this._default_translate_value + " " + this._default_scale_value
		};
		return;
	};
	TransformControls(item, keyValue)
	{
		let _rv = undefined;
		switch (item.type)
		{
			case RuleEditorControl.ControlTypes.Area: {
				_rv = (
					<rect
						id={ 'control-rect-' + keyValue }
						key={ keyValue }
						x={ item.x }
						y={ item.y }
						width={ item.w }
						height={ item.h }
						draggable="true"
						vectorEffect="non-scaling-stroke"
						className="rule-rect-area">
						<title>{ item.name}</title>
					</rect>
				);
				break;
			}
			case RuleEditorControl.ControlTypes.RoundArea: {
				_rv = (
					<circle
						id={ 'control-' + keyValue }
						key={ keyValue }
						cx={ item.x }
						cy={ item.y }
						r={ item.r }
						draggable="true"
						vectorEffect="non-scaling-stroke"
						className="rule-circle-area">
						<title>{ item.name }</title>
					</circle>
				);
				break;
			}
			case RuleEditorControl.ControlTypes.ComplexArea: {
				_rv = (
					<polygon
						id={ 'control-circle-' + keyValue }
						key={ keyValue }
						points={ item.v }
						draggable="true"
						vectorEffect="non-scaling-stroke"
						className="rule-poly-area">
						<title>{ item.name }</title>
					</polygon>
				);
				break;
			}
			default: {
				_rv = (
					<circle
						id={ 'control-default-' + keyValue }
						key={ keyValue }
						cx="50%"
						cy="50%"
						r="50"
						fill="rgba(255,255,255,0.6)"
						stroke="rgba(255,255,255,1)"
						strokeWidth="0.2ex"
						draggable="true"
					/>
				);
				break;
			}
		}
		return _rv;
	};

	//	 SVG EVENT METHODS
	SVG_OnClick_TestClickCapture(ev)
	{
		//console.debug("OnClick_TestClickCapture", ev); //ownerSVGElement
		//console.debug( "ev.target.ownerSVGElement", ev.target.ownerSVGElement );
		//console.debug( "ev.target.parentElement", ev.target.parentElement );
		//console.debug( "ev.target.parentNode", ev.target.parentNode );
		//console.debug( "ev.target.ownerSVGElement", ev.target.ownerSVGElement );
		//console.debug( "ev.target.nearestViewportElement", ev.target.nearestViewportElement );
		//console.debug( "ev.target.farthestViewportElement", ev.target.farthestViewportElement );
		//console.debug( "ev.target.farthestViewportElement", ev.target.viewportElement );
		//console.debug("ev.target", ev.target.nodeName);
		//console.debug("ev.target.attributes", ev.target.attributes);
		//console.debug("ev.client", ev.clientX, ev.clientY);
		//console.debug("ev.page", ev.pageX, ev.pageY);
		//console.debug("ev.screen", ev.screenX, ev.screenY);

		return;
	};
	SVG_OnMouseDown( ev )
	{
		//console.debug( "\nSVG_OnMouseDown" );
		//console.debug( "ev.target", ev.target.nodeName );
		//console.debug( "ev.target.attributes", ev.target.attributes );
		//console.debug( "ev.client", ev.clientX, ev.clientY );
		//console.debug( "ev.page", ev.pageX, ev.pageY );
		//console.debug( "ev.screen", ev.screenX, ev.screenY );
		//console.debug( "ev.target.ownerSVGElement", ev.target.ownerSVGElement );
		//console.debug( "ev.target.parentElement", ev.target.parentElement );
		//console.debug( "ev.target.parentNode", ev.target.parentNode );
		//console.debug( "ev.target.nearestViewportElement", ev.target.nearestViewportElement );
		//console.debug( "ev.target.farthestViewportElement", ev.target.farthestViewportElement );
		//console.debug( "ev.target.farthestViewportElement", ev.target.viewportElement );
		// check the DOM here, currently have to handle a debug <g> element
		return;
	};
	SVG_OnMouseMove( ev )
	{
		//	console.debug("SVG_OnMouseMove");
		return;
	};
	SVG_OnMouseUp( ev )
	{
		//	console.debug("SVG_OnMouseUp");
		return;
	};


	OnClick_ResetZoomPan( ev )
	{	//	console.debug("OnClick_ResetZoomPan");	
		this.setState( {
			isDirty: true,
			panXValue: 0,
			panYValue: 0,
			zoomValue: 0,
			svgGroupScaleValue: this._default_scale_value,
			svgGroupTranslateValue: this._default_translate_value,
			svgGroupTransformValue: this._default_translate_value + " " + this._default_scale_value
		} );
		return;
	};

	// PANNING METHODS
	OnChange_PanX( ev )
	{	//	console.debug( "OnChange_PanX", ev.target.value, this.state.panXValue, this.state.panYValue, this.state.svgGroupScaleValue );

		let _new_translate = "translate(" + ev.target.value + ", " + this.state.panYValue + ")" ;
		//	console.debug( "_new_translate", _new_translate );

		this.setState( {
			isDIrty: true,
			panXValue: ev.target.value,
			svgGroupTranslateValue: _new_translate,
			svgGroupTransformValue: _new_translate + " " + this.state.svgGroupScaleValue
		} );
		return;
	};
	OnChange_PanY( ev )
	{	//	console.debug( "OnChange_PanY", ev.target.value, this.state.panXValue, this.state.panYValue, this.state.svgGroupScaleValue );

		let _new_translate = "translate(" + this.state.panXValue + ", " + ev.target.value + ")";
		//	console.debug( "_new_translate", _new_translate );

		this.setState( {
			isDIrty: true,
			panYValue: ev.target.value,
			svgGroupTranslateValue: _new_translate,
			svgGroupTransformValue: _new_translate + " " + this.state.svgGroupScaleValue
		} );
		return;
	};


	//	ZOOM METHODS
	Zoom( val , evTarget )
	{	//	console.debug( "Zoom", val, evTarget );
		if ( val < -10 )
		{
			val = -10;
		}

		if ( val > 10 )
		{
			val = 10;
		}

		let _scale = "";
		switch (parseInt(val))
		{
			case -10: { _scale = "scale(0.5, 0.5)"; break; }
			case -9: { _scale = "scale(0.55, 0.55)"; break; }
			case -8: { _scale = "scale(0.6, 0.6)"; break; }
			case -7: { _scale = "scale(0.65, 0.65)"; break; }
			case -6: { _scale = "scale(0.7, 0.7)"; break; }
			case -5: { _scale = "scale(0.75, 0.75)"; break; }
			case -4: { _scale = "scale(0.8, 0.8)"; break; }
			case -3: { _scale = "scale(0.85, 0.85)"; break; }
			case -2: { _scale = "scale(0.9, 0.9)"; break; }
			case -1: { _scale = "scale(0.95, 0.95)"; break; }
			case 0: { _scale = "scale(1.0, 1.0)"; break; }
			case 1: { _scale = "scale(1.5, 1.5)"; break; }
			case 2: { _scale = "scale(2.0, 2.0)"; break; }
			case 3: { _scale = "scale(2.5, 2.5)"; break; }
			case 4: { _scale = "scale(3.0, 3.0)"; break; }
			case 5: { _scale = "scale(3.5, 3.5)"; break; }
			case 6: { _scale = "scale(4.0, 4.0)"; break; }
			case 7: { _scale = "scale(4.5, 4.5)"; break; }
			case 8: { _scale = "scale(5.0, 5.0)"; break; }
			case 9: { _scale = "scale(5.5, 5.5)"; break; }
			case 10: { _scale = "scale(6.0, 6.0)"; break; }
			default: { _scale = "scale(1, 1)"; break; }
		}
		//	console.debug("_scale", _scale);

		this.setState( {
			isDirty: true,
			zoomValue: val,
			svgGroupScaleValue: _scale,
			svgGroupTransformValue: this.state.svgGroupTranslateValue + " " + _scale
		} );
		return;
	};
	SVG_OnWheel_Zoom( ev )
	{	//	console.debug( "SVG_OnWheel_Zoom", ev.deltaY, this.state.zoomValue);
		if ( ev.shiftKey === true )
		{
			let _scale_val = 0;
			if ( ev.deltaY === 100 )
			{
				_scale_val = this.state.zoomValue - 1;
			}
			else if ( ev.deltaY === -100 )
			{
				_scale_val = this.state.zoomValue + 1;
			}
			this.Zoom( _scale_val, ev.target );
		}
		return;
	};
	OnChange_ZoomControl( ev )
	{	//	console.debug("OnChange_ZoomControl", parseInt(ev.target.value) );	
		this.Zoom( ev.target.value, ev.target );
		return;
	};

	// REACT METHODS
	render()
	{	
		return (
			<div className="re-panel">

				<svg
					className="re-panel-editor-svg"
					preserveAspectRatio="xMinYMin"
					vectorEffect="non-scaling-stroke"
					viewBox={ this.ViewBox }
					onWheel={ this.SVG_OnWheel_Zoom.bind(this) }
					onMouseDown={ this.SVG_OnMouseDown.bind(this) }
					onMouseMove={ this.SVG_OnMouseMove.bind(this) }
					onMouseUp={ this.SVG_OnMouseUp.bind(this) }
					onMouseLeave={ this.SVG_OnMouseUp.bind( this ) }
				>

					<g id="content-group" transform={ this.state.svgGroupTransformValue }>

					<image
						href={ this._current_image }
						x="0" y="0"
						height="100%" width="100%"
						preserveAspectRatio="xMidYMid"/>

					{ /* trigger or identifier control */
						this.props.data.Identifier !== undefined &&
						<rect
							x={ this.props.data.Identifier.x }
							y={ this.props.data.Identifier.y }
							width={ this.props.data.Identifier.w }
							height={ this.props.data.Identifier.h }
							draggable="true"
							vectorEffect="non-scaling-stroke"
							className="rule-trigger-area">
								<title>{ this.props.data.name }</title>
						</rect>
					}

					{ /* other controls */}
					{
						this.props.data.Controls.length > 0 &&
						this.props.data.Controls.map( (item, idx ) => this.TransformControls( item, idx ) )
					}
					</g>

					{ /* DEBUG GROUP */}
					<g id="debug-group-1" className="re-debug-group-1">
						<title>DEBUGGING GROUP</title>

						{ /*   X coords grid*/ }
						<line x1="0" x2="100%" y1="50%" y2="50%"/>

						{ /* Y coords grid */ }
						<line x1="50%" x2="50%" y1="0%" y2="100%"/>

						{ /* base location */ }
						<circle
							cx="50%"
							cy="50%"
							r="10">
							<title>DEBUG CENTER CIRCLE</title>
						</circle>

					</g>

				</svg>

				{
					this.state.debug === true &&
					<>
						<div className="re-controls-panel">

							<div className="re-controls-box">
								<label htmlFor="zoom-ctrl">Zoom Level: { this.state.zoomValue }</label>
								<input
									type="range"
									name="zoom-ctrl"
									id="zoom-ctrl"
									min="-10"
									max="10"
									step="1"
									value={ this.state.zoomValue }
									onChange={ this.OnChange_ZoomControl.bind( this ) } />
								<div>SHIFT + mouse wheel to zoom</div>
							</div>

							<div className="re-controls-box">
								<label htmlFor="pan-x-ctrl">X position: { this.state.panXValue }</label>
								<input
									type="range"
									name="pan-x-ctrl"
									id="pan-x-ctrl"
									min={ -( 1280 / 2 ) }
									max={ 1280 / 2 }
									step="10"
									value={ this.state.panXValue }
									onChange={ this.OnChange_PanX.bind( this ) } />

								<label htmlFor="pan-x-ctrl">Y position: { this.state.panYValue }</label>
								<input
									type="range"
									name="pan-y-ctrl"
									id="pan-y-ctrl"
									min={ -( 720 / 2 ) }
									max={ 720 / 2 }
									step="10"
									value={ this.state.panYValue }
									onChange={ this.OnChange_PanY.bind( this ) } />
							</div>

							<div className="re-controls-box">
								<button
									className="qai-btn-primary"
									onClick={ this.OnClick_ResetZoomPan.bind( this ) }>Reset View</button>
							</div>

						</div>

						<div className="re-controls-panel">

							<div className="re-controls-box">
								<div>DEBUG INFO:</div>
								<div>state.isDirty: <span className="bold-debug">{ this.state.isDirty.toString() }</span></div>
								<div>state.zoomValue: <span className="bold-debug">{ this.state.zoomValue }</span></div>
								<div>state.svgGroupTranslateValue: <span className="bold-debug">{ this.state.svgGroupTranslateValue }</span></div>
								<div>state.svgGroupScaleValue: <span className="bold-debug">{ this.state.svgGroupScaleValue }</span></div>
								<div>state.svgGroupTransformValue: <span className="bold-debug">{ this.state.svgGroupTransformValue }</span></div>
							</div>

						</div>

					</>
				}

			</div>
		);
	};
};