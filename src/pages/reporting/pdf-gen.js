// WRAPPER TO REUSE PDF GENERATION
import { jsPDF } from "jspdf";

export default class PdfGenerator
{
	constructor( obj )
	{
		this.properties = obj;
	};
	static CreatePdf( d )
    {   //  console.debug( 'PdfGenerator.CreatePdf(d)', d );
        const _pdf_file_name = d.id.replace( /[_:.]/gmi, '-' );
        //  console.debug( '_pdf_file_name', _pdf_file_name );

        const _doc_props = {
            name: "QUIVR.AI Incident Report " + new Date().toLocaleString(),
            "QUIVR.AI Customer": "Valued Customer",
            creator: "QUIVR.AI Copyright 2021",
            title: _pdf_file_name
        };
        //  console.debug( '_doc_props', _doc_props );

        const doc = new jsPDF();
        doc.setDocumentProperties( _doc_props);
        doc.setCreationDate( new Date() );
        doc.setDisplayMode( 'fullwidth', 'continuous', 'UseThumbs' );
        doc.setFileId( d.id );
        doc.setCharSpace( 0 );
        doc.setFontSize( 14 );

        // FORMAT DOCUMENT
        doc.text( "QUIVR.AI Incident Report: " + d.id, 5, 8 );

        //  API - addImage(imageData, format, x, y, width, height, alias, compression, rotation);
        doc.addImage( d.imagePaths[ 0 ], "JPEG", 5, 10, 200, 120, "base-detection-image", "FAST", 0 );

        //  REPORT METADATA
        const _left_1= 5;
        const _left_2 = 50;

        const _top_1 = 140;
        const _top_2 = 145;
        const _top_3 = 150;
        const _top_4 = 155;
        const _top_5 = 160;


        doc.setFontSize( 12 );
        doc.text( "Sensor Device ID:", _left_1, _top_1 );
        doc.text( "Incident Date:", _left_1, _top_2 );
        doc.text( "Incident Time:", _left_1, _top_3 );
        doc.text( "Actions Taken:", _left_1, _top_4 );
        doc.text( "Status:", _left_1, _top_5 );

        doc.text( d.deviceId.toString(), _left_2, _top_1 );
        doc.text( new Date( d.createdOn ).toLocaleDateString(), _left_2, _top_2 );
        doc.text( new Date( d.createdOn ).toLocaleTimeString(), _left_2, _top_3 );
        doc.text( d.actionsTaken[ 0 ].toString(), _left_2, _top_4 );
        doc.text( d.statusString.toString(), _left_2, _top_5 );

        //// TESTING GRAPHICS PLACEMENT
        //doc.setDrawColor( 255, 0, 0 );
        //doc.setLineWidth( 2 );
        //doc.setLineCap( 2 );
        //doc.setLineHeightFactor( 2 );
        //doc.setLineJoin( 2 );
        //doc.setLineMiterLimit( 2 );
        ////  H
        //doc.line( 175, 150, 200, 150, "S" );
        //doc.line( 175, 170, 200, 170, "S" );
        //// V
        //doc.line( 175, 150, 175, 170, "S" );
        //doc.line( 200, 150, 200, 170, "S" );

        //// RESET VIEW TO PAGE 1
        doc.setPage( 1 );

        //// DOCUMENT OUTPUT FOR DOWNLOAD & SAVING
        doc.save( _pdf_file_name );
        ////  doc.output( "pdfobjectnewwindow", { "filename": _pdf_file_name });
        ////  doc.autoPrint();
        doc.close();
        return;
	};
};