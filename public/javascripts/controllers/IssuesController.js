$(function(){
  window.GotIssuesController = Backbone.Controller.extend({

    routes: {
      "": "issuesIndex",
      "/issues/:id" : "issueShow"
    },

    help: function() {
      console.log("help");
    },

    search: function(query, page) {
      console.log("search", query, page);
    },
    
    issuesIndex: function() {
      // Issues.refresh();
      Issue.hide();
      List.show();
    },

    issueShow: function(id) {
      List.hide();
      Issue.render(id);
      Issue.show();
    }

  });
})