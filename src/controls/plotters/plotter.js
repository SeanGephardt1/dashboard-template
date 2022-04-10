import React from 'react';
import VUControl from './vu.js';
import LineGraphControl from './line-graph.js';
import './plotter.css';

export default class PlotterControl extends React.Component
{
	constructor( props )
	{
		super( props );
		this.state = { debug: true };
		return;
	};
	render ()
	{	//	console.debug( "PlotterControl.Render()", this.props.data );
		return (
			<div
				id={ this.props.data.id }
				className="plotter-root-panel">
				{
					this.props.data.live.controls.length === 0 &&
					<div className="plotter-no-controls-found">Controls are not currently available.</div>
				}
				{
					//this.props.data !== undefined &&
					//this.props.data.live !== undefined &&
					//this.props.data.live.controls !== undefined &&
					this.props.data.live.controls.length > 0 &&
					this.props.data.live.controls.map( ( item, idx ) => (
						<div
							key={ idx }
							id={ 'pcm-card-' + idx }
							className="pcm-card">

							{ /* HEADER */ }
							<div className="pcm-header">
								<span>{ item.type.name }</span>
								<span>{ item.name }</span>
								<span>age : { item.age }</span>
								<span>confidence : { ( item.confidence ).toPrecision( 3 ) }</span>
								<span>
									<span className="legend-bulb lb-threshold"></span>threshold : { ( item.threshold ).toPrecision( 3 ) }</span>
								<span>
									<span className="legend-bulb lb-score"></span>score : { ( item.score ).toPrecision( 3 ) }
								</span>
							</div>

							{ /* BODY */ }
							<div className="pcm-body-panel">

								<div className="pcm-vert-panel">
									<VUControl score={ item.score } threshold={ item.threshold } />
								</div>

								<div className="pcm-hor-panel">
									<LineGraphControl scoreCache={ item.scoreCache } threshold={ item.threshold } />
								</div>

							</div>

						</div>
					) )
				}
			</div>
		);
	};
};