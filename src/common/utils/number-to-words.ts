/**
 * Chuyển số thành chữ tiếng Việt
 * Ví dụ: 1250000 → "Một triệu hai trăm năm mươi nghìn đồng"
 */

const ones = [
  '', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín',
];
const teens = [
  'mười', 'mười một', 'mười hai', 'mười ba', 'mười bốn',
  'mười lăm', 'mười sáu', 'mười bảy', 'mười tám', 'mười chín',
];
const tens = [
  '', 'mười', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi',
  'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi',
];

function readHundreds(n: number): string {
  const h = Math.floor(n / 100);
  const t = Math.floor((n % 100) / 10);
  const u = n % 10;

  let result = '';

  if (h > 0) {
    result += ones[h] + ' trăm';
    if (t === 0 && u > 0) result += ' lẻ';
    else if (t > 0 || u > 0) result += ' ';
  }

  if (t === 1) {
    result += teens[u];
  } else if (t > 1) {
    result += tens[t];
    if (u === 5) result += ' lăm';
    else if (u > 0) result += ' ' + ones[u];
  } else if (u > 0) {
    result += ones[u];
  }

  return result.trim();
}

function readGroup(n: number, isFirst: boolean): string {
  if (n === 0) return '';
  const hundreds = Math.floor(n / 100);
  const remainder = n % 100;

  if (!isFirst && hundreds === 0 && remainder > 0 && remainder < 100) {
    return 'không trăm ' + readHundreds(n);
  }
  return readHundreds(n);
}

export function numberToWords(amount: number): string {
  if (amount === 0) return 'Không đồng';
  if (amount < 0) return 'Âm ' + numberToWords(-amount);

  const intPart = Math.floor(amount);

  const groups = [
    { value: Math.floor(intPart / 1_000_000_000_000), unit: 'nghìn tỷ' },
    { value: Math.floor((intPart % 1_000_000_000_000) / 1_000_000_000), unit: 'tỷ' },
    { value: Math.floor((intPart % 1_000_000_000) / 1_000_000), unit: 'triệu' },
    { value: Math.floor((intPart % 1_000_000) / 1_000), unit: 'nghìn' },
    { value: intPart % 1_000, unit: '' },
  ];

  const parts: string[] = [];
  let isFirst = true;

  for (const g of groups) {
    if (g.value > 0) {
      const text = readGroup(g.value, isFirst);
      parts.push(g.unit ? text + ' ' + g.unit : text);
      isFirst = false;
    }
  }

  if (parts.length === 0) return 'Không đồng';

  const result = parts.join(' ');
  return result.charAt(0).toUpperCase() + result.slice(1) + ' đồng';
}
