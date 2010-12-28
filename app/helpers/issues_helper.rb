module IssuesHelper
  def assigned_to(issue)
    if issue and issue.assignee
      link_to issue.assignee.name, user_tasks_path(issue.assignee), :class => "assignee"
    else
      content_tag :span, "not assigned", :class => "assignee not_assigned"
    end
  end
end
