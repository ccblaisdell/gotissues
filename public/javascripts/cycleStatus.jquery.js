function switchStatus (switcher, status) {
  var original_status = switcher.html();
  
  switcher
    .html(status)
    .removeClass()
    .addClass('status ' + status)
      .closest('.issue')
      .removeClass(STATES.join(" "))
      .addClass(status)
      .attr('data-status', status);
      
  // fire off the ajax call
  $.ajax({
    url: switcher.attr('href'),
    beforeSend: function(){
      switcher.addClass('busy');
    },
    complete: function(){
      switcher.removeClass('busy');
    },
    error: function(){
      switcher.html(original_status);
    }
  });
}

$(function(){
  $('.status').live("click", function(e){
    e.preventDefault();
    e.stopPropagation();
    var $this = $(this);
    
    var status_index = STATES.indexOf($this.html());
    status_index = (status_index < 0 || status_index == null) ? 0 : status_index;
    
    var next_status = status_index + 1 >= STATES.length ? 1 : status_index + 1;
    switchStatus($this, STATES[next_status]);
  });
})