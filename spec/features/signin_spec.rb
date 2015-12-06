feature 'New sign in', :js do
  background { @user = create(:user) }
  scenario 'failed sign in' do
    visit '/'
    expect(page).to have_content 'Makers of Bangkok'
    click_link('Sign In')
    expect(page).to have_content 'Welcome back!'
    complete_signin_form(password: 'a_very_bad_password')
    expect(page).to have_content "We don't recognize"
  end
  scenario 'successful sign in' do
    visit '/'
    expect(page).to have_content 'Makers of Bangkok'
    click_link('Sign In')
    expect(page).to have_content 'Welcome back!'
    complete_signin_form
    expect(page).to have_content 'Welcome home!'
  end
end

def complete_signin_form(overrides={})
  within '#login-form' do
    fill_in 'email', with: overrides[:email] || @user.email
    fill_in 'password', with: overrides[:password] || @user.password
    click_button "Let's go!"
  end
end
