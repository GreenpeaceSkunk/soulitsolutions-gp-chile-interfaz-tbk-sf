function extractLastFourDigits(creditCardNumber: string): string | null {
  const lastFourDigits = creditCardNumber.slice(-4);
  const digitPattern = /^\d{4}$/;

  if (digitPattern.test(lastFourDigits)) {
    return lastFourDigits;
  } else {
    return null; // Null si los ultimos 4 digitos no son numeros
  }
}

export default extractLastFourDigits;
