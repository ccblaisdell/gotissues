class HomeController < ApplicationController
  def index
    @projects = Project.all
    @assignments = current_user.assignments if current_user
  end

end
