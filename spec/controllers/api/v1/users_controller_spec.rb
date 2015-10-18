describe Api::V1::UsersController, type: :request do
  describe 'POST /users/verify' do
    context 'requested user exists' do
      context 'stanard input' do
        before do
          @user = create(:user, email: 'jon@example.com')
          post "/api/v1/users/verify", user_params
        end
        it 'returns user id and name' do
          expect(response_body['user']['id']).to eq @user.id
          expect(response_body['user']['first_name']).to eq @user.first_name
          # only expose what we need
          expect(response_body['user']).not_to include 'email'
        end
        it_behaves_like 'a successful resource request', 'user'
      end
      context 'input contains whitespace' do
        before do
          @user = create(:user, email: 'jon@example.com')
          post "/api/v1/users/verify", { user: { email: ' jon@example.com ' } }
        end
        it 'returns user id and name' do
          expect(response_body['user']['id']).to eq @user.id
          expect(response_body['user']['first_name']).to eq @user.first_name
          expect(response_body['user']).not_to include 'email'
        end
      end
      context 'input is a funky mix of upper and lower case' do
        before do
          @user = create(:user, email: 'jon@example.com')
          post "/api/v1/users/verify", { user: { email: ' Jon@ExampLe.com ' } }
        end
        it 'returns user id and name' do
          expect(response_body['user']['id']).to eq @user.id
          expect(response_body['user']['first_name']).to eq @user.first_name
          expect(response_body['user']).not_to include 'email'
        end
      end
    end

    context 'requested user is not found' do
      before do
        @user = create(:user, email: 'jon_snow@example.com')
        post "/api/v1/users/verify", user_params
      end
      it 'returns an error' do
        expect(response_body['meta']['error']).to match 'not found'
      end
    end

    def user_params
      {
        user: { email: 'jon@example.com' }
      }
    end
  end

end

