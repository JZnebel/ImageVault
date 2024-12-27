# app/controllers/admin/projects_controller.rb
class Admin::ProjectsController < Admin::BaseController
  def index
    @projects = Project.all
  end

  def show
    @project = Project.find(params[:id])
    # If each user belongs to a single project, you can find all users with this project_id
    @users = User.where(project_id: @project.id)
  end

  def new
    @project = Project.new
  end

  def create
    @project = Project.new(project_params)
    if @project.save
      redirect_to admin_projects_path, notice: "Project created successfully."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @project = Project.find(params[:id])
  end

  def update
    @project = Project.find(params[:id])
    if @project.update(project_params)
      redirect_to admin_projects_path, notice: "Project updated successfully."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @project = Project.find(params[:id])
    if @project.destroy
      redirect_to admin_projects_path, notice: "Project deleted."
    else
      redirect_to admin_projects_path, alert: "Failed to delete project."
    end
  end

  def add_users
    @project = Project.find(params[:id])
    user_ids = params[:user_ids]

    if user_ids.present?
      users = User.where(id: user_ids)
      users.update_all(project_id: @project.id)
      redirect_to admin_project_path(@project), notice: "Users added successfully."
    else
      redirect_to admin_project_path(@project), alert: "No users selected."
    end
  end

  def remove_user
    @project = Project.find(params[:id])
    @user = User.find(params[:user_id])
    
    @user.update(project_id: nil)
    redirect_to admin_project_path(@project), notice: "User removed from project."
  end

  private

  def project_params
    params.require(:project).permit(:name, :description)
  end
end
