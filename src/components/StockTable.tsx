interface Stock {
  symbol: string;
  regularMarketPrice: number;
  regularMarketVolume: number;
  regularMarketChangePercent: number;
}

interface Props {
  stocks: Stock[];
}

export const StockTable = ({stocks}: Props) => {
  return (
    <table className="w-full text-left text-sm">
      <thead className="text-gray-500 border-b border-gray-200">
        <tr>
          <th className="py-3 px-4 font-medium">Symbol</th>
          <th className="py-3 px-4 font-medium text-right">Price</th>
          <th className="py-3 px-4 font-medium text-right">Change</th>
          <th className="py-3 px-4 font-medium text-right">Volume</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {stocks.map((stock) => (
          <tr key={stock.symbol} className="hover:bg-gray-50">
            <td className="py-3 px-4 font-semibold">{stock.symbol}</td>
            <td className="py-3 px-4 text-right font-mono tabular-nums">₹{stock.regularMarketPrice.toFixed(2)}</td>
            <td className={`py-3 px-4 text-right font-mono tabular-nums ${stock.regularMarketChangePercent >= 0 ? 'text-emerald-600' : 'text-crimson-600'}`}>
              {stock.regularMarketChangePercent.toFixed(2)}%
            </td>
            <td className="py-3 px-4 text-right font-mono tabular-nums text-gray-600">{stock.regularMarketVolume.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
