import React from 'react';
import './tabs.css';

export default class TabsContainerControl extends React.Component
{
    constructor( props )
    {
		super( props );
		this.state = { currentTab: 0 };
		return;
	};
	OnClick_SwitchTab( idx, ev )
	{	//	console.debug( 'TabsContainerControl()=>OnClick_SwitchTab(idx,ev)', idx );
		this.setState( { currentTab: idx } );
		return;
	};
    render()
	{
		return (
			<div className="tabs-container">
				<div className="tab-btn-row">
					{
						this.props.buttons.map( ( item, idx ) => (
							<div
								key={ idx }
								tabIndex="0"
								className={ this.state.currentTab === idx ? 'tab-btn tab-btn-selected' : 'tab-btn' }
								onClick={ this.OnClick_SwitchTab.bind( this, idx ) }
								onKeyPress={ this.OnClick_SwitchTab.bind( this, idx ) }>{ item }</div>
							) )
					}
				</div>
				<div className="tab-panel-row">
					{
						this.props.panels.map( ( item, idx ) => (
							this.state.currentTab === idx &&
							<div
								key={ idx }
								className="tab-panel">
								{ item }
							</div>
						) )
					}
				</div>
			</div>
        );
    }
};