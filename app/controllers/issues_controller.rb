class IssuesController < ApplicationController
  # GET /issues
  # GET /issues.xml
  before_filter :find_project
  before_filter :authenticate_user!
  
  def index
    @issues = @project.issues.order("created_at ASC")
    @issue = Issue.new

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @issues }
      format.json { render :json => @issues.to_json }
    end
  end

  # GET /issues/1
  # GET /issues/1.xml
  def show
    @issue = Issue.find(params[:id])
    @comment = Comment.new(:issue_id => @issue)
    @comment.images.build

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @issue }
      format.json {render :json => @issue.to_json }
    end
  end

  # GET /issues/new
  # GET /issues/new.xml
  def new
    @issue = Issue.new(:user => current_user)

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @issue }
    end
  end

  # GET /issues/1/edit
  def edit
    @issue = Issue.find(params[:id])
  end

  # POST /issues
  # POST /issues.xml
  def create
    
    # params[:issue].merge!({:project_id => @project.id, :user => current_user, :number => assign_number})
    @issue = Issue.new(params)
    @issue.assignee = User.find params[:assignee_id] unless params[:assignee_id].empty?
    @issue.project = @project
    @issue.user = current_user
    @issue.number = assign_number
    
    respond_to do |format|
      if @issue.save
        format.html { redirect_to(project_issue_path(@project, @issue), :notice => 'Issue was successfully created.') }
        format.xml  { render :xml => @issue, :status => :created, :location => @issue }
        format.js
        format.json { render :json => @issue.to_json }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @issue.errors, :status => :unprocessable_entity }
        format.js   { render :text => @issue.errors.inspect + @issue.inspect }
        format.json { render :json => @issue.to_json }
      end
    end
  end

  # PUT /issues/1
  # PUT /issues/1.xml
  def update
    @issue = Issue.find(params[:id])

    respond_to do |format|
      if @issue.update_attributes(params)
        format.html { redirect_to(project_issue_path(@project, @issue), :notice => 'Issue was successfully updated.') }
        format.xml  { head :ok }
        format.json { render :json => @issue.to_json }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @issue.errors, :status => :unprocessable_entity }
        format.json { render :json => @issue.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /issues/1
  # DELETE /issues/1.xml
  def destroy
    @issue = Issue.find(params[:id])
    @issue.destroy

    respond_to do |format|
      format.html { head :ok }
      format.xml  { head :ok }
      format.js
      format.json { head :ok }
    end
  end
  
  def cycle_status
    @issue = Issue.find(params[:id])
    @issue.status = @issue.cycle_status
    
    respond_to do |format|
      if @issue.save
        format.html { redirect_to(project_issue_path(@project, @issue), :notice => 'Issue was successfully updated.') }
        format.xml  { head :ok }
        format.js
        format.json {render :json => {:issue => {:updated_at => @issue.updated_at.to_s, :status => @issue.status}}.to_json}
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @issue.errors, :status => :unprocessable_entity }
        format.js {render :text => "failed: #{@issue.status}"}
      end
    end
  end
  
  def assign_to
    @issue = Issue.find(params[:id])
    if params[:user_id]
      @user = User.find(params[:user_id])
    else
      @user = nil
    end
    @issue.assignee = @user
    
    respond_to do |format|
      if @issue.save
        format.js
      else
        format.js {render :text => "failed"}
      end
    end
  end
  
  private
  def find_project
    @project = Project.find_by_slug params[:project_id]
  end
  
  def assign_number
    @project.issues.last.nil? ? 1 : @project.issues.last.number + 1
  end
end
