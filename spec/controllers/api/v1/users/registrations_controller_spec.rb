describe Api::V1::Users::RegistrationsController, type: :request do
  describe 'POST /users' do
    context 'params are kosher' do
      before do
        Sidekiq::Testing.inline!
        allow(MailchimpSubscribeWorker).to receive(:perform_async)
        post "/api/v1/users", user_params
      end
      it 'creates a user' do
        user = User.find_by(email: 'test@example.com')
        expect(user).not_to be_nil
        expect(user.referrer_id).to eq 1
        expect(response_body['meta']).to be_nil
        expect(response_body['user']['referrer_id']).to eq 1
        expect(MailchimpSubscribeWorker).to have_received(:perform_async)
          .with(user.id)
      end
    end

    context 'params are not ok' do
      context 'missing names' do
        before do
          post "/api/v1/users", user_params(first_name: '', last_name: '')
        end
        it 'does not create a user' do
          user = User.find_by(email: 'test@example.com')
          expect(user).to be_nil
          expect(response_body['meta']['errors']).to include 'first_name'
          expect(response_body['meta']['errors']).to include 'last_name'
        end
      end
      context 'missing password' do
        before do
          post "/api/v1/users", user_params(password: '')
        end
        it 'does not create a user' do
          user = User.find_by(email: 'test@example.com')
          expect(user).to be_nil
          expect(response_body['meta']['errors']).to include 'password'
        end
      end
      context 'missing email' do
        before do
          post "/api/v1/users", user_params(email: '')
        end
        it 'does not create a user' do
          user = User.last
          expect(user).to be_nil
          expect(response_body['meta']['errors']).to include 'email'
        end
      end
      context 'missing referrer' do
        before do
          post "/api/v1/users", user_params(referrer_id: '')
        end
        it 'does not create a user' do
          user = User.find_by(email: 'test@example.com')
          expect(user).to be_nil
          expect(response_body['meta']['errors']).to include 'referrer_id'
        end
      end
    end

    def user_params(overrides={})
      {
        email: overrides[:email] || 'Test@example.com',
        first_name: overrides[:first_name] || 'Tywin',
        last_name: overrides[:last_name] || 'Lannister',
        password: overrides[:password] || 'mypassword',
        referrer_id: overrides[:referrer_id] || 1
      }
    end
  end
end
