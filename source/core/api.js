var sequenceAPI = {
    screenSaver: function(){
        var options = {date: new Date()};
        
        return options;
    },
    
    getMeetings: function(options){
        var type = options['type'];
        
        return Data['meetings'][type];
    },
    
    connectMeeting: function(meeting){
        this.currentMeeting(meeting);
        UI.processingPopup(1, {message: meeting.meeting_name});
        
        setTimeout('UI.processingPopup(0)', 2000);
    },
    
    currentMeeting: function(meeting){
        if(meeting){
            Global.current_meeting = meeting;
            return meeting;
        }else{
            return Global.current_meeting;
        }
    },
    
    meetingTimeElapsed: function(){},
    getMeetingMembers: function(){},
    endMeeting: function(){},
    getMeeting: function(){},
    updateMeeting: function(){},
    updateCurrentMeeting: function(){},
    updateMember: function(){},
    randomNameForMeeting: function(){},
    createMeeting: function(){},
    getMember: function(){},
    muteMember: function(){},
    canMuteMember: function(){},
    pinMember: function(){},
    canPinMember: function(){},
    muteMemberCamera: function(){}
}