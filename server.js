require('dotenv').config();
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

// index page data
let indexData = {
  projects: [],
  weeklyTasks: [],
  oneOffTasks: [],
  recurringTasks: [],
  deletedTasks: [],
  shoppingList: [],
  longTermList: [],
  generalList: [],
  todayList: [],
  nextId: 1
};

// work page data
let workData = {
  workProjects: [],
  workTasks: [],
  workNextId: 1,
  calendarEvents: [],
  calendarNextId: 1
};

// spending page data
let spendingData = {
  projects: [],
  shoppingList: [],
  longTermList: [],
  canBuyList: [],
  nextId: 1
};

const INDEX_FILE = path.join(__dirname, 'indexData.json');
const WORK_FILE = path.join(__dirname, 'workData.json');
const SPENDING_FILE = path.join(__dirname, 'spendingData.json');

function loadJson(file, def) {
  if (fs.existsSync(file)) {
    try {
      return JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (err) {
      console.error('Failed to read', file, err);
    }
  } else {
    fs.writeFileSync(file, JSON.stringify(def, null, 2));
  }
  return def;
}

function initDb() {
  indexData = loadJson(INDEX_FILE, indexData);
  workData = loadJson(WORK_FILE, workData);
  spendingData = loadJson(SPENDING_FILE, spendingData);
}

app.get('/api/index-data', (req, res) => {
  res.json(indexData);
});

app.post('/api/index-data', (req, res) => {
  indexData = req.body;
  fs.writeFileSync(INDEX_FILE, JSON.stringify(indexData, null, 2));
  res.json({ status: 'ok' });
});

app.get('/api/work-data', (req, res) => {
  res.json(workData);
});

app.post('/api/work-data', (req, res) => {
  workData = req.body;
  fs.writeFileSync(WORK_FILE, JSON.stringify(workData, null, 2));
  res.json({ status: 'ok' });
});

app.get('/api/spending-data', (req, res) => {
  res.json(spendingData);
});

app.post('/api/spending-data', (req, res) => {
  spendingData = req.body;
  fs.writeFileSync(SPENDING_FILE, JSON.stringify(spendingData, null, 2));
  res.json({ status: 'ok' });
});

initDb();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
