var InviteKeyboardInput = {
    init: function(){
        var keyboard = jQuery("#invite-keyboard-input").keyboard(this.config).autocomplete(this.autoComplete).addAutocomplete();
        jQuery("#ui-autocomplete-container").bind('mousedown', function(e){
            e.preventDefault();
            return false;
        });
        SwipeMaster.init('.ui-autocomplete');
        jQuery.keyboard.keyaction.invite = function(base){

          Mock.inviteWithEmail(jQuery(".ui-keyboard-preview").val());
          base.close(true);
          jQuery(".ui-keyboard-preview").val(jQuery(".ui-keyboard-preview").attr("title"));

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

    autoComplete: {
        source: [
                    {value: "Tom Simmons <tom@sequence.com>", label: "<strong>Tom Simmons</strong> <br/> tom@sequence.com"},
                    {value: "Lisa Rogers <lisa@sequence.com>", label: "<strong>Lisa Rogers</strong> <br/> lisa@sequence.com"}, 
                    {value: "Tammy <tammy@sequence.com>", label: "<strong>Tammy</strong> <br/> tammy@sequence.com"}, 
                    {value: "John <john@sequence.com>", label: "<strong>John</strong> <br/> john@sequence.com"}, 
                    {value: "Rodney <rodney@sequence.com>", label: "<strong>Rodney</strong> <br/> rodney@sequence.com"}, 
                    {value: "Hariet <hariet@sequence.com>", label: "<strong>Hariet</strong> <br/> hariet@sequence.com"}, 
                    {value: "Vicky <vicky@sequence.com>", label: "<strong>Vicky</strong> <br/> vicky@sequence.com"}, 
                    {value: "Greg <greg@sequence.com>", label: "<strong>Greg</strong> <br/> greg@sequence.com"}

                ]
    },
    
    config:  {
        layout: "custom",
        beforeClose:function(e){jQuery("#ui-autocomplete-container").hide();},
        visible: function(e){
          jQuery(".ui-keyboard").addClass("invite-keyboard");
          jQuery("#ui-autocomplete-container").show();
 
          if(jQuery(".ui-keyboard-cancel").size() == 0){
            jQuery(".ui-keyboard-preview").parent().append("<input type='button' value='' class='ui-keyboard-cancel'/>");
            jQuery(".ui-keyboard-cancel").bind('click', function(){Global.current_invite_keyboard.getkeyboard().close();});
          }

/*
          if(jQuery("#ui-keyboard-autocomplete").size() == 0){
            jQuery(".ui-keyboard-preview").parent().append("<div id='ui-keyboard-autocomplete'/>");
          }
*/

          jQuery(".ui-keyboard-preview").val(jQuery(".ui-keyboard-preview").attr('title'));
          jQuery(".ui-keyboard-preview").blur();

          jQuery(".invite-keyboard .ui-keyboard-button:not(.ui-keyboard-actionkey)").bind("mousedown.keyboard", function(){

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

        display: {'invite': 'Invite', 'meta1': '_123', 'meta2': '#+=', 'default_layout': 'ABC', 'numeric_layout': '_123'},
        customLayout: {
            'default': [
                'q w e r t y u i o p', 
                'a s d f g h j k l',
                '{shift} z x c v b n m {b}',
                '{meta1} @ {space} . {invite}'
            ],

            'shift': [
                'Q W E R T Y U I O P', 
                'A S D F G H J K L',
                '{shift} Z X C V B N M {b}',
                '{numeric_layout} @ {space} . {invite}'
            ],

            'meta1': [
                '1 2 3 4 5 6 7 8 9 0', 
                '$ ! ~ & = # [ ]',
                '{meta2} . _ - + {b}',
                '{default_layout} @ {space} . {invite}'
            ],

            'meta2': [
                '` | { } ? % ^ * / \'', 
                '$ ! ~ & = # [ ]',
                '{numeric_layout} . _ - + {b}',
                '{default_layout} @ {space} . {invite}'
            ]
 
       }
    }
}
