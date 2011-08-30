var sequenceAPI = {
        
    getMeetings: function(options){
        var type = options['type'];
        var meetings = new Array();
        
        Data['meetings'].forEach(function(meeting, i){
            if(meeting['type'] == type){meetings.push(meeting);}
        })
        
        return meetings;
    },

    
    connectMeeting: function(meeting){        
        UI.processingPopup(1, {message: meeting.name, title: "Now Joining.."});
        
        Mock.joinMeeting(meeting);

    },
    
    
    
    currentMember: function(member){
        if(member){
            Global.current_member = member;
        }
        
        return Global.current_member;
    },
    
        
    endMeeting: function(){
        UI.processingPopup(1, {message: "Please wait", title: "Ending meeting..", cancelCallback: this.cancelEndMeeting});
        Mock.endMeeting();
    },
    
    
    
    
    muteMember: function(member){
        var canMute = this.canMuteMember(member);
        Mock.muteMember(member, canMute);
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
            if(current_member['jid'] == member['jid']){
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
            
            if(Global.currently_pinned['jid'] == member['jid']){
                Global.currently_pinned = 0; 
                return false;
            }
        }
        
        if(member['type'] == 'phone'){return false;}
        
        return true;
    },
    
    
    
    muteCamera: function(){
      Global.if_camera_muted = Global.if_camera_muted == 1 ? 0 : 1;
      UI.muteCamera(Global.if_camera_muted);
    },
    
    randomNameForMeeting: function(){
        return "mtg_name_123";
    },
    
    
    updateMeeting: function(){},
    
    getMeeting: function(){},
    updateCurrentMeeting: function(){},

    
    
    getMember: function(){},
    
    
    
    muteMemberCamera: function(){}
}
