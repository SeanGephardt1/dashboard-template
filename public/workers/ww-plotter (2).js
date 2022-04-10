let i = 0;
let _timer = undefined;
let _current_id = undefined;

class PlotterWorkerMessage
{
    constructor ( id, idx, d, data )
    {
        this.index = idx || -1;
        this.id = id || -1;
        this.date = d || new Date();
        this.data = data || "NO DATA";
    }
};

function Format_ControlMapData( id )
{
    //  console.debug( "Format_ControlMapData(id)", id );
    const _fake_id = Math.round( ( Math.random() * 9999 ).toString().replace( '.','' ) );
    //  console.debug( "_fake_id", _fake_id );
    return "Message: " + id + ' == ' + _fake_id;
};
function FetchControlMapCount( data )
{   //  
    console.debug( "Count", i, data );
    i++;

    if ( i <= 10 )
    {
        const _plotter_worker_message = new PlotterWorkerMessage( data.id, i, new Date(), Format_ControlMapData(data.id) );
        //  console.debug( "_plotter_worker_message", _plotter_worker_message );
        postMessage( _plotter_worker_message );
    }
    else
    {
        clearInterval( _timer );
        _timer = undefined;

        const _end_message = {
            id: data.id,
            message: "LAST_MESSAGE",
            date: new Date()
        };
        postMessage( _end_message );
    }
    return;
};

onmessage = function ( e )
{   //  
    console.debug( 'Worker: OnMessage', e.data.id, e.data.action );
    switch ( e.data.action )
    {
        case "startControlMapPlotter": {
            i = 0;
            clearInterval( _timer );
            _timer = undefined;
            _timer = this.setInterval( () => { FetchControlMapCount( e.data ) }, e.data.timer_value );
            break;
        }
        case "endControlMapPlotter": {
            i = 0;
            clearInterval( _timer );
            _timer = undefined;
            let _end__default_message = new PlotterWorkerMessage();
            postMessage( _end__default_message );
            break;
        }
        default: {
            i = 0;
            clearInterval( _timer );
            _timer = undefined;
            let _end__default_message = new PlotterWorkerMessage();
            postMessage( _end__default_message );
            break;
        }
    };
    return;
}

function ProcessWorker()
{   //  console.debug( "ProcessWorker()" );
    return;
};
ProcessWorker();