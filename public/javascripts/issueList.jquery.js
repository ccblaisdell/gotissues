var methods = {
};

var settings = {
};

$.fn.issueList = function( options_or_method ){

  return this.each(function(){
    
    if ( methods[ options_or_method ] ) {
      return methods[ method ].apply( this, $( this ) );
    } else {
      $.extend( settings, options_or_method );
    }
    
    var $this = $(this);
            
    // ask for all the issues in json form
    $.ajax({
      type: "GET",
      url: settings.url,
      dataType: "json",
      before: function(){},
      complete: function(){},
      success: function(data){
        console.log(data);
        $this.data("issues", data);
      }
    });
    
    // use a templating plugin to build them out
    // periodically look for updates
    // get updates in small chunks and just update those parts
    
  });

};