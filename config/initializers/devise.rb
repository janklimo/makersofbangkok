Devise.setup do |config|
  config.mailer_sender = 'Jan Klimo <jan.klimo@gmail.com>'
  config.password_length = 5..128
end
