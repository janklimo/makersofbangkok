require "administrate/base_dashboard"

class EventDashboard < Administrate::BaseDashboard

  ATTRIBUTE_TYPES = {
    venue: Field::BelongsTo,
    id: Field::Number,
    name: Field::String,
    date: Field::DateTime,
    capacity: Field::Number,
    description: Field::Text,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
  }

  COLLECTION_ATTRIBUTES = [
    :name,
    :venue,
    :date
  ]

  SHOW_PAGE_ATTRIBUTES = ATTRIBUTE_TYPES.keys

  FORM_ATTRIBUTES = [
    :venue,
    :name,
    :date,
    :capacity,
    :description
  ]

  def display_resource(event)
    "#{event.name} (#{event.date.strftime("%b %d, %Y | %A")})"
  end
end
