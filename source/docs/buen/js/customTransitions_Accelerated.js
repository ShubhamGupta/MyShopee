/************/
//
//	ASSUMPTION: The "fromDiv" parameter refers a div is on the SWITCHED-OUT position.
//
function	switchLayouts( fromDiv, toDiv )
{
	/***  01. Apply keyframe animations.  ***/
	if ( fromDiv != null )
	{
		//	SWITCH-OUT ANIMATION
		
		toDiv.style.display		= 'block';
		
		$('#'+fromDiv.id).addClass('switchOut_Animation_DemoLayout');
		$('#'+fromDiv.id).bind('webkitAnimationEnd', callback_ForAnimation_SwitchDemoSet_DoneWithSwitchOut);
	}
	if ( toDiv != null )
	{
		//	SWITCH-IN ANIMATION
//		toDiv.style.visibility	= 'visible';
		toDiv.style.display		= 'block';

		$('#'+toDiv.id).addClass('switchIn_Animation_DemoLayout');
//		$('#'+toDiv.id).toggleClass('switchIn_Animation_DemoLayout', 'switchOut_Animation_DemoLayout' );
		$('#'+toDiv.id).bind('webkitAnimationEnd', callback_ForAnimation_SwitchDemoSet_DoneWithSwitchIn);
	}
	/****************************************/
	
	
	/***  02. Apply a SINGULAR transition.  ***/
	//
	//	After multiple tests with the Beagleboard, we found that it can only
	//	transition ONE variable, even though in a regular browser, you CAN
	//	do more.
	//
	if ( fromDiv != null )
	{
//		alert( 'fromDiv' + fromDiv.id );
		//
		//	SWITCH-OUT TRANSITION
		//
		//	[NOTE] We can only chose one, so we chose to forego fade-out and use FADE-IN below.
		//
//		$('#'+fromDiv.id).addClass('fadeOut_Transition_DemoLayout');
//		fromDiv.style.opacity	= 0.0;
//		fromDiv.addEventListener('webkitTransitionEnd',callback_ForTransition_SwitchDemoSet_DoneWithFadeOut, false );
	}
	if ( toDiv != null )
	{
//		alert( 'toDiv ' + toDiv.id );
		//
		//	SWITCH-IN TRANSITION
		//
		//	[NOTE] At this point, the upcoming div should have an opacity of 0.0 either because
		//		(1) of its initial opacity setting ... or ...
		//		(2) assuming a switch-out animation was NOT interrupted, the corresponding
		//		handler should have set its opacity to zero
		//
//		toDiv.style.visibility = 'visible';
		
//		$('#'+toDiv.id).addClass('fadeIn_Transition_DemoLayout');
//		toDiv.style.opacity	= 1.0;
//		toDiv.addEventListener('webkitTransitionEnd',callback_ForTransition_SwitchDemoSet_DoneWithFadeIn, false );
	}
	/******************************************/
}




/******  (FOR ANIMATION - SWITCHED OUT)  ******/
function	callback_ForAnimation_SwitchDemoSet_DoneWithSwitchOut( event )
{	
//	alert( "switched OUT (animation) " + this.id );	//	DIAGNOSTICS
	
//	this.style.visibility		= 'hidden';
	this.style.display			= 'none';
	
	/***  01. Clean up transition and trigger.  ***/
	$('#'+this.id).removeClass('switchOut_Animation_DemoLayout');
//	alert( "switched OUT (animation) " + this.id );	//	DIAGNOSTICS
	$('#'+this.id).unbind( 'webkitAnimationEnd', callback_ForAnimation_SwitchDemoSet_DoneWithSwitchOut );
	/**********************************************/
	
//	this.style.visibility		= 'hidden';
	this.style.display			= 'none';
}




/******  (FOR ANIMATION - SWITCHED IN)  ******/
function	callback_ForAnimation_SwitchDemoSet_DoneWithSwitchIn( event )
{	
//	alert( "switched IN (animation) " + this.id );		//	DIAGNOSTICS
	
//	this.style.visibility 		= 'visible';	
	this.style.display			= 'block';
	
	/***  01. Clean up transition and trigger.  ***/
	$('#'+this.id).removeClass('switchIn_Animation_DemoLayout');
//	alert( "switched IN (animation) " + this.id );		//	DIAGNOSTICS
	$('#'+this.id).unbind( 'webkitAnimationEnd', callback_ForAnimation_SwitchDemoSet_DoneWithSwitchIn );
	/**********************************************/
	
//	this.style.visibility 		= 'visible';	
	this.style.display			= 'block';
}




/******  (FOR TRANSITION - FADED OUT)  ******/
//
//	Because we can use ONLY ONE
//
function	callback_ForTransition_SwitchDemoSet_DoneWithFadeOut( event )
{	
//	alert( "faded OUT (TRANSITION) " + this.id );		//	DIAGNOSTICS
	
	
//	this.style.visibility 		= 'hidden';	
//	this.style.display			= 'none';
	
	
	/***  01. Clean up transition and trigger.  ***/
	$('#'+this.id).removeClass('fadeOut_Transition_DemoLayout');
	this.removeEventListener( 'webkitTransitionEnd', callback_ForTransition_SwitchDemoSet_DoneWithFadeOut, false );
	/**********************************************/
	
	
//	this.style.visibility 		= 'hidden';	
//	this.style.display			= 'none';
}




/******  (FOR TRANSITION - FADED IN)  ******/
function	callback_ForTransition_SwitchDemoSet_DoneWithFadeIn( event )
{
//	alert( "faded IN (TRANSITION) " + this.id );		//	DIAGNOSTICS
	
	/***  01. Clean up transition and trigger.  ***/
	$('#'+this.id).removeClass('fadeIn_Transition_DemoLayout');
	this.removeEventListener( 'webkitTransitionEnd', callback_ForTransition_SwitchDemoSet_DoneWithFadeIn, false );
	/**********************************************/
	
	
//	this.style.visibility = 'hidden';
	
	
	/***  DIAGNOSTICS  ***/
//	if ( g_CurrentLayout == k_Layout01 )
//	{
//		document.getElementById('ds01_img_Background').src = "images/misc/mario-480-272-1786.jpg";
//	}
//	else if ( g_CurrentLayout == k_Layout02 )
//	{
//		document.getElementById('ds02_img_Background').src = "images/misc/mario-480-272-1786.jpg";
//	}
//	else if ( g_CurrentLayout == k_Layout03 )
//	{
//		document.getElementById('ds03_img_Background').src = "images/misc/mario-480-272-1786.jpg";
//	}
//	else if ( g_CurrentLayout == k_Layout04 )
//	{
//		document.getElementById('ds04_img_Background').src = "images/misc/mario-480-272-1786.jpg";
//	}
//	else if ( g_CurrentLayout == k_Layout05 )
//	{
//		document.getElementById('ds05_img_Background').src = "images/misc/mario-480-272-1786.jpg";
//	}
	/*********************/
}