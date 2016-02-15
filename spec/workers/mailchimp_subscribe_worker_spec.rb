describe MailchimpSubscribeWorker do
  before do
    @user = create(:user)
    Sidekiq::Testing.inline!
  end

  it 'finds the user and passes it to subscriber' do
    api_double = double('double', subscribe: true)
    allow(MailchimpSubscriber).to receive(:new).and_return(api_double)
    MailchimpSubscribeWorker.perform_async(@user.id)
    expect(api_double).to have_received(:subscribe).with(@user)
  end
end
