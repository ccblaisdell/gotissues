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
  
  def previous_issue_link(project, issue)
    prev = previous_issue(project, issue)
    (link_to "&#x2190; ##{prev.number} #{prev.name}".html_safe, project_issue_path(project, prev), :class => "previous").html_safe if prev
  end
  
  def next_issue_link(project, issue)
    inext = next_issue(project, issue)
    (link_to "##{inext.number} #{inext.name} &#x2192;".html_safe, project_issue_path(project, inext), :class => "next").html_safe if inext
  end
  
  def previous_issue(project, issue)
    prev = nil
    number = issue.number - 1
    if (issue.number > 0)
      until (prev or number == 0)
        prev = project.issues.active.by_number(number).first
        number -= 1
      end
    end
    return prev
  end
  
  def next_issue(project, issue)
    inext = nil
    number = issue.number + 1
    if (issue.number > 0)
      until (inext or number == project.issues.last.number)
        inext = project.issues.active.by_number(number).first
        number += 1
      end
    end
    return inext
  end
end
