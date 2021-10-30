lint_backend:
	docker-compose run web bundle exec rubocop -a
test_backend:
	docker-compose run web rails test