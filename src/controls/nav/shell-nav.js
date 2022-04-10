import React from 'react';
import { DashboardContext } from '../../util/app-context.js';
//	import Svgs from '../../assets/svg-assets.js';
import Images from '../../assets/images.js'
import UserAvatarControl from '../user-ctrl/user-ctrl.js';
import './nav.css';

//	import { NavLink } from 'react-router-dom';
//	import { HomePage, LeftNav } from '../../pages/routes.js';

export default class ShellNavigation extends React.Component
{
	static contextType = DashboardContext;
	constructor ( props )
	{
		super( props );
		this.state = {
			accountSelected: 1,
			searchSelected: "all"
		}
		return;
	};
	OnChange_AccountSelection( ev )
	{
		console.debug( "OnChange_AccountSelection", ev.target.value);
		return;
	};
	OnChange_SearchText( ev )
	{
		console.debug( "OnChange_SearchText", ev.target.value );
		return;
	};
	OnChange_SeachSelection( ev )
	{
		console.debug( "OnChange_SeachSelection", ev.target.value );
		return;
	};
	OnSubmit_DoSearch( ev )
	{
		console.debug( "OnSubmit_DoSearch", ev.target.value );
		ev.preventDefault();
		return false;
	}
	render()
	{	//	console.debug( "ShellNavigation.render()" );
		const _user_data = {
			name: "Sam Wilson",
			icon: Images.Avatar.CaptAmerica,
			language: "English"
		};

		return (
			<form
				className="shell-form"
				onSubmit={ this.OnSubmit_DoSearch.bind( this ) } >
				<div>
					<select
						className="shell-account-ctrl"
						defaultValue={ this.state.accountSelected }
						onChange={ this.OnChange_AccountSelection.bind( this ) }>
						<option value="1">Account: QUIVR STAGING 001</option>
						<option value="2">Account: QUIVR TESTING 002</option>
						<option value="3">Account: QUIVR PRODUCTION 003</option>
					</select>
				</div>
				<div>
					<input
						type="text"
						placeholder="Search"
						className="shell-account-search"
						onChange={ this.OnChange_SearchText.bind( this ) }
						/>
					<select
						className="shell-account-ctrl"
						defaultValue={ this.state.searchSelected }
						onChange={ this.OnChange_SeachSelection.bind( this ) }>
						<option value="all">All</option>
						<option value="devices">Devices</option>
						<option value="networks">Networks</option>
						<option value="connectors">Connectors</option>
					</select>
				</div>
				<div>
					<UserAvatarControl data={ _user_data }></UserAvatarControl>
				</div>
			</form>
		);
	};
};
