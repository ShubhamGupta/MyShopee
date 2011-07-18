var sequenceAPI = {
    startTimers: function(){
        var date = new Date();
        $('.header .time').html(date.format('ddd - mmm dd - h:MM').replace(/-/g, "<span>&nbsp;</span>")).bind('click', function(){
            $('#splash-screen').fadeIn(); // Easter egg to get the splash screen back
        }).css('cursor','pointer');
        // Format date and time for splash screen
        $('.splash-time').html(date.format('h:MM'));
        $('.splash-date').html(date.format('ddd - mmm dd').replace(/-/g, "<span>&nbsp;</span>"))

        Global.inmeetingTime++;
        _seconds = Global.inmeetingTime%60 < 10 ? '0' + Math.floor(Global.inmeetingTime%60) : '' + Math.floor(Global.inmeetingTime%60);
        _minutes = '' + Math.floor(Global.inmeetingTime/60);
        $('.small-time').html('' + _minutes + ':' + _seconds);
        setTimeout(this.startTimers, 1000);
    
    },
    
    getMeetings: function(){},
    connectMeeting: function(){},
    currentMeeting: function(){},
    meetingTimeElapsed: function(){},
    getMeetingMembers: function(){},
    endMeeting: function(){},
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