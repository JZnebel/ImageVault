class User < ApplicationRecord
  belongs_to :project, optional: true
  has_many :images, dependent: :destroy
  # ^ This line tells Rails that a user can have many images.

  devise :database_authenticatable,
         :recoverable,
         :rememberable,
         :validatable

  def admin?
    role == "admin"
  end
end
