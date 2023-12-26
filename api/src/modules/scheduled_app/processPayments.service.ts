import {
  createScheduledAppOO,
  createScheduledAppRG,
} from "./scheduled.service";

class ProcessPaymentsService {
  async executeScheduledService(): Promise<string> {
    //Scheduled app Regular Giving
    const createAppRG = createScheduledAppRG();

    // Scheduled app One Off
    const createAppOO = createScheduledAppOO();
    return "Se estan procesando los pagos One off y los Regular Giving.";
  }
}

export default ProcessPaymentsService;
