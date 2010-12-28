// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
$(function(){
  $('a.assignee').switchAssignee();
  // Add the close handler
  $(document).mousedown(function(event){
    $.fn.switchAssignee('checkOutsideClick');
  })
})