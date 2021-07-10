FactoryBot.define do
  factory :user do
    first_name
    last_name
    password
    email
    avatar
    type { "User" }
  end

  factory :developer do
    type { "Developer" }
    password
  end

  factory :admin do
    type { "Admin" }
    password
  end

  factory :manager do
    type { "Manager" }
    password
  end
  
end