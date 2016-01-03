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
    context 'visits dashboard' do
      it "shows user's ID" do
        visit '/'
        expect(page).to have_content "Welcome, #{@user.first_name}!"
        expect(page).to have_content "##{@user.id}"
      end
      context 'forever alone' do
        it 'shows the right message' do
          visit '/'
          expect(page).to have_content "haven't referred anybody yet"
          expect(page).to have_link 'Invite your first friend now!'
        end
      end
      context 'has friends' do
        before { create(:user, referrer_id: @user.id) }
        context 'one friend' do
          it 'thanks the fella' do
            visit '/'
            expect(page).to have_content "You've introduced"
            expect(page).to have_content 'great person'
            expect(page).to have_link 'Invite more of your friends!'
          end
        end
        context 'many friends' do
          before { create(:user, referrer_id: @user.id) }
          it 'thanks the fella' do
            visit '/'
            expect(page).to have_content "You've introduced"
            expect(page).to have_content 'great people'
            expect(page).to have_link 'Invite more of your friends!'
          end
        end
      end
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
      expect(@user.reload.tokens).to be_empty
    end
  end
end
