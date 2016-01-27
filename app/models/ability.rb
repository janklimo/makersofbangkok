class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new
    alias_action :create, :read, :update, :destroy, :to => :crud

    can [:show, :update], User, id: user.id
    can :crud, Registration, user_id: user.id
  end
end
