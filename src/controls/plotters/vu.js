import React from 'react';
import './vu.css';

export default class VUControl extends React.Component
{
	constructor( props )
	{
		super( props );
		this.state = { debug: false };
		return;
	};
	EvalScoreValue( scoreValue, thresholdValue )
	{	//	console.debug( 'EvalScoreValue', scoreValue, thresholdValue );
		const _v1 = ( 100 - ( scoreValue * 100 ) );
		const _v2 = ( 100 - ( thresholdValue * 100 ) );
		const _sv = 'inset(' + _v1 + '% 0% 0% 0%)';
		const _tv = 'calc(' + _v2 + '%)';
		return [ _sv, _tv ];
	};
	render ()
	{	//	console.debug( "ScoreVUControl.render()", this.props );
		return (
			<div className="score-vu-ctrl">
				<div className="svuc-val-panel">
					<div className="svuc-numbers">
						<div>1.0</div>
						<div>0.8</div>
						<div>0.6</div>
						<div>0.4</div>
						<div>0.2</div>
						<div>0.0</div>
					</div>
					<div className="svuc-vu-panel">
						<div className="svuc-vu-panel-meter">
							<div
								className="svuc-vu-panel-value"
								style={ { 'clipPath': this.EvalScoreValue( this.props.score, this.props.threshold )[0] } }
							></div>
						</div>
						<div
							className="svuc-vu-panel-meter-threshold"
							style={ { 'height': this.EvalScoreValue( this.props.score, this.props.threshold )[ 1 ]} }
						></div>
					</div>
				</div>
			</div> 
		);
	};
};