FactoryGirl.define do
  factory :event do
    date 1.week.from_now
    name 'Regular dinner'
    description 'Every Thursday night, it is fun!'
    capacity 10

    trait :with_venue do
      association :venue
    end
  end
end

