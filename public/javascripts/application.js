// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
$(function(){
  $('.assignee').switchAssignee();
  // Add the close handler
  $(document).mousedown(function(event){
    var $target = $(event.target);
    if (!$target.parents().andSelf().is('.change_assignee_list, .switch_assignee, .assignee')) {
      $('.assignee').switchAssignee('close');
    }
  })
})