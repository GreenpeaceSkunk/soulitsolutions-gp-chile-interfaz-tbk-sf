type LogEntry = {
  transaccion_id: any;
  fecha_alta: Date;
  evento: string;
  request?: string | null;
  http_code_response?: number | null;
  response?: string | null;
};
