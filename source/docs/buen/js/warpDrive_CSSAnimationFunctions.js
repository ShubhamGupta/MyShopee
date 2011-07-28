/************/
function	warp_SwitchLayouts( fromDiv, toDiv, transitionTime, callback_DidFinish )
{
	/***  (ERROR CHECKING)  ***/
	if ( (fromDiv == toDiv) && (fromDiv != null) && (toDiv != null) )
	{
		alert( 'ERROR (warp_SwitchLayouts) - switching to the SAME layout' );
	}
	/**************************/
	
	
	/***  01. From Div.  ***/
	if ( fromDiv != null )
	{
//		var 	lastSheet = document.styleSheets[document.styleSheets.length - 1];
//		lastSheet.insertRule("@-webkit-keyframes " + newName + " { from { top: 0px; } to {top: " + newHeight + "px;} }", lastSheet.cssRules.length);
	}
	/***********************/
	
	
	/***  02. To Div.  ***/
	if ( toDiv != null )
	{
	}
	/*********************/
}




/************/
//
//	This is done at the DOCUMENT level, not to a particular object.
//
function	warp_AddOrReplace_SSRule_Type1A( css_SelectorText, css_Body )
{
	//
	//	<css_body> ... for example:
	//
	//			"@-webkit-keyframes " + newName
	//		+	"{								"
	//		+	"	from						"
	//		+	"	{							"
	//		+	"		top:" +starting+ "px;	"
	//		+	"	}							"
	//		+	"	to							"
	//		+	"	{							"
	//		+	"		top:" +ending+ "px;		"
	//		+	"	}							"
	//		+	"}								"
	//
	
	
	/***  01. Check if the rule already exists.  ***/
	//
	//	The ARRAY below should contain the following values in the specified indices:
	//		[0] = index_CurrentStyleSheet;
	//		[1] = index_CurrentRule;
	//
	var		array_RuleLocation = warpUtil_LocateCSSSelector_DocumentLevel( css_SelectorText );
	/***********************************************/
	
	
	/***  02. Determine if we're going to ADD or REPLACE a style sheet.  ***/ 
	if ( array_RuleLocation == null )
	{
		//	[CASE] ADD STYLE
	}
	else
	{
		//	[CASE] REPLACE STYLE
	}
	/***********************************************************************/
	
	
}




/************/
function	warp_AddOrReplare_SSRule_Type1B( css_SelectorText, css_Property, css_Value )
{
}




/************/
function	warp_AddOrReplace_SSRule_Type1C( css_SelectorText, js_RuleIndex, css_Property, css_Value )
{
}




/************/
//
//	This returns an ARRAY containing:
//		[0] = index of STYLE SHEET
//		[1] = index of RULE
//
function	warpUtil_LocateCSSSelector_DocumentLevel( cssSelector )
{
	/***  00. Local Variables  ***/
	var		returnedResult = new Array ( -1, -1 );		//	Default = FAILURE case.
	/*****************************/
	
	
	/***  01. Go through ALL of the style sheets and their rules to locate the	***/
	/***  rule that corresponds (if at all) to the specified CSS selector.		***/
	var		num_StyleSheets		= document.styleSheets.length;
	
	for ( index_CurrentStyleSheet = 0; index_CurrentStyleSheet < num_StyleSheets; index_CurrentStyleSheet++ )
	{
		var		num_RulesInCurrentStyleSheet = document.styleSheets[index_CurrentStyleSheet].cssRules.length;
		
		for ( index_CurrentRule = 0; index_CurrentRule < num_RulesInCurrentStyleSheet; index_CurrentRule++ )
		{
			var		currentRule = document.styleSheets[num_RulesInCurrentStyleSheet].cssRules[index_CurrentRule];
			
			if ( currentRule.selectorText == cssSelector )
			{
				returnedResult[0] = index_CurrentStyleSheet;
				returnedResult[1] = index_CurrentRule;
				
				return		( returnedResult );
			}
		}
	}
	/******************************************************************************/
	
	
	/***  0X. Return result.  ***/
	return		( null );
	/****************************/
}




/************/
function	warpUtil_ListProperties(obj)
{
	var			propList = "";
	
	for(var propName in obj)
	{
		if(typeof(obj[propName]) != "undefined")
		{
			propList += (propName + ", ");
		}
	}
	
	alert(propList);
}




/*************/
function	warpUtil_ListStyles (element)
{
	var			elemList		= "";
	var			computedStyles	= window.getComputedStyle( element,"" );	//	JS Class = { "ComputedCSSStyleDeclaration" for Firefox, "CSSStyleDeclaration" for Chrome, Beagle_NoAcc } ... YES = { ALL } * NO = {}
	var			num_Styles		= computedStyles.length;
	
	
//	for (i = 0; i < element.style.length; i++)
//	{
//		var		propName = element.style.item (i);						//	Use item() to get property name.
//		var		value = element.style.getPropertyValue (propName);
//		elemList += ( propName + "=" + value );
//		alert (propName + " = " + value);
//	}
	
	for (i = 0; i < num_Styles; i++)
	{
		var		propName		= computedStyles.item (i);				//	Use item() to get property name.
		var		value			= computedStyles.getPropertyValue (propName);
		elemList				+= ( propName + "=" + value + "\n\r" );
//		alert (propName + " = " + value);								//	(Just another way to spell "pain".)
	}
	
//	alert( elemList );													//	DIAGNOSTICS
	keycodeView.diag_PrintToConsole( elemList );
}