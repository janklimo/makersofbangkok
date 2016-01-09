describe Event do
  context '#upcoming' do
    before do
      create(:event, name: 'in 2 weeks', date: 2.weeks.from_now)
      create(:event, name: 'next month', date: 1.month.from_now)
      create(:event, name: 'next week', date: 1.week.from_now)
    end
    it 'works' do
      expect(Event.upcoming.name).to eq 'next week'
    end
  end
end
