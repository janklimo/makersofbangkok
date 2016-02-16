class Event < ActiveRecord::Base
  belongs_to :venue
  has_many :registrations
  has_many :attendees, through: :registrations, source: :user

  def self.upcoming
    where('date > ?', DateTime.now).order(:date).first
  end

  def spots_available
    capacity - attendees.count >= 0 ?
      capacity - attendees.count : 0
  end
end
