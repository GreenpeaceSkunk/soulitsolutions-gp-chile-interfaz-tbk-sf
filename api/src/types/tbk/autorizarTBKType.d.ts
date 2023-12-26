type AutorizarTBK = {
    details: {
      amount: number;
      status: string;
      authorization_code: string;
      payment_type_code: string;
      response_code: number;
      installments_number: number;
      commerce_code: string;
      buy_order: string;
    }[];
    buy_order: string;
    card_detail: {
      card_number: string;
    };
    accounting_date: string;
    transaction_date: string;
  };
  