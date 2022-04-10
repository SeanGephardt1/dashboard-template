import ReactDOM from 'react-dom';
import DashboardWebApp  from './App.js';

( function ()
{
	console.clear();
	const _app_string = DashboardWebApp.defaultProps.Description + ' v:' + DashboardWebApp.defaultProps.BuildNumber;

	console.log( "BEGIN\t", _app_string, new Date().toISOString() );
	try
	{
		window.document.addEventListener( "DOMContentLoaded", function ( e ) 
		{
			ReactDOM.render( <DashboardWebApp/>, document.getElementById("app-root"));
			return;
		} );
	}
	catch ( ex )
	{
		console.log( "CATCH", _app_string, new Date().toISOString() );
		console.error( ex.number, ":", ex.name, ":", ex.message );
		console.error( "exception stack::", ex.stack );
		return;
	}
	finally
	{
		console.log( "FINALLY\t", _app_string, new Date().toISOString() );
	}
	console.log( "END\t\t", _app_string, new Date().toISOString() );
	return;
} )();