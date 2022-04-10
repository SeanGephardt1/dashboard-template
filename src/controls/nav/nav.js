import React from 'react';
import { DashboardContext } from '../../util/app-context.js';
import { NavLink } from 'react-router-dom';
import { LeftNav } from '../../pages/routes.js';
//	import QaiWebGLControl from '../qai-webgl/qai-webgl.js';
import Svgs from '../../assets/svg-assets.js';
import './nav.css';

export default class SiteNavigation extends React.Component
{
	static contextType = DashboardContext;
	constructor ( props )
	{
		super( props );

		this._local_storage_key = "qai-nav";
		this._local_storage_state = undefined;

		//	HACK BECAUSE OF MS EDGE CORS ISSUE USING JSON.PARSE
		//	console.debug( "window.localStorage[ this._local_storage_key ]", typeof window.localStorage[ this._local_storage_key ] );
		if ( window.localStorage[ this._local_storage_key ] === "true" )
		{
			this._local_storage_state = true;
		}
		else if ( window.localStorage[ this._local_storage_key ] === "false" )
		{
			this._local_storage_state = false;
		}
		else if ( window.localStorage[ this._local_storage_key ] === undefined )
		{
			this._local_storage_state = true;
		}	
		this.state = { isOpen: false };

		return;
	};
	OnClick_ToggleNavBar( ev )
	{	//	console.debug( "OnClick_ToggleNavBar" );
		window.localStorage.setItem( this._local_storage_key, !this.state.isOpen );
		this.setState( { isOpen: !this.state.isOpen });
		return;
	};
	render()
	{	//	console.debug( "SiteNavigation.render()", this.state.isOpen );
		return (
			<nav className={ this.state.isOpen ? 'qai-nav-bar-open' :'qai-nav-bar-closed' }>

				<div className="nav-section">

					<div
						tabIndex="0"
						className='q-brand'
						title="dbtemp.AI Dashboard"
						onClick={ this.OnClick_ToggleNavBar.bind( this ) }
						onKeyPress={ this.OnClick_ToggleNavBar.bind( this ) }
					>
						{
							this.state.isOpen === true &&
							<span className="q-brand-text">{ Svgs.Icons.dbtempTextLogo }</span>
						}
						{
							this.state.isOpen !== true &&
							<span className="q-brand-text-closed">{ Svgs.Icons.dbtempQ }</span>
						}
					</div>

				</div>

				<div className="nav-section">
					{
						LeftNav[0].map( ( item, idx ) => (
							<NavLink 
								className='left-nav'
								activeClassName='nav-selected'
								key={ idx }
								to={ item.defaultProps.Href }
								title={ item.defaultProps.LinkTitle }
							>
							<>
								<span className="left-nav-icon">{ item.defaultProps.Icon}</span>
								{
									this.state.isOpen === true &&
									<span className="left-nav-title">{ item.defaultProps.LinkTitle } </span>
								}
								</>								
							</NavLink>
						) )
					}
				</div>

				<div className="nav-section">
					{
						LeftNav[ 1 ].map( ( item, idx ) => (
							<NavLink
								tabIndex="0"
								className='left-nav'
								activeClassName='nav-selected'
								key={ idx }
								to={ item.defaultProps.Href }
								title={ item.defaultProps.LinkTitle }
							>
								<>
									<span className="left-nav-icon">{ item.defaultProps.Icon }</span>
									{
										this.state.isOpen === true &&
										<span className="left-nav-title">{ item.defaultProps.LinkTitle } </span>
									}
								</>
							</NavLink>
						) )
					}

					{/*<QaiWebGLControl />*/}

					<div className="nav-build-number">BUILD: { process.env.NODE_ENV } { process.env.REACT_APP_BUILD }</div>

					{ /* SIGN OUT */ }
					{/*<a*/}
					{/*	tabIndex="0"*/}
					{/*	className="left-nav"*/}
					{/*	href="/"*/}
					{/*	target="_new"*/}
					{/*	title="dbtemp.AI"*/}
					{/*	onClick={ this.context.SignOut.bind( this, this.context ) }>*/}
					{/*	<>*/}
					{/*		<span className="left-nav-icon">{ Svgs.Icons.SignOut }</span>*/}
					{/*		{*/}
					{/*			this.state.isOpen === true &&*/}
					{/*			<span className="left-nav-title">Sign out</span>*/}
					{/*		}*/}
					{/*	</>*/}
					{/*</a>*/}

				</div>

			</nav>
		);
	};
};
