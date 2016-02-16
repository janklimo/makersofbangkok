class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :date, :description, :capacity, :venue, :attendees,
    :spots_available
end
