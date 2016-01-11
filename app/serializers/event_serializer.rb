class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :date, :description, :venue
end
