export const SENSITIVE_CONTENT_MESSAGE =
  "This message appears to contain sensitive information. Remove it and try again. Please don't share tax documents or other sensitive details in chat.";

const sensitivePatterns = [
  /\b(?:ssn|sin|social security(?: number)?|social insurance(?: number)?)\s*(?:is|:|#|=)?\s*\d{3}[- ]?\d{2}[- ]?\d{4}\b/i,
  /\b\d{3}[- ]\d{2}[- ]\d{4}\b/,
  /\b(?:bank\s+)?(?:account|routing|transit)\s*(?:number|no\.?)?\s*(?:is|:|#|=)?\s*(?:\d[\s-]?){6,17}\b/i,
  /\b(?:date of birth|dob|passport(?: number)?|driver'?s license(?: number)?|tax (?:id|identification)(?: number)?|ein)\s*(?:is|:|#|=)\s*[a-z0-9][a-z0-9/.-]{3,}\b/i,
  /\b(?:password|passcode|(?:api|access|refresh|auth|client)[\s_-]?(?:key|token)|token|secret|pin|cvv|cvc|security code)\s*(?:is|:|=)\s*\S+/i,
  /\b(?:sk|pk|rk)-[a-z0-9_-]{12,}\b/i,
  /\b(?:gh[pousr]_[a-z0-9_]{20,}|github_pat_[a-z0-9_]{20,}|glpat-[a-z0-9_-]{20,}|xox[baprs]-[a-z0-9-]{10,})\b/i,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bbearer\s+[a-z0-9._~+/-]{20,}/i,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i,
];

const unlabeledIdentifierPattern =
  /\b(?:passport(?:\s+number)?|driver'?s license(?:\s+number)?)\s*(?:(?:is|:|#|=)\s*)?([a-z0-9-]{5,})\b/gi;
const unlabeledCredentialPattern =
  /\b(?:password|passcode|secret|token|(?:api|access|refresh|auth|client)[\s_-]?(?:key|token))\s+([a-z0-9._~+/-]{6,})\b/gi;

function isValidCardNumber(candidate: string) {
  const digits = candidate.replace(/\D/g, "");
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let doubleDigit = false;
  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = Number(digits[index]);
    if (doubleDigit) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    doubleDigit = !doubleDigit;
  }
  return sum % 10 === 0;
}

function containsUnlabeledSensitiveValue(
  text: string,
  pattern: RegExp,
  looksLikeValue: (value: string) => boolean
) {
  for (const match of text.matchAll(pattern)) {
    if (looksLikeValue(match[1])) return true;
  }
  return false;
}

export function containsSensitiveData(text: string) {
  if (sensitivePatterns.some((pattern) => pattern.test(text))) return true;

  if (
    containsUnlabeledSensitiveValue(
      text,
      unlabeledIdentifierPattern,
      (value) => /\d/.test(value) || value.length >= 10
    ) ||
    containsUnlabeledSensitiveValue(
      text,
      unlabeledCredentialPattern,
      (value) => /\d|[-_./+=]/.test(value) || value.length >= 16
    )
  ) {
    return true;
  }

  const cardNumbers = text.match(/\b(?:\d[ -]?){13,19}\b/g) ?? [];
  return cardNumbers.some(isValidCardNumber);
}
