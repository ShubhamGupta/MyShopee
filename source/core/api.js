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
        UI.processingPopup(1, {message: meeting.name});
        
        setTimeout(function(){
            UI.processingPopup(0);
        }, 2000);
        
        setTimeout(function(){
            UI.connectMeeting(meeting);
            API.meetingTimeElapsed(1);
        }, 2000); // Needs to be same timeout in order to run after fake delay
        
    },
    
    // This method needs to be called to get the current meeting in session
    // This method is also used to assign a meeting to the current meeting var
    // Do not use the Global variable directly
    currentMeeting: function(meeting){
        if(meeting){
            Global.current_meeting = meeting;
            return meeting;
        }else{
            return Global.current_meeting;
        }
    },
    
    meetingTimeElapsed: function(status){
        Global.inmeetingTime++;
        _seconds = Global.inmeetingTime % 60 < 10 ? '0' + Math.floor(Global.inmeetingTime % 60) : '' + Math.floor(Global.inmeetingTime % 60);
        _minutes = '' + Math.floor(Global.inmeetingTime / 60);
        UI.updateMeetingTimeElapsed({m: _minutes, s: _seconds})
        if(status){setTimeout('API.meetingTimeElapsed(1)', 1000);}else{
            Global.inmeetingTime = 0;
            UI.updateMeetingTimeElapsed({m: 0, s: 0})
        }
    },
    
    getMeetingMembers: function(meeting){
        if(!meeting){meeting = this.currentMeeting();}
        return meeting.members();
    },
    
    endMeeting: function(){
        this.meetingTimeElapsed(0)
        
    },
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