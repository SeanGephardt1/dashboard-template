import React from 'react';
import './line-graph.css';

export default class LineGraphControl extends React.Component
{
	constructor( props )
	{
		super( props );
		this._line_data = [];
		this.state = { debug: false };
		return;
	};
	FormatThreshold()
	{	//	console.debug( 'FormatThreshold', this.props.threshold );
		const _rv = Math.round( 100 - ( this.props.threshold * 100 ) ).toPrecision(5) + '%';
		//	console.debug( '_rv', this.props.threshold, _rv );
		return _rv;
	};
	FormatData()
	{	//	REFACTOR FOR 1000 points instead of 100 points???
		//	console.debug( 'this.props.scoreCache.length', this.props.scoreCache.length );
		this._line_data = [];

		for ( let i = 0; i < this.props.scoreCache.length; i++ )
		{	//	console.debug( i, this.props.data[ i ], this.props.data[ i - 1 ], this.props.data[ i + 1 ]);
			let _prev = 0.0;
			let _current = 0.0;

			if ( this.props.scoreCache[ i ] === "NaN" )
			{
				_current = 0.0;
			}
			else
			{
				_current = this.props.scoreCache[ i ];
			}

			if ( this.props.scoreCache[ i - 1 ] === undefined )
			{
				_prev = _current;
			}
			else
			{
				_prev = this.props.scoreCache[ i - 1 ];
			}
			//	console.debug( i, '_prev::', _prev,  '_current::', _current );

			let _point = {
				val: this.props.scoreCache[ i ],
				x1: i * 1 + '%',
				x2: ( i + 1 ) * 1 + '%',
				y1: ( 100 - ( _prev * 100 ) ) + '%',
				y2: ( 100 - ( _current * 100 ) ) + '%',
			};

			//	console.debug( i, '_prev:', _prev, '_current:', _current, '_point:', _point );
			this._line_data.push( _point );
		}
		return;
	};
	render ()
	{	//	console.debug( "HorizontalThresholdControl.Render()", this.props.threshold );
		this.FormatData();

		return (
			<div className="line-graph-panel">
				<svg
					className="lg-svg"
					shapeRendering="geometricPrecision"
					vectorEffect="non-scaling-size">
					<rect
						id="background-rect"
						className="lg-svg-bk-rect"
						x="0"
						y="0"
						width="100%"
						height="100%"
						shapeRendering="geometricPrecision" />
					<text
						id="mid-value-text"
						className="lg-svg-bk-text"
						x="0%"
						y="50%"
						dx="4"
						dy="4"
						textAnchor="start"
						alignmentBaseline="top"
						shapeRendering="geometricPrecision">0.5</text>
					<line
						id="mid-value-line"
						className="lg-svg-bk-line"
						x1='0%'
						y1='50%'
						x2='100%'
						y2='50%'
						shapeRendering="geometricPrecision" />
					<line
						id="data-threshold-value-line"
						className="lg-threshold-value-line"
						x1='0%'
						y1={ this.FormatThreshold() }
						x2='100%'
						y2={ this.FormatThreshold() }
						shapeRendering="geometricPrecision" />
					{
						this.state.debug === true &&
						<>
							<line
								x1="0"
								y1="50%"
								x2="100%"
								y2="50%"
								className="debug-line"
								shapeRendering="geometricPrecision" />
							<line
								x1="50%"
								y1="0"
								x2="50%"
								y2="100%"
								className="debug-line"
								shapeRendering="geometricPrecision" />
							<circle
								cx="50%"
								cy="50%"
								r="5"
								className="debug-circle"
								shapeRendering="geometricPrecision" />
						</>
					}
					{
						this._line_data !== undefined &&
						this._line_data.length > 0 &&
						this._line_data.map( ( item, idx ) => (
							<line
								key={ idx }
								className="lg-data-line"
								shapeRendering="geometricPrecision"
								x1={ item.x1 }
								y1={ item.y1 }
								x2={ item.x2 }
								y2={ item.y2 } />
						) )
					}
				</svg>
			</div>
		);
	};
};