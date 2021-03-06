class ProjectsController < ApplicationController
  
  before_filter :authenticate_user!
  
  
  # GET /projects
  # GET /projects.xml
  def index
    @projects = current_user.admin? ? Project.open : Project.open.accessible_by(current_user)
    @closed   = current_user.admin? ? Project.closed : Project.closed.accessible_by(current_user)

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @projects }
    end
  end

  # GET /projects/1
  # GET /projects/1.xml
  def show
    @project = Project.find_by_slug(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @project }
    end
  end

  # GET /projects/new
  # GET /projects/new.xml
  def new
    @project = Project.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @project }
    end
  end

  # GET /projects/1/edit
  def edit
    @project = Project.find_by_slug(params[:id])
  end

  # POST /projects
  # POST /projects.xml
  def create
    @project = Project.new(params[:project])

    respond_to do |format|
      if @project.save
        format.html { redirect_to(project_issues_path(@project), :notice => 'Project was successfully created.') }
        format.xml  { render :xml => @project, :status => :created, :location => @project }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @project.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /projects/1
  # PUT /projects/1.xml
  def update
    @project = Project.find_by_slug(params[:id])

    respond_to do |format|
      if @project.update_attributes(params[:project])
        format.html { redirect_to(project_issues_path(@project), :notice => 'Project was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @project.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /projects/1
  # DELETE /projects/1.xml
  def destroy
    @project = Project.find_by_slug(params[:id])
    @project.destroy

    respond_to do |format|
      format.html { redirect_to(projects_url) }
      format.xml  { head :ok }
    end
  end
  
  def users
    @project = Project.find_by_slug(params[:id])
  end
  
  def update_users
    @project = Project.find_by_slug(params[:id])
    params[:project] ||= {}
    params[:project][:users] ||= []
    
    for u in params[:project][:users]
      user = User.find(u)
      @project.users << user
    end
    
    for u in params[:project][:remove_users]
      @project.users.delete(User.find(u)) unless params[:project][:users].include? u
    end
    
    respond_to do |format|
      if @project.save
        format.html { redirect_to project_issues_path(@project), :notice => "Updated users" }
        format.xml  { head :ok }
      else
        format.html { render :action => "users" }
        format.xml  { render :xml => @project.errors, :status => :unprocessable_entity }
      end
    end
  end
end
