class MailchimpSubscribeWorker
  include Sidekiq::Worker

  def perform(user_id)
    user = User.find(user_id)
    MailchimpSubscriber.new.subscribe(user)
  end
end
