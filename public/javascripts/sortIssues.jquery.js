var settings_sort_issues = {
  sort_desc_text: "&#x25BC;", // down arrow
  sort_asc_text: "&#x25B2;" // up arrow
};

var methods_sort_issues = {
  // sort functions
  sort_by_status: function($this, $button){
    methods_sort_issues.working($this);
    
    // make this the selected button
    $button.parent('.buttongroup').find('.selected').removeClass('selected');
    $button.addClass('selected');
    
    // determine sort order and sort the items
    if ($button.attr('data-sort-order') && $button.attr('data-sort-order') == 'desc') {
      $button.attr('data-sort-order', 'asc');
      $this.find('> li').sortElements(function(a,b){
        return $(a).find('.status').first().html() > $(b).find('.status').first().html() ? 1 : -1;
      });
    } else {  // desc is default
      $button.attr('data-sort-order', 'desc');
      $this.find('> li').sortElements(function(a,b){
        return $(a).find('.status').first().html() > $(b).find('.status').first().html() ? -1 : 1;
      });
    }
    methods_sort_issues.finished($this);
  },
  sort_by_updated_at: function($this, $button){
    methods_sort_issues.working($this);
  
    $button.parent('.buttongroup').find('.selected').removeClass('selected');
    $button.addClass('selected');
    
    // determine sort order and sort the items
    if ($button.attr('data-sort-order') && $button.attr('data-sort-order') == 'asc') {
      $button.attr('data-sort-order', 'desc');
      $this.find('> li').sortElements(function(a,b){
        return $(a).attr('data-updated-at') > $(b).attr('data-updated-at') ? 1 : -1;
      });
    } else { // asc is default
      $button.attr('data-sort-order', 'asc');
      $this.find('> li').sortElements(function(a,b){
        return $(a).attr('data-updated-at') > $(b).attr('data-updated-at') ? -1 : 1;
      });
    }
    methods_sort_issues.finished($this);
  },
  sort_by_created_at: function($this, $button){
    methods_sort_issues.working($this);
  
    $button.parent('.buttongroup').find('.selected').removeClass('selected');
    $button.addClass('selected');
    
    // determine sort order and sort the items
    if ($button.attr('data-sort-order') && $button.attr('data-sort-order') == 'asc') {
      $button.attr('data-sort-order', 'asc');
      $this.find('> li').sortElements(function(a,b){
        return $(a).attr('data-created-at') > $(b).attr('data-created-at') ? -1 : 1;
      });
    } else { //desc is default
      $button.attr('data-sort-order', 'desc');
      $this.find('> li').sortElements(function(a,b){
        return $(a).attr('data-created-at') > $(b).attr('data-created-at') ? 1 : -1;
      });
    }
    methods_sort_issues.finished($this);
  },
  sort_by_assignee_id: function($this, $button){
    methods_sort_issues.working($this);
  
    $button.parent('.buttongroup').find('.selected').removeClass('selected');
    $button.addClass('selected');
    
    // determine sort order and sort the items
    if ($button.attr('data-sort-order') && $button.attr('data-sort-order') == 'asc') {
      $button.attr('data-sort-order', 'asc');
      $this.find('> li').sortElements(function(a,b){
        return $(a).attr('data-assignee-id') > $(b).attr('data-assignee-id') ? 1 : -1;
      });
    } else { // desc is default
      $button.attr('data-sort-order', 'desc');
      $this.find('> li').sortElements(function(a,b){
        return $(a).attr('data-assignee-id') > $(b).attr('data-assignee-id') ? -1 : 1;
      });
    }
    methods_sort_issues.finished($this);
  },
  sort_by_priority: function($this, $button){
    methods_sort_issues.working($this);
  
    $button.parent('.buttongroup').find('.selected').removeClass('selected');
    $button.addClass('selected');
    
    // determine sort order and sort the items
    if ($button.attr('data-sort-order') && $button.attr('data-sort-order') == 'asc') {
      $button.attr('data-sort-order', 'asc');
      $this.find('> li').sortElements(function(a,b){
        return $(a).attr('data-priority') > $(b).attr('data-priority') ? 1 : -1;
      });
    } else { // desc is default
      $button.attr('data-sort-order', 'desc');
      $this.find('> li').sortElements(function(a,b){
        return $(a).attr('data-priority') > $(b).attr('data-priority') ? -1 : 1;
      });
    }
    methods_sort_issues.finished($this);
  },
  
  // filter functions
  filter_open: function($this, $button){
    methods_sort_issues.working($this);
  
    $button.toggleClass('selected');
    $this.find('> .open').toggle();
    methods_sort_issues.finished($this);
  },
  filter_closed: function($this, $button){
    methods_sort_issues.working($this);
  
    $button.toggleClass('selected');
    $this.find('> .closed').toggle();
    methods_sort_issues.finished($this);
  },
  filter_resolved: function($this, $button){
    methods_sort_issues.working($this);
  
    $button.toggleClass('selected');
    $this.find('> .resolved').toggle();
    methods_sort_issues.finished($this);
  },
  filter_reopened: function($this, $button){
    methods_sort_issues.working($this);
  
    $button.toggleClass('selected');
    $this.find('> .reopened').toggle();
    methods_sort_issues.finished($this);
  },
  
  // busy and not busy
  working: function($this){
    $this.addClass("working");
  },
  finished: function($this){
    $this.removeClass("working");
  },
  
  // filter counts
  update_filter_open_count: function($this, $button){
    $button.html( "open <small>" + $this.find('li.open').length + "</small>" );
  },
  update_filter_closed_count: function($this, $button){
    $button.html( "closed <small>" + $this.find('li.closed').length + "</small>" );
  },
  update_filter_resolved_count: function($this, $button){
    $button.html( "resolved <small>" + $this.find('li.resolved').length + "</small>" );
  },
  update_filter_reopened_count: function($this, $button){
    $button.html( "reopened <small>" + $this.find('li.reopened').length + "</small>" );
  },
  update_filter_counts: function($this, $filter_open, $filter_closed, $filter_resolved, $filter_reopened){
    methods_sort_issues.update_filter_open_count($this, $filter_open);
    methods_sort_issues.update_filter_closed_count($this, $filter_closed);
    methods_sort_issues.update_filter_resolved_count($this, $filter_resolved);
    methods_sort_issues.update_filter_reopened_count($this, $filter_reopened);
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
    var $menu = $('<p class="menu"></p>');
    
    // Create sort menu
    var $sort_by = $('<span class="buttongroup"></span>').html("Order by: ");
    var $by_status = $('<a href="#"></a>')
      .html("status")
      .click(function(e){
        e.preventDefault();
        methods_sort_issues.sort_by_status($this, $(this));
      });
    
    var $by_updated_at = $('<a href="#"></a>')
      .html("updated")
      .click(function(e){
        e.preventDefault();
        methods_sort_issues.sort_by_updated_at($this, $(this));
      });      
      
    var $by_created_at = $('<a href="#"></a>')
      .html("created").addClass("selected").attr('data-sort-order', "desc")
      .click(function(e){
        e.preventDefault();
        methods_sort_issues.sort_by_created_at($this, $(this));
      });  
            
    var $by_assigned_to = $('<a href="#"></a>')
      .html("assignee")
      .click(function(e){
        e.preventDefault();
        methods_sort_issues.sort_by_assignee_id($this, $(this));
      });
      
    var $by_priority = $('<a href="#"></a>')
      .html("priority")
      .click(function(e){
        e.preventDefault();
        methods_sort_issues.sort_by_priority($this, $(this));
      });
    
    
    // build sort menu
    $sort_by.append($by_status, $by_updated_at, $by_created_at, $by_assigned_to, $by_priority)
      .appendTo($menu);
      
    // filter menu
    var $filter_by = $('<span class="buttongroup"></span>').html("Show: ");

    var $filter_open = $('<a href="#"></a>')
      .html("open").addClass('selected filter_open')
      .click(function(e){
        e.preventDefault();
        methods_sort_issues.filter_open($this, $(this));
      });
    
    var $filter_closed = $('<a href="#"></a>')
      .html("closed").addClass('selected filter_closed')
      .click(function(e){
        e.preventDefault();
        methods_sort_issues.filter_closed($this, $(this));
      });
  
    var $filter_resolved = $('<a href="#"></a>')
      .html("resolved").addClass('selected filter_resolved')
      .click(function(e){
        e.preventDefault();
        methods_sort_issues.filter_resolved($this, $(this));
      });
      
    var $filter_reopened = $('<a href="#"></a>')
      .html("reopened").addClass('selected filter_reopened')
      .click(function(e){
        e.preventDefault();
        methods_sort_issues.filter_reopened($this, $(this));
      });
    
    // build sort menu
    $filter_by.append($filter_open, $filter_closed, $filter_resolved, $filter_reopened)
      .appendTo($menu);
    methods_sort_issues.update_filter_counts($this, $filter_open, $filter_closed, $filter_resolved, $filter_reopened);
    
    $menu.insertBefore($this);
    methods_sort_issues.filter_closed($this, $filter_closed);
  });
};