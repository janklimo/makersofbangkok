module Api
  module V1
    class Users::RegistrationsController < DeviseTokenAuth::RegistrationsController
      include ActionController::Serialization
      before_action :configure_permitted_parameters

      def create
        create_user!
        update_auth_header
        render json: @resource, status: 201
      rescue ActiveRecord::RecordInvalid, ActiveRecord::RecordNotUnique
        clean_up_passwords @resource
        errors = @resource.errors.to_hash
        render json: @resource, meta: { errors: errors }, status: 422
      end

      private

      def create_user!
        user_params = sign_up_params
        @resource = User.new(user_params)
        @resource.provider = "email"
        @resource.email = sign_up_params[:email].downcase if @resource.email.present?
        set_token
        @resource.save!
      end

      def set_token
        @client_id = SecureRandom.urlsafe_base64(nil, false)
        @token     = SecureRandom.urlsafe_base64(nil, false)
        @resource.update_tokens(@client_id, @token)
      end

      def configure_permitted_parameters
        devise_parameter_sanitizer.for(:sign_up) << [
          :first_name, :last_name, :referrer_id
        ]
      end

    end
  end
end
