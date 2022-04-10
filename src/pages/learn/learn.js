import React from 'react';
import { DashboardContext } from '../../util/app-context.js';
import { PageContentControl } from '../../controls/layout/layout.js';
import Loader from '../../controls/progress-controls/loader.js';
import Svgs from '../../assets/svg-assets.js';
import './learn.css';

export default class LearningHomePage extends React.Component
{
    static contextType = DashboardContext;
    static defaultProps = {
        Title: "Learn",
        LinkTitle: "Learn",
        Href: "/learn",
        Icon: Svgs.Icons.Learn
    };
    constructor ( props )
    {
        super( props );
        document.title = LearningHomePage.defaultProps.Title;
        this.state = {
            isLoading: false,
        };
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
                    this.state.isLoading === true && <Loader loaderText={ LearningHomePage.defaultProps.Title } />
                }
                {
                    this.state.isLoading === false &&
                    (
                        <>
                            { /* HEADER */ }
                            <div className="page-header" style={ { 'padding': '10px', 'paddingLeft': '20px', 'paddingTop': '20px', 'height': '50px' } }>
                                <span title={ LearningHomePage.defaultProps.Title }>{ LearningHomePage.defaultProps.Title }</span>
                            </div>
                        </>
                    )
                }
                { /* END CONTENT LAYOUT */ }
            </PageContentControl>
        );
    };
};