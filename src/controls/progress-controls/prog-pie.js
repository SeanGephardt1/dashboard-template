import React from 'react';
import './prog-pie.css';

export default class ProgressPieControl extends React.Component
{
	static defaultProps = {
		Colors:
		{
			Red: "pp-red",
			Orange: "pp-orange",
			Yellow: "pp-yellow",
			Green: "pp-green",
			Blue: "pp-blue",
			Purple: "pp-purple"
		},
		Sizes:
		{
			ExtraLarge: "pp-size-extra-large",
			Large: "pp-size-large",
			Medium: "pp-size-medium",
			Small: "pp-size-small"
		},
		Styles:
		{
			Circle: "pp-circle",
			Bar: "pp-bar"
		}
	};
	constructor( props )
	{	
		super( props );
		this.Color = ( this.props.color || ProgressPieControl.defaultProps.Colors.Red );
		this.Size = ( this.props.size || ProgressPieControl.defaultProps.Sizes.ExtraLarge );
		this.Value = ( this.props.value || 0 );

		this._percentage = "%";

		//	100 steps, total hack
		//	10 points are needed to loop around the 50/50 center point
		//	25 steps per quartered quandant of a square
		//	step 0 center, hence invisible
		//	stepp 100, filled square
		//	 needs cleanup
		this._data = [
			// FIRST QUAD
			// FILL BOTTON LEFT - MOVE ONLY THE FIRST POINT - DATA[7]
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%,   50% 50%, 50% 50%,   50% 50%,   50% 50%, 50% 50%",	//0
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 48% 100%, 50% 50%, 50% 50%",	//1
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 45% 100%, 50% 50%, 50% 50%",	//2
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 40% 100%, 50% 50%, 50% 50%",	//3
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 35% 100%, 50% 50%, 50% 50%",	//4
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 30% 100%, 50% 50%, 50% 50%",	//5
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 25% 100%, 50% 50%, 50% 50%",	//6
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 20% 100%, 50% 50%, 50% 50%",	//7
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 15% 100%, 50% 50%, 50% 50%",	//8
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 10% 100%, 50% 50%, 50% 50%",	//9
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 5% 100%, 50% 50%, 50% 50%",	   //10
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 50% 50%, 50% 50%",   //11
			// FILL MID LEFT - MOVE THE SECOND POINT - DATA[8]
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 100%, 50% 50%",		//12
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 96%, 50% 50%",		//13
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 92%, 50% 50%",		//14
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 88%, 50% 50%",		//15
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 84%, 50% 50%",		//16
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 80%, 50% 50%",		//17
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 76%, 50% 50%",		//18
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 72%, 50% 50%",		//19
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 68%, 50% 50%",		//20
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 64%, 50% 50%",		//21
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 60%, 50% 50%",		//22
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 56%, 50% 50%",		//23
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 53%, 50% 50%",		//24
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 50%, 50% 50%",		//25
			// FILL TOP LEFT 
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 46%, 50% 50%",		//26
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 42%, 50% 50%",		//27
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 38%, 50% 50%",		//28
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 36%, 50% 50%",		//29
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 32%, 50% 50%",		//30
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 28%, 50% 50%",		//31
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 24%, 50% 50%",		//32
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 20%, 50% 50%",		//33
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 16%, 50% 50%",		//34
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 12%, 50% 50%",		//35
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 8%, 50% 50%",			//36
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 4%, 0% 0%",				//37
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 4% 0%",				//38
			// FILL TOP MID LEFT - MOVE THIRD POINT INDEX[9]
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 10% 0%",			//39
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 14% 0%",			//40
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 18% 0%",			//41
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 22% 0%",			//42
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 26% 0%",			//43
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 30% 0%",			//44
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 34% 0%",			//45
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 38% 0%",			//46
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 42% 0%",			//47
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 46% 0%",			//48
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 49% 0%",			//49
			// FILL TOP MID RIGHT
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 50% 0%",			//50
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 58% 0%",			//51
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 62% 0%",			//52
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 66% 0%",			//53
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 70% 0%",			//54
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 74% 0%",			//55
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 78% 0%",			//56
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 82% 0%",			//57
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 86% 0%",			//58
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 90% 0%",			//59
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 94% 0%",			//60
			"50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 98% 0%",			//61
			"100% 0%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//62
			// FILL TOP RIGHT - MOVE NEXT POINT - INDEX[0]
			"100% 4%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//63
			"100% 8%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//64
			"100% 12%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//65
			"100%16%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//66
			"100% 20%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//67
			"100% 24%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//68
			"100% 28%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//69
			"100% 32%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//70
			"100% 36%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//71
			"100% 40%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//72
			"100% 44%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//73
			"100% 48%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//74
			"100% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//75
			// FILL BOTTOM MID LEFT
			"100% 54%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//76
			"100% 58%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//77
			"100% 62%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//78
			"100% 66%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//79
			"100% 70%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//80
			"100% 74%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//81
			"100% 78%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//82
			"100% 82%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//83
			"100% 86%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//84
			"100% 90%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//85
			"100% 94%, 50% 50%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//86
			"100% 98%, 100% 100%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//87
			// FINISH LAST 12 STEPS, MOVES MULTIPLE POINTS - INDEX[1]
			"100% 100%, 94% 100%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//88
			"100% 100%, 90% 100%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//89
			"100% 100%, 86% 100%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//90
			"100% 100%, 82% 100%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//91
			"100% 100%, 78% 100%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//92
			"100% 100%, 74% 100%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//93
			"100% 100%, 70% 100%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//94
			"100% 100%, 66% 100%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//95
			"100% 100%, 62% 100%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//96
			"100% 100%, 58% 100%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//97
			"100% 100%, 54% 100%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//98
			"100% 100%, 52% 100%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//99
			"100% 100%, 50% 100%, 50% 50%, 50% 50%, 50% 100%, 50% 50%, 50% 100%, 0% 100%, 0% 0%, 100% 0%",			//100-fail safe
		];

		this.CurrentPolygonValues = [];

		this.state = {};
		return;
	};
	ComputeClipPath( val )
	{	//	console.debug( "ComputeClipPath", val );
		if ( val > this._data.length )
		{
			this.CurrentPolygonValues = this._data[this._data.length-1];
		}
		else
		{
			this.CurrentPolygonValues = this._data[val];
		}
		return; 
	}
	render()
	{	//	console.debug( "ProgressPieControl.render()", this.props.size, this.props.color );
		let _value_string;
		let _outer_class_name;
		let _inner_class_name;
		let _value_class_name;
		let _clip_path;
		let _bg_scale;

		if (this.props.style === ProgressPieControl.defaultProps.Styles.Bar)
		{
			_value_string = this.props.value + this._percentage;
			_outer_class_name = "prog-pie-outer-bar " + this.props.size;
			_inner_class_name = "prog-pie-inner-bar " + this.props.color;
			//_value_class_name = "prog-pie-bar-value " + this.props.color + " "  + this.props.size;

			_bg_scale = {
				"backgroundSize": this.props.value + "%",
			};
		}
		else if (this.props.style === ProgressPieControl.defaultProps.Styles.Circle)
		{
			_value_string = this.props.value + this._percentage;
			_outer_class_name = "prog-pie-outer-circle " + this.props.size;
			_inner_class_name = "prog-pie-inner-circle " + this.props.size + " " +  this.props.color;
			_value_class_name = "prog-pie-circle-value " + this.props.size + " " + this.props.color;

			this.ComputeClipPath( this.props.value );
			//	console.debug(this.props.value, "this.CurrentPolygonValues", this.CurrentPolygonValues );
			_clip_path = { "clipPath": "polygon(" + this.CurrentPolygonValues + ")" };
		}

		return (
			<>
				{
					this.props.style === ProgressPieControl.defaultProps.Styles.Bar &&
					<div className="prog-pie-ctrl">
						<div className={_outer_class_name}>
							<div className={_inner_class_name} style={_bg_scale}></div>
						</div>
					</div>
				}
				{
					this.props.style === ProgressPieControl.defaultProps.Styles.Circle &&
					<div className="prog-pie-ctrl">
						<div className={_outer_class_name}></div>
						<div className={_inner_class_name} style={_clip_path}></div>
						<div className={_value_class_name}>{_value_string}</div>
					</div>
				}
			</>
			
			);
	};
};
