Rails.application.routes.draw do
  # You can have the root of your site routed with "root"
  root to: 'statics#home'

  # Contact
  get '/contact', to: 'contact#show'
  post '/contact', to: 'contact#deliver'

  # Devise + ActiveAdmin
  devise_for :users, ActiveAdmin::Devise.config

  # Active Admin
  ActiveAdmin.routes self

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
