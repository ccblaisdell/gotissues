$(function(){
  // Issue Item View
  // --------------

  // The DOM element for an issue item...
  window.IssueView = Backbone.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: ich.issue,

    // The DOM events specific to an item.
    events: {
      "click .status" : "switchStatus",
      "click .delete" : "delete",
      "click .assignee" : "toggleAssignees",
      "click .assign_to" : "assign"
    },

    // The TodoView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Todo** and a **TodoView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
      _.bindAll(this, 'render', 'close');
      this.model.bind('change', this.render);
      this.model.view = this;
    },

    // Re-render the contents of the todo item.
    render: function() {
      var view = this;
      $(this.el).html(this.template( _.extend(this.model.toJSON(), {
        hasDescription: function(){
          return view.model.get("description") ? true : false;
        },
        commentsLength: view.model.get("comments").length,
        noAssignee: function(){
          return view.model.get("assignee") ? false : true;
        },
        users: USERS
      }) ));
      return this;
    },

    // Toggle the `"status"` of the model.
    switchStatus: function() {
      this.model.switchStatus();
    },
    
    delete: function(e) {
      e.preventDefault();
      if (confirm("This can't be undone. Do you want to delete this issue?")) this.model.delete();
      return false;
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      $(this.el).addClass("editing");
      // this.input.focus();
      console.log('editing')
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
      // this.model.save({content: this.input.val()});
      $(this.el).removeClass("editing");
      console.log("close");
    },
    
    show: function() {
      $(this.el).show();
    },
    hide: function() {
      $(this.el).hide();
    },

    // If you hit `enter`, we're through editing the item.
    // updateOnEnter: function(e) {
    //   if (e.keyCode == 13) this.close();
    // },

    // Remove this view from the DOM.
    remove: function() {
      $(this.el).slideUp(250, function(){ $(this).remove(); });
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.clear();
    },
    
    toggleAssignees: function(){
      var $users = this.$(".change_assignee_list");
      if ($users.is(":visible")) {
        $users.hide();
      } else {
        $(".change_assignee_list").hide();
        $users.show();
      }
    },
    
    assign: function(e){
      $assignee = $(e.target);
      this.model.save({
        assignee_id: $assignee.attr("data-id"),
        assignee: {
          name: $assignee.html(),
          id: $assignee.attr("data-id")
        }
      });
      console.log(this.model.get("assignee_id"));
      this.$(".change_assignee_list").hide();
    }

  });
})