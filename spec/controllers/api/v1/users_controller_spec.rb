describe Api::V1::UsersController, type: :request do
  describe 'GET /users/:id' do
    before do
      @user = create(:user, email: 'jon@example.com')
    end
    context 'requesting user is the user' do
      before { get "/api/v1/users/#{@user.id}", auth_headers(@user) }
      it 'includes user attributes' do
        expect(response_body['user']['first_name']).to eq @user.first_name
      end
      it_behaves_like 'a successful resource request', 'user'
    end
    context 'requesting user is someone else' do
      before do
        @other_user = create(:user)
        get "/api/v1/users/#{@other_user.id}", auth_headers(@user)
      end
      it_behaves_like 'a forbidden request'
    end
    context 'request is unauthenticated' do
      before { get "/api/v1/users/#{@user.id}" }
      it_behaves_like 'an unauthorized request'
    end
  end

  describe 'POST /users/verify' do
    context 'requested user exists' do
      before do
        @user = create(:user, email: 'jon@example.com')
      end
      context 'stanard input' do
        before do
          post "/api/v1/users/verify", user_params
        end
        it 'returns user id and name' do
          expect(response_body['referrer']['id']).to eq @user.id
          expect(response_body['referrer']['first_name'])
            .to eq @user.first_name
          # only expose what we need
          expect(response_body['referrer']).not_to include 'email'
        end
        it_behaves_like 'a successful resource request', 'referrer'
      end
      context 'input contains whitespace' do
        before do
          post "/api/v1/users/verify", { user: { email: ' jon@example.com ' } }
        end
        it 'returns user id and name' do
          expect(response_body['referrer']['id']).to eq @user.id
          expect(response_body['referrer']['first_name'])
            .to eq @user.first_name
          expect(response_body['referrer']).not_to include 'email'
        end
      end
      context 'input is a funky mix of upper and lower case' do
        before do
          post "/api/v1/users/verify", { user: { email: ' Jon@ExampLe.com ' } }
        end
        it 'returns user id and name' do
          expect(response_body['referrer']['id']).to eq @user.id
          expect(response_body['referrer']['first_name'])
            .to eq @user.first_name
          expect(response_body['referrer']).not_to include 'email'
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

