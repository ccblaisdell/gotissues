class UsersController < ApplicationController
  before_filter :authenticate_user!
  before_filter :confirm_admin
  
  def tasks
    @projects = Project.all
    @assignments = User.find(params[:id]).assignments
  end
  
  def index
    @users = User.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @users }
    end
  end

  def show
    @user = User.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @user }
    end
  end

  def new
    @user = User.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @user }
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(params[:User])
    @user.user = current_user

    respond_to do |format|
      if @user.save
        format.html { redirect_to(user_path(@user), :notice => 'User was successfully created.') }
        format.xml  { render :xml => @user, :status => :created, :location => @user }
      else
        format.html { redirect_to :back }
        format.xml  { render :xml => @user.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /Users/1
  # PUT /Users/1.xml
  def update
    @user = User.find(params[:id])
  
    respond_to do |format|
      if @user.update_attributes(params[:User])
        format.html { redirect_to(@user, :notice => 'User was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "show" }
        format.xml  { render :xml => @user.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /Users/1
  # DELETE /Users/1.xml
  def destroy
    @user = User.find(params[:id])
    @user.destroy

    respond_to do |format|
      format.html { redirect_to(users_url) }
      format.xml  { head :ok }
    end
  end
  
  private
  
  def confirm_admin
    current_user.admin? || access_denied
  end
  
  def store_location
    session[:return_to] = request.request_uri
  end
  
  def access_denied
    respond_to do |format|
      format.html do
        store_location
        redirect_to new_user_session_url
      end
      format.any do
        request_http_basic_authentication 'Web Password'
      end
    end
  end
end
