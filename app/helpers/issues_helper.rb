module IssuesHelper
  def assigned_to(issue)
    if issue and issue.assignee
      content_tag :span, issue.assignee.name, :class => "assignee"
    else
      content_tag :span, "not assigned", :class => "assignee not_assigned"
    end
  end
end
