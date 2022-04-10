import React from 'react';
import { DashboardContext } from '../../util/app-context.js';
import { NavLink } from 'react-router-dom';
import './heartbeat.css';

export default class HeartbeatControl extends React.Component
{
	static contextType = DashboardContext;
	constructor( props )
	{
		super( props );
		this._time_data = [];
		//	this.state = {};
		return;
	};
	CreateDayChartData()
	{   //  console.debug( "CreateDayChartData()", this.props.timespan );
		let _new_class = "day-chart-square";
		let _isToday = false;
		let _daily_hours = 0;
		let _errorStatus = Math.round( Math.random() * 24 );

		this._time_data = [];

		if ( this.props.timespan.toLocaleDateString() === new Date().toLocaleDateString() )
		{
			_isToday = true;
			_daily_hours = this.props.timespan.getHours();
		}
		else if ( this.props.timespan.toLocaleDateString() !== new Date().toLocaleDateString() )
		{
			_isToday = false;
			_daily_hours = 24;
		}

		for ( let i = 0; i < 24; i++ )
		{
			let _hour = new Date();
			_hour.setHours( i );
			_hour.setMinutes( 0 );
			_hour.setSeconds( 0 );
			_hour.setMilliseconds( 0 );

			if ( _isToday === false )
			{
				if ( i === _errorStatus )
				{
					_new_class = "day-chart-square dcs-red";
				}
				else 
				{
					_new_class = "day-chart-square dcs-green";
				}
			}
			else if ( _isToday === true )
			{
				if ( i < _daily_hours )
				{
					if ( i === _errorStatus )
					{
						_new_class = "day-chart-square dcs-red";
					}
					else 
					{
						_new_class = "day-chart-square dcs-green";
					}
				}
				else
				{
					_new_class = "day-chart-square";
				}
			}

			let _new = {
				id: this.props.device.id,
				filter_date: this.props.timespan,
				time: _hour.toLocaleTimeString(),
				class: _new_class
			};
			//	console.debug( "_new", _new );
			this._time_data.push( _new );
		}
		return;
	};
	render()
	{	//	console.debug( "HeartbeatControl.Render()", this.props );
		this.CreateDayChartData();

		return (
				<div className="heartbeat-chart-data">
				{
					this._time_data.length > 0 &&
					this._time_data.map( function ( item, idx )
					{
						let _rv;

						switch ( item.class )
						{
							case "day-chart-square dcs-red": {
								_rv = (
									<NavLink
										tabIndex="0"
										className={ item.class }
										key={ idx }
										to={ '/reports/0381FC7C' }
										title={ 'Report for device id: ' + item.id + ' from ' + item.time + ' on ' + item.filter_date.toLocaleDateString() }
									></NavLink>
									);
								break;
							}
							case "day-chart-square dcs-green": {
								_rv = (
									<NavLink
										tabIndex="0"
										className={ item.class }
										key={ idx }
										to={ '/reports/0381FC7C' }
										title={ 'Report for device id: ' + item.id + ' from ' + item.time + ' on ' + item.filter_date.toLocaleDateString() }
									></NavLink>
								);
								break;
							}
							default: {
								_rv = (
									<span key={ idx } className={ item.class }></span>
								);
								break;
							}
						}
						return _rv;
					})
				}
				</div>
		);
	};
};