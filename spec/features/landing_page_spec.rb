feature 'Landing Page', :js do
  background { @user = create(:user) }
  context 'user is not signed in' do
    scenario 'visits landing page' do
      visit '/'
      expect(page).to have_content 'We are Makers of Bangkok'
    end
    scenario 'visits dashboard' do
      visit '/home/dashboard'
      expect(page).to have_content 'We are Makers of Bangkok'
    end
    scenario 'visits a non-existent URL' do
      visit '/dashbooooaard'
      expect(page).to have_content 'We are Makers of Bangkok'
      expect(page).to have_content 'SIGN IN'
    end
  end
  context 'signed in user' do
    include_context "@user is logged in"
    scenario 'visits landing page' do
      visit '/'
      expect(page).to have_content "Welcome, #{@user.first_name}!"
    end
    scenario 'visits a non-existent URL' do
      visit '/wrongurl'
      expect(page).to have_content 'We are Makers of Bangkok'
      expect(page).to have_content 'SIGN OUT'
    end
    scenario 'is taken to landing page after signing out' do
      visit '/'
      expect(page).to have_content "Welcome, #{@user.first_name}!"
      click_link('Sign Out')
      expect(page).to have_content 'We are Makers of Bangkok'
    end
  end
end
