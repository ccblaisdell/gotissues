module ApplicationHelper
  def markdown(text)
    RDiscount.new(text).to_html.html_safe
  end
end
