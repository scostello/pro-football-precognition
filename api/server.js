const express = require('express');
const app = express();
const apiRouter = express.Router();

const port = process.env.PORT || 3001;

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Api running on port ${port}`));