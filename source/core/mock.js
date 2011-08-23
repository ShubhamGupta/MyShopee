var Mock = {
	joinMember: function(){
            var member = {jid: 'http://rhino04@logitech.com/gmail.994187DE999', name: "Tin Tin", type: "phone", photo: "images/main/people/lisa_rogers.jpg"};
            
            setTimeout(function(){
                Proxy.joinMember(member);
                
                setTimeout(function(){
                    Proxy.exitMember(member);
                }, 10000);
                
            }, 10000);
	},
        
        joinMeeting: function(meeting){
            setTimeout(function(){
                Proxy.joinMeeting(meeting);
                Proxy.currentMember({jid: 'http://rhino04@logitech.com/gmail.994187DE3'});
            }, 2500);
            
        },
        
        endMeeting: function(){
            setTimeout(function(){
                if(Global.if_processing_canceled == 0 ){Proxy.meetingEnded();}
            }, 4000);
        },
        
        muteMember: function(member, canMute){
            var member = Proxy.updateMember(member, {if_muted: canMute});
            
            setTimeout(function(){
                Proxy.memberMuted(member, member['if_muted']);
            }, 1000);
        }
}
