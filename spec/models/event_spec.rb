describe Event do
  context '#upcoming' do
    before do
      create(:event, name: 'in 2 weeks', date: 2.weeks.from_now)
      create(:event, name: 'next month', date: 1.month.from_now)
      create(:event, name: 'next week', date: 1.week.from_now)
    end
    it 'returns the upcoming event' do
      expect(Event.upcoming.name).to eq 'next week'
    end
  end
  context 'spots_available' do
    before do
      @user = create(:user)
      @event = create(:event, name: 'in 2 weeks', capacity: 20)
    end
    context 'no attendees' do
      it 'returns the right number of available spots' do
        expect(@event.spots_available).to eq 20
      end
    end
    context 'sold out' do
      before do
        @event.update(capacity: 1)
        create(:registration, user: create(:user), event: @event)
        create(:registration, user: create(:user), event: @event)
      end
      it 'returns 0' do
        expect(@event.spots_available).to eq 0
      end
    end
    context 'attendees present' do
      before do
        create(:registration, user: @user, event: @event)
      end
      it 'returns the right number of available spots' do
        expect(@event.spots_available).to eq 19
      end
    end
  end
end
