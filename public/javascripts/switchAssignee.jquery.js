var settings_switch_assignee_ = {
};

var methods_switch_assignee = {
  
  toggle: function($this){
    var $users = $this.nextAll('.change_assignee_list');
    if ($users.is(':visible')){
      methods_switch_assignee.hide($this, $users);
    } else {
      methods_switch_assignee.show($this, $users);
    }
    console.log('toggle', $this, $users);
  },
  
  hide: function($this, $users){
    $users.hide();
  },
  
  show: function($this, $users){
    $users.show();
  },
  
  checkOutsideClick: function(event){
    console.log('checkoutside', event);
    var $target = $(event.target);
    if (!$target.parents().andSelf().is('.change_assignee_list')) {
      $.fn.switchAssignee('closeAll');
    }
  },
  
  closeAll: function(){
    console.log('closeAll');
    $('.change_assignee_list').hide();
  }
};

$.fn.switchAssignee = function( options_or_method ){
  return this.each(function(){
    
    if ( methods_switch_assignee[options_or_method] ) {
      return methods_switch_assignee[ options_or_method ].call( this, $( this ) );
    } else {
      $.extend(settings_switch_assignee_, options_or_method);
    }
            
    var $this = $(this);
    
    var $trigger = $('<a></a>')
                     .html('change')
                     .addClass('switch_assignee')
                     .attr('href', '#')
                     .click(function(e){
                       e.preventDefault();
                       methods_switch_assignee['toggle']($this)
                     })
                     .insertAfter($this);
    
    var $users = $('<ul></ul>').addClass('users change_assignee_list').hide();
    
    $.each(USERS, function(index, user){
      var project_id = $this.closest('.project').attr('data-id');
      var issue_id = $this.closest('.issue').attr('data-id');
      
      // create a list item
      var li = $('<li></li>');
      // create a link
      var link = $('<a></a>').html(user.name)
      // point the link to the assign action
                   .attr('href', '/projects/' + project_id + '/issues/' + issue_id + '/assign_to/' + user.id)
      // have it submit ajax on click
                   .click(function(e){
                     e.preventDefault()
                   })
      // append the link to the list item
                   .appendTo(li);
      // append the list item to the list
      li.appendTo($users);
    });
    
    // insert the list after the trigger
    $users.insertAfter($trigger);
    console.log($this, $trigger, $users);
  });
};