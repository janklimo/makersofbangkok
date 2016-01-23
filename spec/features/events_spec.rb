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
          expect(page).to have_css("img[alt*='Monsoon cover image']")
        end
      end
    end
  end
end
