# app/controllers/admin/users_controller.rb
class Admin::UsersController < Admin::BaseController
  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
    @images = @user.images  # The images selected by this user
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    # Default role to 'user' unless you manually assign 'admin'
    @user.role ||= "user"
    
    # Explicitly handle project assignment
    if params[:user][:project_id].present?
      @user.project_id = params[:user][:project_id]
    end

    if @user.save
      redirect_to admin_users_path, notice: "User created successfully."
    else
      flash.now[:alert] = "Failed to create user: #{@user.errors.full_messages.join(', ')}"
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    
    # If password fields are blank, don't overwrite the existing password
    update_params = if user_params[:password].blank?
      user_params.except(:password, :password_confirmation)
    else
      user_params
    end

    if @user.update(update_params)
      redirect_to admin_users_path, notice: "User updated successfully."
    else
      flash.now[:alert] = "Failed to update user: #{@user.errors.full_messages.join(', ')}"
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @user = User.find(params[:id])
    if @user.destroy
      redirect_to admin_users_path, notice: "User deleted."
    else
      redirect_to admin_users_path, alert: "Failed to delete user."
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :role, :project_id)
  end
end
