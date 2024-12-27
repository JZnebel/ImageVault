Rails.application.routes.draw do
  # Admin namespace
  namespace :admin do
    resources :users
    resources :projects do
      post 'add_users', on: :member
      delete 'remove_user/:user_id', to: 'projects#remove_user', on: :member, as: 'remove_user'
    end
  end

  # Devise routes (no public signup)
  devise_for :users, skip: [:registrations]

  # Public/Front-end routes
  root 'stock_images#index'
  get  'search', to: 'stock_images#search'
  post 'select', to: 'stock_images#select'

  # Projects & Images
  resources :projects do
    resources :images, only: [:index, :destroy] # Images scoped to specific projects
  end

  # Images routes (global scope)
  resources :images, only: [:index, :new, :create, :destroy] do # Include `:new` for the form
    member do
      patch :update_notes
    end
  end  
end
