var sequenceAPI = {
        
    loadMeetings: function(options){
        UI.processingPopup(1, {message: 'Loading meetings', title: "Please wait.."});
        Mock.loadMeetings(options);
    },

    
    connectMeeting: function(meeting){        
        UI.processingPopup(1, {message: meeting.name, title: "Now Joining.."});
        
        Mock.joinMeeting(meeting);

    },
            
    endMeeting: function(){
        UI.processingPopup(1, {message: "Please wait", title: "Ending meeting..", cancelCallback: this.cancelEndMeeting});
        Mock.endMeeting();
    },
    
    muteMember: function(member){
        var canMute = this.canMuteMember(member);
        Mock.muteMember(member, canMute);
    },
    
    
        
    pinMember: function(member){
        if(this.canPinMember(member)){
            Mock.pinMember(member, 1);
        }
    },
    
    /**** Known functions that are not passed on to mock functionality ****/
    updateMember: function(member, attribs){
        var meeting_index = 0;
        var current_meeting_id = this.currentMeeting()['id'];
        Data.meetings.forEach(function(meeting, i){
            if(current_meeting_id == meeting['id']){meeting_index = i;}
        });
        
        this.getMeetingMembers().forEach(function(current_member, i){
            if(current_member['jid'] == member['jid']){
                for(var key in attribs){
                    Data.meetings[meeting_index].members[i][key] = attribs[key];
                }
                member = Data.meetings[meeting_index].members[i];
            }
        });
        return member;
    },


    currentMember: function(member){
        if(member){
            Global.current_member = member;
        }
        
        return Global.current_member;
    },

    getMeeting: function(options){
        var found_meeting = false;
        Data.meetings.forEach(function(meeting, i){
                for(var key in options){
                    if(meeting[key] == options[key]){found_meeting = meeting;}
                }            
        });        

        return found_meeting;
    },

    canPinMember: function(member){
        if(Global.currently_pinned != 0){
            UI.pinMember(Global.currently_pinned, 0);
            
            if(Global.currently_pinned['jid'] == member['jid']){
                Global.currently_pinned = 0; 
                return false;
            }
        }
        
        if(member['type'] == 'phone'){return false;}
        
        return true;
    },
    
    canMuteMember: function(member){
        return member['if_muted'] != 1 ? 1 : 0;
    },
    
    muteCamera: function(){
      Global.if_camera_muted = Global.if_camera_muted == 1 ? 0 : 1;
      UI.muteCamera(Global.if_camera_muted);
    },
    


    // Returning static string for now - 
    // will be replaced with custom logic based string generation
    randomNameForMeeting: function(){
        return "mtg_name_123";
    },



    /*** Empty templates - functions not yet implemented ***/
    updateMeeting: function(){},

    updateCurrentMeeting: function(){},

    getMember: function(){},
    
    muteMemberCamera: function(){},

}
