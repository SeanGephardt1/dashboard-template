import React from 'react';
import { DashboardContext } from '../../util/app-context.js';
import { PageContentControl } from '../../controls/layout/layout.js';
import Loader from '../../controls/progress-controls/loader.js';
import Svgs from '../../assets/svg-assets.js';
import './support.css';

export default class SupportHomePage extends React.Component
{
    static contextType = DashboardContext;
    static defaultProps = {
        Title: "Support",
        LinkTitle: "Support",
        Href: "/support",
        Icon: Svgs.Icons.Support
    };
    constructor ( props )
    {
        super( props );
        document.title = SupportHomePage.defaultProps.Title;
        this.state = { isLoading: false };
        return;
    };
    componentDidMount()
    {
        return;
    };
    render ()
    {
        return (
            <PageContentControl>
                { /* BEGIN CONTENT LAYOUT */ }
                {
                    this.state.isLoading === true && <Loader loaderText={ SupportHomePage.defaultProps.Title } />
                }
                {
                    this.state.isLoading === false &&
                    (
                        <>
                            <div className="page-header" style={ { 'padding': '10px', 'paddingLeft': '20px', 'paddingTop': '20px', 'height': '50px' } }>
                                <span title={ SupportHomePage.defaultProps.Title }>{ SupportHomePage.defaultProps.Title }</span>
                            </div>
                        </>
                    )
                }
                { /* END CONTENT LAYOUT */ }
            </PageContentControl>
        );
    };
};