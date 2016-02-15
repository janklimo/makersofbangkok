class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :referrer_id, :friends,
    :rank
end
