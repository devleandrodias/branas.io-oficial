export function validateCpf(rawCpf: string | null | undefined) {
  if (!rawCpf) return false;
  const cleanCpf = rawCpf.replace(/\D/g, "");

  if (isInvalidLength(cleanCpf)) return false;
  if (allDigitisTheSame(cleanCpf)) return false;

  const digit1 = calculateDigt(cleanCpf, 10);
  const digit2 = calculateDigt(cleanCpf, 11);

  const actualDigit = extractDigit(cleanCpf);
  const validateDigit = `${digit1}${digit2}`;

  return actualDigit === validateDigit;
}

function calculateDigt(cpf: string, factor: number) {
  let total = 0;

  for (const digit of cpf) {
    if (factor > 1) total += Number(digit) * factor--;
  }

  const rest = total % 11;
  return rest < 2 ? 0 : 11 - rest;
}

function isInvalidLength(cpf: string) {
  return cpf.length != 11;
}

function allDigitisTheSame(cpf: string) {
  const [firstDigit] = cpf;
  return [...cpf].every((digit) => digit === firstDigit);
}

function extractDigit(cpf: string) {
  return cpf.slice(9);
}
