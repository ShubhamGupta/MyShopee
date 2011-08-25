var KeyboardInput = {
    init: function(){
        jQuery("#keyboard-input").keyboard(this.config);

        jQuery.keyboard.keyaction.start = function(base){
          base.close(true);
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


    },
    
    config:  {
        layout: "custom",
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
