class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :date, :description, :capacity, :venue, :attendees
end
