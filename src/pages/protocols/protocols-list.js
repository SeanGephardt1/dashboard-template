import React from 'react';
import { DashboardContext } from '../../util/app-context.js';
import { PageContentControl } from '../../controls/layout/layout.js';
import Loader from '../../controls/progress-controls/loader.js';
import Svgs from '../../assets/svg-assets.js';
import QAPI  from '../../util/app-web-api.js';
import './protocols-list.css';
//  import { NavLink } from 'react-router-dom';
//  import { MockReportingData } from './sample-data.js';

export default class ProtocolsListPage extends React.Component
{
    static contextType = DashboardContext;
    static defaultProps = {
        Title: "Protocols",
        LinkTitle: "Protocols",
        Href: "/protocols",
        Icon: Svgs.Icons.Projects
    };
    constructor ( props )
    {
        super( props );

        if ( process.env.NODE_ENV === "development" )
        {
            console.debug( "process.env", process.env.NODE_ENV );
            console.debug( "process.env.REACT_APP_SVC_BUILD", process.env.REACT_APP_SVC_BUILD );
            console.debug( "QAPI.Uri", QAPI.Uri );
        }

        this.Data = [];

        this.state = {
            isLoading: true,
            displayContextPanel: true,
            projectsListApiException: false,
            projectsListApiMessage: "There are currently no projects saved to this service",
            projectsList: this.Data,
            currentProject: undefined,
        };

        document.title = ProtocolsListPage.defaultProps.Title;
        return;
    };

    // API CALLS
    async Fetch_Get_Projects_List()
    {   //  console.debug( "Fetch_Get_Projects_List()" );

        //await fetch( this._projects_list_url, this._get_options )
        //    .then( response => response.json() )
        //    .then( data =>
        //    {   //  console.debug( "Fetch_ReportsListData().fetch::data", data );
        //        // ADDING MORE META DATA HERE FOR PROTOTYPING PURPOSES
        //        if ( data.length > 0 )
        //        {
        //            this.Data = data;
        //            this.setState( {
        //                isLoading: false,
        //                projectsListApiMessage: data.length + ' projects found'
        //            } );
        //        }
        //        else
        //        {
        //            this.setState( {
        //                isLoading: false,
        //            } );
        //        }
        //        return;
        //    } )
        //    .catch( ( error ) =>
        //    {
        //        console.error( "There is an error when retrieving the list of projects from the dbtemp.AI QAI Protocols Service.", error );

        //        this.setState( {
        //            isLoading: false,
        //            projectsListApiException: true,
        //            projectsListApiMessage: "There is an error message when retrieving the list of projects from the dbtemp.AI QAI Protocol Service.",
        //        } );

        //        return;
        //    } );

        return;
    };

    // EVENT HANDLERS

    //  REACT LIFECYCLE
    componentDidMount()
    { 
        this.Fetch_Get_Projects_List();
        return;
    }
    render()
    {
        return (
            <PageContentControl>
                { /* BEGIN CONTENT LAYOUT */ }
                {
                    this.state.isLoading === true && <Loader loaderText={ ProtocolsListPage.defaultProps.Title } />
                }
                {
                    this.state.isLoading === false &&
                    <>

                        { /* HEADER */ }
                        { /* GLOBAL APP HEADER */ }
                        <div className="qai-app-panel-header">
                            { /* PAGE HEADER */ }
                            <div className="qai-app-section">{ ProtocolsListPage.defaultProps.Title }</div>
                            { /* CONTEXT PANEL BTN */ }
                        </div>

                        { /* CONTENT */ } 
                        <div className="projects-list-layout">
                            {
                                this.state.projectsListApiException === true &&
                                <>
                                    <div className="qai-page-notification qpn-error">{ this.state.projectsListApiMessage }</div>
                                    <div className="qai-page-notification qpn-warning">There is an warning message when retrieving the list of projects from the dbtemp.AI QAI Reporting Service.</div>
                                    <div className="qai-page-notification qpn-alert">There is an alert message when retrieving the list of projects from the dbtemp.AI QAI Reporting Service.</div>
                                    <div className="qai-page-notification qpn-info">There is an informational message when retrieving the list of projects from the dbtemp.AI QAI Reporting Service.</div>
                                    <div className="qai-page-notification qpn-success">There is an success message when retrieving the list of projects from the dbtemp.AI QAI Reporting Service.</div>
                                </>
                            }
                            {
                                this.state.projectsListApiException === false &&
                                <div>{ ProtocolsListPage.defaultProps.Title }</div>
                            }
                        </div>

                    </>
                }
            { /* END CONTENT LAYOUT */ }
            </PageContentControl>
        );
    };
};