import packageJson from './../package.json';
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { AppConfig } from './config.js';
import { DashboardContext } from './util/app-context.js';
import { AppRoutes, AuthenticationPage, FourOhFourPage } from './pages/routes.js';
import SiteNavigation from './controls/nav/nav.js';
import './css/all.css';

export default class DashboardWebApp extends React.Component
{
    static contextType = DashboardContext;
    static defaultProps = {
        BuildNumber: packageJson.version,
        Description: packageJson.description,
        Application: "QUIVR.AI Dashboard",
        StorageKeys: {
            IsAuthenticated: "qai-auth",
            Token: "qai-token",
            LastAuth: "qai-lastAuth"
        }
    };
    constructor ( props )
    {
        super( props );
        this.StoreKeys = DashboardWebApp.defaultProps.StorageKeys;

        this.state = {
            userAuthenticated: false,
            isLoading: false,
            hasRedirect: false,
            _previous_uri: window.location.pathname
        };

        document.title = DashboardWebApp.defaultProps.Application;
        document.getElementsByTagName( "META" )[ 1 ].content = process.env.REACT_APP_NAME;
        document.getElementsByTagName( "META" )[ 2 ].content = process.env.NODE_ENV + '.' + process.env.REACT_APP_BUILD;
        document.getElementsByTagName( "META" )[ 3 ].content = process.env.REACT_APP_SVC_BUILD;

        return;
    };

    //  BREAK OUT TO UTILS MODULE
    ValidateLocalStorage()
    {   //  ADD COOKIES?
        //  console.debug( "VALIDATE LOCALSTORAGE", this.context.User);

        // set default storage state
        if ( window.localStorage[ this.StoreKeys.IsAuthenticated ] === undefined )
        {
            //  console.debug( "SET", this.StoreKeys.IsAuthenticated, this.context.User.IsAuthenticated);
            window.localStorage.setItem( this.StoreKeys.IsAuthenticated, false );
            window.localStorage.setItem( this.StoreKeys.Token, "" );
            window.localStorage.setItem( this.StoreKeys.LastAuth, Date.now() );
        }

        // DISABLING FOR BETA
        //  CHECK LAST AUTH TIME IS WITH 1 HOUR        
        //let _timeout_value = 0;
        //if ( AppConfig.SessionTimeout === null )
        //{
        //    _timeout_value = 7200000; 
        //}
        //else
        //{
        //    _timeout_value = AppConfig.SessionTimeout
        //}

        //let _current = new Date( Date.now() - _timeout_value );
        //let _last_auth = Number( window.localStorage[ this.StoreKeys.LastAuth ] );

        //if ( _last_auth < _current )
        //{
        //    //  console.debug( "RE-AUTH" );
        //    this.context.User.IsAuthenticated = false;
        //    this.context.User.Token = "";
        //    window.localStorage.setItem( this.StoreKeys.IsAuthenticated, this.context.User.IsAuthenticated );
        //    window.localStorage.setItem( this.StoreKeys.Token, this.context.User.Token );
        //    window.localStorage.setItem( this.StoreKeys.LastAuth, Date.now() );
        //    return;
        //}

        ////  USER AUTH
        ////  console.debug( "window.localStorage[ this.StoreKeys.IsAuthenticated ]", window.localStorage[ this.StoreKeys.IsAuthenticated ] );
        //if ( JSON.parse(window.localStorage[ this.StoreKeys.IsAuthenticated ]) === true )
        //{
        //    //console.debug( "SET",
        //    //    this.StoreKeys.IsAuthenticated, this.context.User.IsAuthenticated,
        //    //    this.StoreKeys.Token, this.context.User.Token
        //    //);

        //    this.context.User.IsAuthenticated = JSON.parse( window.localStorage[ this.StoreKeys.IsAuthenticated ] );
        //    this.context.User.Token = window.localStorage.getItem( this.StoreKeys.Token );
        //}

        return;
    };
    SignIn()
    {   //  console.debug( "SIGN IN", this.context.User, this.state._previous_uri );
        window.localStorage.setItem( this.StoreKeys.IsAuthenticated, this.context.User.IsAuthenticated );
        window.localStorage.setItem( this.StoreKeys.Token, this.context.User.Token );
        window.localStorage.setItem( this.StoreKeys.LastAuth, Date.now() );

        this.setState( { userAuthenticated: this.context.User.IsAuthenticated } );
        return;
    }; 
    SignOut()
    {   //  console.debug( "SIGN OUT" );
        this.context.User.IsAuthenticated = "false";
        this.context.User.Token = undefined;

        window.localStorage.setItem( this.StoreKeys.IsAuthenticated, this.context.User.IsAuthenticated );
        window.localStorage.setItem( this.StoreKeys.Token, this.context.User.Token );
        window.localStorage.setItem( this.StoreKeys.LastAuth, null );
        window.location.href = "/"
        return;
    };
    InitContext()
    {   //  console.debug( "InitContext" );//, this.state, this.context );
        this.ValidateLocalStorage();

        // add context methods
        this.context.DEBUG = AppConfig.DEBUG;
        this.context.SignIn = this.SignIn.bind( this );
        this.context.SignOut = this.SignOut.bind( this );

        return;
    };

    componentDidMount()
    {
        return;
    }
    componentWillUnmount()
    {
        return;
    };
    render()
    {
        this.InitContext();

        if ( this.context.User.IsAuthenticated === false )
        {
            return (
                <React.StrictMode>
                    <DashboardContext.Provider value={ this.context }>
                        <BrowserRouter>
                            <Switch>
                                <Route exact={ true } path="/" component={ AuthenticationPage } />
                                <Route exact={ true } path="*" >
                                    <Redirect push to="/" />
                                </Route>
                            </Switch>
                        </BrowserRouter>
                    </DashboardContext.Provider>
                </React.StrictMode>
            );
        }

        if ( this.context.User.IsAuthenticated === true)
        {   
            return (
                <React.StrictMode>
                <DashboardContext.Provider value={ this.context }>
                    <BrowserRouter >
                        {
                            ( this.state._previous_uri !== undefined && this.state._previous_uri !== "/" ) &&
                            <Redirect push to={ this.state._previous_uri } />
                        }
                        <>

                            { /* Navigation */ }
                            <SiteNavigation />

                            { /* Pages */ }
                            <main className="qai-main-panel">

                                <Switch>
                                    { /* defines the / root level landing page */ }
                                    <Route exact={ true } path="/index.html" >
                                        <Redirect push to="/devices" />
                                    </Route>
                                    <Route exact={ true } path="/default.html" >
                                        <Redirect push to="/devices" />
                                    </Route>
                                    <Route exact={ true } path="/" >
                                        <Redirect push to="/devices" />
                                    </Route>
                                    {
                                        AppRoutes.map( ( item, idx ) => (
                                            <Route key={ idx} exact={ true } path={ item.defaultProps.Href } component={ item } />
                                        ) )
                                    }
                                    <Route exact={ false } path="*" component={ FourOhFourPage } />
                                </Switch>

                            </main>
                        </>
                    </BrowserRouter>
                    </DashboardContext.Provider>
                </React.StrictMode>
            );
        }
    };
};