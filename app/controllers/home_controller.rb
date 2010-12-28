class HomeController < ApplicationController
  def index
    if current_user
      @projects = Project.all
      @assignments = current_user.assignments
    else
      render :action => "visitors"
    end
  end
  
  def visitors
  end
end
