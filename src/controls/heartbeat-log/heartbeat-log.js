//	THIS CONTROL REQUIRES A WEB SERVICE
//	TO BE RUNNING ON PORT :3333
//	SEE - package.json
//	RUN FROM A COMMAND LINE
//	"npm run start-sse" - "node servers/sse.js"

import React from 'react';
import { DashboardContext } from '../../util/app-context.js';
import './heartbeat-log.css';

export default class HeartbeatLogControl extends React.Component
{
	static contextType = DashboardContext;
	constructor( props )
	{
		super( props );

		this._event_source_uri = "http://localhost:3333/device/" + this.props.device_id;
		this.HeartbeatSource = undefined;
		this._default_message = {
			counter: 0,
			timer_id: 0,
			device_id: 0,
			device_running: true,
			timestamp: Date.now()
		};

		this._messages = [];

		this.state = {
			messages: [],
			currentNotification: this._default_message
		};
		return;
	};
	Connect_DeviceHeartbeat( )
	{	//	console.debug( "Connect_DeviceHeartbeat()", this._event_source_uri );
		const _self = this;

		this.HeartbeatSource = new EventSource( this._event_source_uri );
		this.HeartbeatSource.onopen = function ( e )
		{	//	console.debug( "Connection opened:", this.readyState, e.type );
			return;
		};
		this.HeartbeatSource.onerror = function ( e )
		{	//	console.debug( "ERROR:", this.readyState, e.type );
			if ( e.type === "error" )
			{
				console.debug( "CLOSING", e );
				let _error_message = {
					counter: 0,
					timer_id: 0,
					device_id: 0,
					device_running: false,
					timestamp: Date.now()
				};
				this.close();
				_self._messages.shift();
				_self._messages.push( _error_message );

				_self.setState( { currentNotification: _error_message } );
			}
			return;
		};
		this.HeartbeatSource.onmessage = function ( e )
		{
			//	console.debug( "JSON.parse( e.data )", JSON.parse( e.data ));
			let _json_data = JSON.parse( e.data );
			//	console.debug( "_json_data", _json_data.device_running, _self._messages.length );

			if ( _self._messages.length === 60 )
			{
				_self._messages.shift();
				_self._messages.push( _json_data );
			}
			else
			{
				_self._messages.push( _json_data );
			}

			_self.setState( { currentNotification: _json_data } );
			return;
		};

		return;
	};
	componentDidMount()
	{   //  console.debug( "DevicePage.componentDidMount", this.context.DEBUG );
		//this.Parse_ID();
		this.Connect_DeviceHeartbeat();
		return;
	};
	componentWillUnmount()
	{   //  console.debug( "componentWillUnmount.1", this.HeartbeatSource );
		this.HeartbeatSource.close();
		this.HeartbeatSource = undefined;
		return;
	};
	render()
	{	//	console.debug( "HeartbeatControl.Render()", this.props );
		return (
			<div className="heartbeat-log-panel">
				<div className="heartbeat-log-info-panel">
{/*					<div className={ this.state.currentNotification.device_running ? 'hb_check_block_green' : 'hb_check_block_red' }></div>*/}
					<div className="heartbeat-log-box">
						<div>Device ID:</div>
						<div>{ this.state.currentNotification.device_id }</div>
					</div>
					<div className="heartbeat-log-box">
						<div>Timestamp:</div>
						<div>{ new Date( this.state.currentNotification.timestamp ).toLocaleTimeString() }</div>
					</div>
					<div className="heartbeat-log-box">
						<div>Heartbeat:</div>
						<div>{ this.state.currentNotification.counter.toString() }</div>
					</div>
					<div className="heartbeat-log-box">
						<div>Running state:</div>
						<div>{ this.state.currentNotification.device_running.toString() }</div>
					</div>
				</div>
				<div className="heartbeat-log-ticker-panel">
					{
						this._messages.map( ( item, idx ) => (
							<div
								key={ idx }
								className={ item.device_running ? 'hb_check_block_green' : 'hb_check_block_red' }></div>
						) )
					}
				</div>
			</div>
		);
	};
};