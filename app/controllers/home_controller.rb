class HomeController < ApplicationController
  def index
    @projects = Project.all
    @assignments = current_user.assignments
  end

end
