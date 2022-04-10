import React from 'react';
import { DashboardContext } from '../../util/app-context.js';
//	OLD CLOUD DEPLOYMENT CALL -- import { ApiValues } from '../../util/web-api.js';
import SvgData from '../../assets/svg-assets.js';
import './auth.css';

export default class AuthenticationPage extends React.Component
{
	static contextType = DashboardContext;
	static defaultProps = {
		Title: "QUIVR.AI Sign in",
		LinkTitle: "Sign in",
		Href: "/sign-in",
		Icon: ""
	};
	constructor ( props )
	{
		super( props );
		document.title = AuthenticationPage.defaultProps.Title;

		// NEW AI SERVER CONSTS
		this._sys_admin_name = "system".toLocaleLowerCase();
		this._sys_admin_pwrd = "system".toLocaleLowerCase();

		this.state = {
			isAuthenticated: false,
			authFailed: false,
			authFailedMessage: "",
			uName: "",
			pWord: "",
		};
		return;
	};
	onChange_UserName ( ev )
	{
		this.setState( { uName: ev.target.value } );
		return;
	};
	onChange_PWD ( ev )
	{
		this.setState( { pWord: ev.target.value } );
		return;
	};
	// NEEDED - state stuff for user validation & waiting/loading
	async onSubmit_Authenticate( ev )
	{	//	console.debug( "onSubmit_Authenticate" );
		ev.preventDefault();

		// NEW FOR AI SERVER STYLE DEPLOYMENTS
		//console.debug( this._sys_admin_name, this.state.uName );
		//console.debug( this._sys_admin_pwrd, this.state.pWord );

		if (
			this.state.uName === this._sys_admin_name &&
			this.state.pWord === this._sys_admin_pwrd
		)
		{
			this.context.User.IsAuthenticated = true;
			this.context.User.Token = undefined;
			this.setState( {
				isAuthenticated: true,
				authFailed: false,
				authFailedMessage: "Authenticated",
				//uName: "",
				//pWord: "",
			} );
			this.context.SignIn();
		}
		else
		{
			this.context.User.IsAuthenticated = false;
			this.context.User.Token = undefined;
			this.setState( {
				isAuthenticated: false,
				authFailed: true,
				authFailedMessage: "The Account Name or Password were incorrect. Please try again.",
				uName: "",
				pWord: "",
			} );
		}

		//	OLD FOR CLOUD BASED DEPLOYMENTS
		//const _url = ApiValues.API_BASE_URL + ApiValues.API_AUTH_CALL_PLAIN;
		//const _body = JSON.stringify({
		//	"username": this.state.uName,
		//	"password": this.state.pWord
		//});
		//const _options = {
		//	method: 'POST',
		//	headers: ApiValues.API_ADMIN_USER_HEADERS.headers,
		//	body: _body
		//};

		//await fetch( _url, _options )
		//	.then( response => response.json() )
		//	.then( data =>
		//	{	//	console.debug("auth fetch",  data.success, data );
		//		if ( data.success !== true )
		//		{	//	console.error( data.status, data );
		//			this.context.User.IsAuthenticated = false;
		//			this.context.User.Token = undefined;
		//			this.setState( {
		//				isAuthenticated: false,
		//				authFailed: true,
		//				authFailedMessage: "The Account Name or Password were incorrect. Please try again.",
		//				uName: "",
		//				pWord: "",
		//			} );
		//		}
		//		else if ( data.success === true )
		//		{	//	console.debug( "onSubmit_Authenticate.fetch()", data );
		//			this.context.User.IsAuthenticated = true;
		//			this.context.User.Token = data.result;
		//			this.context.SignIn();
		//		}
		//		return;
		//	} )
		//	.catch( (error) =>
		//	{
		//		console.error( "There has been a problem with your fetch operation.", error );
		//		this.context.User.IsAuthenticated = false;
		//		this.context.User.Token = undefined;
		//		this.setState( {
		//			isAuthenticated: false,
		//			authFailed: true,
		//			uName: "",
		//			pWord: "",
		//			authFailedMessage: "There was a problem connecting to our servers."
		//		} );
		//	} );

		return;
	};
	render ()
	{
		return (
			<div className="signin-background">
				<form onSubmit={ this.onSubmit_Authenticate.bind( this ) }>
					<div className="quivr-brand-logo">{ SvgData.Objects.QuivrTextLogo }</div>
					<div className="sign-in-header">Sign in</div>
					<div className="sign-in-text">User name</div>
					<div className="sign-in-element">
						<input id="user-name-1"
							className="sign-in-input"
							type="text"
							autoComplete="username"
							placeholder="Enter your user name"
							aria-placeholder="Enter your user name"
							tabIndex="0"
							value={ this.state.uName }
							onChange={ this.onChange_UserName.bind(this) } />
					</div>
					<div className="sign-in-text">Password</div>
					<div className="sign-in-element">
						<input id="user-pwd-1"
							className="sign-in-input"
							type="password"
							autoComplete="password"
							placeholder="Enter your password"
							aria-placeholder="Enter your password"
							tabIndex="0"
							value={ this.state.pWord }
							onChange={ this.onChange_PWD.bind(this) } />
					</div>

					{
						this.state.authFailed === true && <div className="app-auth-failed">{ this.state.authFailedMessage}</div>
					}

					<div className="sign-in-cta">
						<button
							tabIndex="0"
							className="qai-btn-cta"
							title="Click here to sign in"
							onClick={ this.onSubmit_Authenticate.bind(this) }
						>Sign in</button>
					</div>

					<div className="sign-in-copy">
						<a href="https://quivr.ai/" title="QUIVR.AI" tabIndex="0">&reg;&trade;&copy; 2021 QUIVR.AI</a>
					</div>

				</form>
			</div>
		);
	};
};