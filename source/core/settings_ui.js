/*

Types of screens: [select, info-and-continue, loading, input-keyboard, confirm, retry]

Each screen has: [title, content (optional), fixed_options, variable_options, help, back_to]
Fixed options and/or Variable options and each option consists: [callback, label, value]

*/

var SettingsUI = {

    screen: {
        init: function(options){
            this.title              = options['title'] || '';
            this.content            = options['content'] || '';
            this.fixed_options      = options['fixed_options'] || new Array();
            this.variable_options   = options['variable_options'] || new Array();
            this.back_to            = options['back_to'] || null;
        },

        render: function(){
        },

        
    }

}
