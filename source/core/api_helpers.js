var APIHelpers = {

    screenSaver: function(){
        var options = {date: new Date()};
        
        return options;
    },

    joinMeeting: function(meeting){
        this.currentMeeting(meeting);
        
        if(Global.if_processing_canceled == 0){
            UI.processingPopup(0);
            API.meetingTimeElapsed(1);
            UI.connectMeeting(meeting);
        }
    },

    recentMeetings: function(){
        return Mock.recentMeetings();
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
    
    createMeeting: function(){
        var meeting_name = $("#keyboard-input").val();
        var existing_meeting = API.getMeeting({name: meeting_name});

        if(existing_meeting){
            meeting = existing_meeting;
        }else{
            meeting = {id: Global.new_meeting_id, name: meeting_name, members: Data.members()};
            Data.meetings.push(meeting);
            Global.new_meeting_id = Global.new_meeting_id + 1;
        }
        
        API.connectMeeting(meeting);
    },

    meetingTimeElapsed: function(status){
        Global.inmeetingTime++;
        _seconds = Global.inmeetingTime % 60 < 10 ? '0' + Math.floor(Global.inmeetingTime % 60) : '' + Math.floor(Global.inmeetingTime % 60);
        _minutes = '' + Math.floor(Global.inmeetingTime / 60);
        UI.updateMeetingTimeElapsed({m: _minutes, s: _seconds})
        if(status){Global.inmeetingTimer = setTimeout('API.meetingTimeElapsed(1)', 1000);}else{
            Global.inmeetingTime = 0;
            UI.updateMeetingTimeElapsed({m: 0, s: 0});
            clearTimeout(Global.inmeetingTimer);
        }
    },

    cancelEndMeeting: function(){
        UI.processingPopup(0);
    },

    getMeetingMembers: function(meeting){
        if(!meeting){meeting = this.currentMeeting();}
        return meeting.members;
    },

    meetingEnded: function(){
        Global.current_meeting = null;
        this.meetingTimeElapsed(0);
        UI.processingPopup(0);
        UI.screenSaver(1, API.screenSaver());
    },
    
    memberMuted: function(member, state){
        UI.muteMember(member, state);
    },
    
    joinMember: function(member){
        UI.joinMember(member);
    },
    
    exitMember: function(member){
        UI.exitMember(member);
    },
    
    cameraSettings: function(meeting){
        UI.cameraSettings(meeting);
    }

}
