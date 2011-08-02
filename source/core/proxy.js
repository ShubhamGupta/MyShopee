var Proxy = {
    endMeeting: function(){
        API.endMeeting();
    },
    
    joinMember: function(member){
        API.joinMember(member);
    },
    
    joinMeeting: function(meeting){
        API.joinMeeting(meeting);
    }
}