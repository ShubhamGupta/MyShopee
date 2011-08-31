var Mock = {
    joinMember: function(member){

        var response_JSONString	 = {
                            error: false,
                            errorMessage: "somethign went wrong in the cloud!",
                            type: "participant_add",
                            member: member
            };


        Proxy.slot_ProxyHandler_Update_MeetingMembersList(response_JSONString);

    },
    
    exitMember: function(member){

                    var response_JSONString	 = {
                            error: false,
                            errorMessage: "somethign went wrong in the cloud!",
                            type: "participant_remove",
                            member: member
            };


            setTimeout(function(){

                    //Proxy.exitMember(member);
                    Proxy.slot_ProxyHandler_Update_MeetingMembersList(response_JSONString);

            }, 15000);

    },


    joinMeeting: function(meeting){

                    var response_JSONString	 = {
                            error: false,
                            errorMessage: "somethign went wrong in the cloud , need to cancel this dialog!",
                            meeting: meeting
            };

            Proxy.currentMember({jid: 'http://rhino04@logitech.com/gmail.994187DE3'});

                    Proxy.slot_ProxyHandler_Update_JoinMeeting(response_JSONString);

          /** 
          * Seems like you just put for testing your mock joining another member and existing it.
          * Will also put testing for exit meeting. Should remove below in final api.
          */
            var member = {jid: 'http://rhino04@logitech.com/gmail.994187DE999', name: "Tin Tin", type: "phone", photo: "images/main/people/lisa_rogers.jpg"};

            Mock.joinMember(member);// prefered it if you test enter/exit of participant in another place
                                                            // that is not in the code path of the way a room enters a meeting

            Mock.exitMember(member);


    },


    endMeeting: function(){

            var response_JSONString	 = {
                            error: false,
                            errorMessage: "somethign went wrong in the cloud , need to cancel this dialog!"
            };
            setTimeout(function(){
            if(Global.if_processing_canceled == 0 ){
                    //Proxy.meetingEnded();
                    if(jQuery.inArray(Proxy.currentMeeting(), Global.recent_meetings) == -1){
                        Global.recent_meetings.push(Proxy.currentMeeting());
                    }

                    Proxy.slot_ProxyHandler_Update_EndMeeting(response_JSONString);
            }
        }, 5000);
    },


    muteMember: function(member, canMute){
        var member = Proxy.updateMember(member, {if_muted: canMute});

        var response_JSONString	 = {
                            error: false,
                            errorMessage: "somethign went wrong in the cloud.",
                            member: member,
                            update_action: "micmute",
                            update_argument: member['if_muted']
            };

        setTimeout(function(){
            //Proxy.memberMuted(member, member['if_muted']);
            Proxy.slot_ProxyHandler_Update_MemberInfo(response_JSONString);

        }, 1000);
    },


    pinMember: function(member, canPin){
        var member = Proxy.updateMember(member, {if_pinned: canPin});

        var response_JSONString	 = {
                            error: false,
                            errorMessage: "somethign went wrong in the cloud.",
                            member: member,
                            update_action: "meetingfeedselection",
                            update_argument: member['if_pinned']
            };


        setTimeout(function(){
            //Proxy.memberPinned(member, member['if_pinned']);
            Proxy.slot_ProxyHandler_Update_MemberInfo(response_JSONString);

        }, 1000);
    },

    muteCamera: function(member, canCameraMute){
        var member = Proxy.updateMember(member, {if_camera_muted: canCameraMute});

        var response_JSONString	 = {
                            error: false,
                            errorMessage: "somethign went wrong in the cloud.",
                            member: member,
                            update_action: "cameramute",
                            update_argument: member['if_camera_muted']
            };


        setTimeout(function(){
            //Proxy.cameraMuted(member, member['if_camera_muted']);
            Proxy.slot_ProxyHandler_Update_MemberInfo(response_JSONString);

        }, 1000);
    },

    recentMeetings: function(){
        return Global.recent_meetings;
    },

    connectCall: function(phone_number){
        var response_JSONString	 = {
                            error: false,
                            errorMessage: "somethign went wrong in the cloud.",
                            phone: phone_number
        };

        // Connect call
        response_JSONString['update_action'] = "creating"
        Proxy.slot_ProxyHandler_Phone_ConnectCall( response_JSONString );
        
        setTimeout(function(){
            response_JSONString['update_action'] = "calling"
            Proxy.slot_ProxyHandler_Phone_ConnectCall( response_JSONString );
        }, 3000);

        setTimeout(function(){
            response_JSONString['update_action'] = "connecting"
            Proxy.slot_ProxyHandler_Phone_ConnectCall( response_JSONString );
        }, 5000);

        setTimeout(function(){
            response_JSONString['update_action'] = "connected"
            Proxy.slot_ProxyHandler_Phone_ConnectCall( response_JSONString );

            var new_fake_meeting = {name: "Conf Call - 123", id: 666, members: [{jid: 'http://rhino04@logitech.com/gmail.994187DE3', type: 'room',  name: 'Board Room',  photo: 'images/main/people/in_meeting-thumb.jpg' }]};
            if(!Proxy.currentMeeting()){                
                Mock.joinMeeting(new_fake_meeting);
            }

            Mock.joinMember({jid: 'phone@logitech.com/'+phone_number, type: 'phone', name: phone_number, photo: 'images/main/people/phone.png'});
            
        }, 7000);

    }
}
