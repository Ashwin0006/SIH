const express = require('express');
const oracledb = require('oracledb');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());  
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

/*app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});*/

app.listen(3000, '0.0.0.0', () => {
    console.log('Server started on http://0.0.0.0:3000');
});


app.post('/login', async (req, res) => {
    let connection;
    console.log("Post Executed!");
    try {
        connection = await oracledb.getConnection({
            user: "system",
            password: "ak",
            connectString: "XE"
        });

        const result = await connection.execute(
            `SELECT * FROM users WHERE name = :name AND password = :password`,
            {
                name: req.body.username,
                password: req.body.password
            }
        );

        if (result.rows.length > 0) {
            res.send({ success: true });
        } else {
            res.send({ success: false });
        }
    } catch (err) {
        res.status(500).send(err);
    } finally {
        if (connection) {
            connection.close();
        }
    }
});




