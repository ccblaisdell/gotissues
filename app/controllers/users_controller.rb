class UsersController < ApplicationController
  before_filter :authenticate_user!
  
  def tasks
    @projects = Project.all
    @assignments = User.find(params[:id]).assignments
  end
end