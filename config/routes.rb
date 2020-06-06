Rails.application.routes.draw do
  resources :messages
  # root to: "message#index"
  root "messages#index"

end
