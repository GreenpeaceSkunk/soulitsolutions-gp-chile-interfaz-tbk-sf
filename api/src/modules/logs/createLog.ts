import LogsEvents from "./enums/logsEvents";
import LogModel from "./logs.model";

const createLog = async (
  transaccionId: any,
  logEvent: LogsEvents,
  request?: any,
  response?: any
) => {
  const logData: LogEntry = {
    transaccion_id: transaccionId,
    evento: logEvent,
    request: request ? JSON.stringify(request) : null,
    fecha_alta: new Date(),
    response: response ? JSON.stringify(response) : null,
  };
  await LogModel.create(logData);
};

export default createLog;
