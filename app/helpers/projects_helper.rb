module ProjectsHelper
  def projects_for_navigation(user)
    user.admin? ? Project.open : Project.accessible_by(current_user)
  end
end
