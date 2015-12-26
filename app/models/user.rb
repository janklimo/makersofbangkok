class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :friends, class_name: "User", foreign_key: "referrer_id"

  validates_presence_of :first_name, :last_name, :referrer_id

  def update_tokens(client_id, token)
    with_lock do
      tokens[client_id] = {
        token: BCrypt::Password.create(token),
        expiry: (Time.now + DeviseTokenAuth.token_lifespan).to_i
      }
      save
    end
  end

  def friends_count
    self.friends.count
  end
end
