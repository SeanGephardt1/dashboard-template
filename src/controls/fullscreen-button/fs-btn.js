import React from 'react';
import './fs-btn.css';

export default class FullScreenButton extends React.Component
{
	constructor( props )
	{
		super( props );
		this.state = {
			fullScreenEnabled: false
		};
		return;
	};
	OnClick_DisplayFullScreen ( ev )
	{	//	console.debug("OnClick_DisplayFullScreen()");
		const element = document.querySelector( "#" + this.props.element );

		if ( document.fullscreen === false )
		{
			if ( element !== undefined )
			{
				element.requestFullscreen();
			}
		}
		else if ( document.fullscreen === true )
		{
			document.exitFullscreen();
		}

		//   console.debug( "OnClick_DisplayFullScreen()", document.fullscreen, this.state.fullScreenEnabled );
		this.setState( {
			fullScreenEnabled: !document.fullscreen
		} );
		return;
	};
	componentDidMount ()
	{	//  console.debug( "FullScreenButton.componentDidMount()", document.fullscreen, this._instance_id );
		//const _self = this;
		//document.addEventListener( "fullscreenchange", function ()
		//{   //  console.log( "componentDidMount.fullscreenchange.", document.fullscreen, _self._instance_id );
		//	_self.setState( { fullScreenEnabled: document.fullscreen } );
		//	return;
		//}, false );
		return;
	}
	componentWillUnmount ()
	{	//  console.debug();
		return;
	};
	render()
	{	//	console.debug( "FullScreenButton.Render()", this.state.fullScreenEnabled, this.props );
		//	<polygon points="42.1,4 60,4 60,22.1 54,15.6 15.9,53.9 22,59.9 4,59.9 4,42.1 11.8,49.6 49.5,11.3 " />
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				tabIndex="0"
				x="1862px"
				y="10px"
				preserveAspectRatio="xMinYMin"
				vectorEffect="non-scaling-stroke"
				shapeRendering="geometricPrecision"
				imageRendering="optimizeQuality"
				className="qai-svg-fs-btn"
				onClick={ this.OnClick_DisplayFullScreen.bind( this ) }>
				<rect
					height="48px"
					width="48px"
					preserveAspectRatio="xMidYMid"
					vectorEffect="non-scaling-stroke"
					imageRendering="optimizeQuality"
				/>
				{
					this.state.fullScreenEnabled === false &&
					<>
						<title>click here to view this image in full screen mode</title>
						<polyline points="8,20 8,8 20,8"
							imageRendering="optimizeQuality"
						/>
						<polyline points="8,28 8,40 20,40" imageRendering="optimizeQuality" />
						<polyline points="28,8 40,8 40,20" imageRendering="optimizeQuality" />
						<polyline points="28,40 40,40 40,28" imageRendering="optimizeQuality" />
					</>
				}
				{
					this.state.fullScreenEnabled === true &&
					<>
						<title>Click here to close out of full screen mode</title>
						<line x1="12px" y1="12px" x2="36px" y2="36px" imageRendering="optimizeQuality"/>
						<line x1="12px" y1="36px" x2="36px" y2="12px" imageRendering="optimizeQuality"/>
					</>
				}
			</svg>
		);
	};
};