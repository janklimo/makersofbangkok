module Api
  module V1
    class Users::SessionsController < DeviseTokenAuth::SessionsController
      include ActionController::Serialization
      include SetUserByToken

      before_action :set_resource, only: [:create]

      def create
        params_valid = valid_params?(:email, resource_params[:email])
        if @resource
          password_valid =
            @resource.valid_password?(resource_params[:password])
          if params_valid && password_valid
            set_token
            sign_in(:resource, @resource, store: false, bypass: false)
            render json: @resource
          else
            render_auth_error
          end
        else
          render_auth_error
        end
      end

      private

      def render_auth_error
        render json: { meta: { errors: error_message } }, status: 401
      end

      def set_resource
        @resource = nil
        email = resource_params[:email]
        email.downcase! if User.case_insensitive_keys.include?(:email)
        q = "email = ? AND provider='email'"
        @resource = User.where(q, email).first
      end

      def error_message
        error_message =
          "We don't recognize that username and password combination :("
        { message: error_message }
      end
    end
  end
end
