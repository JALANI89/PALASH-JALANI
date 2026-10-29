export interface HistoricalData {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const detectBreakout = (data: HistoricalData[], currentPrice: number) => {
  if (data.length < 5) return { breakout: false, type: '' };
  const lastHigh = Math.max(...data.slice(-20).map(d => d.high)); // 20-day high
  if (currentPrice > lastHigh) return { breakout: true, type: '20-Day High' };
  return { breakout: false, type: '' };
};

export const detectCandlestick = (data: HistoricalData[]) => {
  if (data.length < 2) return null;
  const last = data[data.length - 1];
  const prev = data[data.length - 2];

  // Simple Hammer detection
  const body = Math.abs(last.close - last.open);
  const shadowLower = Math.min(last.close, last.open) - last.low;
  const shadowUpper = last.high - Math.max(last.close, last.open);
  
  if (shadowLower > body * 2 && shadowUpper < body) return 'Hammer';
  
  return null;
};
