require('dotenv').config({ quiet: true }); // quiet to avoid logs
const express = require('express');
const cors = require('cors');

const app = express();
const { PORT } = process.env;

app.use(cors());
app.use(express.json());

require('./routes/routes')(app);

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'APIs are running',
        data: [],
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
