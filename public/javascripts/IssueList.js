$(function(){
  // Issue List
  // ---------------
  
  window.IssueList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Issue,

    // Save all of the todo items under the `"todos"` namespace.
    // localStorage: new Store("todos"),
    url: function() {
      return window.location.pathname + '/issues';
    },

    // Filter down the list of all todo items that are finished.
    closed: function() {
      return this.filter(function(issue){ return issue.get('status') == "closed"; });
    },
    
    oldClosed: function() {
      return this.filter(function(issue){
        return (issue.get("status") == "closed" && !issue.recent);
      });
    },

    open: function() {
      return this.filter(function(issue){
        return (issue.get("status") == "open");
      });
    },

    resolved: function() {
      return this.filter(function(issue){
        return (issue.get("status") == "resolved");
      });
    },

    reopened: function() {
      return this.filter(function(issue){
        return (issue.get("status") == "reopened");
      });
    },
    
    // Filter all issues that are not closed
    active: function() {
      return this.filter(function(issue){
        return (issue.get('status') != "closed" && !issue.recent); 
      })
    },

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextNumber: function() {
      console.log("nextNumber");
      if (!this.length) return 1;
      return this.last().get('number') + 1;
    },

    // Todos are sorted by their original insertion order.
    comparator: function(issue) {
      return issue.get('number');
    }

  });
})