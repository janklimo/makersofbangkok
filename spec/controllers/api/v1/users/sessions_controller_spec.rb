describe Api::V1::Users::SessionsController, type: :request do
  describe 'POST /users/sign_in' do
    before { @user = create(:user)  }
    context 'credentials are correct' do
      it 'returns the user with credentials in header' do
        post "/api/v1/users/sign_in", {
          email: @user.email, password: 'test1234'
        }
        expect(response.header['access-token']).not_to be_nil
        expect(response_body['user']['first_name']).to eq 'Jon'
      end
    end
    context 'credentials are wrong' do
      it 'returns the user with credentials in header' do
        post "/api/v1/users/sign_in", {
          email: @user.email, password: 'test12345'
        }
        expect(response.header['access-token']).to be_nil
        expect(response_body['meta']['errors']['message'])
          .to match "We don't recognize"
      end
    end
  end
end
