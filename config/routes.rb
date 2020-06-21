Rails.application.routes.draw do
  devise_for :users
  resources :messages do
    resources :likes, only: [:create, :destroy]
    collection do
      get 'search'
    end
  end
  root to: "messages#index"
  resources :users, only: [:edit, :update]
  resources :likes, only: [:index]
  
  post '/messages/:message_id/likes' => "likes#create"
  delete '/messages/:message_id/likes' => "likes#destroy"
  
  devise_scope :user do
    get 'user_edit', to: 'users/registrations#user_edit', as: 'user_edit'
    patch 'user_update', to: 'users/registrations#user_update', as: 'user_update'
  end

end
