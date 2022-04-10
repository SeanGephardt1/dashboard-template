import React from 'react';
//	import { NavLink } from 'react-router-dom';
import './layout.css';

//class PageHeaderControl extends React.Component
//{
//    constructor( props )
//    {
//        super( props );
//		return;
//	};
//	componentDidMount()
//	{	//	console.debug( "PageHeaderControl.componentDidMount()");
//		return;
//	}
//	componentWillUnmount()
//	{	//	console.debug( "PageHeaderControl.componentWillUnmount()" );
//		return;
//	};
//    render()
//	{	//	console.debug( "PageHeaderControl.render()", this.props );
//		return (
//			<div className="pg-header">
//				<div className="pg-header-panel">
//					{
//						this.props.pageLinks !== undefined &&
//						this.props.pageLinks.map( ( item, idx ) => (
//							<div className="pg-header-button" key={ idx }>
//								{
//									idx / 2 ? ( <span className="pg-header-divider">&nbsp;</span> ) : ''
//								}
//								<NavLink
//									key={ idx}
//								tabIndex="0"
//								to={ item.Href }
//								className='pg-header-link'
//								title={ item.LinkTitle }
//							>{ item.Title }</NavLink>
//							</div>
//						))
//					}
//				</div>
//				<div className="pg-header-panel">{this.props.children}</div>
//			</div>
//        );
//    }
//};

class PageContentControl extends React.Component
{
	constructor ( props )
	{
		super( props );
		return;
	};
	componentDidMount()
	{	//	console.debug( "PageContentControl.componentDidMount()");
		return;
	}
	componentWillUnmount()
	{	//	console.debug( "PageContentControl.componentWillUnmount()" );
		return;
	};
	render()
	{	//	console.debug( "PageContentControl.render()", this.props );
		return (
			<div className="pg-content" id="qai-page-content">{ this.props.children }</div>
		);
	}
};

//class PageContentRowControl extends React.Component
//{
//	constructor ( props )
//	{
//		super( props );
//		return;
//	};
//	render()
//	{	//	console.debug( "PageContentControl.render()", this.props );
//		return (
//			<div className="pg-content-row">{ this.props.children }</div>
//		);
//	}
//};

export
{
	//	PageHeaderControl,
	PageContentControl,
	//	PageContentRowControl
};