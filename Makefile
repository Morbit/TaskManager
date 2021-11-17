lint_backend:
	docker-compose run web bundle exec rubocop -a
lint_frontend:
	docker-compose run web yarn lint --fix
test_backend:
	docker-compose run web rails test
check_code:
	make lint_backend && make test_backend