$(function(){
  
  window.Issues = new IssueList;
  console.log("Issues initialized");
  window.List = new IssuesView;
  console.log("List initialized");
  window.GotIssues = new GotIssuesController;
  console.log("GotIssues initialized");
  
  // Load the issues before the Show view is initalized
  Issues.refresh(ISSUES);
  console.log("Issues loaded");
  
  window.Issue = new IssueShow;
  console.log("Issue initialized");
  
  Backbone.history.start();
  console.log("History started");
})