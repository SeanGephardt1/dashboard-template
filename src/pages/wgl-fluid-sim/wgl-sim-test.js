import React from 'react';
import { DashboardContext } from '../../util/app-context.js';
import { PageContentControl } from '../../controls/layout/layout.js';
import Loader from '../../controls/progress-controls/loader.js';
import Svgs from '../../assets/svg-assets.js';
import './wgl-sim-test.css';

import WGLViewer from '../../controls//qai-webgl/wgl-viewer.js';

export default class WebGlFluidSimTestPage extends React.Component
{
    static contextType = DashboardContext;
    static defaultProps = {
        Title: "dbtemp WebGL",
        LinkTitle: "dbtemp WebGL",
        Href: "/qai-wgl",
        Icon: Svgs.Icons.Support
    };
    constructor ( props )
    {
        super( props );
        document.title = WebGlFluidSimTestPage.defaultProps.Title;
        this.state = {
            isLoading: false,
            wglData: []
        };
        return;
    };
    componentDidMount()
    {   //  console.debug( "DevicePage.componentDidMount", this.context.DEBUG );
        return;
    };
    render ()
    {   //  console.debug( "this.context.Debug", this.context );
        return (
            <PageContentControl>
                { /* BEGIN CONTENT LAYOUT */ }
                {
                    this.state.isLoading === true && <Loader loaderText={ WebGlFluidSimTestPage.defaultProps.Title } />
                }
                {
                    this.state.isLoading === false &&
                    (
                        <>
                            { /* GLOBAL APP HEADER */ }
                            <div className="qai-app-panel-header">

                                { /* ZONE HEADER */ }
                                <div className="qai-areas-tabs-panel">

                                    <div className="qai-areas-tab-button">
                                        <span>{ WebGlFluidSimTestPage.defaultProps.Title }</span>
                                    </div>

                                </div>

                            </div>

                            { /* MAIN CONTENT AREA */ }
                            <div className="qai-webgl-container-panel">
                                <WGLViewer data={ this.state.wglData }/>
                            </div>
                        </>
                    )
                }
                { /* END CONTENT LAYOUT */ }
            </PageContentControl>
        );
    };
};