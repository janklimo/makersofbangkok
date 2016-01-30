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
            before do
              @user2 = create(:user)
              @reg = create(:registration, user: @user2, event: @event)
            end
            it 'can register and see the right info' do
              visit '/'
              expect(page).to have_content "#{@event.capacity - 1} spots left"
              expect(page).to have_content 'Time left'
              expect(page).to have_link 'Sign Me Up!'
            end
          end
          context 'the user is already registered' do
            before do
              create(:registration, event: @event, user: @user)
            end
            it 'sees signup confirmation' do
              visit '/'
              expect(page).not_to have_link 'Sign Me Up!'
              expect(page).to have_content "You're in!"
              expect(page).to have_content 'See you in'
            end
          end
        end
      end
    end
  end
end
