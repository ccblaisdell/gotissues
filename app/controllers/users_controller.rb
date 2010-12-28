class UsersController < ApplicationController
  def tasks
    @projects = Project.all
    @assignments = User.find(params[:id]).assignments
  end
end
