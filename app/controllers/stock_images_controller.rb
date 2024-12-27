class StockImagesController < ApplicationController
  before_action :authenticate_user!, only: [:index, :select]

  def index
    @images = Image.all
  end

  def search
    query = params[:query]
    transparent = params[:transparent] == 'true'
    page = params[:page].presence || 1
    per_page = params[:per_page].presence || 10
  
    return render json: [] if query.blank?
  
    begin
      # Fetch images using the StockImageService with pagination
      images = StockImageService.fetch_images(query, transparent: transparent, page: page, per_page: per_page)
  
      # Collect the selected image URLs for the current user
      user_selected_urls = current_user.images.pluck(:url)
  
      # Mark images as selected if they match URLs in the database
      images.each do |image|
        image[:selected] = user_selected_urls.include?(image[:url])
      end
  
      render json: images
    rescue StandardError => e
      Rails.logger.error("Error fetching images: #{e.message}")
      render json: { error: 'An error occurred while fetching images. Please try again later.' },
             status: :internal_server_error
    end
  end
  

  def select
    @image = Image.new(
      url: params[:url],
      source: params[:source],
      attribution: params[:attribution],
      user: current_user,
      project: current_user.project
    )

    if @image.save
      render json: { success: true }
    else
      render json: { success: false, errors: @image.errors.full_messages },
             status: :unprocessable_entity
    end
  end
end
