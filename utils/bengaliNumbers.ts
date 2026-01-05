
const bengaliDigits: { [key: string]: string } = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

export const toBengaliNumber = (num: number | string): string => {
  const numStr = num.toString();
  return numStr.replace(/[0-9]/g, (digit) => bengaliDigits[digit] || digit);
};

export const formatBengaliK = (num: number): string => {
    if (num >= 1000000) {
        const val = (num / 1000000).toFixed(2).replace(/\.0+$/, '');
        return toBengaliNumber(val) + 'M';
    }
    if (num >= 1000) {
        const val = (num / 1000).toFixed(2).replace(/\.0+$/, '');
        return toBengaliNumber(val) + 'K';
    }
    return toBengaliNumber(num.toLocaleString());
};
