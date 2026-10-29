/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {Activity} from 'lucide-react';
import {useEffect, useState} from 'react';
import {StockTable} from '@/src/components/StockTable';
import {AlertBadge} from '@/src/components/AlertBadge';
import {detectBreakout} from '@/src/utils/technicalAnalysis';

export default function App() {
  const [stocks, setStocks] = useState<any[]>([]);
  const symbols = ['RELIANCE', 'TCS', 'INFY'];

  useEffect(() => {
    const fetchData = async () => {
      const data = await Promise.all(symbols.map(s => fetch(`/api/stocks/${s}`).then(r => r.json())));
      setStocks(data);
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // 10s polling
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 p-6">
      <header className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-6">
        <Activity className="size-8 text-emerald-600" />
        <h1 className="text-3xl font-bold tracking-tight">IndiaStockPulse</h1>
      </header>
      
      <main className="space-y-8">
        <section>
          <h2 className="text-lg font-semibold mb-4">Market Watch</h2>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <StockTable stocks={stocks} />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">Breakout Alerts</h2>
          <div className="flex gap-2">
            {stocks.length > 0 && detectBreakout([], stocks[0].regularMarketPrice).breakout && (
              <AlertBadge type="breakout" message={`${stocks[0].symbol} reached 20-Day High`} />
            )}
            <p className="text-sm text-slate-500">No active patterns detected.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
