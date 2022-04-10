export default class Utilities 
{
	static RandomNumberRange( min, max )
	{	//	console.debug( "RandomNumberRange", min, max );
		const _rv = Math.round(Math.random() * ( max - min ) + min);
		//	console.debug( "_rv", _rv );
		return _rv; 
	}

	static NewGuid()
	{
		const S4 = function () 
		{
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		};
		return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
	};
	static NewShortGuid()
	{
		const S4 = function () 
		{
			return ( ( ( 1 + Math.random() ) * 0x10000 ) | 0 ).toString( 16 ).substring( 1 );
		};
		return ( 'id-' + S4() );
	};

	// react related -  id & key methods
	static NewId( strValue )
	{
		let _rv = "";
		let _id_name = "";
		if ( strValue !== undefined )
		{
			_id_name = strValue + "-";
		}
		else
		{
			_id_name = "id-";
		}
		_rv = _id_name + Math.random().toPrecision( 7 ).replace( ".", "" );
		//	console.debug( "Utilities.NewId()._rv", _rv );
		return _rv;
	};
	static NewBlockID()
	{
		let _block = [];
		for ( let i = 0; i < 5; i++ )
		{
			_block[i] = Math.random().toFixed( 7 ).toString().split( "." )[1];
		}
		const _returnValue = Object.freeze( _block.join( "-" ).toString() );
		//	console.debug( "_returnValue", _returnValue );
		return _returnValue;
	};
	static NewKey()
	{	// react.js specific for putting new react elements into arrays prior to referencing in react.render()
		const _rv = "key-" + Math.random().toPrecision( 7 ).replace( ".", "" );
		//	console.debug( "Utilities.NewKey()._rv", _rv );
		return _rv;
	};
	static FormatPathFromTitle( strName )
	{
		let _new_replace = strName.replace( / /gi, "-" );
		let _new_lower = encodeURI( _new_replace.toLowerCase() );
		//	console.debug( "_new_lower", _new_lower );
		return _new_lower;
	};

	// REACT SPECIFIC , to insert SVG & HTML
	static CreateSvgMarkup( svgIcon )
	{	//	console.debug( "CreateSvgMarkup", svgIcon );
		return { __html: svgIcon };
	};
	static RenderMarkup( stringValue )
	{	//	console.debug( "RenderMarkup", stringValue );
		return { __html: stringValue };
	};

	// data generator methods
	static SortType()
	{
		return  {
			DEFAULT: { text: "default", arrow: "&varr;" },
			ASC: { text: "asc", arrow: "&uarr;" },
			DESC: { text: "desc", arrow: "&darr;" }
		};
	};
	static SortArrays( dataArray, sortKey, sortDirection )
	{	//	console.debug( "UNDER CONSTRUCTION:: Utilities.SortArrays" );
		dataArray.sort( function ( a, b )
		{
			if ( a[sortKey] === b[sortKey])
			{
				return 0;
			}
			else if ( a[sortKey] > b[sortKey] )
			{
				return 1;
			}
			else if ( a[sortKey] < b[sortKey] )
			{
				return -1;
			}
			return null;
		} );
		return;
	};
	static ArrayCopy( arr )
	{
		let _rv = [];
		for ( let i = 0; i < arr.length; i++ )
		{// copy object
			let _new = { ...arr[i] };
			_rv.push( _new );
		}
		return _rv;
	};
}