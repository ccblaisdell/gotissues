module IssuesHelper
  def assigned_to(issue)
    if issue and issue.assignee
      content_tag :span, issue.assignee.name, :class => "assignee"
    else
      content_tag :span, "not assigned", :class => "assignee not_assigned"
    end
  end
  
  def old_and_closed?(issue)
    issue.status == "closed" and issue.updated_at > 1.day.ago
  end
end
