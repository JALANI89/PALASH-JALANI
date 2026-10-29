import express from 'express';
import {createServer} from 'vite';
import path from 'path';
import {fileURLToPath} from 'url';
import yahooFinance from 'yahoo-finance2';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const port = 3000;

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createServer({
      server: {middlewareMode: true},
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
  }

  // API endpoint for stock data (Quote)
  app.get('/api/stocks/:symbol', async (req, res) => {
    try {
      const {symbol} = req.params;
      const result = await yahooFinance.quote(symbol + '.NS'); // .NS for NSE
      res.json(result);
    } catch (error) {
      res.status(500).json({error: 'Failed to fetch stock data'});
    }
  });

  // API endpoint for historical data
  app.get('/api/stocks/:symbol/historical', async (req, res) => {
    try {
      const {symbol} = req.params;
      const today = new Date();
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(today.getFullYear() - 1);
      
      const result = await yahooFinance.historical(symbol + '.NS', {
        period1: oneYearAgo.toISOString().split('T')[0],
        interval: '1d'
      });
      res.json(result);
    } catch (error) {
      res.status(500).json({error: 'Failed to fetch historical data'});
    }
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
