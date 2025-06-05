up/dev:
	docker-compose -f configs/dev/compose.yml up -d

up/dev/b:
	docker-compose -f configs/dev/compose.yml up -d --build

down/dev:
	docker-compose -f configs/dev/compose.yml down

up/dev/grafana:
	docker-compose -f configs/dev/compose.yml -f configs/dev/compose-monitoring-grafana-otel.yml up -d

down/dev/grafana:
	docker-compose -f configs/dev/compose.yml -f configs/dev/compose-monitoring-grafana-otel.yml up -d
