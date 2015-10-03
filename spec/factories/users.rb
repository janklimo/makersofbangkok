FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "person#{n}@example.com" }
    uid "test@example.com"
    password "test1234"
    provider "email"
    first_name 'John'
    last_name 'Snow'
    referrer_id 1
  end
end

