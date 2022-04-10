import React from 'react';
import './prog-bar.css';

export default class ProgressBarControl extends React.Component
{
	static defaultProps = {
		Colors:
		{
			Red: "pb-red",
			Orange: "pb-orange",
			Yellow: "pb-yellow",
			Green: "pb-green",
			Blue: "pb-blue",
			Purple: "pb-purple"
		}
	};
	constructor( props )
	{	
		super( props );
		this.Color = ( this.props.color || ProgressBarControl.defaultProps.Colors.Red );
		return;
	};
	render()
	{
		let progBar_Percentage, progBar_Speed;

		let progBar_Ani = "inner-bar-ani " + this.Color;
		let progBar_NonAni = "inner-bar-non-ani " + this.Color;

		if ( this.props.percentage !== undefined )
		{
			progBar_Percentage = this.props.percentage + "%";
		}

		if ( this.props.speed === undefined )
		{
			progBar_Speed = "1000ms, 250ms";
		}
		else
		{
			progBar_Speed = this.props.speed + "ms,250ms";
		}
		//	console.debug( this.props);

		return (
			<div className="prog-bar">
				{
					this.props.percentage > 0 &&
					<div className={progBar_NonAni} style={{'width': progBar_Percentage }}></div>		
				}
				{
					this.props.percentage === undefined &&
					<div className={progBar_Ani} style={{'animationDuration': progBar_Speed }}></div>
				}
			</div>
		);
	};
};
