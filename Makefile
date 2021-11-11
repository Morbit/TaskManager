lint_backend:
	docker-compose run web bundle exec rubocop -a
test_backend:
	docker-compose run web rails test
check_code:
	make lint_backend && make test_backend