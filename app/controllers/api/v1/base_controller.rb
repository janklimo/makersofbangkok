module Api
  module V1
    class BaseController < ApplicationController
      include ActionController::Serialization
      include DeviseTokenAuth::Concerns::SetUserByToken
      include CanCan::ControllerAdditions
      include ActionController::HttpAuthentication::Basic::ControllerMethods

      rescue_from CanCan::AccessDenied do |exception|
        render json: { error: exception.message }, status: 403
      end

      rescue_from ActiveRecord::RecordNotFound do |exception|
        render json: { error: "Resource not found" }, status: 404
      end

      private

      def user_signed_in?
        api_v1_user_signed_in?
      end

      def authenticate_user!
        authenticate_api_v1_user!
      end

      def current_user
        current_api_v1_user
      end

      def render_422_with_message(message)
        render json: { meta: { errors: { message: message }}}, status: 422
      end
    end
  end
end

