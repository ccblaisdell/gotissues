$(function(){
  // Issue Model
  // ----------

  // Our basic **Todo** model has `content`, `order`, and `done` attributes.
  window.Issue = Backbone.Model.extend({

    // Default attributes for the todo.
    defaults: {
    },
    
    states: ["open","resolved","closed","reopened"],

    // Ensure that each issue has the required attributes
    initialize: function() {
      
    },

    switchStatus: function() {
      var status_index = this.states.indexOf(this.get("status"));
      status_index = (status_index < 0 || status_index == null) ? 0 : status_index;
      
      var next_status = status_index + 1 >= this.states.length ? 1 : status_index + 1;
      this.set({status: this.states[next_status]});
      this.recent = true;
      this.save();
    },

    assign: function() {
      console.log("assign");
    }

  });
});