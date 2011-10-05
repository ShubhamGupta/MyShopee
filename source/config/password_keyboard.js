var PasswordKeyboardInput = {
    init: function(options){
        var keyboard = jQuery("#password-keyboard-input").keyboard(this.config);
        var callback = options['callback'];

        jQuery.keyboard.keyaction.submit_password = function(base){
          base.close(true);

          jQuery(".ui-keyboard-submit_password-active").addClass("ui-keyboard-submit_password");
          jQuery(".ui-keyboard-submit_password").removeClass("ui-keyboard-submit_password-active");

          callback({update_action: 'password', password: jQuery(Global.current_password_keyboard.getkeyboard().preview).val()});
          
          jQuery(Global.current_password_keyboard.getkeyboard().preview).val(jQuery(Global.current_password_keyboard.getkeyboard().preview).attr("title"));
          
          return false;
        }

        jQuery.keyboard.keyaction.default_layout = function(base){
          base.metaActive = '';
          base.showKeySet();
          return false;
        }


        jQuery.keyboard.keyaction.numeric_layout = function(base){
          base.shiftActive = false;
          base.metaActive = 'meta1';
          base.showKeySet();
          return false;
        }

        return keyboard;
    },
    
    config:  {
        layout: "custom",

        beforeClose:function(e){
          jQuery(".ui-keyboard").removeClass("ui-keyboard-password");            
        },

        openOn: '',

        visible: function(){
          jQuery(".ui-keyboard").addClass("ui-keyboard-password");

          jQuery(Global.current_password_keyboard.getkeyboard().preview).val(jQuery(Global.current_password_keyboard).attr('title'));
          jQuery(Global.current_password_keyboard.getkeyboard().preview).blur();

          jQuery(".ui-keyboard-button:not(.ui-keyboard-actionkey)").bind("mousedown.keyboard", function(){

            if(jQuery(Global.current_password_keyboard.getkeyboard().preview).val() == jQuery(Global.current_password_keyboard.getkeyboard().preview).attr('title')){
              jQuery(Global.current_password_keyboard.getkeyboard().preview).val('');
              jQuery(".ui-keyboard-submit_password").addClass("ui-keyboard-submit_password-active");
              jQuery(".ui-keyboard-submit_password-active").removeClass("ui-keyboard-submit_password");
            }

          
          });

          jQuery(".ui-keyboard-button:not(.ui-keyboard-actionkey)").bind("click.keyboard", function(){
            var keyboard = Global.current_password_keyboard.getkeyboard();

            // Code to handle shift key function (input one and back to normal)
            if(keyboard.shiftActive == true){
              keyboard.metaActive   = "";
              keyboard.shiftActive  = false;
              keyboard.showKeySet();
            }
          });

        },

        usePreview: false,

        keyBinding: "mouseup",

//        alwaysOpen: true,

        display: {'submit_password': 'Submit', 'meta1': '_123', 'meta2': '#+=', 'default_layout': 'ABC', 'numeric_layout': '_123'},
        customLayout: {
            'default': [
                'q w e r t y u i o p', 
                'a s d f g h j k l',
                '{shift} z x c v b n m {b}',
                '{meta1} {space} {submit_password}'
            ],

            'shift': [
                'Q W E R T Y U I O P', 
                'A S D F G H J K L',
                '{shift} Z X C V B N M {b}',
                '{numeric_layout} {space} {submit_password}'
            ],

            'meta1': [
                '1 2 3 4 5 6 7 8 9 0', 
                '- / : ; ( ) $ & @ "',
                '{meta2} . , ? ! \' {b}',
                '{default_layout} {space} {submit_password}'
            ],

            'meta2': [
                '[ ] { } # % ^ * + =', 
                '_ \\ | ~ < > € £ ¥ .',
                '{numeric_layout} . , ? ! \' {b}',
                '{default_layout} {space} {submit_password}'
            ]
 
       }
    }
}
