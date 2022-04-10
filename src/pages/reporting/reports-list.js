import React from 'react';
import { DashboardContext } from '../../util/app-context.js';
import { PageContentControl } from '../../controls/layout/layout.js';
import Loader from '../../controls/progress-controls/loader.js';
import Svgs from '../../assets/svg-assets.js';
import QAPI from '../../util/app-web-api.js';
import { NavLink } from 'react-router-dom';
import PdfGenerator from './pdf-gen.js';
import './reports-list.css';
//  import RulesErrorControl from '../../controls/rules-error/rules-error.js';

export default class ReportsListPage extends React.Component
{
    static contextType = DashboardContext;
    static defaultProps = {
        Title: "Reporting",
        LinkTitle: "Reporting",
        Href: "/reports",
        Icon: Svgs.Icons.Reporting
    };
    constructor ( props )
    {
        super( props );

        this.Columns = [
            { name: "ID", key: "id"},
            { name: "Created", key: "createdOn"},
            { name: "Progress", key: "progress"},
            { name: "Status", key: "statusString"}
        ];

        this._sort_dir_asc = "asc";
        this._sort_dir_desc = "desc";

        this.Data = [];
        this.pageData = [];
        this.pageSize = 25;
        this.pageTotal = 0;
        this.hasPages = false;

        this.state = {
            isLoading: true,
            displayContextPanel: false,
            apiException: false,

            currentRowSelected: 0,
            currentRowData: this.Data[ 0 ],

            currentPage: 0,

            currentColumnSortedIndex: 1,
            currentColumnSortDirection: this._sort_dir_desc
        };

        document.title = ReportsListPage.defaultProps.Title;
        return;
    };

    // API CALLS
    async Fetch_ReportsList()
    {   //  console.debug( "Fetch_ReportsListData()" );
        await fetch(
            QAPI.Routes.GetGetAllReports,
            QAPI.DefaultGetOptions )
            .then( response => response.json() )
            .then( data =>
            {   //   console.debug( "Fetch_ReportsListData().fetch::data", data.length );
                if ( data.length > 0 )
                {
                    //  data[ 0 ].statusString = 'red';

                    // FIX IMAGE PATHS and other data for UI
                    data.forEach( ( v, i, a ) =>
                    {   //  console.debug( i, v );
                        for ( let ip = 0; ip < v.imagePaths.length; ip++ )
                        {
                            v.imagePaths[ ip ] = QAPI.Uri + v.imagePaths[ ip ];
                        }

                        // FOR CURRENT UI DESIGN
                        v.progress = Math.random() > 0.1 ? "Complete" : "In Progress";

                        //  console.debug( i, 'v.statusString', typeof v.statusString, v.statusString );
                        if ( v.statusString === undefined || v.statusString === "" )
                        {
                            v.statusString = "red";
                        }
                        //  console.debug( '\tpostv.statusString', v.statusString );

                        return;
                    } );

                    this.Data = data;
                    this.pageData = this.Data.slice( 0, this.pageSize );
                    this.pageTotal = Math.round( ( this.Data.length / this.pageSize ) + 1);

                    if ( data.length >= this.pageSize )
                    {
                        this.hasPages = true;
                    }

                    this.setState( {
                        isLoading: false,
                    } );
                }
                else
                {
                    this.setState( {
                        isLoading: false,
                        displayContextPanel: false
                    } );
                }

                return;
            } )
            .catch( ( error ) =>
            {
                console.error( "There is an error with the QUIVR.AI API.", error );

                this.setState( {
                    isLoading: false,
                    apiException: true
                } );

                return;
            } );
        return;
    };

    // EVENT HANDLERS
    OnClick_Page( val, ev )
    {   //  console.debug( 'OnClick_Page', val, this.state.currentPage );
        let _temp_page_val = this.state.currentPage;

        if ( val === false )
        {
            _temp_page_val--;

            if ( _temp_page_val < 0 )
            {
                _temp_page_val = 0;
            }
        }
        else if ( val === true )
        {
            _temp_page_val++;

            if ( _temp_page_val >= this.pageTotal - 1)
            {
                _temp_page_val = this.pageTotal -1;
            }
        }

        if ( _temp_page_val === 0 )
        {
            this.pageData = this.Data.slice( 0, this.pageSize );
        }
        else
        {
            const _page_index = ( _temp_page_val * this.pageSize ) + 1;
            const _page_length = ( _page_index + this.pageSize );

            this.pageData = this.Data.slice( _page_index, _page_length );
        }

        this.setState( {
            currentPage: _temp_page_val,
            currentRowSelected: 0,
            currentRowData: this.pageData[ 0 ]
        } );
        return;
    };
    OnClick_SortColumn( col_idx, ev )
    {   //  console.debug( 'OnClick_SortColumn()', col_idx, this.state.currentColumnSortDirection, this.state.currentPage );
        //  console.debug( 'OnClick_SortColumn()', col_idx, this.state.currentColumnSortedIndex );

        const _self = this;
        let _dir = undefined;

        //  CHECK THE DIRECTION BASED ON PAGE INDEX
        //  DONT CHANGE DIRECTION WHEN COLUMN CHANGES
        if ( this.state.currentColumnSortedIndex === col_idx )
        {
            if ( this.state.currentColumnSortDirection === this._sort_dir_asc )
            {
                _dir = this._sort_dir_desc;
            }
            else if ( this.state.currentColumnSortDirection === this._sort_dir_desc )
            {
                _dir = this._sort_dir_asc;
            }
        }
        else
        {
            _dir = this._sort_dir_desc;
        }

        // GET COLUMN KEY
        const _col_key = this.Columns[ col_idx ].key;
        //  console.debug( '_col_key', _col_key );

        // SORT BY COLUMN
        this.Data.sort( function ( a, b )
        {   //  console.debug( 'a:', a, 'b:', b, _col_key, _dir, _self._sort_dir_asc, _self._sort_dir_desc );
            if ( _dir === _self._sort_dir_asc )
            {
                if ( a[ _col_key ] > b[ _col_key ] )
                {
                    return 1;
                }
                else if ( a[ _col_key ] < b[ _col_key ] )
                {
                    return -1;
                }
            }
            else if ( _dir === _self._sort_dir_desc )
            {
                if ( a[ _col_key ] > b[ _col_key ] )
                {
                    return -1;
                }
                else if ( a[ _col_key ] < b[ _col_key ] )
                {
                    return 1;
                }
            }
            return 0;
        }, [ _col_key, _dir, _self._sort_dir_asc, _self._sort_dir_desc ] );
        //console.debug('0', this.Data[ 0 ][ _col_key ], '1', this.Data[ 1 ][ _col_key ] );

        //  SLICE DATA  ARRAY BASED ON PAGEINDEX
        if ( this.state.currentPage === 0 )
        {
            this.pageData = this.Data.slice( 0, this.pageSize );
        }
        else
        {
            const _page_index = ( this.state.currentPage * this.pageSize ) + 1;
            const _page_length = ( _page_index + this.pageSize );

            this.pageData = this.Data.slice( _page_index, _page_length );
        }
        //  RESET SELECTED ROW

        //  console.debug( 'OnClick_SortColumn()::state::columnIdx, _dir', columnIdx, _dir );
        this.setState( {
            currentColumnSortedIndex: col_idx,
            currentColumnSortDirection: _dir
        } );
        return;
    };
    OnClick_SelectReportRow( data, rowIndex, ev )
    {   //  console.debug( "OnClick_SelectReportRow", rowIndex, data, this.state.displayContextPanel  );
        if ( this.state.displayContextPanel === true )
        {
            this.setState( {
                currentRowSelected: rowIndex,
                currentRowData: data
            } );
        }
        else if ( this.state.displayContextPanel === false )
        {
            this.setState( {
                displayContextPanel: !this.state.displayContextPanel,
                currentRowSelected: rowIndex,
                currentRowData: data
            } );
        }
        return;
    };
    OnClick_CloseContextPanel( ev )
    {   //  console.debug( "OnClick_CloseContextPanel" );
        this.setState( {
            displayContextPanel: false,
            currentRowSelected: undefined,
            currentRowData: undefined
        } );
        return;
    };

    OnClick_Download_PDF_Report( ev )
    {   //  console.debug( 'OnClick_Download_PDF_Report' );
        PdfGenerator.CreatePdf( this.state.currentRowData );
        return;
    };

    componentDidMount()
    {   //  console.debug( "ReportsListPage.componentDidMount" );
        this.Fetch_ReportsList();
        return;
    }
    render()
    {   //  console.debug( "ReportsListPage.render()", this.state.currentRowData);
        return (
            <PageContentControl>
                { /* BEGIN CONTENT LAYOUT */ }
                {
                    this.state.isLoading === true && <Loader loaderText={ ReportsListPage.defaultProps.Title } />
                }
                {
                    this.state.isLoading === false &&
                    <>

                        { /* HEADER */ }
                        <div className="qai-app-panel-header">
                            { /* PAGE HEADER */ }
                            <div className="qai-app-section">{ ReportsListPage.defaultProps.Title }</div>
                            { /* CONTEXT PANEL BTN */ }
                        </div>

                        { /* CONTENT */ } 
                        <div className="report-list-main-layout">

                            { /* section that is not the context panel */ }
                            { /* scrollable table layout */ }
                            <div className="q-scroll-table">

                                { /* PAGINATION PANEL */ } 
                                <div className="q-table-paging-panel">
                                    {
                                        this.Data.length === 0 &&
                                        <div className="q-table-result-count">Currently, there are no generated reports.</div>
                                    }
                                    {
                                        this.Data.length > 0 &&
                                        <div className="q-table-result-count">{ this.Data.length + ' results' }</div>
                                    }
                                    {
                                        this.hasPages === true &&
                                        <div className="q-table-page-ctrl-panel">
                                            <button
                                                tabIndex="0"
                                                className="page-arrow"
                                                onClick={ this.OnClick_Page.bind( this, false ) }
                                                onKeyPress={ this.OnClick_Page.bind( this, false ) }
                                                disabled={ (this.state.currentPage === 0) ? 'disabled' : ''}>&larr;</button>
                                            <span className="page-count">Page { this.state.currentPage + 1 } of { this.pageTotal }</span>
                                            <button
                                                tabIndex="0"
                                                className="page-arrow"
                                                onClick={ this.OnClick_Page.bind( this, true ) }
                                                onKeyPress={ this.OnClick_Page.bind( this, false ) }
                                                disabled={ (this.state.currentPage === this.pageTotal - 1) ? 'disabled' : '' }
                                            >&rarr;</button>
                                        </div>
                                    }
                                    {
                                        this.state.apiException === true &&
                                        <div className="q-table-exception-panel">There was an error when retrieving reporting data.</div>
                                    }
                                </div>

                                <table cellPadding="0" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            {
                                                this.Columns.map( ( item, index ) => (
                                                    <th
                                                        key={ index }
                                                        tabIndex="0"
                                                        onClick={ this.OnClick_SortColumn.bind(
                                                            this,
                                                            index ) }
                                                        onKeyPress={ this.OnClick_SortColumn.bind(
                                                            this,
                                                            index ) }
                                                    >
                                                        <>
                                                        <span className={ this.state.currentColumnSortedIndex === index ?
                                                            'rt-header-text-sorted' : 'rt-header-text' }>{ item.name }</span>
                                                        <span className={
                                                            this.state.currentColumnSortedIndex === index &&
                                                            this.state.currentColumnSortDirection === "asc" ?
                                                                'rt-sorted' : 'rt-unsorted' } >&uarr;</span>
                                                        <span className={
                                                            this.state.currentColumnSortedIndex === index &&
                                                            this.state.currentColumnSortDirection === "desc" ?
                                                                    'rt-sorted' : 'rt-unsorted' }>&darr;</span>
                                                        </>
                                                    </th>
                                                ) )
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.pageData.map( ( item, index ) => (
                                                <tr
                                                    key={ index }
                                                    className={ this.state.currentRowSelected === index ? 'reporting-row rr-highlight' : 'reporting-row' }
                                                    onClick={ this.OnClick_SelectReportRow.bind( this, item, index ) }>
                                                    <td>
                                                        <NavLink
                                                            tabIndex="0"
                                                            to={ '/reports/' + item.id }
                                                            title={ 'Report: ' + item.id }
                                                        >{ item.id }</NavLink>
                                                    </td>
                                                    <td>{ new Date( item.createdOn ).toLocaleTimeString() }, { new Date( item.createdOn ).toLocaleDateString() }</td>
                                                    <td>{ item.progress }</td>
                                                    <td>
                                                        {/* item.statusString */}
                                                        {
                                                            item.statusString.toLowerCase().includes( 'green' ) === true &&
                                                            <>
                                                                { Svgs.Icons.CheckboxGreen }
                                                            </>
                                                        }
                                                        {
                                                            item.statusString.toLowerCase().includes( 'red' ) === true &&
                                                            <>
                                                                { Svgs.Icons.CheckboxRed }
                                                            </>
                                                        }
                                                        {
                                                            item.statusString.toLowerCase().includes( 'test' ) === true &&
                                                            <>
                                                                { Svgs.Icons.CheckboxTest }
                                                            </>
                                                        }
                                                    </td>
                                                </tr>
                                            ) )
                                        }
                                    </tbody>
                                    {/*<tfoot>*/}
                                    {/*    <tr>*/}
                                    {/*        <td>{ this.Data.length + ' results' }</td>*/}
                                    {/*        {*/}
                                    {/*            this.state.hasPages === true &&*/}
                                    {/*            <td>paging</td>*/}
                                    {/*        }*/}
                                    {/*        {*/}
                                    {/*            this.state.apiException === true &&*/}
                                    {/*            <td>There was an error when retrieving data</td>*/}
                                    {/*        }*/}
                                    {/*    </tr>*/}
                                    {/*</tfoot>*/}
                                </table>

                            </div>

                            { /* context panel */ }
                            {
                                this.state.displayContextPanel === true &&
                                <div className="report-context-panel">

                                    <div className="report-content-panel-header">
                                        <div>Report Summary</div>
                                        <div onClick={ this.OnClick_CloseContextPanel.bind( this ) }>{ Svgs.Icons.ContextCloseBtn}</div>
                                    </div>

                                    { /* REPORT IMAGE */ }
                                    {/*<RulesErrorControl data={ this.state.currentRowData } enableFullScreen={ true } />*/ }
                                    {
                                        this.state.currentRowData !== undefined &&
                                        this.state.currentRowData.imagePaths[ 0 ] !== undefined &&
                                        <div className="report-content-panel-image">
                                            <img
                                                className="report-deviation-image"
                                                src={ this.state.currentRowData.imagePaths[ 0 ] }
                                                alt={ 'Image for report number: ' + this.state.currentRowData.id } />
                                            <div>REPORT IMAGE</div>
                                        </div>
                                    }

                                    { /* PREVIEW--BASELINE IMAGE */ }
                                    {/*<RulesErrorControl data={ this.state.currentRowData } enableFullScreen={ true } />*/ }
                                    {
                                        this.state.currentRowData !== undefined &&
                                        this.state.currentRowData.imagePaths[ 1 ] !== undefined &&
                                        <div className="report-content-panel-image">
                                            <img
                                                src={ this.state.currentRowData.imagePaths[ 1 ] }
                                                alt={ 'Image for report number: ' + this.state.currentRowData.id } />
                                            <div>PREVIEW IMAGE</div>
                                        </div>
                                    }

                                    { /* DATA ROWS */}
                                    <div className="report-content-panel-row">
                                        <div>Recorded:</div>
                                        <div>{ new Date( this.state.currentRowData.createdOn ).toLocaleDateString() } at { new Date( this.state.currentRowData.createdOn ).toLocaleTimeString() }</div>
                                    </div>

                                    <div className="report-content-panel-row">
                                        <div>Status:</div>
                                        <div>{ this.state.currentRowData.statusString }</div>
                                    </div>

                                    <div className="report-content-panel-row">
                                        <div>Actions taken:</div>
                                        <div>
                                            {
                                                this.state.currentRowData.actionsTaken.map( ( item, idx2 ) => (
                                                    <span key={ idx2 }>
                                                        { item }
                                                        {
                                                            idx2 < this.state.currentRowData.actionsTaken.length - 1 && <>, </>
                                                        }
                                                    </span>
                                                ) )
                                            }
                                        </div>
                                    </div>

                                    { /* CONTEXT PANEL CTAS */}
                                    <div>
                                        <NavLink
                                            tabIndex="0"
                                            className='qai-btn-primary'
                                            to={ 'reports/' + this.state.currentRowData.id }
                                            title={ 'Report ' + this.state.currentRowData.id }
                                        >See full report</NavLink>
                                        <button
                                            tabIndex="0"
                                            className="qai-btn-primary"
                                            onClick={ this.OnClick_Download_PDF_Report.bind(this)}>Create PDF</button>
                                    </div>
                                </div>
                            }

                        </div>

                    </>
                }
            { /* END CONTENT LAYOUT */ }
            </PageContentControl>
        );
    };
};