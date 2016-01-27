Rails.application.routes.draw do
  root 'static#landing'

  namespace :admin do
    DashboardManifest::DASHBOARDS.each do |dashboard_resource|
      resources dashboard_resource
    end

    root controller: DashboardManifest::ROOT_DASHBOARD, action: :index
  end

  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'users', controllers: {
        registrations: 'api/v1/users/registrations',
        sessions: 'api/v1/users/sessions'
      }
      resources :users, only: [:show, :update] do
        post :verify, on: :collection
        resources :registrations, only: :create
      end
      namespace :events do
        get :upcoming
      end
    end
  end

  get '*path', to: 'static#landing'
end
