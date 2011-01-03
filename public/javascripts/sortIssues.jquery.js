var settings_sort_issues = {
};

var methods_sort_issues = {
  // sort functions
  sort_by_status: function($this){
    $this.find('> li').sortElements(function(a,b){
      return $(a).find('.status').first().html > $(b).find('.status').first().html() ? 1 : -1;
    });
  },
  sort_by_updated_at: function($this){
    $this.find('> li').sortElements(function(a,b){
      return $(a).attr('data-updated-at') > $(b).attr('data-updated-at') ? 1 : -1;
    });
  },
  sort_by_created_at: function($this){
    $this.find('> li').sortElements(function(a,b){
      return $(a).attr('data-created-at') > $(b).attr('data-created-at') ? 1 : -1;
    });
  },
  
  // filter functions
  filter_open: function($this){
    $this.find('> .open').toggle();
  },
  filter_closed: function($this){
    $this.find('> .closed').toggle();
  },
  filter_resolved: function($this){
    $this.find('> .resolved').toggle();
  },
  filter_reopened: function($this){
    $this.find('> .reopened').toggle();
  }
};

$.fn.sortIssues = function( options_or_method ){
  return this.each(function(){
    
    if ( methods_sort_issues[options_or_method] ) {
      return methods_sort_issues[ options_or_method ].call( this, $( this ) );
    } else {
      $.extend(settings_sort_issues, options_or_method);
    }
            
    var $this = $(this);
    
    // Create sort menu
    var $sort_by = $('<p class="menu"></p>').html("Order by: ");
    var $by_status = $('<a href="#"></a>')
      .html("by status")
      .click(function(e){
        e.preventDefault();
        methods_sort_issues.sort_by_status($this);
      });
    
    var $by_updated_at = $('<a href="#"></a>')
      .html("by date updated")
      .click(function(e){
        e.preventDefault();
        methods_sort_issues.sort_by_updated_at($this);
      });      
      
    var $by_created_at = $('<a href="#"></a>')
      .html("by date created")
      .click(function(e){
        e.preventDefault();
        methods_sort_issues.sort_by_created_at($this);
      });
    
    
    // build sort menu
    $sort_by.append($by_status, $by_updated_at, $by_created_at)
      .insertBefore($this);
      
    // filter menu
    var $filter_by = $('<p class="menu"></p>').html("Show: ");

    var $filter_open = $('<a href="#"></a>')
      .html("open").addClass('selected')
      .click(function(e){
        e.preventDefault();
        $(this).toggleClass('selected');
        methods_sort_issues.filter_open($this);
      });
    
    var $filter_closed = $('<a href="#"></a>')
      .html("closed").addClass('selected')
      .click(function(e){
        e.preventDefault();
        $(this).toggleClass('selected');
        methods_sort_issues.filter_closed($this);
      });
  
    var $filter_resolved = $('<a href="#"></a>')
      .html("resolved").addClass('selected')
      .click(function(e){
        e.preventDefault();
        $(this).toggleClass('selected');
        methods_sort_issues.filter_resolved($this);
      });
      
    var $filter_reopened = $('<a href="#"></a>')
      .html("reopened").addClass('selected')
      .click(function(e){
        e.preventDefault();
        $(this).toggleClass('selected');
        methods_sort_issues.filter_reopened($this);
      });
    
    // build sort menu
    $filter_by.append($filter_open, $filter_closed, $filter_resolved, $filter_reopened)
      .insertBefore($this);
  });
};