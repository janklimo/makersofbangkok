feature 'Events', :js do
  background { @user = create(:user) }
  context 'signed in user' do
    include_context "@user is logged in"
    context 'event exists' do
      before do
        @event = create(:event, :with_venue)
      end
      context 'visits dashboard' do
        it 'shows event details' do
          visit '/'
          expect(page).to have_content 'Upcoming event'
          expect(page).to have_content 'Regular dinner'
          expect(page).to have_link('Monsoon', :href => /monsoonbangkok/)
          expect(page).to have_content 'Soi 8'
          expect(page).to have_content 'Every Thursday'
          expect(page).to have_css("img[alt*='Monsoon cover image']")
        end
        context 'registration section' do
          context 'the user is not registered' do
            it 'can register and see the right info' do
              visit '/'
              expect(page).to have_content 'Spots available:'
              expect(page).to have_content 'Time left:'
              expect(page).to have_content @event.capacity
              expect(page).to have_link 'Sign Me Up!'
            end
          end
          context 'the user is already registered' do
            it 'can register and see the right info' do
              visit '/'
              expect(page).to have_content 'Spots available:'
              expect(page).to have_content @event.capacity
            end
          end
        end
      end
    end
  end
end
