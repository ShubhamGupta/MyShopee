var Proxy = {
    meetingEnded: function(){
        API.meetingEnded();
    },
    
    joinMember: function(member){
        API.joinMember(member);
    },
    
    exitMember: function(member){
        API.exitMember(member);
    },
    
    joinMeeting: function(meeting){
        API.joinMeeting(meeting);
    },
    
    updateMember: function(member, attribs){
        return API.updateMember(member, attribs);
    },
    
    memberMuted: function(member, canMute){
        API.memberMuted(member, canMute);
    },
    
    currentMember: function(member){
        return API.currentMember(member);
    }
}