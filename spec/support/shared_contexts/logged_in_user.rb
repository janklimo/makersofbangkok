shared_context '@user is logged in' do
  before do
    visit '/'
    credentials = @user.create_new_auth_token
    token = credentials['access-token']
    page.execute_script "localStorage.setItem('token', '#{token}')"
  end
end
