feature 'New registration', :js do
  background { @user = create(:user) }
  scenario 'failed email verification' do
    visit '/'
    expect(page).to have_content 'Makers of Bangkok'
    first(:link, 'Join Us!').click
    expect(page).to have_content 'invitation-only'
    fill_in 'referrer-email', with: 'wrong@email.com'
    click_button 'Verify'
    expect(page).to have_content 'Bummer!'
  end
  context 'verified user' do
    scenario "is shown his friend's name" do
      get_verified
      expect(page).to have_content "#{@user.first_name}'s friend!"
    end
    scenario 'missing first name' do
      get_verified
      complete_signup_form(first_name: '')
      expect(page).to have_css("#first-name-errors", text: "can't be blank")
    end
    scenario 'missing last name' do
      get_verified
      complete_signup_form(last_name: '')
      expect(page).to have_css("#last-name-errors", text: "can't be blank")
    end
    scenario 'missing email' do
      get_verified
      complete_signup_form(email: '')
      expect(page).to have_css("#email-errors", text: "can't be blank")
    end
    scenario 'email is anything but an email' do
      get_verified
      complete_signup_form(email: 'whatisthis@noidea')
      expect(page).to have_css("#email-errors", text: "is not an email")
    end
    scenario 'email is already taken' do
      get_verified
      complete_signup_form
      expect(page).to have_css("#email-errors", text: 'is already in use')
    end
    scenario 'missing password' do
      get_verified
      complete_signup_form(password: '')
      expect(page).to have_css("#password-errors", text: "can't be blank")
    end
    scenario 'password should have at least 5 characters' do
      get_verified
      complete_signup_form(password: '1234')
      expect(page).to have_css("#password-errors", text: "minimum")
    end
    scenario 'user is taken to Dashboard after sign up' do
      get_verified
      complete_signup_form(email: 'brand-new@email.com')
      expect(page).to have_content "Welcome, #{@user.first_name}!"
    end
  end
end

def get_verified
  visit '/'
  expect(page).to have_content 'Makers of Bangkok'
  first(:link, 'Join Us!').click
  expect(page).to have_content 'invitation-only'
  fill_in 'referrer-email', with: @user.email
  click_button 'Verify'
  expect(page).to have_content 'pleasure to meet'
end

def complete_signup_form(overrides={})
  within '#signup-form' do
    fill_in 'first-name', with: overrides[:first_name] || 'Jon'
    fill_in 'last-name', with: overrides[:last_name] || 'Snow'
    fill_in 'email', with: overrides[:email] || @user.email
    fill_in 'password', with: overrides[:password] || 'test1234'
    click_button "Sign Me Up!"
  end
end
