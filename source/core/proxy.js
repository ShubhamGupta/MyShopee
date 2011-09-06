var Proxy = {
    
    // leaving the pass thru to API updateMember which is not asynchronous
    updateMember: function(member, attribs){
        return API.updateMember(member, attribs);
    },
    
    
    /*******************     CallBack Handlers    ************************/
    /** slot_ProxyHandler_Update_JoinMeeting replaced joinMeeting
     ** slot_ProxyHandler_Update_JoinMeeting is signaled for successfully connected to a meeting
     * and will be called when meetingstarted
     */
    slot_ProxyHandler_Update_JoinMeeting: function(response_JSONString){
    	   
    	//batonView.invokable_Diag_TestSignalsAndSlots( response_JSONString["meeting"] );
    	if (!response_JSONString["error"])
		{
    		API.joinMeeting(response_JSONString.meeting);	
		}
    	else
			var nowaytocancelJoinMeetingDialoguWithoutUserInteraction = 0;
			// should have some UI mechanism if there is an error to cancel joinMeeting Dialog
		
    	
    },	
    
    /** slot_ProxyHandler_Update_EndMeeting replaces meetingEnded
    * slot_ProxyHandler_Update_EndMeeting is signaled for successfully disconnected from a meeting
    ***/
    
    slot_ProxyHandler_Update_EndMeeting: function(response_JSONString){
    	if (!response_JSONString["error"])
		{
    		API.meetingEnded();
		}
    },	
 
 
    /**** below replaces joinMember
    * slot_ProxyHandler_Update_MeetingMembersList is used for participants list and for 
    * participant entry and exits.
   ***/
    slot_ProxyHandler_Update_MeetingMembersList: function(response_JSONString){

    	if (!response_JSONString["error"])
		{
	    	if(response_JSONString["type"] == "participant_add")
	    	{
	    		API.joinMember(response_JSONString.member);
	    	}
	    	
	    	if(response_JSONString["type"] == "participant_remove")
	    	{
	    		API.exitMember(response_JSONString.member);
	    	}
		}
    	else
			var nowaytocancelJoinMeetingDialoguWithoutUserInteraction = 0;
		// should have some UI mechanism if there is an error to cancel joinMeeting Dialog
	
 
    },	
 
    /* slot_ProxyHandler_Update_MemberInfo below replaced:
     * memberMuted
     * memberPinned
	 * muteCamera
     */ 
    slot_ProxyHandler_Update_MemberInfo: function(response_JSONString){
    	
    	
    	if (!response_JSONString["error"])
		{
	    	if(response_JSONString["update_action"] == "micmute")
	    	{
	    		API.memberMuted(response_JSONString.member, response_JSONString.update_argument);
	    	}
	    	
	    	if(response_JSONString["update_action"] == "meetingfeedselection")
	    	{
	    		API.memberPinned(response_JSONString.member, response_JSONString.update_argument);
	    	}
	    	
	    	if(response_JSONString["update_action"] == "cameramute")
	    	{
	    		API.muteCamera(response_JSONString.member, response_JSONString.update_argument);
	    	}
		}
    	else
			var nowaytocancelJoinMeetingDialoguWithoutUserInteraction = 0;
		
    	   
    },	
 
    /** slot_ProxyHandler_Update_MeetingStatus no longer required (never signalled)
     * 
     */
    slot_ProxyHandler_Update_MeetingStatus: function(response_JSONString){
    },	
    
    
    /** slot_ProxyHandler_Update_MeetingTimeElapsed no longer required (never signalled)
     * 
     */
    slot_ProxyHandler_Update_MeetingTimeElapsed: function(response_JSONString){
    
    },	

 
   /*** slot_ProxyHandler_RandomNameForMeeting no longer required (never signalled asynchronously)
    * 
    */
    slot_ProxyHandler_RandomNameForMeeting: function(response_JSONString){
    },	
    
    /*** slot_ProxyHandler_Update_CurrentMeeting no longer required (never signaled asynchronously)
     * 
     */
    slot_ProxyHandler_Update_CurrentMeeting: function(response_JSONString){
    	
    },	
    
    
    slot_ProxyHandler_Update_NewChatMessage: function(response_JSONString){
    },	
    
    slot_ProxyHandler_Update_NewSharedPresentation: function(response_JSONString){
    },
    
    currentMember: function(member){
        return API.currentMember(member);
    },

    currentMeeting: function(){
        return API.currentMeeting();
    },

    slot_ProxyHandler_Phone_ConnectCall: function(response_JSONString){
        UI.dialerStatus(response_JSONString);
    },

    slot_ProxyHandler_Email_Invite: function(response_JSONString){
        UI.emailInvite(response_JSONString);
    }

}
