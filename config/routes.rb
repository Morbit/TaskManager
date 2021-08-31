Rails.application.routes.draw do
  root :to => "web/boards#show"

  scope module: :web do
    resource :boards, only: :show
    resource :session, only: [:new, :create, :destroy]
    resources :developers, only: [:new, :create]
  end
end