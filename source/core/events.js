$(window).load(function (){
    // Functionality that needs to run on page load
    Events.init.screenSaver();
});

var Events = {
    init: {
        screenSaver: function(){
            $('#splash-screen').bind('click', function(){
                UI.screenSaver(0);
            });
            API.startTimers();
        }
    }
}