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
end
