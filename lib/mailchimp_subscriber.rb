class MailchimpSubscriber
  def initialize
    @mailchimp = Mailchimp::API.new(ENV.fetch('MAILCHIMP_API_KEY'))
  end

  def subscribe(user)
    # subscribe(id, email, merge_vars = nil, email_type = 'html',
    #   double_optin = true, update_existing = false,
    #   replace_interests = true, send_welcome = false)
    list_id = ENV.fetch('MAILCHIMP_LIST_ID')
    @mailchimp.lists.subscribe(list_id, { email: user.email },
                               { FNAME: user.first_name,
                                 LNAME: user.last_name },
                                 'html', false, true, true)
  end
end
