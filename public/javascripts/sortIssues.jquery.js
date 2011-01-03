var settings_sort_issues = {
};

var methods_sort_issues = {
  // sort functions
  sort_by_status: function($this, $button){
    // make this the selected button
    $button.parent('.buttongroup').find('.selected').removeClass('selected');
    $button.addClass('selected');
    
    // determine sort order and sort the items
    if ($button.attr('data-sort-order') && $button.attr('data-sort-order') == 'asc') {
      $button.attr('data-sort-order', 'desc');
      $this.find('> li').sortElements(function(a,b){
        return $(a).find('.status').first().html > $(b).find('.status').first().html() ? -1 : 1;
      });
    } else {
      $button.attr('data-sort-order', 'asc');
      $this.find('> li').sortElements(function(a,b){
        return $(a).find('.status').first().html > $(b).find('.status').first().html() ? 1 : -1;
      });
    }
  },
  sort_by_updated_at: function($this, $button){
    $button.parent('.buttongroup').find('.selected').removeClass('selected');
    $button.addClass('selected');
    
    // determine sort order and sort the items
    if ($button.attr('data-sort-order') && $button.attr('data-sort-order') == 'asc') {
      $button.attr('data-sort-order', 'desc');
      $this.find('> li').sortElements(function(a,b){
        return $(a).attr('data-updated-at') > $(b).attr('data-updated-at') ? -1 : 1;
      });
    } else {
      $button.attr('data-sort-order', 'asc');
      $this.find('> li').sortElements(function(a,b){
        return $(a).attr('data-updated-at') > $(b).attr('data-updated-at') ? 1 : -1;
      });
    }
  },
  sort_by_created_at: function($this, $button){
    $button.parent('.buttongroup').find('.selected').removeClass('selected');
    $button.addClass('selected');
    
    // determine sort order and sort the items
    if ($button.attr('data-sort-order') && $button.attr('data-sort-order') == 'asc') {
      $button.attr('data-sort-order', 'desc');
      $this.find('> li').sortElements(function(a,b){
        return $(a).attr('data-created-at') > $(b).attr('data-created-at') ? -1 : 1;
      });
    } else {
      $button.attr('data-sort-order', 'asc');
      $this.find('> li').sortElements(function(a,b){
        return $(a).attr('data-created-at') > $(b).attr('data-created-at') ? 1 : -1;
      });
    }
  },
  sort_by_assignee_id: function($this, $button){
    $button.parent('.buttongroup').find('.selected').removeClass('selected');
    $button.addClass('selected');
    
    // determine sort order and sort the items
    if ($button.attr('data-sort-order') && $button.attr('data-sort-order') == 'asc') {
      $button.attr('data-sort-order', 'desc');
      $this.find('> li').sortElements(function(a,b){
        return $(a).attr('data-assignee-id') > $(b).attr('data-assignee-id') ? -1 : 1;
      });
    } else {
      $button.attr('data-sort-order', 'asc');
      $this.find('> li').sortElements(function(a,b){
        return $(a).attr('data-assignee-id') > $(b).attr('data-assignee-id') ? 1 : -1;
      });
    }
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
    var $menu = $('<p class="menu"></p>');
    
    // Create sort menu
    var $sort_by = $('<span class="buttongroup"></span>').html("Order by: ");
    var $by_status = $('<a href="#"></a>')
      .html("by status")
      .click(function(e){
        e.preventDefault();
        methods_sort_issues.sort_by_status($this, $(this));
      });
    
    var $by_updated_at = $('<a href="#"></a>')
      .html("by date updated")
      .click(function(e){
        e.preventDefault();
        methods_sort_issues.sort_by_updated_at($this, $(this));
      });      
      
    var $by_created_at = $('<a href="#"></a>')
      .html("by date created").addClass("selected")
      .click(function(e){
        e.preventDefault();
        methods_sort_issues.sort_by_created_at($this, $(this));
      });  
      
    var $by_assigned_to = $('<a href="#"></a>')
      .html("by assignee")
      .click(function(e){
        e.preventDefault();
        methods_sort_issues.sort_by_assignee_id($this, $(this));
      });
    
    
    // build sort menu
    $sort_by.append($by_status, $by_updated_at, $by_created_at, $by_assigned_to)
      .appendTo($menu);
      
    // filter menu
    var $filter_by = $('<span class="buttongroup"></span>').html("Show: ");

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
      .appendTo($menu);
    
    $menu.insertBefore($this);
  });
};