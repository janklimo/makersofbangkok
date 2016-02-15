describe MailchimpSubscriber do
  describe '#subscribe' do
    before do
      @user = create(:user, first_name: 'Mail', last_name: 'Chimp')
    end
    it 'sends the right data' do
      expect_any_instance_of(Mailchimp::Lists).to(
        receive(:subscribe).with(
          ENV.fetch('MAILCHIMP_LIST_ID'), { email: @user.email },
          { FNAME: @user.first_name, LNAME: @user.last_name },
          'html', false, true, true
        )
      )
      MailchimpSubscriber.new.subscribe(@user)
    end
  end
end
