FactoryBot.define do
  factory :user do
    first_name
    last_name
    password
    email

    factory :developer do
      type { 'Developer' }
    end

    factory :manager do
      type { 'Manager' }
    end
  end
end
