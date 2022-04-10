import React from 'react';
import { DashboardContext } from '../../util/app-context.js';
import Svgs from '../../assets/svg-assets.js';
import TabsContainerControl from '../../controls/tab-control/tabs.js';
import './device-context.css';
//  import Loader from '../../controls/progress-controls/loader.js';
import DeviceControlsView from '../../controls/device-control-view/device-control-view.js';

class QaiServiceContextPanel extends React.Component
{
    static contextType = DashboardContext;
    constructor ( props )
    {
        super( props );
        this.state = {};
        this.Details = ( <div>Data not available.</div> );
        this.Help = ( <div>User Assistance</div> );
        return;
    };
    UpdateServiceDetailsData()
    {   //console.debug( 'UpdateServiceDetailsData()', this.context.apiServiceData );
        return (
            <>
                <div className="details-icon-panel">
                    <div>{ Svgs.Icons.QServiceDevice}</div>
                    <div>
                        <div>
                            <span>DEVICE NAME:</span>
                            <span>RC1</span>
                        </div>
                        <div>
                            <span>DEVICE TYPE:</span>
                            <span>Reporting & Communication</span>
                        </div>
                    </div>
                </div>

                <div className="details-list-layout">
                    <div className="details-list-entry">
                        <div>Device ID</div>
                        <div>{ this.context.apiServiceData.serviceId !== undefined && this.context.apiServiceData.serviceId }</div>
                    </div>
                    <div className="details-list-entry">
                        <div>Firmware Version</div>
                        <div>{ this.context.apiServiceData.firmwareVersion !== undefined && this.context.apiServiceData.firmwareVersion }</div>
                    </div>
                    <div className="details-list-entry">
                        <div>Hardware Version</div>
                        <div>{ this.context.apiServiceData.hardwareVersion !== undefined && this.context.apiServiceData.hardwareVersion }</div>
                    </div>
                    <div className="details-list-entry">
                        <div>IP family</div>
                        <div>{ this.context.apiServiceData.inet.family !== undefined && this.context.apiServiceData.inet.family }</div>
                    </div>
                    <div className="details-list-entry">
                        <div>Address</div>
                        <div>{ this.context.apiServiceData.inet.address !== undefined && this.context.apiServiceData.inet.address }</div>
                    </div>
                    <div className="details-list-entry">
                        <div>MAC Address</div>
                        <div>{ this.context.apiServiceData.inet.mac !== undefined && this.context.apiServiceData.inet.mac }</div>
                    </div>
                    <div className="details-list-entry">
                        <div>Network mask</div>
                        <div>{ this.context.apiServiceData.inet.netmask !== undefined && this.context.apiServiceData.inet.netmask }</div>
                    </div>
                    <div className="details-list-entry">
                        <div>CIDR</div>
                        <div>{ this.context.apiServiceData.inet.cidr !== undefined && this.context.apiServiceData.inet.cidr }</div>
                    </div>
                    <div className="details-list-entry">
                        <div>Deployment Type</div>
                        <div>{ this.context.apiServiceData.deploymentType !== undefined && this.context.apiServiceData.deploymentType }</div>
                    </div>
                    <div className="details-list-entry">
                        <div>Timezone</div>
                        <div>{ new Date().toString() }</div>
                    </div>
                    <div className="details-list-entry">
                        <div>Platform Info</div>
                        <div>&copy; &reg; Copyright { new Date().getFullYear() }</div>
                    </div>
                </div>
            </>
        );
    };
	componentDidMount()
    {	//	console.debug( "QaiServiceContextPanel.componentDidMount()", this.context.apiServiceData );
		return;
	}
	componentWillUnmount()
	{	//	console.debug( "TabsContainerControl.componentWillUnmount()" );
		return;
	};
    render()
    {   //  console.debug( "QaiServiceContextPanel.render()", this.context.apiServiceData );
        if ( this.context.apiServiceData !== undefined )
        {
            this.Details = this.UpdateServiceDetailsData();
        }

        return (
            <div className="q-context-panel">
                <TabsContainerControl
                    buttons={ [ 'Details', 'Help' ] }
                    panels={ [ this.Details, this.Help] }>
                </TabsContainerControl>
            </div>
        );
    };
};

class QvisionContextPanel extends React.Component
{
    constructor ( props )
    {
        super( props );
        this.state = {};
        this.Details = ( <div>Data not available.</div> );
        this.Help = ( <div>User Assistaance</div> );
        return;
    };
    UpdateVisionDeviceDetails()
    {   //  console.debug( 'UpdateVisionDeviceDetails', this.props );
        return (
            <>
                <div className="details-icon-panel">
                    <div>{ Svgs.Icons.QVisionSensorDevice }</div>
                    <div>
                        <div>
                            <span>DEVICE NAME:</span>
                            <span>{ this.props.data.name }</span>
                        </div>
                        <div>
                            <span>DEVICE TYPE:</span>
                            <span>Sensor Device</span>
                        </div>
                    </div>
                </div>

                <div className="marg-bot-20">Updated: { new Date( this.props.data.updated ).toUTCString() }</div>

                <div className="details-list-layout">

                    <div className="details-list-entry">
                        <div>VISION Device ID</div>
                        <div>{ this.props.data.id !== undefined && this.props.data.id }</div>
                    </div>

                    <div className="details-list-entry">
                        <div>Device friendly name</div>
                        <div>
                            { this.props.data.name === undefined && 'dbtemp Vision Sensor' }
                            { this.props.data.name !== undefined && this.props.data.name }
                        </div>
                    </div>

                    <div className="details-list-entry">
                        <div>Firmware version</div>
                        <div>8.21.002.1a</div>
                    </div>

                    <div className="details-list-entry">
                        <div>Hardware version</div>
                        <div>Beta 0.5 (build 531531)</div>
                    </div>

                    <div className="details-list-entry">
                        <div>Network address</div>
                        <div>
                            { this.props.data.net.ip !== undefined && this.props.data.net.ip + ':' }
                            { this.props.data.net.port !== undefined && this.props.data.net.port }
                        </div>
                    </div>

                    <div className="details-list-entry">
                        <div>Device is paired</div>
                        <div>
                            {/* { this.props.data.paired !== undefined && this.props.data.paired.toString() + ' - ' }*/}
                            { this.props.data.pairState !== undefined && this.props.data.pairState.status }
                        </div>
                    </div>

                    <div className="details-list-entry">
                        <div>Protocol Validation status</div>
                        <div style={ { 'color': ( this.props.data.live.status === "red" ? 'rgba(220,63,36,1)' : 'rgba(102,179,69,1)' ), 'fontWeight': '700' }}>
                            { this.props.data.live.status !== undefined && this.props.data.live.status.toUpperCase() }
                        </div>
                    </div>

                    { /* WIP - RE-ADD IMAGE WHEN DATA PLOTTER VIEW IS AVAILABLE */ }
                    {
                        //  process.env.NODE_ENV === "development" &&
                        <>
                            <div className="qai-context-tips-content-header">Preview Image</div>

                            <div className="qai-context-preview-panel">
                                <DeviceControlsView
                                    enableFullScreen={ true }
                                    data={ this.props.data } />
                            </div>
                        </>
                    }

                </div>
            </>
        );
    };
    componentDidMount()
    {	//	console.debug( "QvisionContextPanel.componentDidMount()", this.context.apiServiceData );
        return;
    }
    componentWillUnmount()
    {	//	console.debug( "QvisionContextPanel.componentWillUnmount()" );
        return;
    };
    render()
    {   // console.debug( "QvisionContextPanel.render()", this.props.data );
        if ( this.props.data !== undefined )
        {
            this.Details = this.UpdateVisionDeviceDetails();
        }

        return (
            <div className="q-context-panel">
                <TabsContainerControl
                    buttons={ [ 'Details', 'Help' ] }
                    panels={ [ this.Details, this.Help ] }>
                </TabsContainerControl>
            </div>
        );
    };
};

export
{
    QaiServiceContextPanel,
    QvisionContextPanel
};