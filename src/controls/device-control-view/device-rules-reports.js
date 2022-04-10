import React from 'react';
import { ControlStatus } from '../../util/___old-sample-alerts-data.js';
import './device-rules.css';
import FullScreenButton from '../../controls/fullscreen-button/fs-btn.js';

export default class DeviceRulesControl extends React.Component
{
	constructor( props )
	{
		super( props );

		this._device_rules_control_id = "device-rules-svg-element-" + Math.random().toFixed( 5 ).replace( '.', '' );

		this.state = { debug:false };
		return;
	};
	render()
	{	//	console.debug( "DeviceRulesControl.Render()", this.props.data );
		this.props.data.Controls.sort( ( a, b ) =>
		{	//	console.debug( a.status, b.status );
			return a.status - b.status;
		} );

		this.props.data.Controls.forEach( ( v, i, a ) =>
		{	//	console.debug( i, v );
			switch ( v.status )
			{
				case ControlStatus.OK: {
					v._className = "device-rule-default drr-ok";
					break;
				}
				case ControlStatus.Informational: {
					v._className = "device-rule-default drr-info";
					break;
				}
				case ControlStatus.Warning: {
					v._className = "device-rule-default drr-warn";
					break;
				}
				case ControlStatus.Error: {
					v._className = "device-rule-default drr-error";
					break;
				}
				default: {
					v._className = "device-rule-default drr-ok";
					break;
				}
			};
			return;
		} );

		return (
			<div
				id={ this._device_rules_control_id }
				className="device-rules-panel"
				title="Click this image to view in full screen mode.">
				<svg				
					className="device-rules-svg"
					preserveAspectRatio="xMinYMin"
					vectorEffect="non-scaling-stroke"
					shapeRendering="geometricPrecision"
					imageRendering="optimizeQuality"
					viewBox="0 0 1920 1080"
					height="100%"
					width="100%">
					<defs>
						<mask id="controls-mask" x="0" y="0" width="100%" height="100%">
							<rect width="100%" height="100%" fill="rgba(255,255,255,1)" />
							{
								this.props.data.Controls.length > 0 &&
								this.props.data.Controls.map( ( item, idx ) =>
									<rect
										key={ idx }
										x={ item.x}
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
					<g>
						<image
							href={ this.props.data.Image }
							x="0" y="0"
							height="100%" width="100%"
							preserveAspectRatio="xMidYMid"
							shapeRendering="geometricPrecision"
						/>
						<rect
							width="100%"
							height="100%"
							fill="rgba(0,0,0,0.4)"
							mask="url(#controls-mask)" />
						{
							this.props.data.Controls.length > 0 &&
							this.props.data.Controls.map( ( item, idx ) =>
								<rect
									key={ idx }
									x={ item.x }
									y={ item.y }
									width={ item.w }
									height={ item.h }
									className={ item._className }
									vectorEffect="non-scaling-stroke"
									shapeRendering="geometricPrecision"
								><title>{ item.name }</title>
								</rect>
							)
						}
					</g>

					<FullScreenButton element={ this._device_rules_control_id } />

					{
						this.state.debug === true &&
						<g id="debug-group-1"
							vectorEffect="non-scaling-stroke"
							shapeRendering="geometricPrecision"
						>
							<line id="x-line" x1="0" x2="100%" y1="50%" y2="50%" />
							<line id="y-line" x1="50%" x2="50%" y1="0%" y2="100%" />
							<circle id="center-circle" cx="50%" cy="50%" r="50" />
							<text
								x="0.5%" y="99.5%"
								fontSize="24px"
								letterSpacing="0px"
								textAnchor="start"
								alignmentBaseline="top">&copy; 2021 QUIVR.AI</text>
						</g>
					}
				</svg>
			</div>
		);
	};
};