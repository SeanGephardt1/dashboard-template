import React from 'react';
import FullScreenButton from '../../controls/fullscreen-button/fs-btn.js';
import './device-controls-view.css';

export default class DeviceControlsView extends React.Component
{
	constructor( props )
	{
		super( props );
		this._device_rules_control_id = "dc-view-svg-el-" + Math.random().toFixed( 5 ).replace( '.', '' );
		this.state = { debug: false };
		return;
	};
	CreateControlConnections()
	{	//	console.debug( 'CreateControlConnections()', this.props.data );

		for ( let i = 0; i < this.props.data.live.controls.length; i++ )
		{	//	console.debug( 'control', i, this.props.data.live.controls[ i ].id, this.props.data.live.controls[ i ].links.length );

			for ( let j = 0; j < this.props.data.live.controls[ i ].links.length; j++ )
			{	//	console.debug( '\tlinks', j, this.props.data.live.controls[ i ].links[ j ] );
				this.props.data.live.controls[ i ].linkSets = [];

				const _ctrl_idx = parseInt( this.props.data.live.controls[ i ].links[ j ] );
				const _related_control = this.props.data.live.controls[ _ctrl_idx ];
				//	console.debug( '_related_control', _related_control );

				const _link_set = {
					id: _ctrl_idx,
					top: _related_control.top,
					bottom: _related_control.top + _related_control.bottom,
					height: _related_control.height,
					left: _related_control.left,
					right: _related_control.right,
					width: _related_control.width
				};
				//	console.debug( '_link_set', _link_set );

				this.props.data.live.controls[ i ].linkSets.push( _link_set );
			}

			//if ( this.props.data.live.controls[ i ].linkSets.length > 0 )
			//{
			//	console.debug( 'this.props.data.live.controls[ i ].linkSets', this.props.data.live.controls[ i ].linkSets );
			//}
		}

		return;
	};
	render()
	{	//	console.debug( "DeviceRulesControl.Render()", this.props.debug );
		this.CreateControlConnections();

		return (
			<div
				id={ this._device_rules_control_id }
				className="device-rules-panel"
				title="Click this image to view in full screen mode.">
				<svg				
					className="device-rules-svg"
					preserveAspectRatio="xMinYMin"
					viewBox="0 0 1920 1080"
					height="100%"
					width="100%"
					shapeRendering="geometricPrecision"
					vectorEffect="non-scaling-size">
					<defs>
						<marker id="markerCircle" markerWidth="10" markerHeight="10" refX="5" refY="5">
							<circle cx="5" cy="5" r="3px" className="marker-ctrl-connector"/>
						</marker>
						<marker id="markerSquare" markerWidth="8" markerHeight="8" refX="4" refY="4"
							orient="auto">
							<rect x="0" y="0" width="5" height="5" />
						</marker>
						<marker id="markerArrow" markerWidth="13" markerHeight="13" refX="2" refY="6"
							orient="auto">
							<path d="M2,2 L2,11 L10,6 L2,2" className="marker-ctrl-connector"/>
						</marker>
						<filter id="shadow3">
							<feDropShadow dx="2" dy="2" stdDeviation="0.2" />
						</filter>
						<filter id="qai-text-shadow">
							<feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="rgba(0,0,0,1)"/>
						</filter>
						<filter id="qai-text-shadow-small">
							<feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="rgba(0,0,0,1)" />
						</filter>
						<mask id="controls-mask" x="0" y="0" width="100%" height="100%">
							<rect width="100%" height="100%" fill="rgba(255,255,255,1)" />
							{
								this.props.data.live.controls !== undefined &&
								this.props.data.live.controls.length > 0 &&
								this.props.data.live.controls.map( ( item, idx ) =>
									<rect
										key={ idx }
										x={ item.left }
										y={ item.top }
										width={ item.width }
										height={ item.height }
										fill="rgba(0,0,0,1)"
										vectorEffect="non-scaling-stroke"
										shapeRendering="geometricPrecision"
									/>
								)
							}
						</mask> 
					</defs>

					{ /* DISPLAY ELEMENTS */ }
					<g id="controls-rendering">
						{ /* DISPLAY IMAGE */ }
						<image
							href={ this.props.data.live.preview }
							x="0" y="0"
							height="100%" width="100%"
							preserveAspectRatio="xMidYMid"
							imageRendering="optimizeQuality"
							vectorEffect="non-scaling-size"
						/>

						{ /* DRAW CONTROL MASKS */ }
						{
							this.props.data.live.controls !== undefined &&
							this.props.data.live.controls.length > 0 &&
							<rect
								width="100%"
								height="100%"
								fill="rgba(0,0,0,0.25)"
								mask="url(#controls-mask)" />
						}

						{ /* DRAW CONTROLS */ }
						{
							this.props.data.live.controls !== undefined &&
							this.props.data.live.controls.length > 0 &&
							this.props.data.live.controls.map( ( item, idx ) =>
								<g key={ idx } id={ 'control-' + idx }>
									{/*<text*/}
									{/*	className="d-text"*/}
									{/*	x={ item.left }*/}
									{/*	y={ item.top }*/}
									{/*	dx="0"*/}
									{/*	dy={ item.height + 20 }*/}
									{/*	letterSpacing="0px"*/}
									{/*	textAnchor="start"*/}
									{/*	alignmentBaseline="top"*/}
									{/*>{ item.index.toString() } :: { item.id }</text>*/}
									<rect
										x={ item.left }
										y={ item.top }
										width={ item.width }
										height={ item.height }
										className={ item.isTriggered === true ? 'drr-ok' : 'drr-error' }
										vectorEffect="non-scaling-size"
										shapeRendering="geometricPrecision"
										filter='url(#shadow3)'
									/>
									{
										item.linkSets.length > 0 &&
										item.linkSets.map( ( item2, idx2 ) =>
											<g key={ idx2 }>
												{/*<text*/}
												{/*	className="d-text d-text-24"*/}
												{/*	x={ item.left }*/}
												{/*	y={ item.top }*/}
												{/*	dx="8"*/}
												{/*	dy="28"*/}
												{/*	letterSpacing="0px"*/}
												{/*	textAnchor="start"*/}
												{/*	alignmentBaseline="top"*/}
												{/*>{ item.links[ idx2].toString() }</text>*/}
												{/*<circle													*/}
												{/*	cx={ item.left + item.width }*/}
												{/*	cy={ item.top + ( item.height / 2 ) }*/}
												{/*	r="10"*/}
												{/*	className="ctrl-connector" />*/}
												<line
													x1={ item.left + item.width }
													y1={ item.top + ( item.height / 2 ) }
													x2={ item2.left }
													y2={ item2.top + ( item2.height / 2 ) }
													className="ctrl-connector"
													shapeRendering="geometricPrecision"
													vectorEffect="non-scaling-size"													
													markerStart="url(#markerCircle)"
													markerMid="url(#markerCircle)"
													markerEnd="url(#markerCircle)"
												/>
											</g>
										 )
									}

									{ /* DEBUG */ }
									{
										this.state.debug === true &&
										<>
											<text
												x={ item.left }
												y={ item.top }
												dx="8"
												dy="10"
												textAnchor="start"
												dominantBaseline="hanging"
												alignmentBaseline="hanging"
												className="d-text"
												filter='url(#qai-text-shadow-small)'
											>index: { item.index }</text>
											<text
												x={ item.left }
												y={ item.top }
												dx="8"
												dy="30"
												textAnchor="start"
												dominantBaseline="hanging"
												alignmentBaseline="hanging"
												className="d-text"
												filter='url(#qai-text-shadow-small)'
											>left: { item.left }</text>
											<text
												x={ item.left }
												y={ item.top }
												dx="8"
												dy="50"
												textAnchor="start"
												dominantBaseline="hanging"
												alignmentBaseline="hanging"
												className="d-text"
												filter='url(#qai-text-shadow-small)'
											>top: { item.top }</text>
											<text
												x={ item.left }
												y={ item.top }
												dx="8"
												dy="70"
												textAnchor="start"
												dominantBaseline="hanging"
												alignmentBaseline="hanging"
												className="d-text"
												filter='url(#qai-text-shadow-small)'
											>width: { item.width }</text>
											<text
												x={ item.left }
												y={ item.top }
												dx="8"
												dy="90"
												textAnchor="start"
												dominantBaseline="hanging"
												alignmentBaseline="hanging"
												className="d-text"
												filter='url(#qai-text-shadow-small)'
											>height: { item.height }</text>
										</>
									}
								</g>
							)
						}


						{ /* NO CONTROLS TO MASK */}
						{
							this.props.data.live.controls !== undefined &&
							this.props.data.live.controls.length === 0 &&
							<text
								x="50%" y="50%"
								fontSize="64px"
								fontWeight="900"
								strokeWidth="0ex"
								letterSpacing="0px"
								textAnchor="middle"
								alignmentBaseline="middle"
								className="no-protocol"
								filter='url(#qai-text-shadow)'
							>PROTOCOL NOT AVAILABLE</text>
						}
					</g>

					{ /* DEBUG GRID */}
					{
						this.state.debug === true &&
						<g id="debug-group-1"
							vectorEffect="non-scaling-stroke"
							shapeRendering="geometricPrecision"
						>
							<line id="x-line" x1="0" x2="1920" y1="540" y2="540" />
							<text
								x="960"
								y="24"
								dx="4"
								dy="0"
								fontSize="20px"
								letterSpacing="0px"
								textAnchor="start"
								alignmentBaseline="top"
								filter='url(#qai-text-shadow)'
							>960</text>
							<line id="y-line" x1="960" x2="960" y1="0" y2="1080" />
							<text
								x="1920"
								y="540"
								dx="-4"
								dy="24"
								fontSize="20px"
								letterSpacing="0px"
								textAnchor="end"
								alignmentBaseline="top"
								filter='url(#qai-text-shadow)'
							>540</text>
							<circle id="center-circle" cx="960" cy="540" r="10" className="debug-green" />

							{ /* control map values */ }
							<text
								x="16" y="32"
								fontSize="28px"
								letterSpacing="0px"
								textAnchor="start"
								alignmentBaseline="top"
								filter='url(#shadow3)'
							>Control Values</text>
							{
								this.props.data.live.controls !== undefined &&
								this.props.data.live.controls.length > 0 &&
								this.props.data.live.controls.map( ( item, idx ) =>
									<g key={ idx }>
										<text
											x={ 10 }
											y={ 40 }
											dx="8"
											dy={ idx * 20 }
											textAnchor="start"
											dominantBaseline="hanging"
											alignmentBaseline="hanging"
											className="dbg-ctrl-info"
											filter='url(#qai-text-shadow-small)'
										>
											index: { item.index },
											type: { item.type.name },
											notifications: { item.notifications.toString() }, 
											age: { item.age },
											threshold: { item.threshold },
											score: { item.score },
											confidence: { item.confidence },
											controlsLights: { item.controlsLights.toString() },
											controlsBlue: { item.controlsBlue.toString() },
											startActivated: { item.startActivated.toString() },
											isReset: { item.isReset.toString() },
											isActivated: { item.isActivated.toString() },
											isTriggered: { item.isTriggered.toString() }
										</text>
									</g>
								)
							}

							<text
								x="0.5%" y="99.5%"
								fontSize="20px"
								letterSpacing="0px"
								textAnchor="start"
								alignmentBaseline="top"
								filter='url(#shadow3)'
							>&copy; 2021 QUIVR.AI</text>
						</g>
					}

					{ /* FULLSCREEN BUTTON */ }
					{
						this.props.enableFullScreen === true &&
						<FullScreenButton element={ this._device_rules_control_id } />
					}
				</svg>
			</div>
		);
	};
};