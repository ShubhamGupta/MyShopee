var DialpadInput = {
    init: function(){
        var keyboard = jQuery("#dialpad-input").keyboard(this.config);

        jQuery.keyboard.keyaction.connect = function(base){
          Mock.connectCall(jQuery(Global.dialpad.getkeyboard().preview).val());
          return false;
        }

        jQuery.keyboard.keyaction.cancel = function(base){
          jQuery(".ui-keyboard").removeClass("dialpad");            
          base.close();
          return false;
        }

        return keyboard;
    },
    
    config:  {
        layout: "custom",

        beforeClose:function(e){
          jQuery(".ui-keyboard").removeClass("dialpad");            
        },

        visible: function(e){
          jQuery(".ui-keyboard").addClass("dialpad");

          jQuery(Global.dialpad.getkeyboard().preview).val(jQuery(e.target).attr('title'));
          jQuery(Global.dialpad.getkeyboard().preview).blur();

          jQuery(".ui-keyboard-button:not(.ui-keyboard-actionkey)").bind("mousedown.keyboard", function(){

            if(jQuery(Global.dialpad.getkeyboard().preview).val() == jQuery(e.target).attr('title')){
              jQuery(Global.dialpad.getkeyboard().preview).val('');
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
