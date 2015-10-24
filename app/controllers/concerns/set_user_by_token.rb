concern :SetUserByToken do
  protected

  def set_token
    @client_id = SecureRandom.urlsafe_base64(nil, false)
    @token     = SecureRandom.urlsafe_base64(nil, false)
    @resource.update_tokens(@client_id, @token)
  end
end
