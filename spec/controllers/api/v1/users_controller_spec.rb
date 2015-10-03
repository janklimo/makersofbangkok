describe Api::V1::UsersController, type: :request do
  before do
    @user = create(:user)
  end

  describe 'PUT /users/verify' do
    context 'requested user does not exist' do
      before { put "/api/v1/users/verify", user_params, auth_headers(@user) }
      it 'updates information of users' do
        expect(@user.reload.first_name).to eq 'Jon'
        expect(response_body['user']['first_name']).to eq 'Jon'
      end
      it_behaves_like 'a successful resource request', 'user'
    end

    def user_params
      {
        user: {
          email: 'jon@example.com'
        }
      }
    end
  end

end

