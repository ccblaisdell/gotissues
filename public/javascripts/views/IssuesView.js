$(function(){
  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  window.IssuesView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#issues_app"),
    firstRender: true,

    // Our template for the line of statistics at the bottom of the app.
    // statsTemplate: _.template($('#stats-template').html()),
    
    // Events
    events: {
      "submit #new_issue"     : "newIssue",
      
      "click #filter_open"    : "toggleOpen",
      "click #filter_reopened": "toggleReopened",
      "click #filter_resolved": "toggleResolved",
      "click #filter_closed"  : "toggleClosed",
      
      "click #sort_by_status"  : "sortByStatus",
      "click #sort_by_created" : "sortByCreatedAt",
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
      _.bindAll(this, 'addOne', 'addAll', 'render');
      
      // grab all the buttons n stuff
      this.form    = this.$("#new_issue");
      this.name_input = this.$("#issue_name");
      this.desc_input = this.$("#issue_description");
      this.tags_input = this.$("#issue_tag_list");
      this.assignee_select = this.$("#issue_assignee_id");
      this.priority_select = this.$("#issue_priority");
      
      Issues.bind('add',     this.addOne);
      Issues.bind('refresh', this.addAll);
      Issues.bind('all',     this.render);
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      // var done = Todos.done().length;
      // this.$('#todo-stats').html(this.statsTemplate({
      //   total:      Todos.length,
      //   done:       Todos.done().length,
      //   remaining:  Todos.remaining().length
      // }));
      
      // start with all closed issues hidden
      // this.hideClosed(); // This will hide closed on every re-render
      if (this.firstRender) {
        // this.toggleClosed({target: "#filter_closed", preventDefault: function(){return false;}});
        this.hideClosed();
        this.$("#filter_open, #filter_resolved, #filter_reopened").addClass("selected");
        this.firstRender = false;
      }
    },
    
    hide: function() {
      this.el.hide();
    },
    show: function() {
      this.el.show();
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(issue) {
      var view = new IssueView({model: issue});
      this.$("#issues").append(view.render().el);
    },

    // Add all items in the **Issues** collection at once.
    addAll: function() {
      Issues.each(this.addOne);
    },

    // Generate the attributes for a new Todo item.
    newAttributes: function() {
      return {
        name: this.name_input.val(),
        description: this.desc_input.val(),
        tag_list: this.tags_input.val(),
        assignee_id: this.assignee_select.val(),
        priority: this.priority_select.val()
      }
    },

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    createOnEnter: function(e) {
      // if (e.keyCode != 13) return;
      // Todos.create(this.newAttributes());
      // this.input.val('');
      console.log("createOnEnter");
    },
    
    newIssue: function(e) {
      e.preventDefault();
      var i = Issues.create(this.newAttributes());
    },

    // Clear all done todo items, destroying their models.
    clearCompleted: function() {
      // _.each(Todos.done(), function(todo){ todo.clear(); });
      console.log("clearCompleted");
      return false;
    },

    // Lazily show the tooltip that tells you to press `enter` to save
    // a new todo item, after one second.
    showTooltip: function(e) {
      // var tooltip = this.$(".ui-tooltip-top");
      // var val = this.input.val();
      // tooltip.fadeOut();
      // if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
      // if (val == '' || val == this.input.attr('placeholder')) return;
      // var show = function(){ tooltip.show().fadeIn(); };
      // this.tooltipTimeout = _.delay(show, 1000);
      console.log("showTooltip")
    },
    
    toggleClosed: function(e) {
      e.preventDefault();
      $button = $(e.target);
      if ($button.hasClass("selected")) {
        $button.removeClass("selected")
        this.hideClosed();
      } else {
        $button.addClass("selected");
        return _.each(Issues.oldClosed(), function(issue){issue.view.show();})
      }
    },
    hideClosed: function(){
      this.showingClosed = false;
      return _.each(Issues.oldClosed(), function(issue){issue.view.hide();});
    },
        
    toggleOpen: function(e) {
      e.preventDefault();
      $button = $(e.target);
      if ($button.hasClass("selected")) {
        $button.removeClass("selected")
        return _.each(Issues.open(), function(issue){issue.view.hide();})
      } else {
        $button.addClass("selected");
        return _.each(Issues.open(), function(issue){issue.view.show();})
      }
    },
            
    toggleResolved: function(e) {
      e.preventDefault();
      $button = $(e.target);
      if ($button.hasClass("selected")) {
        $button.removeClass("selected")
        return _.each(Issues.resolved(), function(issue){issue.view.hide();})
      } else {
        $button.addClass("selected");
        return _.each(Issues.resolved(), function(issue){issue.view.show();})
      }
    },
    
    toggleReopened: function(e) {
      e.preventDefault();
      $button = $(e.target);
      if ($button.hasClass("selected")) {
        $button.removeClass("selected")
        return _.each(Issues.reopened(), function(issue){issue.view.hide();})
      } else {
        $button.addClass("selected");
        return _.each(Issues.reopened(), function(issue){issue.view.show();})
      }
    },
    
    sortByStatus: function(e) {
      e.preventDefault();
      $button = $(e.target);
      
      // Make this the selected button
      $button.parent('.buttongroup').find('.selected').removeClass('selected');
      $button.addClass('selected');
      
      // determine sort order and sort the items
      if ($button.attr('data-sort-order') && $button.attr('data-sort-order') == 'desc') {
        $button.attr('data-sort-order', 'asc');
        // sort asc
        // _.sortBy(Issues.models, function(issue){ issue.get("status"); });
        Issues.byStatus();
      } else {  // desc is default
        $button.attr('data-sort-order', 'desc');
        // sort desc
        // _.sortBy(Issues.models, function(issue){ issue.get("status"); });
        Issues.byStatus();
      }
    }

  });
})