var settings_switch_assignee = {
  open_text: "&#x25BC;", // down arrow
  close_text: "&#x25B2;" // up arrow
};

var methods_switch_assignee = {
  toggle: function($this){
    var $users = $this.nextAll('.change_assignee_list');
    if ($users.is(':visible')){
      methods_switch_assignee.hide($this, $users);
    } else {
      methods_switch_assignee.show($this, $users);
    }
  },
  
  hide: function($this, $users){
    $users.hide();
    $this.nextAll('.switch_assignee').html(settings_switch_assignee.open_text);
  },
  
  show: function($this, $users){
    var switcher = $this.next('.switch_assignee');
    var link_position = switcher.position();
    $users.css({left: link_position.left - 15, top: link_position.top + switcher.height() + 20});
    $users.show();
    $this.nextAll('.switch_assignee').html(settings_switch_assignee.close_text);
  },
  
  close: function($this){
    methods_switch_assignee.hide($this, $this.nextAll('.change_assignee_list'));
  }
};

$.fn.switchAssignee = function( options_or_method ){
  return this.each(function(){
    
    if ( methods_switch_assignee[options_or_method] ) {
      return methods_switch_assignee[ options_or_method ].call( this, $( this ) );
    } else {
      $.extend(settings_switch_assignee, options_or_method);
    }
            
    var $this = $(this);
    
    var $trigger = $('<a></a>')
                     .html(settings_switch_assignee.open_text)
                     .addClass('switch_assignee')
                     .attr('href', '#')
                     .click(function(e){
                       e.preventDefault();
                       methods_switch_assignee['toggle']($this);
                     })
                     .insertAfter($this);
    
    var $users = $('<ul></ul>').addClass('users change_assignee_list').hide();
    var $arrow = $('<li></li>').addClass('arrow').appendTo($users);
    
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
                   .attr('data-remote', 'true')
      // append the link to the list item
                   .appendTo(li);
      // append the list item to the list
      li.appendTo($users);
    });
    
    // insert the list after the trigger
    $users.insertAfter($trigger);
  });
};