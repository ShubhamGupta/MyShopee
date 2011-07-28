/******  COMPONENTS FOR KEYFRAMES SYNTHESIS  ******/
//
//	The primary goals are:
//		(1) To be able to apply/modify MULTIPLE styles WITHOUT display update.
//		(2) To be able to apply/modify MULTPLE PARTS of the animation ON THE FLY. [This will be necessary when
//		applying a decceleraton a carousel animation AS IT IS ANIMATING.]
//
//	These goals are accomplished by SPLICING text together to FORM webkit animation statesments that
//	can be INSERTED AS A CSS RULE in an element's style rules list.
//


/*---  ROTATION START/END  ---*/
var		gD01_Keyframes_Rotation_START	= "@-webkit-keyframes	d01_KeyFrames_CurrentRotation{";
var		gD01_Keyframes_Rotation_END		= "}";
/*----------------------------*/


/*---  COMPONENT (CURRENT ROTATION - SWITCH IN)  ---*/
var		gD01_Keyframes_SwitchIn =	"from"														+
									"{"															+
										"-webkit-transform:		rotateY(180deg);"				+
									"}"															+
									"to"														+
									"{"															+
										"-webkit-transform:		rotateY(360deg);"				+
									"}";
/*--------------------------------------------------*/


/*---  COMPONENT (CURRENT ROTATION - SWITCH OUT)  ---*/
var		gD01_Keyframes_SwitchOut =	"from"														+
									"{"															+
										"-webkit-transform:		rotateY(0deg);"					+
									"}"															+
									"to"														+
									"{"															+
										"-webkit-transform:		rotateY(180deg);"				+
									"}";
/*---------------------------------------------------*/




/************/
//
//	This SETS/RESETS the translation animation of an element.
//
function	applyAnim_Translation	(
										theElement,					//	The HTML element.
										bool_AutoCenter,			//	YES = { width/2, height/2 }
										start_X, start_Y,			//	Starting position.
										end_X, end_Y,				//	Ending position.
										iteration,					//	Number of repetitions (or "infinity")
										duration,					//	Time for EACH repetition.
										timingFunc,					//	linear, easeIn, easeOut, etc.
										callBack					//	Called with "setTimeout()", arg = ( theElement, animationName, bool_wasInterrupted )
									)
{
	/***  01. [CHECK] Check if a translation animation rule is already being applied to the element.  ***/
	/****************************************************************************************************/
	
	
	/***  02. [CHECK] Is there a translation animation already in progress?  ***/
	if ( 1 )
	{
		//	[CASE] Translation already in progress.  Call its callback function with an
		//	INTERRUPTED STATUS.
	}
	/***************************************************************************/
	
	
	/***  03. Synthesize the UNIQUE name for the animation keyframes.  ***/
	/*********************************************************************/
	
	
	/***  04. Synthesize a RULE for the animation keyframes.  ***/
	/************************************************************/
	
	
	/***  0x. Embed the name of the callback function in the element itself.  ***/
	/****************************************************************************/
}




/************/
function	changeAnimOnTheFly_Translation	(
											)
{
}




/************/
function	applyAnim_Rotation		(
										theElement,
										relOrig_x, relOrig_y, relOrig_z,	//	Center of rotation.
										relRot_x, relRot_y, relRot_z,		//	(in degrees)
										iteration,							//	Number of repetitions (or "infinity")
										duration,							//	Time for EACH repetition.
										timingFunc,							//	linear, easeIn, easeOut, etc.
										callBack							//	Called with "setTimeout()", arg = ( theElement, animationName, bool_wasInterrupted )
									)
{
}




/************/
function	mouseDown_ds01_Control01( clickedControl )
{
	/***  01. Check if we're even supposed to process user events.  ***/
	if ( g_ProcessUserEvents == false )
	{
		return;		//	MUST RETURN HERE
	}
	/******************************************************************/
	
	
	/***  02. Perform the corresponding action of the control.  ***/
//	document.getElementById("button_DemoSet01").src = "images/buttons/circular/90x90_Orange_off.png";	//	DIAGNOSTICS
	/**************************************************************/
}




/************/
function	mouseDown_ds01_Control02( clickedControl )
{
	/***  01. Check if we're even supposed to process user events.  ***/
	if ( g_ProcessUserEvents == false )
	{
		return;		//	MUST RETURN HERE
	}
	/******************************************************************/
	
	
	/***  02. Perform the corresponding action of the control.  ***/
	/**************************************************************/
}




/************/
function	mouseDown_ds01_Control03( clickedControl )
{
	/***  01. Check if we're even supposed to process user events.  ***/
	if ( g_ProcessUserEvents == false )
	{
		return;		//	MUST RETURN HERE
	}
	/******************************************************************/
	
	
	/***  02. Perform the corresponding action of the control.  ***/
	/**************************************************************/
}




/************/
function	mouseDown_ds01_Control04( clickedControl )
{
	/***  01. Check if we're even supposed to process user events.  ***/
	if ( g_ProcessUserEvents == false )
	{
		return;		//	MUST RETURN HERE
	}
	/******************************************************************/
	
	
	/***  02. Perform the corresponding action of the control.  ***/
	/**************************************************************/
}




/************/
function	mouseDown_ds01_Control05( clickedControl )
{
	/***  01. Check if we're even supposed to process user events.  ***/
	if ( g_ProcessUserEvents == false )
	{
		return;		//	MUST RETURN HERE
	}
	/******************************************************************/
	
	
	/***  02. Perform the corresponding action of the control.  ***/
	/**************************************************************/
}




/************/
function	mouseDown_ds01_Control06( clickedControl )
{
	/***  01. Check if we're even supposed to process user events.  ***/
	if ( g_ProcessUserEvents == false )
	{
		return;		//	MUST RETURN HERE
	}
	/******************************************************************/
	
	
	/***  02. Perform the corresponding action of the control.  ***/
	warpUtil_ListStyles( document.getElementById('ds01_TestSprite02') );
	/**************************************************************/
}