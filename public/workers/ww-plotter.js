let i = 0;
let _timer = undefined;

class PlotterWorkerMessage
{
    constructor ( id, idx, d, data )
    {
        this.index = idx || -1;
        this.id = id || -1;
        this.timestamp = d || new Date();
        this.message = data || "NO DATA";
    }
};

function Format_ControlMapData( deviceData )
{   //  console.debug( "Format_ControlMapData(id)", deviceData );
    //  console.debug( 'deviceData.live.controls[i]', i, deviceData.live.controls[ 0 ] );
    deviceData.updated = Date.now();

    //  console.debug( 'deviceData.live.range', deviceData.live.range );
    //  deviceData.live.range = deviceData.live.range + Math.round()

    for ( let i = 0; i < deviceData.live.controls.length; i++ )
    {
        deviceData.live.controls[ i ].isActivated = Math.random() > 0.5 ? true : false;
        deviceData.live.controls[ i ].isTriggered = Math.random() > 0.5 ? true : false;

        deviceData.live.controls[ i ].confidence = Math.random().toPrecision( 2 );
        deviceData.live.controls[ i ].score = Math.random().toPrecision( 2 );
        deviceData.live.controls[ i ].threshold = Math.random().toPrecision( 2 );
    }
    return deviceData;
};
function FetchControlMap( data )
{   //  console.debug( "FetchControlMap", i, data.item );
    const _plotter_worker_message = new PlotterWorkerMessage( data.id, i, new Date(), Format_ControlMapData( data.item ) );
    //  console.debug( "_plotter_worker_message", _plotter_worker_message );
    postMessage( _plotter_worker_message );

    //i++;
    //if ( i <= 10 )
    //{
    //    const _plotter_worker_message = new PlotterWorkerMessage( data.id, i, new Date(), Format_ControlMapData( data.item ) );
    //    //  console.debug( "_plotter_worker_message", _plotter_worker_message );
    //    postMessage( _plotter_worker_message );
    //}
    //else
    //{
    //    console.debug( "FetchControlMap()::STOPPING" );
    //    clearInterval( _timer );
    //    _timer = undefined;
    //}
    return;
};

//   TIME_VALUE SET IN devices-list.js file line # 533
onmessage = function ( e )
{   //  console.debug( 'Worker: OnMessage', e.data.id, e.data.action, e.data.timer_value );

    switch ( e.data.action )
    {
        case "startControlMapPlotter": {
            i = 0;
            clearInterval( _timer );
            _timer = undefined;
            _timer = this.setInterval( () => { FetchControlMap( e.data ) }, e.data.timer_value );
            break;
        }
        case "endControlMapPlotter": {
            //  console.debug( "FetchControlMap()::STOPPED" );
            i = 0;
            clearInterval( _timer );
            _timer = undefined;
            break;
        }
        default: {
            i = 0;
            clearInterval( _timer );
            _timer = undefined;
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