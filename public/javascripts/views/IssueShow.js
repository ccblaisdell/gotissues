$(function(){
  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  window.IssueShow = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#issue"),
    template: ich.issue_show,

    // Our template for the line of statistics at the bottom of the app.
    // statsTemplate: _.template($('#stats-template').html()),
    
    // Events
    events: {
      // "submit #new_issue"     : "newIssue",
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
      _.bindAll(this, 'render');
      
      // Issues.bind('add',     this.addOne);
      // Issues.bind('refresh', this.addAll);
      // Issues.bind('all',     this.render);
      
      // this.model.bind('change', this.render);
      // this.model.show = this;
      // this.hide();
    },
    
    show: function() {
      this.render();
      this.el.show();
    },
    hide: function() {
      this.el.hide();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function(id) {
      if (id) {
        Issues.get(id).fetch();
        this.el.html( this.template(Issues.get(id).toJSON()) );
      }
      // var done = Todos.done().length;
      // this.$('#todo-stats').html(this.statsTemplate({
      //   total:      Todos.length,
      //   done:       Todos.done().length,
      //   remaining:  Todos.remaining().length
      // }));
    }
  });
})