function switchStatus (switcher, status) {
  var original_status = switcher.html();
  
  // queue the ajax call
  switcher.queue(function(next){
    
    // fire off the ajax call
    $.ajax({
      url: switcher.attr('href') + ".json",
      dataTypeString: 'json',
      beforeSend: function(){
        switcher.parent('li').addClass('busy');
      },
      complete: function(){
        switcher.parent('li').removeClass('busy');
        next();
      },
      success: function(data){
        switcher
          .html(data.issue.status)
          .removeClass()
          .addClass('status ' + data.issue.status)
            .closest('.issue')
            .removeClass(STATES.join(" "))
            .addClass(data.issue.status)
            .attr('data-status', data.issue.status)
            .attr('data-updated-at', data.issue.updated_at);
        
        // updated the filter counts
        var $list = switcher.closest('.issues');
        methods_sort_issues.update_filter_counts(
          $list,
          $list.prev().find('.filter_open'),
          $list.prev().find('.filter_closed'),
          $list.prev().find('.filter_resolved'),
          $list.prev().find('.filter_reopened')
        );
      },
      error: function(){
        switcher.html(original_status);
      }
    });
    
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