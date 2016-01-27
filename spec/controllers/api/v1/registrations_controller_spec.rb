describe Api::V1::RegistrationsController, type: :request do
  before do
    @user = create(:user)
  end
  describe 'POST /users/:user_id/registrations' do
    before do
      @event = create(:event)
    end
    context 'request is authenticated' do
      context 'standard input' do
        before do
          post "/api/v1/users/#{@user.id}/registrations",
            registration_params(@user, @event), auth_headers(@user)
        end
        it_behaves_like 'a successful resource create', 'registration'
      end
    end
    context 'request is not authenticated' do
      context 'standard input' do
        before do
          post "/api/v1/users/#{@user.id}/registrations",
            registration_params(@user, @event)
        end
        it_behaves_like 'an unauthorized request'
      end
    end
    context 'user sneakily tries to register somebody else' do
      before do
        @innocent_user = create(:user)
      end
      context 'standard input' do
        before do
          post "/api/v1/users/#{@innocent_user.id}/registrations",
            registration_params(@innocent_user, @event), auth_headers(@user)
        end
        it_behaves_like 'a forbidden request'
      end
    end
  end

  def registration_params(user, event)
    {
      registration: {
        user_id: user.id,
        event_id: event.id
      }
    }
  end
end
