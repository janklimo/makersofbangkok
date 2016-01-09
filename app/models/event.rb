class Event < ActiveRecord::Base
  belongs_to :venue
  has_many :registrations
  has_many :attendees, through: :registrations, source: :user

  def self.upcoming
    where('date > ?', DateTime.now).order(:date).first
  end
end
