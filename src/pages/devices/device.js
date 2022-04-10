import React from 'react';
import { DashboardContext } from '../../util/app-context.js';
import Loader from '../../controls/progress-controls/loader.js';
import Svgs from '../../assets/svg-assets.js';
import { NavLink } from 'react-router-dom';
//  import { ApiValues } from '../../util/web-api.js';
//  import { SampleReportingData, ControlStatus } from '../../util/sample-alerts-data.js';
import { PageContentControl } from '../../controls/layout/layout.js';
//  import DeviceRulesControl from '../../controls/rules/device-rules.js';
//  import HeartbeatControl from '../../controls/heartbeat/heartbeat.js';
//  import HeartbeatLogControl from '../../controls/heartbeat-log/heartbeat-log.js';

import './devices.css';

export default class DevicePage extends React.Component
{
    static contextType = DashboardContext;
    static defaultProps = {
        Title: "Device",
        LinkTitle: "Device",
        Href: "/devices/:id",
        Icon: Svgs.Icons.Devices
    };
    constructor ( props )
    {
        super( props );

        this._temp_data = [];
        this._device_id = "";
        this._id_text = "";

        // button values
        this._default_edit_btn_text = "Create a new rule";
        this._default_edit_btn_save_text = "Save this rule";
        this._edit_btn_text = this._default_edit_btn_text;

        //  REFACTOR WHEN API IS READY
        this.Data = undefined;
        this._test_data = undefined;

        this.state = {
            isLoading: false,
            displayHeartbeatLog: true,
            isEditing: false
        };
        return;
    };
    Parse_ID()
    {   // console.debug( "Parse_ID" );
        let _path = window.location.href.split( "/" );
        let _id = _path[ _path.length - 1 ];
        //  console.debug( "Parse_ID::_id", _id );
        this._device_id = _id;
        this._id_text = DevicePage.defaultProps.Title + " ID: " + this._device_id;
        //  console.debug( "this._id_text", this._id_text );
        document.title = ( this._id_text ) ? this._id_text : "dbtemp Device page";

        this.setState( { isLoading: false } );
        return;
    };
    TransformData()
    {   //  console.debug( "TransformData()", this._temp_data );

        //let _lookup = this._temp_data.filter( ( item ) =>
        //{
        //    return item.id === this._device_id;
        //} );
        ////  console.debug( "_lookup", _lookup );

        //this.Data = _lookup[0];

        //this.Data.currentControlSet = JSON.parse( JSON.stringify( {
        //    Image: SampleReportingData[ 0 ].base_image,
        //    Controls: SampleReportingData[ 0 ].controls,
        //} ) );

        //this.Data.currentControlSet.Controls.forEach( ( v, i, a ) =>
        //{   //  console.debug( i, v );
        //    v.status = ControlStatus.OK;
        //    return;
        //} );

        ////  console.debug( "this.Data", this.Data );
        //this.setState( { isLoading: false } );
        return;
    };
    async Fetch_DeviceData()
    {   //  
        console.debug( "Fetch_DeviceData", this._device_id );
        //// REFACTOR WHEN WE GET MORE DEVICE DATA
        ////  const _url = ApiValues.API_BASE_URL + "devices/" + this._device_id;
        //const _url = ApiValues.API_BASE_URL + "/api/devices/manage/";
        ////  console.debug( "_url", _url );

        //const _options = {
        //    method: 'GET',
        //    headers: {
        //        'Content-Type': 'application/json',
        //        'x-api-token': this.context.User.Token
        //    }
        //};
        ////  console.debug( "_options", _options );

        //await fetch( _url, _options )
        //    .then( response => response.json() )
        //    .then( data =>
        //    {   //  console.debug( "Fetch_DeviceData", data );
        //        if ( data.success !== true )
        //        {   console.error( data );
        //            this.setState( { isLoading: true } );
        //        }
        //        else if ( data.success === true )
        //        {   // console.info( "FetchCertData()::OK:", data.result );
        //            this._temp_data = data.result;
        //            this.TransformData();
        //            //  this.setState( { isLoading: false } );
        //        }
        //        return;
        //    } )
        //    .catch( error =>
        //    {
        //        console.error( 'There has been a problem with your fetch operation:', error );
        //        this.setState( { isLoading: true } );
        //    } );

        return;
    };

    componentDidMount()
    {   //  console.debug( "DevicePage.componentDidMount" );
        this.Parse_ID();
        //  this.Fetch_DeviceData();
        return;
    };
    componentWillUnmount()
    {   //  console.debug( "componentWillUnmount", this._ws );
        return;
    };
    render()
    {   //  console.debug( "DevicePage.render()", this.Data );
        return (
            <PageContentControl>
            {
                this.state.isLoading === true && <Loader loaderText={ DevicePage.defaultProps.Title } />
            }
            {
                this.state.isLoading === false &&
                    <div style={ { 'padding': '20px' } }>

                        { /* generic header */ }
                        <div className="page-header">
                            <div>
                                <NavLink
                                    tabIndex="0"
                                    className='page-header-link'
                                    to={ '/devices'}
                                    title="All Devices"
                                >Devices</NavLink>
                                 <span className="page-divider">/</span>
                                <span title={ this._id_text }>{ this._id_text }</span>
                            </div>
                            <div>
                                <button
                                    tabIndex="0"
                                    className='qai-btn-primary'>{ this._edit_btn_text}</button>
                            </div>
                        </div>

                        { /* content area */}
                        <div>
                            <h1>{ this._id_text }</h1>
                        </div>


                    </div>
            }
            </PageContentControl>
        );
    };
};