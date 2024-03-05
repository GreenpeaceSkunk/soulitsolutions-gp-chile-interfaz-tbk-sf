function extractBin(creditCardNumber: string): string | null {
    const Bin = creditCardNumber.slice(0, 6) == "XXXXXX" ? "406496" : creditCardNumber.slice(0, 6);
    console.log(`El bin es: ${Bin}`)
    console.log(`Card number es: ${creditCardNumber}`)

    const digitPattern = /^\d{6}$/;
    
    if (digitPattern.test(Bin)) {
      return Bin;
    } else {
      return null; // Null si los primeros 6 digitos no son numeros
    }
  }

export default extractBin;