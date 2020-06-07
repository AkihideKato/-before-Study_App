Rails.application.routes.draw do
  devise_for :users
  resources :messages do
    resources :likes, only: [:create, :destroy]
  end
  root to: "messages#index"

end
