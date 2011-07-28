/************/
function	mouseDown_SwitchDemoSet( clickedButton )
{
	/***  01A. [ERROR CHECK] Check if we're even supposed to process user events.  ***/
	if ( g_ProcessUserEvents == false )
	{
//		alert("ERROR (mouseDown_SwitchDemoSet) - user-events processing is DISABLED");
		return;		//	MUST RETURN HERE
	}
	/*********************************************************************************/
	
	
	/***  01B. [ERROR CHECK] Check if we're ALREADY in the selected demo.  ***/
	if ( g_CurrentLayout == clickedButton.getAttribute("layoutValue") )
	{
//		alert("ERROR (mouseDown_SwitchDemoSet) - already in that layout");
		return;		//	MUST RETURN HERE
	}
	/*************************************************************************/
	
	
	/***  02. Update the directory button images AND switch to the	***/
	/***  selected demo set.										***/
	
	var			fromDiv		= null;
	var			toDiv		= null;
	
	/*===  (A) Determine the div to FADE OUT.  ===*/
	if ( g_CurrentLayout == k_Layout01 )		{	fromDiv  = document.getElementById('layout_DemoSet01');	document.getElementById("button_DemoSet01").src = "images/buttons/circular/90x90_Blue_off.png";		}
	else if ( g_CurrentLayout == k_Layout02 )	{	fromDiv  = document.getElementById('layout_DemoSet02');	document.getElementById("button_DemoSet02").src = "images/buttons/circular/90x90_Brown_off.png";	}
	else if ( g_CurrentLayout == k_Layout03 )	{	fromDiv  = document.getElementById('layout_DemoSet03');	document.getElementById("button_DemoSet03").src = "images/buttons/circular/90x90_Red_off.png";		}
	else if ( g_CurrentLayout == k_Layout04 )	{	fromDiv  = document.getElementById('layout_DemoSet04');	document.getElementById("button_DemoSet04").src = "images/buttons/circular/90x90_Green_off.png";	}
	else if ( g_CurrentLayout == k_Layout05 )	{	fromDiv  = document.getElementById('layout_DemoSet05');	document.getElementById("button_DemoSet05").src = "images/buttons/circular/90x90_Orange_off.png";	}
	/*============================================*/
	
	
	/*===  (B) Update to the NEW LAYOUT.  ===*/
	g_CurrentLayout  = clickedButton.getAttribute("layoutValue");
	/*=======================================*/
	
	
	/*===  (C) Determine the div to FADE IN  ===*/
	if ( g_CurrentLayout == k_Layout01 )		{	toDiv  = document.getElementById('layout_DemoSet01');	document.getElementById("button_DemoSet01").src = "images/buttons/circular/90x90_Blue_on.png";		}
	else if ( g_CurrentLayout == k_Layout02 )	{	toDiv  = document.getElementById('layout_DemoSet02');	document.getElementById("button_DemoSet02").src = "images/buttons/circular/90x90_Brown_on.png";		}
	else if ( g_CurrentLayout == k_Layout03 )	{	toDiv  = document.getElementById('layout_DemoSet03');	document.getElementById("button_DemoSet03").src = "images/buttons/circular/90x90_Red_on.png";		}
	else if ( g_CurrentLayout == k_Layout04 )	{	toDiv  = document.getElementById('layout_DemoSet04');	document.getElementById("button_DemoSet04").src = "images/buttons/circular/90x90_Green_on.png";		}
	else if ( g_CurrentLayout == k_Layout05 )	{	toDiv  = document.getElementById('layout_DemoSet05');	document.getElementById("button_DemoSet05").src = "images/buttons/circular/90x90_Orange_on.png";	}
	/*==========================================*/
	
	
	/*===  (D) Switch layouts.  ===*/
//	alert( 'blip' );
//	alert( 'fromDiv' + fromDiv.id );
//	alert( 'toDiv ' + toDiv.id );
	switchLayouts( fromDiv, toDiv );
	/*=============================*/
	
	/******************************************************************/
}