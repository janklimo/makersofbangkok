describe Api::V1::EventsController, type: :request do
  describe 'GET /events/upcoming' do
    context 'no upcoming event' do
      before do
        @event = create(:event, :with_venue, date: 1.week.ago)
        get "/api/v1/events/upcoming"
      end
      it 'returns the right message' do
        expect(response_body['message']).to match 'No upcoming event'
      end
    end
    context 'upcoming event found' do
      before do
        @event = create(:event, :with_venue, date: 1.week.from_now)
        get "/api/v1/events/upcoming"
      end
      it 'is not an array of events' do
        expect(response_body['event']).not_to be_a Array
      end
      it 'includes event attributes' do
        expect(response_body['event']['name']).to eq 'Regular dinner'
      end
      it 'includes venue attributes' do
        expect(response_body['event']['venue']['name']).to eq 'Monsoon'
      end
      it_behaves_like 'a successful resource request', 'event'
    end
  end
end
