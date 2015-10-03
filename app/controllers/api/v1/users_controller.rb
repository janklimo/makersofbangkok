module Api
  module V1
    class UsersController < BaseController
      before_action :authenticate_user!, only: [:show, :update]
      load_and_authorize_resource

      def show
        render json: @user
      end

      def update
        if @user.update(user_params)
          render json: @user
        else
          render json: @user, meta: { errors: @user.errors }, status: 422
        end
      end

      # TODO: finish this method
      def verify
      end

      private

      def user_params
        params.require(:user).permit(:email, :referrer_id)
      end
    end
  end
end
