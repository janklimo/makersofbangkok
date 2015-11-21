feature 'User Login', :js do
  background { @user = create(:user) }
  scenario 'user can sign in' do
    visit '/'
    expect(page).to have_content 'Makers of Bangkok'
    click_link('Sign In')
    expect(page).to have_content 'Welcome back!'
    complete_login_form(email: @user.email, password: 'test1234')
    expect(page).to have_content 'Welcome home!'
  end
end

def complete_login_form(overrides={})
  within '#login-form' do
    fill_in 'email', with: overrides[:email] || 'test@example.com'
    fill_in 'password', with: overrides[:password] || 'test1234'
    click_button "Let's go!"
  end
end
