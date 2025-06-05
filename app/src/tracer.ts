import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { MongooseInstrumentation } from '@opentelemetry/instrumentation-mongoose';
import { MongoDBInstrumentation } from '@opentelemetry/instrumentation-mongodb';
import { Logger } from '@nestjs/common';

function initializeTracing(): NodeSDK {
  const sdk = new NodeSDK({
    traceExporter: new OTLPTraceExporter(),
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

function startTracing(sdk: NodeSDK, logger: Logger): void {
  sdk.start();
  logger.log('[OTEL] Tracing initialized');

  process.on('SIGTERM', () => {
    sdk
      .shutdown()
      .then(() => logger.log('[OTEL] Tracing terminated'))
      .catch((error: unknown) =>
        logger.error('[OTEL] Error terminating tracing', error),
      )
      .finally(() => process.exit(0));
  });
}

export function start() {
  if (!process.env.OTEL_SERVICE_NAME) {
    return;
  }
  const sdk = initializeTracing();
  startTracing(sdk, new Logger('OTEL'));
}
