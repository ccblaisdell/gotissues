class HomeController < ApplicationController
  def index
    if current_user
      @projects = current_user.admin? ? Project.all : Project.accessible_by(current_user)
      @assignments = current_user.assignments
    else
      render :action => "visitors"
    end
  end
  
  def visitors
  end
end
