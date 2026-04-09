export function sanitizeIntegerInput(value: string): string {
  return value.replace(/\D+/g, '');
}

export function sanitizeDecimalInput(value: string): string {
  const normalizedValue = value.replace(',', '.');
  const sanitizedValue = normalizedValue.replace(/[^0-9.]/g, '');
  const [integerPart = '', ...decimalParts] = sanitizedValue.split('.');

  if (decimalParts.length === 0) {
    return integerPart;
  }

  return `${integerPart}.${decimalParts.join('')}`;
}
