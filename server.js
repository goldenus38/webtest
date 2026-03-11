const express = require('express');
const path = require('path');
const state = require('./state');

const app = express();
const PORT = process.env.PORT || 3838;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(state.statusCode).render('index', {
    statusCode: state.statusCode,
    defacementType: state.defacementType
  });
});

app.get('/api/status', (req, res) => {
  res.json({
    statusCode: state.statusCode,
    defacementType: state.defacementType
  });
});

app.post('/api/config', (req, res) => {
  const { statusCode, defacementType } = req.body;

  if (statusCode !== undefined) {
    const code = parseInt(statusCode, 10);
    if (code >= 100 && code <= 599) {
      state.statusCode = code;
    }
  }

  if (defacementType !== undefined) {
    const validTypes = ['none', 'hacked', 'hacktivist', 'ransomware', 'phishing', 'seo-spam', 'crypto-mining', 'refersec'];
    if (validTypes.includes(defacementType)) {
      state.defacementType = defacementType;
    }
  }

  res.json({
    statusCode: state.statusCode,
    defacementType: state.defacementType
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
