import React from 'react';
import SvgData from '../../assets/svg-assets.js';
import './404.css';

export default class FourOhFourPage extends React.Component
{
	static defaultProps = {
		Title: "404 Page Not Found",
		LinkTitle: "404",
		Href: "/404",
		Icon: ""
	};
	constructor( props )
	{
		super( props );
		this.Title = ( this.props.Title || this.defaultProps.Title );
		this.LinkTitle = ( this.props.LinkTitle || this.defaultProps.LinkTitle );
		this.Href = ( this.props.Href || this.defaultProps.Href );
		document.title = this.Title;
		return;
	};
    render()
	{
		return (
			<div className="four-page">
				<div className="four-header">{ SvgData.Objects.QuivrTextLogo }</div>
				<div className="four-title">{ this.LinkTitle }</div>
			</div>
        );
    }
};