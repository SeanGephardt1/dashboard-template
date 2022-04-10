import React from 'react';
import { DashboardContext } from '../../util/app-context.js';
import QAPI from '../../util/app-web-api.js';
import Svgs from '../../assets/svg-assets.js';
import Loader from '../../controls/progress-controls/loader.js';
import { PageContentControl } from '../../controls/layout/layout.js';
import { QaiServiceContextPanel, QvisionContextPanel } from './device-context.js';
import SensorControl  from '../../util/app-control-map.js';
//	import DeviceControlsView from '../../controls/device-control-view/device-control-view.js';
import PlotterControl from '../../controls/plotters/plotter.js';
import './devices.css';

export default class DevicesListPage extends React.Component
{
	static contextType = DashboardContext;
	static defaultProps = {
		Title: "Devices",
		LinkTitle: "Devices",
		Href: "/devices",
		Icon: Svgs.Icons.Devices
	};
	constructor ( props )
	{
		super( props );

		this.SSE = undefined;
		this.plotterWebWorkerTask = undefined;

		this.state = {
			isLoading: true,
			isLoadingManagedDevices: true,
			isLoadingNetworkDevices: true,
			contextToggle: true,
			devicesTabSelected: -1,
			currentDeviceSelected: -1,
			currentDeviceContextPanelContent: -1,
		};

		document.title = DevicesListPage.defaultProps.Title;
		window.localStorage.setItem( 'qai-show-help', this.state.contextToggle );
		return;
	};

	/* API INTEGRATION FUNCTIONS */
	FetchPost_ApiStartDiscovery()
	{	//	console.debug( 'Fetch_Api_Start_Discovery()=>this.context.apiDiscoveryStartRan', this.context.apiDiscoveryStartRan );
		if ( this.context.apiDiscoveryStartRan === false )
		{
			fetch(
				QAPI.Routes.PostDiscoveryStart,
				QAPI.DefaultPostOptions )
				.then( response =>
				{   //  console.debug( "Fetch_Api_Start_Discovery()", this._discovery_start_uri, response );
					return;
				} )
				.then( data =>
				{
					this.context.apiDiscoveryStartRan = true;
					//	console.debug( 'Fetch_Api_Start_Discovery()=>this.context.apiDiscoveryStartRan', this.context.apiDiscoveryStartRan );
					this.setState( { isLoading: false } );
					return;
				} )
				.catch( ( error ) =>
				{
					console.error( "There is an error when starting the QUIVR.AI Device Discovery process.", error );
					this.context.apiDiscoveryStartRan = false;
					this.setState( { isLoading: false } );
					return;
				} );
		}
		else
		{
			this.setState( { isLoading: false } );
		}
		return;
	};
	FetchGet_ApiServiceInfo()
	{	//	console.debug( "Fetch_Api_Service_Info()", this.context.apiServiceData );

		fetch( QAPI.Routes.GetServiceInfo, QAPI.DefaultGetOptions )
			.then( response => response.json() )
			.then( data =>
			{  
				this.context.apiServiceData = data;
				//	console.debug( "Fetch_Api_Service_Info()::", this.context.apiServiceData, data );
				this.setState( { isLoading: false } );
				return;
			} )
			.catch( ( error ) =>
			{
				console.error( "There is an error with the QUIVR.AI SERVICE API.", error );
				return;
			} );
		return;
	};
	FetchGet_Network_Devices()
	{   //  console.debug( 'Fetch_Get_Network_Devices()', this.context.networkDevices );
		fetch(
			QAPI.Routes.GetNetworkDevices,
			QAPI.DefaultGetOptions )
			.then( response => response.json() )
			.then( data =>
			{   //  
				data.forEach( ( v, i, a ) =>
				{
					v.isChecked = false;
					return;
				} );

				this.context.networkDevices = data;
				//	console.debug( "Fetch_Get_Network_Devices()", this.context.networkDevices, data );

				this.setState( { isLoadingNetworkDevices: false } );
				return;
			} )
			.catch( ( error ) =>
			{
				console.error( "There is an error when starting the QUIVR.AI Get Network Devices call.", error );
				this.setState( { isLoadingNetworkDevices: false } );
				return;
			} );

		return;
	};
	FetchGet_Managed_Devices ()
	{   //	console.debug( "Fetch_Get_Managed_Devices()=>", this.context.networkDevices, this.context.managedDevices );
		fetch(
			QAPI.Routes.GetAllManagedDevices,
			QAPI.DefaultGetOptions )
			.then( response => response.json() )
			.then( data =>
			{   //  console.debug( "Fetch_Get_Managed_Devices()", data.length );
				//  NEEDS WORK ON API SIDE
				for ( let i = 0; i < data.length; i++ )
				{
					//	console.debug( 'FetchGet_Managed_Devices()', i, data[ i ] );
					//  MOCK HAX FIX THIS IN THE API
					//  PREPEND LOCALHOST ADDRESS FOR LIVE IMAGE URI
					data[ i ].live.preview = QAPI.Uri + data[ i ].live.preview;
					data[ i ].live.preview8 = QAPI.Uri + data[ i ].live.preview8;
					data[ i ].updated = Date.now();
					data[ i ].live.range = parseFloat( 0.0 );
					data[ i ].live.status = 'green';
					data[ i ].live.controls = [];

					if ( data[ i ].live.controlMap !== "CONTROLMAP_STRING" && data[ i ].live.controlMap !== "CONTROLMAP_EMPTY" )
					{
						const _ctrl_array = data[ i ].live.controlMap.split( '\n' );
						//	console.debug( i, data[i].id, _ctrl_array.length );

						// ONLY PARSE LINES LABELLED 'CONTROL'
						for ( let c = 0; c < _ctrl_array.length; c++ )
						{
							//	EACH COMMAND IS A FULL LINE - console.debug( i, _ctrl_array[ c ] );

							//	FIRST ARRAY ITEM IS OBJECT NAME
							const _cm_item = _ctrl_array[ c ].split( ',' );
							//	console.debug( '_cm_item', i, c, _cm_item );

							// PARSE EACH DIFFERENT CONTROL MAP LINE
							switch ( _cm_item[ 0 ].toLowerCase() )
							{
								case "control":
									{	
										//	console.debug( data[ i ].id, i, c, _ctrl_array[ c ] );
										let _c = new SensorControl( _ctrl_array[ c ] );
										//	console.debug( '_c', _c );
										data[ i ].live.controls.push( _c );
										break;
									};
								case "range": {
									// TBD 
									//	console.debug( "TBD", _cm_item[ 0 ], _cm_item );
									//	data[ i ].live.range = ( parseFloat( _cm_item[ 1 ] ) ); // ( parseFloat( _cm_item[ 1 ] ).toFixed( 3 ) );
									data[ i ].live.range = 99.99;
									break;
								}
								case "display": {
									// TBD console.debug( "TBD", _cm_item[ 0 ] );
									break;
								}
								case "#display":
								case "":
								default:
									{
										//	console.debug( "DEFAULT SWITCH --- EMPTY CONTROL MAP LINE" );
										break;
									}
							};
						}
					}
					//	console.debug( "POST", i, data[ i ].live.controlMap, data[ i ].live.controls );
				}

				this.context.managedDevices = data;

				//	SET CHECKED STATE FOR UNMANGED DEVICES LIST
				//	console.debug( 'this.context.networkDevices', this.context.networkDevices.length );

				for ( let d = 0; d < data.length; d++ )
				{   //  console.debug( d, data[ d ] );
					for ( let vd = 0; vd < this.context.networkDevices.length; vd++ )
					{   //  console.debug( d, data[ d ].id, "::", vd, this.context.networkDevices[ vd ].id );
						if ( data[ d ].id === this.context.networkDevices[ vd ].id )
						{	//	console.debug( 'this.context.networkDevices[ vd ].isChecked', this.context.networkDevices[ vd ].isChecked );
							this.context.networkDevices[ vd ].isChecked = true;
						}
					}
				}

				this.setState( {
					isLoading: false,
					isLoadingManagedDevices: false,
					isLoadingNetworkDevices: false
				} );
			} )
			.catch( ( error ) =>
			{
				console.error( "There is an error when starting the QUIVR.AI Get Managed Devices call.", error );

				const _fetch_get_managed_devices_event = {
					type: 'API ROUTE ERROR',
					event: error.toString() + ' : ' + this._get_managed_devices_url,
					time: Date.now()
				};

				this.SSE_LogHistory( _fetch_get_managed_devices_event );

				this.setState( {
					isLoading: false,
					isLoadingManagedDevices: false,
					isLoadingNetworkDevices: false
				} );
				return;
			} );

		return;
	};

	/* MAY RE-USE EVENT LOGGING LATER */
	SSE_LogHistory ( item )
	{
		//if ( process.env.NODE_ENV === "development" )
		//{
		//    console.debug( "SSE_LogHistory", item );
		//}
		return;
	};
	SSE_GeneralEventSource ()
	{   //  console.debug( "Connect_GeneralEventSource()", QAPI.Routes.ServerSentEvents );
		const _self = this;

		this.SSE = new EventSource( QAPI.Routes.ServerSentEvents );
		this.SSE.onopen = ( e ) =>
		{   //  console.debug( "SSE Connection opened:", e.type );
			const _new_event = {
				type: 'SSE Open Event',
				event: e.type,
				time: Date.now()
			};

			_self.SSE_LogHistory( _new_event );
			return;
		};
		this.SSE.onmessage = ( e ) =>        
		{   //  console.info( "SSE Connection message", this.readyState, "e,", e.data );
			const _new_event = {
				type: 'SSE Message Event',
				event: this.readyState.toString(),
				time: Date.now()
			};

			_self.SSE_LogHistory( _new_event );
			return;
		};
		this.SSE.onerror = ( e ) =>
		{   //  
			console.error( "SSE Connection Error", e.type, e.target.url );

			const _sse_ex_event = {
				type: 'SSE Error Event',
				event: e.type + ' : ' + e.target.url,
				time: Date.now()
			};
			_self.SSE_LogHistory( _sse_ex_event );

			_self.SSE.close();
			_self.SSE = undefined;

			//_self.setState( {
			//    isLoading: false,
			//} );
			return;
		};

		this.SSE.addEventListener( 'GeneralLog',
			function ( e )
			{
				//	console.debug( 'SSE GeneralLog', JSON.parse( e[ 'data' ] ) );
				const _json = JSON.parse( e[ 'data' ] );
				const _new_event = {
					type: 'General',
					event: _json.log,
					time: Date.now()
				};

				_self.SSE_LogHistory( _new_event );
				return;
			} );
		this.SSE.addEventListener( 'Network',
			function ( e )
			{
				//	console.debug( 'SSE Network', JSON.parse( e[ 'data' ] ) );
				const _json = JSON.parse( e[ 'data' ] );
				const _new_event = {
					type: 'Network',
					event: _json.event,
					time: Date.now()
				};

				_self.SSE_LogHistory( _new_event );
				return;
			} );
		this.SSE.addEventListener( 'Device',
			function ( e )
			{	//	console.debug('SSE Device', JSON.parse(e[ 'data' ]));
				const _json = JSON.parse( e[ 'data' ] );
				const _new_event = {
					type: 'Device',
					event: _json.event + " : " + _json.id,
					time: Date.now()
				};

				_self.SSE_LogHistory( _new_event );
				return;
			} );
		this.SSE.addEventListener( 'DeviceTelemetry',
			function ( e )
			{	
				let _found = undefined;
				let _json = JSON.parse( e[ 'data' ] );
				//	console.debug( 'SSE DeviceTelemetry()::_json', e, e[ 'data' ] );

				//  console.debug( '_self.context.managedDevices', _self.context.managedDevices.length );
				if ( _self.context.managedDevices.length > 0 )
				{   //  console.debug( "_self.ZoneData.vision_devices.length", _self.ZoneData.vision_devices.length );
					_found = _self.context.managedDevices.find( ( element ) =>
					{
						return element.id === _json.id;
					} );
				}
				//   console.debug( "FINAL _found", _found );

				if ( _found !== undefined )
				{
					_found.updated = Date.now();
					//	console.debug( "_found", _found.id, _json.id, _json.type );

					if ( _json.type === "Preview" )
					{
						//	console.debug( 'SSE DeviceTelemetry Preview', _json.id, _json, _found );
						_found.live.preview = QAPI.Uri + _json.data;

						//if ( _self.state.currentDeviceSelected !== undefined )
						//{
						//	if ( ( _json.id === _found.id ) && ( _found.id === _self.state.currentDeviceSelected.id ) )
						//	{   //  console.debug("SSE DeviceTelemetry Preview change state");
						//		_self.setState( {
						//			currentDeviceSelected: _found,
						//		} );
						//	}
						//}
					}
					else if ( _json.type === "Preview8" )
					{
						//	console.debug( 'SSE DeviceTelemetry Preview8', _json.id, _json, _found );
						_found.live.preview8 = QAPI.Uri + _json.data;

						////  UPDATE STATE IF QVISION DEVICE VIEW IS CURRENTLY DISPLAYED
						//if ( _self.state.currentDeviceSelected !== undefined )
						//{
						//	if ( ( _json.id === _found.id ) && ( _found.id === _self.state.currentDeviceSelected.id ) )
						//	{   //  console.debug("SSE DeviceTelemetry Preview change state");
						//		_self.setState( {
						//			currentDeviceSelected: _found,
						//		} );
						//	}
						//}
					}
					else if ( _json.type === "ControlMap" )
					{	//	console.debug( "ControlMap::_found", _found.id, _found, _json.id, _json );
						if ( _json.data !== "CONTROLMAP_STRING" && _json.data !== "CONTROLMAP_EMPTY" )
						{	//	console.debug( "SSE DeviceTelemetry::ControlMap::", _found.id, _json.id );//, _json.data );

							//  REFACTOR FOR FINDING EXISITNG CONTROLS
							//	THEN ADDING NEW CONTROLS
							//	console.debug( '_found.live.controls', _found.live.controls.length );
							//	_found.live.controls = [];

							const _ctrl_array = _json.data.split( '\n' );
							//	console.debug( i, data[i].id, _ctrl_array.length );

							for ( let c = 0; c < _ctrl_array.length; c++ )
							{	//	FULL LINE -  console.debug(i, '_ctrl_array[c]', _ctrl_array[ c ] );
								const _cm_item = _ctrl_array[ c ].split( ',' );
								//	FIRST ARRAY ITEM -  //	console.debug( '_cm_item', i, c, _cm_item[ 0 ].length );

								// PARSE EACH DIFFERENT CONTROL MAP LINE
								switch ( _cm_item[ 0 ].toLowerCase() )
								{
									case "control":
										{	//	console.debug( "SSE CONTROL", _json.id, c, _ctrl_array[ c ] );
											let _c = new SensorControl( _ctrl_array[ c ] );
											//	console.debug( "SSE CONTROL", _c );

											if ( _found.live.controls[ c ] !== undefined )
											{
												// update all settings
												_found.live.controls[ c ].threshold = _c.threshold;
												_found.live.controls[ c ].score = _c.score;

												if ( _found.live.controls[ c ].scoreCache.length === 100 )
												{
													_found.live.controls[ c ].scoreCache.shift();
													_found.live.controls[ c ].scoreCache.push( _c.score );
												}
												else
												{
													_found.live.controls[ c ].scoreCache.push( _c.score);
												}
											}
											else
											{
												let _c = new SensorControl( _ctrl_array[ c ] );
												//	console.debug("SSE _c", _json.id, _c.index );
												_found.live.controls.push( _c );
											}

											//	console.debug( '_found.live.controls',_found.id, _found.live.controls[ c ], _c );
											break;
										};
									case "range":
										{	console.error( "TBD RANGE VALUE", _cm_item );
											_found.live.range = ( parseFloat( _cm_item[ 1 ] ) );
											break;
										}
									case "display":
									case "#display":
									case "":
									default:
										{	//	console.error( "DEFAULT SWITCH --- EMPTY CONTROL MAP LINE" );
											break;
										}
								};
							}
						}
					}
					else if ( _json.type === "Status" )
					{
						//	WHAT NEEDS TO HAPPEN HERE?
						//	console.debug( 'SSE::DeviceTelemetry::Status::_found', _found.id, _found );
						//	console.debug( 'SSE::DeviceTelemetry::Status::_json', _json.id, _json.data );
						_found.live.status = _json.data;
					}
					else if ( _json.type === "Lidar" )
					{
						//	console.debug( "SSE DeviceTelemetry Lidar", _json, _found );
					}
					else if ( _json.type === "Unknown" )
					{
						console.log( "SSE DeviceTelemetry Unknown", _json, _found );
					}

					//  UPDATE STATE IF QVISION DEVICE VIEW IS CURRENTLY DISPLAYED
					//	console.debug( "SSE DeviceTelemetry::_self.state.currentDeviceSelected::", _self.state.currentDeviceSelected );

					if ( _self.state.currentDeviceSelected !== undefined )
					{
						//	console.debug( "SSE DeviceTelemetry", _self.state.currentDeviceSelected );
						if ( ( _json.id === _found.id ) && ( _found.id === _self.state.currentDeviceSelected.id ) )
						{   //  console.debug( "SSE DeviceTelemetry CHANGE STATE", _found.id, _json.id, _self.state.currentDeviceSelected );
							_self.setState( { currentDeviceSelected: _found } );
						}
					}
				}

				//const _new_event = {
				//	type: 'DeviceTelemetry',
				//	event: _json.id + ':' + _json.type,
				//	time: Date.now()
				//};
				//_self.SSE_LogHistory( _new_event );
				return;
			} );

		return;
	};

	/* TRYING WEB WORKERS */
	Worker_CreatePlotter()
	{   //  

		console.debug( "CreateWebWorker()" );
		//const _self = this;

		//this.plotterWebWorkerTask = new Worker( "./workers/ww-plotter.js", { type: 'module', name: 'PlotterWorkerMessage' } );
		//this.plotterWebWorkerTask.onerror = function ( event )
		//{
		//	console.error( "PlotterControl()::this.webWorkerTask.onerror", event );
		//	return;
		//};
		//this.plotterWebWorkerTask.onmessage = function ( event )
		//{	//	console.debug( 'onmessage', event.data.id, _self.state.currentDeviceSelected.id );
		//	try
		//	{
		//		let _previous_current_device_selected = _self.state.currentDeviceSelected;
		//		_previous_current_device_selected = event.data.message;
		//		_self.setState( { currentDeviceSelected: _previous_current_device_selected } );
		//	}
		//	catch ( ex )
		//	{
		//		throw ex;
		//	}
		//	return;
		//};
		return;
	};

	//  EVENT HANDLERS
	OnClick_contextToggle ( ev )
	{   //  console.debug( "OnClick_contextToggle", this.state.contextToggle );
		window.localStorage.setItem( 'qai-show-help', !this.state.contextToggle );
		this.setState( { contextToggle: !this.state.contextToggle } );
		return;
	};
	OnClick_RefreshGetDevices( ev )
	{   //  console.debug( "DEBUG-OnClick_RefreshGetDevices" );
		this.FetchPost_ApiStartDiscovery();
		this.FetchGet_Network_Devices();
		this.FetchGet_Managed_Devices();

		this.setState( {
			isLoadingManagedDevices: true,
			isLoadingNetworkDevices: true
		} );
		return;
	};
	OnClick_DeviceSetCheckBox( item, ev )
	{   //  console.debug( "OnClick_DeviceSetCheckBox", ev.target.checked, item );

		const _device_id = ev.target.value;
		const _dev_name = ( "QVD-" + _device_id ).toUpperCase();
		const _manage_url = QAPI.Routes.PostStartManagingDevice + _device_id + "?name=" + _dev_name;
		const _unmanage_url = QAPI.Routes.PostStopManagingDevice + _device_id;
		const _pair_url = QAPI.Routes.PostPairDevice + _device_id;
		const _unpair_url = QAPI.Routes.PostUnpairDevice + ev.target.value;

		//	item.isChecked = ev.target.checked;

		//  MANAGE OR UNMANAGE
		if ( ev.target.checked === true )
		{
			fetch(
				_manage_url,
				QAPI.DefaultPostOptions )
				.then( response => response.text() )
				.then( data =>
				{   //  console.debug( "sent managed::data", data );
					return;
				} )
				.catch( ( error ) =>
				{
					console.error( "There is an error with the QUIVR.AI Service", error );
					return;
				} );

			fetch(
				_pair_url,
				QAPI.DefaultPostOptions )
				.then( response => response.text() )
				.then( data =>
				{   //  console.debug( "sent pair" );
					return;
				} )
				.catch( ( error ) =>
				{
					console.error( "There is an error with the QUIVR.AI Service", error );
					return;
				} );

			this.FetchGet_Managed_Devices();
		}
		else if ( ev.target.checked === false )
		{
			fetch(
				_unmanage_url,
				QAPI.DefaultPostOptions )
				.then( response => response.text() )
				.then( data =>
				{   //  console.debug( "sent unmanaged::data" );
					return;
				} )
				.catch( ( error ) =>
				{
					console.error( "There is an error when starting the QUIVR.AI Get Devices call.", error );
					return;
				} );

			fetch(
				_unpair_url,
				QAPI.DefaultPostOptions )
				.then( response => response.text() )
				.then( data =>
				{   //  console.debug( "sent unpair" );
					return;
				} )
				.catch( ( error ) =>
				{
					console.error( "There is an error when pairing the QUIVR.AI Get Devices call.", error );
					return;
				} );

			this.FetchGet_Managed_Devices();
		}

		this.setState( { isLoadingManagedDevices: true } );
		return;
	};

	OnClick_QuivrDevicesSelectTab ( idx, item, ev )
	{   //  console.debug( "OnClick_QuivrDevicesSelectTab", idx, item );
		const _current_object = ( idx === -1 ) ? -1 : 0;

		//if ( process.env.NODE_ENV === "development" )
		//{
		//	if ( this.plotterWebWorkerTask !== undefined )
		//	{
		//		if ( _current_object !== -1 )
		//		{
		//			this.plotterWebWorkerTask.postMessage( {
		//				action: "startControlMapPlotter",
		//				id: item.id,
		//				item: item,
		//				timer_value: 100
		//			} );
		//		}
		//		else if ( _current_object === -1 )
		//		{
		//			this.plotterWebWorkerTask.postMessage( { action: "endControlMapPlotter" } );
		//		}
		//	}
		//}

		this.setState( {
			devicesTabSelected: idx,
			currentDeviceSelected: item,
			currentDeviceContextPanelContent: _current_object
		} );
		return;
	};

	//  REACT LIFECYCLE
	componentDidMount()
	{   //  console.debug( "DevicesListPage.componentDidMount");
		this.FetchPost_ApiStartDiscovery();
		this.FetchGet_ApiServiceInfo();
		this.FetchGet_Network_Devices();
		this.FetchGet_Managed_Devices();

		this.SSE_GeneralEventSource();
		//	this.Worker_CreatePlotter();
		return;
	}
	componentWillUnmount()
	{   //  console.debug( "DevicesListPage.componentWillUnmount" );
		if ( this.SSE !== undefined )
		{
			this.SSE.close();
			this.SSE = undefined;
		}

		if ( this.plotterWebWorkerTask !== undefined )
		{	//	console.debug( "DevicesListPage.componentWillUnmount" );
			this.plotterWebWorkerTask.postMessage( { action: "endControlMapPlotter" } );
			this.plotterWebWorkerTask.terminate();
			this.plotterWebWorkerTask = undefined;
		}
		return;
	};
	render ()
	{   //  console.debug( "DevicesListPage.render()", this.state.currentDeviceSelected );
		return (
			<PageContentControl>
				{
					this.state.isLoading === true && <Loader loaderText={ 'Loading ' + DevicesListPage.defaultProps.Title } />
				}
				{
					this.state.isLoading === false &&
					<>

						{ /* GLOBAL APP HEADER */ }
						<div className="qai-app-panel-header">

							{ /* ZONE HEADER */ }
							<div className="qai-areas-tabs-panel">

								<div className="qai-areas-tab-button">
									<span>{ DevicesListPage.defaultProps.Title }</span>
								</div>

							</div>

							{ /* CONTEXT PANEL BTN */ }
							<div className="qai-areas-help-btn-panel">
								<div
									tabIndex="0"
									className="qai-areas-tips-btn"
									onClick={ this.OnClick_contextToggle.bind( this ) }
									onKeyPress={ this.OnClick_contextToggle.bind( this ) }>
									<div>{ Svgs.Icons.HelpInfoIcon }</div>
									<div>
										{ this.state.contextToggle === true && `Hide panel` }
										{ this.state.contextToggle === false && `Show panel` }
									</div>
								</div>
							</div>

						</div>

						{ /* MAIN CONTENT AREA */ }
						<div className="qai-areas-content-panel">

							{ /* MAIN CONTENT */ }
							<div className="qai-area-devices-panel">

								{ /* SERVICE & DEVICES ICON TABBED NAV */ }
								<div className="qai-area-icons-panel">

									{ /* QAI SERVICE BTN */ }
									<div
										tabIndex="0"
										className={
											this.state.devicesTabSelected === -1 ? "qai-zone-icon-btn qai-zone-icon-btn-selected" : "qai-zone-icon-btn"
										}
										onClick={ this.OnClick_QuivrDevicesSelectTab.bind( this, -1, -1 ) }
										onKeyPress={ this.OnClick_QuivrDevicesSelectTab.bind( this, -1, -1 ) }>
										<div className="qai-zone-icon-btn-img">
											<div className="qai-zone-icon-btn-img-col"></div>
											<div className="qai-zone-icon-btn-svg">{ Svgs.Icons.QServiceDevice }</div>
											<div className="qai-zone-icon-btn-img-col">
												{
													this.context.managedDevices !== undefined &&
													this.context.managedDevices.length > 0 &&
													<div className="qai-zone-icon-btn-line">{ Svgs.Icons.QDeviceLine }</div>
												}
											</div>
										</div>
										<div className="qai-zone-icon-btn-title">RC1</div>
									</div>

									{ /* QVISION DEVICES BTNS */ }
									{
										this.state.isLoadingManagedDevices === true &&
										<Loader loaderText={ 'Loading devices...' } />
									}
									{
										this.state.isLoadingManagedDevices === false &&
										<>
											{
												this.context.managedDevices !== undefined &&
												this.context.managedDevices.length > 0 &&
												this.context.managedDevices.map( ( item, idx ) => (
													<div
														key={ idx }
														tabIndex="0"
														className={ this.state.devicesTabSelected === idx ?
															"qai-zone-icon-btn qai-zone-icon-btn-selected" :
															"qai-zone-icon-btn" }
														onClick={ this.OnClick_QuivrDevicesSelectTab.bind( this, idx, item ) }
														onKeyPress={ this.OnClick_QuivrDevicesSelectTab.bind( this, idx, item ) }>
														<div className="qai-zone-icon-btn-img">
															<div className="qai-zone-icon-btn-img-col">
																{
																	idx < this.context.managedDevices.length &&
																	<div className="qai-zone-icon-btn-line">{ Svgs.Icons.QDeviceLine }</div>
																}
															</div>
															<div className={ ( item.live.status === "green" ?
																"qai-zone-icon-btn-svg qzibs-green" :
																"qai-zone-icon-btn-svg qzibs-red" ) }>
																{ Svgs.Icons.QVisionSensorDevice }
															</div>
															<div className="qai-zone-icon-btn-img-col">
																{
																	idx < this.context.managedDevices.length - 1 &&
																	<div className="qai-zone-icon-btn-line">{ Svgs.Icons.QDeviceLine }</div>
																}
															</div>
														</div>
														<div className="qai-zone-icon-btn-title" title={ item.id }>{ item.id }</div>
													</div>
												) )
											}
										</>
									}
								</div>

								{ /* SERVICE & DEVICES TABS */ }
								<div className="qai-tabs-layout">

									{ /* QAI ICON TABS & PANELS */ }
									{ /* QAI SERVICE PANEL & QVISION LIST  */ }
									{
										this.state.devicesTabSelected === -1 &&
										<div className="qai-tab-content-panel">

											<div className="details-header-row">
												<div className="details-header">Pairable Vision Devices</div>
												<div
													tabIndex="0"
													className="device-refresh-link"
													onClick={ this.OnClick_RefreshGetDevices.bind( this ) }
													onKeyPress={ this.OnClick_RefreshGetDevices.bind( this ) }>Refresh this list</div>
											</div>

											<div className="qvision-devices-list-layout">
												{
													this.state.isLoadingNetworkDevices === true &&
													<div style={ { 'padding': '20px' } }>
														<Loader loaderText={ 'LOCATING VISION DEVICES' } />
													</div>
												}
												{
													this.state.isLoadingNetworkDevices === false &&
													<form>
														{
															this.context.networkDevices.length > 0 &&
															this.context.networkDevices.map( ( item, idx ) => (
																<label
																	key={ idx }
																	className="qvision-device-entry"
																	htmlFor={ item.id }
																>
																	<input
																		type="checkbox"
																		tabIndex="0"
																		name={ item.id }
																		id={ item.id }
																		value={ item.id }
																		defaultChecked={ item.isChecked === true ? 'checked' : undefined }
																		disabled={ this.state.isLoadingManagedDevices === true ? 'disabled' : undefined }
																		onClick={ this.OnClick_DeviceSetCheckBox.bind( this, item ) }
																		onKeyPress={ this.OnClick_DeviceSetCheckBox.bind( this, item ) }
																	/>
																	{ /* debug */ }
																	{ /* item.isChecked.toString() */ }
																	<span>{ item.id }: qais://{ item.net.ip }:{ item.net.port } </span>
																</label>
															) )
														}
														{
															this.context.networkDevices.length === 0 &&
															<div style={ { 'padding': '10px' } }>QVision devices are not currently available</div>
														}
													</form>
												}
											</div>

										</div>
									}

									{ /* QVISION PANEL TEMPLATE  */ }
									{
										this.state.currentDeviceSelected !== undefined &&
										this.state.devicesTabSelected > -1 &&
										<div className="qai-tab-content-panel">
											<div className="qvision-details-panel">

												<div className="details-qvision-live-preview-div">
													{
														this.state.currentDeviceSelected.live.preview === undefined &&
														<div className="no-image">The live preview image for QVision device { this.state.currentDeviceSelected.id } is not currently available</div>
													}
													{
														this.state.currentDeviceSelected !== undefined &&
														<>
															{ /*
															<DeviceControlsView
																enableFullScreen={ true }
																data={ this.state.currentDeviceSelected }
																/>
															*/ }
															<PlotterControl data={ this.state.currentDeviceSelected } />
														</>
													}
												</div>

											</div>
										</div>
									}
								</div>

							</div>

							{ /* TIPS PANEL */ }
							{
								this.state.contextToggle === true &&
								this.state.currentDeviceContextPanelContent === -1 &&
								<QaiServiceContextPanel />
							}
							{
								this.state.contextToggle === true &&
								this.state.currentDeviceContextPanelContent !== -1 &&
								<QvisionContextPanel data={ this.state.currentDeviceSelected } />
							}
						</div>

					</>
				}
			</PageContentControl>
		);
	};
};