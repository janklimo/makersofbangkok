Rails.application.routes.draw do
  root 'static#landing'
  get '*path', to: 'static#landing'

  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'users', controllers: {
        registrations: 'api/v1/users/registrations',
        sessions: 'api/v1/users/sessions',
      # passwords: 'api/v1/users/passwords'
      }
      resources :users, only: [:show, :update] do
        post :verify, on: :collection
      end
    end
  end
end
