const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(__dirname));
app.get('/shopping', (req, res) => res.sendFile(path.join(__dirname, 'shopping.html')));
app.get('/today', (req, res) => res.sendFile(path.join(__dirname, 'today.html')));
app.get('/gardening', (req, res) => res.sendFile(path.join(__dirname, 'gardening.html')));
app.get('/diy', (req, res) => res.sendFile(path.join(__dirname, 'diy.html')));
app.get('/work', (req, res) => res.sendFile(path.join(__dirname, 'work.html')));
app.get('/spending', (req, res) => res.sendFile(path.join(__dirname, 'spending.html')));

let data = { projects: [], weeklyTasks: [], oneOffTasks: [], recurringTasks: [], deletedTasks: [], shoppingList: [], longTermList: [], generalList: [], todayList: [], nextId: 1 };
const DATA_FILE = path.join(__dirname, 'data.json');

async function initDb() {
  if (fs.existsSync(DATA_FILE)) {
    try {
      data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } catch (err) {
      console.error('Failed to read data file', err);
    }
  } else {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  }
}

app.get('/api/data', (req, res) => {
  res.json(data);
});

app.post('/api/data', async (req, res) => {
  data = req.body;
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ status: 'ok' });
  } catch (e) {
    console.error('Failed to save', e);
    res.status(500).json({ error: 'Failed to save' });
  }
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize storage', err);
  process.exit(1);
});
