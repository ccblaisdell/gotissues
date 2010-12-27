module IssuesHelper
  def assigned_to(issue)
    if issue and issue.assignee
      "<strong class=\"assignee\">#{issue.assignee.name}</strong>".html_safe
    else
      "not assigned"
    end
  end
end
