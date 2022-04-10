import React from 'react';
import { DashboardContext } from '../../util/app-context.js';
import { PageContentControl } from '../../controls/layout/layout.js';
import Svgs from '../../assets/svg-assets.js';
import QAPI from '../../util/app-web-api.js';
//  import Loader from '../../controls/progress-controls/loader.js';
import './settings.css';

export default class SettingsPage extends React.Component
{
    static contextType = DashboardContext;
    static defaultProps = {
        Title: "Settings",
        LinkTitle: "Settings",
        Href: "/settings",
        Icon: Svgs.Icons.Settings
    };
    constructor ( props )
    {
        super( props );
        this.state = { isLoading: true };
        document.title = SettingsPage.defaultProps.Title;
        return;
    };
    
    FetchGet_ApiServiceInfo()
    {   
        fetch( QAPI.Routes.GetServiceInfo, QAPI.DefaultGetOptions )
            .then( response => response.json() )
            .then( data =>
            {   
                this.context.apiServiceData = data;
                this.setState( { isLoading: false } );
                return;
            } )
            .catch( ( error ) =>
            {
                console.error( "There is an error with the dbtemp.AI SERVICE API.", error );
                this.setState( { isLoading: false } );
                return;
            } );
        return;
    };
    OnClick_ResetServiceData( ev )
    {
        console.debug( 'TBD - OnClick_ResetServiceData(ev)' );
        return;
    };
    componentDidMount()
    { 
        if ( this.context.apiServiceData === undefined )
        {
            this.FetchGet_ApiServiceInfo();
        }
        return;
    };
    render ()
    {
        return (
            <PageContentControl>

                { /* GLOBAL APP HEADER */ }
                <div className="qai-app-panel-header">

                    { /* PAGE HEADER */ }
                    <div className="qai-app-section">{ SettingsPage.defaultProps.Title }</div>

                </div>

                { /* PAGE SPECIFIC CONTENT  */ }
                {
                    this.context.apiServiceData !== undefined &&
                    <div className="qai-content">

                        { /* NETWORK INFO */ }
                        <div className="qai-row-header">
                            <div>Network Information</div>
                        </div>

                        <div className="qai-row">
                            <div>Administrative account</div>
                            <div>Administrator</div>
                        </div>
                        <div className="qai-row">
                            <div>Administrative password</div>
                            <div>Administrator Password</div>
                        </div>

                        <div className="qai-row">
                            <div>Service Device ID</div>
                            <div>{ this.context.apiServiceData.serviceId }</div>
                        </div>
                        <div className="qai-row">
                            <div>Software version</div>
                            <div>{ this.context.apiServiceData.firmwareVersion }</div>
                        </div>
                        <div className="qai-row">
                            <div>Hardware version</div>
                            <div>{ this.context.apiServiceData.hardwareVersion }</div>
                        </div>

                        <div className="qai-row">
                            <div>DCHP enabled</div>
                            <div>True</div>
                        </div>
                        <div className="qai-row">
                            <div>Default gateway</div>
                            <div>{ this.context.apiServiceData.inet.family }</div>
                        </div>

                        <div className="qai-row">
                            <div>Port number</div>
                            <div>80</div>
                        </div>
                        <div className="qai-row">
                            <div>IPv4 address</div>
                            <div>{ this.context.apiServiceData.inet.address }</div>
                        </div>
                        <div className="qai-row">
                            <div>MAC address</div>
                            <div>{ this.context.apiServiceData.inet.mac }</div>
                        </div>
                        <div className="qai-row">
                            <div>CIDR</div>
                            <div>{ this.context.apiServiceData.inet.cidr }</div>
                        </div>
                        <div className="qai-row">
                            <div>SubNet mask</div>
                            <div>{ this.context.apiServiceData.inet.netmask }</div>
                        </div>

                        { /* SERVICE FUNCTIONS  */ }
                        <div className="qai-row-header marg-top-15">
                            <div>Troubleshooting</div>
                        </div>

                        <div className="qai-row">
                            <div>Reset data</div>
                            <div>
                                <div
                                    tabIndex="0"
                                    className="q-link-btn"
                                    title="Click here to reset the data on the Service device."
                                    onClick={ this.OnClick_ResetServiceData.bind( this ) }
                                    onKeyPress={ this.OnClick_ResetServiceData.bind( this ) }>Click here</div>
                            </div>
                        </div>

                        <div className="qai-row">
                            <div>Restart this device</div>
                            <div>
                                <div
                                    tabIndex="0"
                                    className="q-link-btn"
                                    title="Click here to reset the data on the Service device."
                                    onClick={ this.OnClick_ResetServiceData.bind( this ) }
                                    onKeyPress={ this.OnClick_ResetServiceData.bind( this ) }>Click here</div>
                            </div>
                        </div>

                        <div className="qai-row">
                            <div>Change IP address</div>
                            <div>
                                <div
                                    tabIndex="0"
                                    className="q-link-btn"
                                    title="Click here to reset the data on the Service device."
                                    onClick={ this.OnClick_ResetServiceData.bind( this ) }
                                    onKeyPress={ this.OnClick_ResetServiceData.bind( this ) }>Click here</div>
                            </div>
                        </div>

                    </div>
                }
               
            </PageContentControl>
        );
    };
};