/******  CONSTANTS  ******/
var		k_Layout01			= 1;
var		k_Layout02			= 2;
var		k_Layout03			= 3;
var		k_Layout04			= 4;
var		k_Layout05			= 5;
/*************************/



/******  GLOBAL VARIABLES  ******/
var		g_ProcessUserEvents	= false;
var		g_CurrentLayout		= k_Layout01;
/********************************/



/************/
$(document).ready(function ()
{	
	/***  01. Associate USER-INTERACTIVE HTML elements with a CENTRAL EVENT PROCESSOR.  ***/
	//
	//	[IMPORTANT] Below not only associates HTML elements with event-handler functions,
	//	but it also DISABLES their default behavior.  When our HTML contents is run on a
	//	regular browser, below is NOT necessary.  However, as we are running them on the
	//	Beagleboard, it would seem that we DO need below.
	//
	//	[SELECTION PREVENTION] Below BINDS the MOUSE-DOWN event for an HTML ELEMENT to a
	//	JS function.  This is the **KEY** to preventing the user from holding down on an
	//	HTML image, which normally defaults to HIGHLIGHTING the image, which is **NOT**
	//	what we want.
	//
	
	
	/*===  Demo Set 01  ===*/
	
	//	---  mouseDown_DemoSet01()  ---
    $('img#button_DemoSet01').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_Demo01(this);				//	02. USE an event processor to TIE the event to its function.
    	alert('TEST');
    	return		( false );				//	03. MUST return FALSE.
    });
	//	-------------------------------
    
    //	---  mouseDown_ds01_Control01  ---
    $('img#ds01_Control01').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds01_Control01(this);		//	02. USE an event processor to TIE the event to its function.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds01_Control02  ---
    $('img#ds01_Control02').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds01_Control02(this);		//	02. USE an event processor to TIE the event to its function.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    
	/*======================*/
    
    
	/**************************************************************************************/
    
    
    /***  02. Enable the PROCESSING OF USER EVENTS.  ***/
    /***************************************************/
});