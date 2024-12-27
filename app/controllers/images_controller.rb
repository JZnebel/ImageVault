class ImagesController < ApplicationController
  before_action :authenticate_user!  # Ensure only logged-in users can access these actions

  # PATCH /images/:id/update_notes
  def update_notes
    @image = current_user.images.find_by(id: params[:id]) # Find image that belongs to the user
    if @image.nil?
      render json: { success: false, errors: ["Image not found or does not belong to you"] }, status: :not_found
      return
    end

    if @image.update(notes: params[:notes])
      render json: { success: true, image: { id: @image.id, notes: @image.notes } }
    else
      render json: { success: false, errors: @image.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET /images
  def index
    @images = current_user.images # Show only the images belonging to the logged-in user
  end

  # DELETE /images/:id
  def destroy
    @image = current_user.images.find_by(id: params[:id]) # Ensure the image belongs to the user
    if @image.nil?
      redirect_to images_path, alert: "Image not found or does not belong to you."
      return
    end

    @image.destroy
    redirect_to images_path, notice: "Image removed."
  end

  # GET /images/new
  def new
    @image = Image.new # Initialize a new Image object
  end

  # POST /images
  def create
    if params[:image][:files].nil? || params[:image][:files].all?(&:blank?)
      flash.now[:alert] = "Please select at least one file"
      return render :new, status: :unprocessable_entity
    end

    results = Image.bulk_upload(params[:image][:files], current_user, image_params[:project_id], image_params[:notes])
    
    if results[:failure].empty?
      redirect_to images_path, notice: "Successfully uploaded #{results[:success].length} images."
    else
      success_count = results[:success].length
      failure_count = results[:failure].length
      flash.now[:alert] = "Uploaded #{success_count} images. Failed to upload #{failure_count} images."
      @upload_errors = results[:failure]
      render :new, status: :unprocessable_entity
    end
  end

  private

  def image_params
    params.require(:image).permit(:attribution, :notes, :project_id, files: [])
  end
end
