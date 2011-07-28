/******  CONSTANTS  ******/

//	===  For the LAYOUT ATTRIBUTE  ===
var		k_Layout01							= 1;
var		k_Layout02							= 2;
var		k_Layout03							= 3;
var		k_Layout04							= 4;
var		k_Layout05							= 5;
//	==================================


//	===  For the FADE-TYPE ATTRIBUTE  ===
var		k_Transition_FadedIn				= 1;
var		k_Transition_FadedOut				= 2;
//	=====================================

/*************************/



/******  GLOBAL VARIABLES  ******/

//	===  APPLICATION STATES  ===
var		g_PageLoadedAlreadyCalled			= false;
var		g_ProcessUserEvents					= false;
var		g_CurrentLayout						= k_Layout01;
//	============================


//	===  ANIMATION STATES  ===
var		g_RuleIndex_LayoutSwitchAnimation	= 1000;
//	==========================

/********************************/




/******  PHASE 01 INITIALIZATION  ******/
//
//	The browser calls this ***FIRST***.
//
//	[NOTE] There has been discussion as to whether or not this function gets called
//	before or after the page is fully loaded.  Thus, we have to be careful when
//	initializing items that depend on whether or not the page is fully loaded.
//
$(document).ready(function ()
{
//	$('#button_DemoSet01').setAttribute("style","background:url(images/buttons/circular/90x90_Orange_off.png)");
//	$(document).style.backgroundColor = "#000000";
//	$('#buttons_MainDirectory').bgColor="#CC9900";
//	alert("YOOOO "+$('#buttons_MainDirectory'));
	
	
    /***  01. Proceed with any initialization that MUST BE DONE HERE.  ***/
    /*********************************************************************/
});




/******  PHASE 02 INITIALIZATION  ******/
//
//	[CRITICAL] ".live()" is called ONLY if jQuery Mobile is present.
//
$('#touchHarnessPage').live('pagecreate',function(event)
{
//    pageLoaded();
});




/******  PHASE 03 INITIALIZATION  ******/
//
//	The browser calls this ***THIRD***, after the other two above.
//
//	It would seem that at this point, the page is REALLY FULLY LOADED.
//	This is really important for initial animations and transitions.
//
$(window).load(function()
{
//    pageLoaded();
});




/******  PHASE 04 INITIALIZATION  ******/
function		initializer_onload()
{
//	document.getElementById("button_DemoSet04").src = "images/buttons/circular/90x90_Blue_on.png";
	
    pageLoaded();
}




/******  (PAGE LOADED)  ******/
//
//	[IMPORTANT]  This is the DESIGNATED INITIALIZER (Objective-C lingo).  That is, MORE THAN ONE of the
//	initializers above will make a call to this function.  The reason behind this is because
//	there are MULTIPLE initializers above that is called at different parts of the preparation of
//	the HTML content -- some are done BEFORE the HTML page has been fully loaded ... some AFTER.
//
function	pageLoaded()
{
	/***  01. Check if this function was ALREADY called.  ***/
	if ( g_PageLoadedAlreadyCalled == true )
	{
		return;								//	Go no further.
	}
	
	g_PageLoadedAlreadyCalled  = true;		//	Prevent other initializers from calling this.
	/********************************************************/
	
	
	/***  DIAGNOSTICS  ***/	
//   document.getElementById("button_DemoSet05").src = "images/buttons/circular/90x90_Blue_on.png";

//	var		testElement  = document.getElementById('layout_DemoSet01');
	var		testElement  = document.getElementById('ds01_TestSprite02');
	var		testForObject = testElement;
	
	//	---  SUCCESS CASES  ---
//	var		testForObject = document.styleSheets;										//	JS Class = "StyleSheetList" ... YES = { ALL } * NO = {}
//	var		testForObject = document.styleSheets[0].rules;								//	JS Class = "CSSRuleList" ... YES = { Beagle_NoAcc, Beagle_GPU } * NO = { Chrome, Firefox }
//	var		testForObject = document.styleSheets[0].cssRules;							//	YES = { FireFox, Beagle_GPU, Beagle_NoAcc } * NO = { Chrome }
//	var		testForObject = document.styleSheets[0].cssRules[0].cssText;				//	YES = { FireFox, Beagle_GPU, Beagle_NoAcc } * NO = { Chrome }
//	var		testForObject = document.styleSheets[0].cssRules[0].cssText;				//	YES = { FireFox, Beagle_GPU, Beagle_NoAcc } * NO = { Chrome }
	
//	var		testForObject = window.getComputedStyle( testElement, "" );					//	JS Class = { "ComputedCSSStyleDeclaration" for Firefox, "CSSStyleDeclaration" for Chrome, Beagle_NoAcc } ... YES = { ALL } * NO = {}
	
//	var		testForObject = testElement.style;											//	JS Class = "CSSStyleDeclaration" ... YES { ALL } * NO = {}
//	var		testForObject = testElement.style.getPropertyValue('cssText');				//	JS Class = "" ... YES { Firefox } * NO = {}
//	var		testForObject = testElement.style.getPropertyCSSValue('bottom');			//	JS Class = "CSSPrimitiveValue" ... YES { [need INLINE style] Chrome } * NO = { ALL }
//	var		testForObject = testElement.style.item(0);									//	JS Class = "" ... YES { Firefox } * NO = {}
	//	-----------------------

	
	//	---  FAILED CASES  ---
//	var		testForObject = testElement.style.rules;									//	YES {} * NO = { ALL }
//	var		testForObject = testElement.style.cssText;									//	YES {} * NO = { ALL }

//	var		testForObject = document.sheets;											//	JS Class = "StyleSheetList" ... YES = {} * NO = { ALL }
//	var		testForObject = document.getElementById('layout_DemoSet01').currentStyle )	//	YES = {} * NO = { Chrome, Firefox, Beagleboard }
//	var		testForObject = document.getElementById('layout_DemoSet01').runtimeStyle )	//	YES = {} * NO = { Chrome, Firefox, Beagleboard }
	
	if ( testForObject )
	{
//		document.getElementById("button_DemoSet05").src = "images/buttons/circular/90x90_Blue_on.png";
//		alert( testForObject.cssText );			//	(ALERT works on Beagle_NOAcc ... but FREEZES on Beagle_GPU.)
//		alert( testForObject.style.item(1) );

//		alert( testForObject+'['+testForObject.style.length+']' );
//		warpUtil_ListStyles( testForObject );
		
//		alert( typeof(testForObject) );
//		warpUtil_ListProperties( testForObject );
//		if ( typeof(testForObject) == 'ComputedCSSStyleDeclaration' )	{	document.getElementById("button_DemoSet03").src = "images/buttons/circular/90x90_Blue_on.png";	}
	}
	//	---------------------
	
//	alert ( document.getElementById('ds01_TestSprite01').className );
	
	/*********************/
	
	
	/***  02. Select the DEFAULT demo set and update the navigation buttons.  ***/
	document.getElementById("button_DemoSet01").src = "images/buttons/circular/90x90_Blue_on.png";
	switchLayouts( null, document.getElementById('layout_DemoSet01') );
//	$('#ds01_TestSprite01').addClass('ds01_CurrentAnimation_B');	//	This will OVERRIDE the previous animation because you can only have ONE animation applied per element.
//	warpUtil_ListStyles( document.getElementById('ds01_TestSprite02') );
	
	//	---  (DIAGNOSTICS)  ---
//	document.getElementById('ds01_img_Background').src = "images/misc/test_screen_02.jpg";
//	$('body').css( 'background-color','#FF00FF'	);
	
	//	---  [WORKS] USING A TRANSITION  ---
//	$('#'+document.getElementById('layout_DemoSet01').id).addClass('fadeIn_Transition_DemoLayout');		//	DIAGNOSTICS
//	$('#layout_DemoSet01').addClass('fadeIn_Transition_DemoLayout');
//	document.getElementById('layout_DemoSet01').style.left	= '110px';
//	document.getElementById('layout_DemoSet01').style.opacity	= 1.0;
//	document.getElementById('layout_DemoSet01').addEventListener('webkitTransitionEnd', callback_ForTransition_SwitchDemoSet_DoneWithFadeIn, false);
	
	//	---  USING AN COMBO OF BOTH ANIMATION AND TRANSITION  ---
//	alert( document.styleSheets.length );
	
//	$('#'+document.getElementById('layout_DemoSet01').id).addClass('fadeIn_Transition_DemoLayout');
//	document.getElementById('layout_DemoSet01').style.left	= '0px';
//	document.getElementById('layout_DemoSet01').style.opacity	= 1.0;
//	document.getElementById('layout_DemoSet01').addEventListener('webkitTransitionEnd', callback_ForTransition_SwitchDemoSet_DoneWithFadeIn, false);	
	/****************************************************************************/
	
	
	/***  03. Associate USER-INTERACTIVE HTML elements with a CORRESPONDING EVENT HANDLER.  ***/
	assignEventHandlers();
	/******************************************************************************************/
	
	
    /***  04. Enable the PROCESSING OF USER EVENTS.  ***/
    g_ProcessUserEvents  = true;
    /***************************************************/
    
	
	/***  0X. Assign the TRANSITION handlers.  ***/
//	document.getElementById('layout_DemoSet01').addEventListener('webkitTransitionEnd',function(event){  callback_ForTransition_SwitchDemoSet_DoneWithFadeOut(document.getElementById('layout_DemoSet01'));	});
	/*********************************************/
}




/************/
function	assignEventHandlers()
{
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
	
	
	/*=====================*/
	/*===  Demo Set 01  ===*/
	/*=====================*/
	
	
	//	---  mouseDown_DemoSet01()  ---
	document.getElementById("button_DemoSet01").setAttribute( "layoutValue", k_Layout01 );	//	Insert a value as an attribute.
    $('img#button_DemoSet01').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_SwitchDemoSet(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
	//	-------------------------------
    
    //	---  mouseDown_ds01_Control01  ---
    $('img#ds01_Control01').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds01_Control01(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds01_Control02  ---
    $('img#ds01_Control02').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds01_Control02(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds01_Control03  ---
    $('img#ds01_Control03').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds01_Control03(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds01_Control04  ---
    $('img#ds01_Control04').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds01_Control04(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds01_Control05  ---
    $('img#ds01_Control05').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds01_Control05(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds01_Control06  ---
    $('img#ds01_Control06').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds01_Control06(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  Background Image (Disallow Selectability)  ---
    $('img#ds01_img_Background').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
 //   	noMethodAssigned(this);				//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	---------------------------------------------------
	
	/*======================*/
	
	
	/*=====================*/
	/*===  Demo Set 02  ===*/
	/*=====================*/
	
	//	---  mouseDown_DemoSet02()  ---
	document.getElementById("button_DemoSet02").setAttribute( "layoutValue", k_Layout02 );	//	Insert a value as an attribute.
    $('img#button_DemoSet02').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_SwitchDemoSet(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
	//	-------------------------------
    
    //	---  mouseDown_ds02_Control01  ---
    $('img#ds02_Control01').mousedown( function(event)
    {
 		alert("PING");
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds02_Control01(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds02_Control02  ---
    $('img#ds02_Control02').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds02_Control02(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds02_Control03  ---
    $('img#ds02_Control03').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds02_Control03(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds02_Control04  ---
    $('img#ds02_Control04').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds02_Control04(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds02_Control05  ---
    $('img#ds02_Control05').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds02_Control05(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds02_Control06  ---
    $('img#ds02_Control06').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds02_Control06(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  Background Image (Disallow Selectability)  ---
    $('img#ds02_img_Background').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
 //   	noMethodAssigned(this);				//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	---------------------------------------------------
	
	/*======================*/
    
    
	/*=====================*/
	/*===  Demo Set 03  ===*/
	/*=====================*/
	
	//	---  mouseDown_DemoSet03()  ---
	document.getElementById("button_DemoSet03").setAttribute( "layoutValue", k_Layout03 );	//	Insert a value as an attribute.
    $('img#button_DemoSet03').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_SwitchDemoSet(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
	//	-------------------------------
    
    //	---  mouseDown_ds03_Control01  ---
    $('img#ds03_Control01').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds03_Control01(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds03_Control02  ---
    $('img#ds03_Control02').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds03_Control02(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds03_Control03  ---
    $('img#ds03_Control03').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds03_Control03(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds03_Control04  ---
    $('img#ds03_Control04').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds03_Control04(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds03_Control05  ---
    $('img#ds03_Control05').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds03_Control05(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds03_Control06  ---
    $('img#ds03_Control06').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds03_Control06(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  Background Image (Disallow Selectability)  ---
    $('img#ds03_img_Background').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
 //   	noMethodAssigned(this);				//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	---------------------------------------------------
	
	/*======================*/
	
	
	/*=====================*/
	/*===  Demo Set 04  ===*/
	/*=====================*/
	
	//	---  mouseDown_DemoSet04()  ---
	document.getElementById("button_DemoSet04").setAttribute( "layoutValue", k_Layout04 );	//	Insert a value as an attribute.
    $('img#button_DemoSet04').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_SwitchDemoSet(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
	//	-------------------------------
    
    //	---  mouseDown_ds04_Control01  ---
    $('img#ds04_Control01').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds04_Control01(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds04_Control02  ---
    $('img#ds04_Control02').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds04_Control02(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds04_Control03  ---
    $('img#ds04_Control03').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds04_Control03(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds04_Control04  ---
    $('img#ds04_Control04').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds04_Control04(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds04_Control05  ---
    $('img#ds04_Control05').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds04_Control05(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds04_Control06  ---
    $('img#ds04_Control06').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds04_Control06(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  Background Image (Disallow Selectability)  ---
    $('img#ds04_img_Background').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
 //   	noMethodAssigned(this);				//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	---------------------------------------------------
	
	/*======================*/
	
	
	/*=====================*/
	/*===  Demo Set 05  ===*/
	/*=====================*/
	
	//	---  mouseDown_DemoSet05()  ---
	document.getElementById("button_DemoSet05").setAttribute( "layoutValue", k_Layout05 );	//	Insert a value as an attribute.
    $('img#button_DemoSet05').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_SwitchDemoSet(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
	//	-------------------------------
    
    //	---  mouseDown_ds05_Control01  ---
    $('img#ds05_Control01').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds05_Control01(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds05_Control02  ---
    $('img#ds05_Control02').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds05_Control02(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds05_Control03  ---
    $('img#ds05_Control03').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds05_Control03(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds05_Control04  ---
    $('img#ds05_Control04').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds05_Control04(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds05_Control05  ---
    $('img#ds05_Control05').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds05_Control05(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  mouseDown_ds05_Control06  ---
    $('img#ds05_Control06').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
    	mouseDown_ds05_Control06(this);		//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	-------------------------------
    
    //	---  Background Image (Disallow Selectability)  ---
    $('img#ds05_img_Background').mousedown( function(event)
    {
    	event.preventDefault();				//	01. MUST CANCEL default behavior for the Beagleboard.
 //   	noMethodAssigned(this);				//	02. Associate the element with its handler.
    	return		( false );				//	03. MUST return FALSE.
    });
    //	---------------------------------------------------
    
	/*======================*/
}