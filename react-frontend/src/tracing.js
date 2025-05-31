// src/tracing.js
import { DiagConsoleLogger, DiagLogLevel, diag, trace } from '@opentelemetry/api'; // Import trace từ @opentelemetry/api
import { WebTracerProvider, BatchSpanProcessor, SimpleSpanProcessor, ConsoleSpanExporter } from '@opentelemetry/sdk-trace-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { ZoneContextManager } from '@opentelemetry/context-zone';

// (Tùy chọn) Bật log debug nội bộ của OpenTelemetry SDK
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ALL); // Sử dụng ALL
 // Đổi thành DEBUG hoặc ALL nếu cần xem nhiều hơn

console.log('--- TRACING.JS IS EXECUTED ---');

const serviceName = process.env.REACT_APP_OTEL_SERVICE_NAME || 'react-frontend-unknown-service';
const otlpHttpEndpoint = process.env.REACT_APP_OTEL_EXPORTER_OTLP_ENDPOINT;

console.log(`[OTel Tracing] Service Name: ${serviceName}`);
console.log(`[OTel Tracing] OTLP HTTP Endpoint: ${otlpHttpEndpoint}`);

if (!otlpHttpEndpoint) {
  console.warn('[OTel Tracing] REACT_APP_OTEL_EXPORTER_OTLP_ENDPOINT is not defined. Frontend traces will NOT be sent via OTLP.');
}

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
});

const provider = new WebTracerProvider({
  resource: resource,
});

provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
console.log('[OTel Tracing] ConsoleSpanExporter added.');

if (otlpHttpEndpoint) {
  const otlpExporter = new OTLPTraceExporter({
    url: `${otlpHttpEndpoint}/v1/traces`,
    headers: {},
  });
  provider.addSpanProcessor(new BatchSpanProcessor(otlpExporter, {
    scheduledDelayMillis: 1000,
    maxQueueSize: 100,
    maxExportBatchSize: 30,
  }));
  console.log(`[OTel Tracing] OTLPTraceExporter configured for ${otlpHttpEndpoint}/v1/traces with BatchSpanProcessor.`);
} else {
  console.warn('[OTel Tracing] OTLPTraceExporter NOT configured due to missing OTLP endpoint.');
}

// --- THÊM ĐOẠN KIỂM TRA TRƯỚC KHI REGISTER ---
// Kiểm tra xem một TracerProvider thực sự đã được đăng ký toàn cục chưa
// NoopTracerProvider là provider mặc định khi chưa có gì được set
if (!trace.getTracerProvider() || trace.getTracerProvider()?.constructor.name === 'NoopTracerProvider') {
  provider.register({
    contextManager: new ZoneContextManager(), // ZoneContextManager rất quan trọng cho web
  });
  console.log('[OTel Tracing] WebTracerProvider registered globally.');
} else {
  console.warn('[OTel Tracing] A TracerProvider is already registered globally. Skipping re-registration.');
}
// --- KẾT THÚC ĐOẠN KIỂM TRA ---


registerInstrumentations({
  instrumentations: [
    getWebAutoInstrumentations({
      '@opentelemetry/instrumentation-fetch': {
        propagateTraceHeaderCorsUrls: [/.*/],
        clearTimingResources: true,
      },
    }),
  ],
  // tracerProvider: provider, // Không cần thiết nếu provider đã được globally register và registerInstrumentations được gọi sau
});

console.log('--- OpenTelemetry Web Tracing with auto-instrumentations initialized ---');

// Nhắc lại: KHÔNG export default một React component từ file này.
// Import nó ở đầu file src/index.js: import './tracing';