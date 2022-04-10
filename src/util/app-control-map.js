//	WIP - CONTROL MAP CLASS
//	WILL EVENTUALLY MAP TO SERIALIZED CODE

import { SensorControlTypes } from './app-sensor-control-types.js';
import Utilities from './app-utilities.js';

export default class SensorControl
{
	// PRIVATE TRANSFORM OBJECT
	#ctrlObj = {};

	// USING DEFAULT 'PROPS' OBJECT FOR INITIALIZATION
	constructor ( props )
	{
		this.ParseProperties( props );
		return;
	};
	ParseProperties( propsObj )
	{	//	PARSE TO PRIVATE OBJECT
		this.#ctrlObj.links = [];
		const _split_array = propsObj.split(',');

		for ( let i = 0; i < _split_array.length; i++ )
		{
			if ( i % 2 === 0 )
			{	//	console.debug( i, _split_array[ i ], _split_array[ i + 1 ] );

				// TRANSFORM BOOL VALUES
				let _v = _split_array[ i + 1 ];
				if ( _v === "TRUE" )
				{
					_v = true;
				}
				if ( _v === "FALSE" )
				{
					_v = false;
				}

				// SPECIAL CASES FOR ARRAY "link" ETC.
				if ( _split_array[ i ] === "link" )
				{
					this.#ctrlObj.links.push( _split_array[ i + 1 ] );
				}
				else
				{
					this.#ctrlObj[ _split_array[ i ] ] = _v;
				}
			}
		}

		//console.log( Object.keys( SensorControlTypes ) );
		//console.log( Object.values( SensorControlTypes ) );

		let _type = Object.values( SensorControlTypes ).find( ( item ) =>
		{
			return item.value === parseInt( this.#ctrlObj.type );
		} );

		this.id = Utilities.NewShortGuid();
		this.index = parseFloat( this.#ctrlObj.control || 0 );
		this.name = ( "Control Name " + this.#ctrlObj.control || "Default Control Name" );
		this.type = ( _type || SensorControlTypes.Unknown );
		this.rawType = this.#ctrlObj.type;
		this.top = parseFloat( this.#ctrlObj.top || 0 );
		this.bottom = parseFloat( this.#ctrlObj.bottom || 0 );
		this.left = parseFloat( this.#ctrlObj.left || 0 );
		this.right = parseFloat( this.#ctrlObj.right || 0 );
		this.height = parseFloat( ( this.#ctrlObj.bottom - this.#ctrlObj.top ).toString() || 100 );
		this.width = parseFloat( ( this.#ctrlObj.right - this.#ctrlObj.left ).toString() || 100 );
		this.age = parseFloat( this.#ctrlObj.age || 0 );
		this.confidence = parseFloat( this.#ctrlObj.confidence || 0 );
		this.threshold = parseFloat( this.#ctrlObj.threshold || 0 );
		this.score = parseFloat( this.#ctrlObj.score || 0 );
		this.scoreCache = [ parseFloat( this.#ctrlObj.score ) ];
		this.controlsLights = ( this.#ctrlObj.controlsLights || false );
		this.controlsBlue = ( this.#ctrlObj.controlsBlue || false );
		this.startActivated = ( this.#ctrlObj.startActivated || false );
		this.isReset = ( this.#ctrlObj.isReset || false );
		this.isActivated = ( this.#ctrlObj.isActivated || false );
		this.isTriggered = ( this.#ctrlObj.isTriggered || false );
		this.links = ( this.#ctrlObj.links || [] );
		this.linkSets = [];
		this.notifications = parseFloat( this.links.length || 0 );
		return;
	};
};