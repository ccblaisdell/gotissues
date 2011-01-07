module ApplicationHelper
  def markdown(text)
    RDiscount.new(text).to_html.html_safe
  end
  
  def page_title(title = nil)
    if title
      @title = title
      return true
    else
      return @title || "Got Issues"
    end
  end
  
  
  # breadrumbs
  def breadcrumbs_for(*args)
    options, args = args[-1], args[0..-2] if args[-1].kind_of?(Hash)
    options ||= {}
    @breadcrumbs = raw("<div class='breadcrumbs #{options[:class] }'>
      #{args.join( ' / ')}
    </div>") rescue ""
  end
  
  def home_crumb
    link_to "Home", root_path
  end
  def projects_crumb
    link_to "Projects", projects_path
  end
  def project_crumb(project)
    link_to project.name, project_issues_path(project)
  end
end
