Rails.application.routes.draw do
  devise_for :users
  resources :messages
  # root to: "message#index"
  root "messages#index"

end
