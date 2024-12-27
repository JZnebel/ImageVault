class Image < ApplicationRecord
  belongs_to :user
  belongs_to :project, optional: true # Optional if not all images require a project

  has_one_attached :file # Enable file uploads with ActiveStorage

  # Class method to handle bulk uploads
  def self.bulk_upload(files, user, project_id = nil, notes = nil)
    results = { success: [], failure: [] }
    
    files.reject(&:blank?).each do |file|
      image = user.images.new(project_id: project_id, notes: notes)
      image.file.attach(file)
      
      if image.save
        results[:success] << image
      else
        results[:failure] << { file: file.original_filename, errors: image.errors.full_messages }
      end
    end
    
    results
  end

  # Validations
  validates :file, presence: true, unless: :url_present? # Ensure either a file or a URL is provided
  validate :acceptable_file

  # Callbacks
  after_create_commit :process_svg, if: -> { file.attached? && file.content_type == 'image/svg+xml' }

  private

  # Check if the URL is present
  def url_present?
    url.present?
  end

  # Ensure file content type and size are acceptable
  def acceptable_file
    return unless file.attached?

  # Validate file content type
  acceptable_types = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp']
  unless acceptable_types.include?(file.content_type)
    errors.add(:file, "must be a JPEG, PNG, GIF, SVG, or WebP")
  end


    # Validate file size (e.g., max 20 MB)
    max_file_size = 20.megabytes
    if file.byte_size > max_file_size
      errors.add(:file, "is too large. Maximum size allowed is 20 MB.")
    end
  end

  def process_svg
    return unless file.attached? && file.content_type == 'image/svg+xml'
    
    begin
      # Process SVG if needed
      # For now, we'll just log that we received an SVG
      Rails.logger.info "SVG file processed: #{file.filename}"
    rescue StandardError => e
      Rails.logger.error "Error processing SVG: #{e.message}"
      errors.add(:file, "could not be processed: #{e.message}")
    end
  end
  

end
