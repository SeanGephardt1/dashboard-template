import React from 'react';
import { DashboardContext } from '../../util/app-context.js';
import { NavLink } from 'react-router-dom';
import Loader from '../../controls/progress-controls/loader.js';
import Svgs from '../../assets/svg-assets.js';
import QAPI from '../../util/app-web-api.js';
import { PageContentControl } from '../../controls/layout/layout.js';
import PdfGenerator from './pdf-gen.js';
import './report.css';
//  import RulesErrorControl from '../../controls/rules-error/rules-error.js';
//  import DeviceRulesControl from '../../controls/rules/device-rules.js';
//  import { MockReportingData } from './office-dev-sample-data.js';


export default class ReportPage extends React.Component
{
    static contextType = DashboardContext;
    static defaultProps = {
        Title: "Report",
        LinkTitle: "Report",
        Href: "/reports/:id",
        Icon: Svgs.Icons.RedAlert
    };
    constructor ( props )
    {
        super( props );
        this._has_data = false;
        this._device_id = "";
        this._id_text = "";
        this._rules_viewer_data = undefined;
        this.state = {
            debug: false,
            isLoading: true,
            reportData: undefined
        };
        return;
    };
    Parse_ID()
    {  //   console.debug( "Parse_ID" );
        let _path = window.location.href.split( "/" );
        let _id = _path[ _path.length - 1 ];
        //  console.debug( "Parse_ID::_id", _id );

        this._device_id = _id;
        this._id_text = ReportPage.defaultProps.Title + ": " + this._device_id;
        //  console.debug( "this._id_text", this._id_text );

        document.title = ( this._id_text ) ? this._id_text : "QUIVR Reports page";
        return;
    };

    async Fetch_ReportData()
    {   //  console.debug( "Fetch_DevicesListData()", this._device_id );
        await fetch(
            QAPI.Routes.GetGetAllReports, QAPI.DefaultGetOptions )
            .then( response => response.json() )
            .then( data =>
            {   //  console.debug( "Fetch_ReportsListData().fetch::", data );
                //  MATCHING & ADDING MORE META DATA HERE FOR PROTOTYPING PURPOSES
                //  data = MockReportingData;

                if ( data.length > 0 )
                {
                    let _found = data.find( ( element ) =>
                    {
                        return this._device_id === element.id;
                    } );
                    //  console.debug( "ReportPage::_found", _found );

                    if ( _found !== undefined )
                    {
                        for ( let ip = 0; ip < _found.imagePaths.length; ip++ )
                        {
                            _found.imagePaths[ ip ] = QAPI.Uri + _found.imagePaths[ ip ];
                        }

                        this.setState( {
                            isLoading: false,
                            reportData: _found
                        } );
                    }
                }
                else
                {
                    this.setState( {
                        isLoading: false,
                    } );
                }
                return;
            } )
            .catch( ( error ) =>
            {
                console.error( "There is an error when retrieving the list of reports from the QUIVR.AI QAI Reporting Service.", error );
                return;
            } );
        return;
    };

    // BUTTON METHODS
    onClick_MailTo( ev )
    {   //  console.debug( "onClick_MailTo" );
        var mail = document.createElement( "a" );
        mail.href = "mailto:?subject=QUIVR.AI Error Report " + this._device_id + "&body=" + window.location + "%0D%0D";
        mail.click();
        return;
    };
    onClick_Download_PDF_Report( ev )
    {   //  console.debug( 'onClick_Download_PDF_Report', this.state.reportData );
        PdfGenerator.CreatePdf( this.state.reportData );
        return;
    };

    componentDidMount()
    {   //  console.debug( "IncidentReportPage.componentDidMount" );
        this.Parse_ID();
        this.Fetch_ReportData();
        return;
    }
    render()
    {   // console.debug( "IncidentReportPage.render()", this.Data);
        return (
            <PageContentControl>
                {
                    this.state.isLoading === true && <Loader loaderText={ ReportPage.defaultProps.Title } />
                }
                {
                    this.state.isLoading === false &&
                    (
                        <>
                            { /* GLOBAL APP HEADER */ }
                            <div className="qai-app-panel-header">
                                { /* PAGE HEADER */ }
                                <div className="qai-app-section">

                                    <div>
                                        <NavLink
                                            tabIndex="0"
                                            className='page-header-link'
                                            to={ '/reports' }
                                            title="Reports"
                                        >Reporting</NavLink>
                                        <span className="page-divider">/</span>
                                        <span title={ this._id_text }>{ this._id_text }</span>
                                    </div>
                                    <div>
                                        <button
                                            className='qai-btn-primary'
                                            onClick={ this.onClick_Download_PDF_Report.bind( this ) }>Create PDF</button>
                                    </div>
                                </div>
                                { /* CONTEXT PANEL BTN */ }
                            </div>

                            { /* REPORT CONTENT AREA */ }
                            <div className="report-main-layout">

                                { /* REPORT IMAGE */ }
                                {/*<RulesErrorControl data={ this.Data } enableFullScreen={ true }/>*/ }
                                {/*<DeviceRulesControl data={ this._rules_viewer_data } showHistory={ false }/>*/ }
                                <div className="report-image-panel">
                                    {
                                        this.state.reportData.imagePaths[ 0 ] !== undefined &&
                                        <img
                                            className="report-image-render"
                                            src={ this.state.reportData.imagePaths[ 0 ] }
                                            title={ 'QVision image captured' }
                                            alt={ '' } />
                                    }
                                </div>

                                { /* REPORT DETAILS HEADER */ }
                                <div className="report-details-header">REPORT DETAILS</div>

                                { /* DETAILS AND THUMBNAIL PANEL */ }
                                <div className="report-details-main-layout">
                                    <table
                                        cellSpacing="0"
                                        cellPadding="0"
                                        className="inc-report-table">
                                        <tbody>
                                            <tr>
                                                <td>Sensor Device ID</td>
                                                <td>{ this.state.reportData.deviceId } </td>
                                            </tr>
                                            <tr>
                                                <td>Incident Date</td>
                                                <td>{ new Date( this.state.reportData.createdOn ).toLocaleDateString() }</td>
                                            </tr>
                                            <tr>
                                                <td>Incident Time</td>
                                                <td>{ new Date( this.state.reportData.createdOn ).toLocaleTimeString() }</td>
                                            </tr>
                                            <tr>
                                                <td>Actions Taken</td>
                                                <td>
                                                    {
                                                        this.state.reportData.actionsTaken.map( ( item2, idx2 ) => (
                                                            <span key={ idx2 }>
                                                                { item2 }
                                                                {
                                                                    idx2 < this.state.reportData.actionsTaken.length - 1 && <span>{ ', ' }</span>
                                                                }
                                                            </span>
                                                        ) )
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Status</td>
                                                <td>{ this.state.reportData.statusString }</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </>
                    )
                }
            </PageContentControl>
        );
    };
};