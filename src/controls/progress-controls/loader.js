import React from 'react';
import './loader.css';
import SvgData from '../../assets/svg-assets.js';

export default class LoaderControl extends React.Component
{
	constructor( props )
	{	
		super( props );
		return;
	};
	render()
	{	
		return (
			<div className="qai-loading-panel">
				<div className="qai-loading-logo">{ SvgData.Objects.LoadingIcon }</div>
				<div className="qai-loading-text">{ this.props.loaderText }</div>
			</div>
		);
	};
};
