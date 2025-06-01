up/dev:
	docker-compose -f configs/dev/compose.yml up -d

up/dev/b:
	docker-compose -f configs/dev/compose.yml up -d --build

down/dev:
	docker-compose -f configs/dev/compose.yml down
