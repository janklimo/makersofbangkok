module Api
  module V1
    class UsersController < BaseController
      before_action :authenticate_user!, only: [:show, :update]
      load_and_authorize_resource only: [:show, :update]

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

      def verify
        @user = User.find_by(email: user_params[:email].downcase.strip)
        if @user
          render json: { user: { id: @user.id, first_name: @user.first_name } }
        else
          render json: { meta: { error: 'User not found.' } }
        end
      end

      private

      def user_params
        params.require(:user).permit(:email)
      end
    end
  end
end
