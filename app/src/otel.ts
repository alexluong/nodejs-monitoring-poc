import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { MongooseInstrumentation } from '@opentelemetry/instrumentation-mongoose';
import { MongoDBInstrumentation } from '@opentelemetry/instrumentation-mongodb';
import { Logger } from '@nestjs/common';

function init(): NodeSDK {
  const metricExporter = new OTLPMetricExporter();
  const metricReader = new PeriodicExportingMetricReader({
    exporter: metricExporter,
    exportIntervalMillis: parseInt(
      process.env.OTEL_METRIC_EXPORT_INTERVAL || '5000',
    ),
  });

  const sdk = new NodeSDK({
    traceExporter: new OTLPTraceExporter(),
    metricReader: metricReader,
    instrumentations: [
      getNodeAutoInstrumentations({
        '@opentelemetry/instrumentation-fs': {
          enabled: false,
        },
      }),

      new HttpInstrumentation(),
      new ExpressInstrumentation(),
      new NestInstrumentation(),
      new MongoDBInstrumentation(),
      new MongooseInstrumentation(),
    ],
  });

  return sdk;
}

export function start() {
  if (!process.env.OTEL_SERVICE_NAME) {
    return;
  }
  const logger = new Logger('OTEL');
  const sdk = init();
  sdk.start();
  logger.log('[OTEL] Tracing and metrics initialized');

  process.on('SIGTERM', () => {
    sdk
      .shutdown()
      .then(() => logger.log('[OTEL] Tracing and metrics terminated'))
      .catch((error: unknown) =>
        logger.error('[OTEL] Error terminating tracing and metrics', error),
      )
      .finally(() => process.exit(0));
  });
}
