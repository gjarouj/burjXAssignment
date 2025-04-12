export function formatNumberCompact(num?: number): string {
    if (!num || num === null || num === undefined || isNaN(num)) return '-';
  
    const absNum = Math.abs(num);
  
    if (absNum >= 1e12) {
      return formatWithUnit(num, 1e12, ' trillion');
    } else if (absNum >= 1e9) {
      return formatWithUnit(num, 1e9, ' billion');
    } else if (absNum >= 1e6) {
      return formatWithUnit(num, 1e6, ' million');
    } else if (absNum >= 1000) {
      return addCommas(num.toFixed(0));
    } else {
      return num.toFixed(2); // very small numbers
    }
  }
  
  function formatWithUnit(num: number, divisor: number, suffix: string): string {
    return addCommas((num / divisor).toFixed(2)) + suffix;
  }
  
  function addCommas(str: string): string {
    const parts = str.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  