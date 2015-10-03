class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :referrer_id
end
