import ReactDOM from 'react-dom';
import QuivrWebApp  from './App.js';

( function ()
{
	console.clear();
	const _app_string = QuivrWebApp.defaultProps.Description + ' v:' + QuivrWebApp.defaultProps.BuildNumber;

	console.log( "BEGIN\t", _app_string, new Date().toISOString() );
	try
	{
		window.document.addEventListener( "DOMContentLoaded", function ( e ) 
		{
			ReactDOM.render( <QuivrWebApp/>, document.getElementById("qai-app-root"));
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