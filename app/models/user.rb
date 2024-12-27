class User < ApplicationRecord
  belongs_to :project, optional: true
  has_many :images, dependent: :destroy
  
  scope :without_project, -> { where(project_id: nil) }
  # ^ This line tells Rails that a user can have many images.

  devise :database_authenticatable,
         :recoverable,
         :rememberable,
         :validatable

  def admin?
    role == "admin"
  end
end
