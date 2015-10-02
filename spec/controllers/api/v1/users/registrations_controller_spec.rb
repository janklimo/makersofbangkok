describe Api::V1::Users::RegistrationsController, type: :request do
  describe 'POST /users' do
    context 'params are kosher' do
      before do
        post "/api/v1/users", user_params
      end
      it 'creates a user' do
        user = User.find_by(email: 'test@example.com')
        expect(user).not_to be_nil
        expect(user.referrer_id).to eq 1
      end
    end

    context 'params are not ok' do
      context 'missing password' do
        before do
          post "/api/v1/users", user_params(password: '')
        end
        it 'does not create a user' do
          user = User.find_by(email: 'test@example.com')
          expect(user).to be_nil
        end
      end
      context 'missing referrer' do
        before do
          post "/api/v1/users", user_params(referrer_id: '')
        end
        it 'does not create a user' do
          user = User.find_by(email: 'test@example.com')
          expect(user).to be_nil
        end
      end
    end

    # TODO: test this returns correct JSON for success and failures

    def user_params(overrides={})
      {
        email: overrides[:email] || 'Test@example.com',
        password: overrides[:password] || 'mypassword',
        referrer_id: overrides[:referrer_id] || 1
      }
    end
  end
end