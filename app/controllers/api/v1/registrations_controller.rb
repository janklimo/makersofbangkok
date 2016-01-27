module Api
  module V1
    class RegistrationsController < BaseController
      before_action :authenticate_user!

      def create
        @user = User.find(registration_params[:user_id])
        registration = @user.registrations.new(registration_params)
        authorize! :create, registration

        if registration.save
          render json: registration, root: 'registration', status: 201
        else
          render json: { error: 'Registration failed.' }, status: 422
        end
      end

      private

      def registration_params
        params.require(:registration).permit(:user_id, :event_id)
      end
    end
  end
end
