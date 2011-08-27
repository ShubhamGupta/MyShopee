var KeyboardInput = {
    init: function(){
        var keyboard = jQuery("#keyboard-input").keyboard(this.config);

        jQuery.keyboard.keyaction.start = function(base){
          base.close(true);

          jQuery(".ui-keyboard-preview").val(jQuery(".ui-keyboard-preview").attr("title"));
          jQuery(".ui-keyboard-start-active").addClass("ui-keyboard-start");
          jQuery(".ui-keyboard-start").removeClass("ui-keyboard-start-active");

          jQuery("#home-newmeeting .touch-container").trigger("click");
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
        visible: function(e){
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

        display: {'start': 'Start', 'meta1': '_123', 'meta2': '#+=', 'default_layout': 'ABC', 'numeric_layout': '_123'},
        customLayout: {
            'default': [
                'q w e r t y u i o p', 
                'a s d f g h j k l',
                '{shift} z x c v b n m {b}',
                '{meta1} {space} {start}'
            ],

            'shift': [
                'Q W E R T Y U I O P', 
                'A S D F G H J K L',
                '{shift} Z X C V B N M {b}',
                '{numeric_layout} {space} {start}'
            ],

            'meta1': [
                '1 2 3 4 5 6 7 8 9 0', 
                '- / : ; ( ) $ & @ "',
                '{meta2} . , ? ! \' {b}',
                '{default_layout} {space} {start}'
            ],

            'meta2': [
                '[ ] { } # % ^ * + =', 
                '_ \\ | ~ < > € £ ¥ .',
                '{numeric_layout} . , ? ! \' {b}',
                '{default_layout} {space} {start}'
            ]
 
       }
    }
}
