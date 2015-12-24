shared_context '@user is logged in' do
  before do
    visit '/'
    credentials = @user.create_new_auth_token
    token = credentials['access-token']
    client = credentials['client']
    expiry = credentials['expiry']
    token_type = credentials['token-type']
    uid = credentials['uid']

    page.execute_script "localStorage.setItem('token', '#{token}')"
    page.execute_script "localStorage.setItem('client', '#{client}')"
    page.execute_script "localStorage.setItem('expiry', '#{expiry}')"
    page.execute_script "localStorage.setItem('tokenType', '#{token_type}')"
    page.execute_script "localStorage.setItem('uid', '#{uid}')"
    page.execute_script "localStorage.setItem('userId', '#{@user.id}')"
  end
end
