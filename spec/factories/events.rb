FactoryGirl.define do
  factory :event do
    name 'Regular dinner'
    description 'Every Thursday night, it is fun!'

    trait :with_venue do
      association :venue
    end
  end
end

