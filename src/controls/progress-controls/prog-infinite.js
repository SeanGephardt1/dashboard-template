import React from 'react';
import './prog-infinite.css';

export default class ProgressInfiniteControl extends React.Component
{
	static defaultProps = {
		Colors:
		{
			Red: "pi-red",
			Orange: "pi-orange",
			Yellow: "pi-yellow",
			Green: "pi-green",
			Blue: "pi-blue",
			Purple: "pi-purple"
		},
		Sizes:
		{
			ExtraLarge: "pi-size-extra-large",
			Large: "pi-size-large",
			Medium: "pi-size-medium",
			Small: "pi-size-small"
		},
		Styles:
		{
			Circle: "pi-circle",
			Bar: "pi-bar"
		}
	};
	constructor( props )
	{	
		super( props );
		this.Color = ( this.props.size || ProgressInfiniteControl.defaultProps.Color.Red);
		this.Size = ( this.props.size || ProgressInfiniteControl.defaultProps.Sizes.Medium );
		this.Style = ( this.props.style || ProgressInfiniteControl.defaultProps.Styles.Circle );
		return;
	};
	render()
	{	//	stroke="#EFF6FC" / stroke="#0078D4"
		//	<div className={ _class_name + ' ' + this.props.color }></div>
		//	console.debug( "ProgressInfiniteControl.render()", this.props.style, this.props.color, this.props.size );	

		let _class_name;

		if ( this.props.style === ProgressInfiniteControl.defaultProps.Styles.Circle )
		{
			_class_name = this.props.size + " " + this.props.style;
		}
		else if (this.props.style === ProgressInfiniteControl.defaultProps.Styles.Bar)
		{
			_class_name = this.props.size + " " + this.props.style + " " + this.props.color;
		}

		return (
			<div className="pi-panel">
				{
					this.props.style === ProgressInfiniteControl.defaultProps.Styles.Circle &&
					<div className={ _class_name }>
						<svg viewBox="0 0 512 512" imageRendering="optimizeSpeed">
						<g id="background-filler">
							<rect width="512px" height="512px" fill="rgba(0,0,0,0)" />
						</g>
						<defs>
							<clipPath id="spinner-path-1">
								<rect x="0" y="0" width="256px" height="256px"/>
							</clipPath>
						</defs>
						<g>
							<circle cx="256px" cy="256px" r="200px" stroke="#EFF6FC" fill="none" strokeWidth="20" />
							<circle cx="256px" cy="256px" r="200px" className={ this.props.color } fill="none" strokeWidth="20" clipPath="url(#spinner-path-1)" />
						</g>
					</svg>
					</div>
				}
				{
					this.props.style === ProgressInfiniteControl.defaultProps.Styles.Bar &&
					<div className={_class_name}></div>
				}
			</div>
		);
	};
};
