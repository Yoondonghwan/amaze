Rails.application.routes.draw do
  get '/' =>'game#index'
  get '/state1' => 'game#state1'
  get '/state2' => 'game#state2'
end
