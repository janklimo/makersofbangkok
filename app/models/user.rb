class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :friends, class_name: "User", foreign_key: "referrer_id"
  has_many :registrations
  has_many :events, through: :registrations

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

  def rank
    User.where("id <= ?", id).count
  end
end
