var DialpadInput = {
    init: function(){
        var keyboard = jQuery("#dialpad-input").keyboard(this.config);

        jQuery.keyboard.keyaction.connect = function(base){
          //base.close(true);

          //jQuery(".ui-keyboard-preview").val(jQuery(".ui-keyboard-preview").attr("title"));
          //jQuery(".ui-keyboard-start-active").addClass("ui-keyboard-start");
          //jQuery(".ui-keyboard-start").removeClass("ui-keyboard-start-active");

          Mock.connectCall(jQuery(".ui-keyboard-preview").val());
          return false;
        }

        jQuery.keyboard.keyaction.cancel = function(base){
          return false;
        }

        return keyboard;
    },
    
    config:  {
        layout: "custom",
        visible: function(e){
          jQuery(".ui-keyboard").addClass("dialpad");
          if(jQuery(".ui-keyboard-cancel").size() == 0){
            jQuery(".ui-keyboard-preview").parent().append("<input type='button' value='' class='ui-keyboard-cancel'/>");
            jQuery(".ui-keyboard-cancel").bind('click', function(){Global.current_keyboard.getkeyboard().close();});
          }

          jQuery(".ui-keyboard-preview").val(jQuery(".ui-keyboard-preview").attr('title'));
          jQuery(".ui-keyboard-preview").blur();

          jQuery(".ui-keyboard-button:not(.ui-keyboard-actionkey)").bind("mousedown.keyboard", function(){

            if(jQuery(".ui-keyboard-preview").val() == jQuery(".ui-keyboard-preview").attr('title')){
              jQuery(".ui-keyboard-preview").val('');
              jQuery(".ui-keyboard-start").addClass("ui-keyboard-start-active");
              jQuery(".ui-keyboard-start-active").removeClass("ui-keyboard-start");
            }

          
          });

          jQuery(".ui-keyboard-button:not(.ui-keyboard-actionkey)").bind("click.keyboard", function(){
            var keyboard = Global.current_keyboard.getkeyboard();

            // Code to handle shift key function (input one and back to normal)
            if(keyboard.shiftActive == true){
              keyboard.metaActive   = "";
              keyboard.shiftActive  = false;
              keyboard.showKeySet();
            }
          });

        },

        openOn: "click",

        keyBinding: "mouseup",

        display: {'connect': ' ', 'cancel': ' '},
        customLayout: {
            'default': [
                '1 2 3 {b}',
                '4 5 6 {cancel}',
                '7 8 9 {connect}',
                '* 0 #'
            ]


       }
    }
}
