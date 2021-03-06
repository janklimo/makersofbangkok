FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "person#{n}@example.com" }
    uid "test@example.com"
    password "test1234"
    provider "email"
    first_name 'Jon'
    last_name 'Snow'
    referrer_id 42
  end
end

