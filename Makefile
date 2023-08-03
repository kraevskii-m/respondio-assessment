include .env
export

start-locally:
	cp .env.example .env
	docker-compose up -d
	pnpm start
start-docker:
	cp .env.example .env
	docker-compose up -d
