.PHONY: oapi gen runner clean backend frontend up down

up:
	@echo [ starting all services... ]
	@docker compose -f docker-compose.dev.yml up

upb:
	@echo [ starting all services... ]
	@docker compose -f docker-compose.dev.yml up --build

backend:
	@echo [ starting backend... ]
	@docker compose -f docker-compose.dev.yml up supaeval_backend

frontend:
	@echo [ starting frontend... ]
	@docker compose -f docker-compose.dev.yml up supaeval_frontend --build

## Generate all code from specs | eq: sqlc + oapi
gen: oapi

oapi:
	@rm -fr ./frontend/src/lib/services/gen-api
	DOCKER_BUILDKIT=1 docker build -f Dockerfile.generate --target oapi-frontend --output ./frontend/src/lib/services/gen-api .

clean:
	@echo [ cleaning all services... ]
	@docker compose down
	@docker compose rm -f
	@docker volume rm supaeval_data







