var UI = {
    screenSaver: function(display){
        var el = $('#splash-screen');
        display ? el.fadeIn() : el.fadeOut();
    },
    
    processingPopup: function(){},
    loadMeetings: function(){},
    connectMeeting: function(){},
    updateMeetingTimeElapsed: function(){},
    endMeeting: function(){},
    switchMeeting: function(){},
    newMeeting: function(){},
    newPhoneCall: function(){},
    muteMember: function(){},
    pinMember: function(){},
    memberCameraSettings: function(){},
    muteMemberCamera: function(){}

}