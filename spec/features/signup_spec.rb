feature 'New registration', :js do
  background { @user = create(:user) }
  scenario 'failed email verification' do
    visit '/'
    expect(page).to have_content 'Makers of Bangkok'
    click_link('Join Us!')
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
      expect(page).to have_content 'Please fill in your first name'
    end
  end
end

def get_verified
  visit '/'
  expect(page).to have_content 'Makers of Bangkok'
  click_link('Join Us!')
  expect(page).to have_content 'invitation-only'
  fill_in 'referrer-email', with: @user.email
  click_button 'Verify'
  expect(page).to have_content 'pleasure to meet'
end

def complete_signup_form(overrides={})
  within '#signup-form' do
    fill_in 'first-name', with: overrides[:first_name] || 'John'
    fill_in 'last-name', with: overrides[:last_name] || 'Snow'
    fill_in 'email', with: overrides[:email] || @user.email
    fill_in 'password', with: overrides[:password] || 'test1234'
    click_button "Sign Me Up!"
  end
end
