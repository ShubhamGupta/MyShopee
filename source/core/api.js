var sequenceAPI = {
    screenSaver: function(){
        var options = {date: new Date()};
        
        return options;
    },
    
    getMeetings: function(options){
        var type = options['type'];
        var meetings = new Array();
        
        Data['meetings'].forEach(function(meeting, i){
            if(meeting['type'] == type){meetings.push(meeting);}
        })
        
        return meetings;
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
        return meeting.members;
    },
    
    endMeeting: function(){
        this.meetingTimeElapsed(0)
        
    },
    
    muteMember: function(member){
        var canMute = this.canMuteMember(member);
        member = this.updateMember(member, {if_muted: canMute});
        UI.muteMember(member, canMute);
    },
    
    canMuteMember: function(member){
        return member['if_muted'] != 1 ? 1 : 0;
    },
    
    updateMember: function(member, attribs){
        var meeting_index = 0;
        var current_meeting_id = this.currentMeeting()['id'];
        Data.meetings.forEach(function(meeting, i){
            if(current_meeting_id == meeting['id']){meeting_index = i;}
        });
        
        this.getMeetingMembers().forEach(function(current_member, i){
            if(current_member['id'] == member['id']){
                for(var key in attribs){
                    Data.meetings[meeting_index].members[i][key] = attribs[key];
                }
                member = Data.meetings[meeting_index].members[i];
            }
        });
        return member;
    },
    
    pinMember: function(member){
        if(this.canPinMember(member)){
            UI.pinMember(member, 1);
            Global.currently_pinned = member;
        }
    },
    
    canPinMember: function(member){
        if(Global.currently_pinned != 0){
            UI.pinMember(Global.currently_pinned, 0);
            
            if(Global.currently_pinned['id'] == member['id']){
                Global.currently_pinned = 0; 
                return false;
            }
        }
        
        if(member['type'] == 'phone'){return false;}
        
        return true;
    },
    
    updateMeeting: function(){},
    
    getMeeting: function(){},
    updateCurrentMeeting: function(){},

    randomNameForMeeting: function(){},
    createMeeting: function(){},
    getMember: function(){},
    
    muteMemberCamera: function(){}
}