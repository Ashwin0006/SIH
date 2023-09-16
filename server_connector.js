const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(__dirname + '/webpage'));

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/webpage/Signup.html');
});

app.post('/submit-signup', async (req, res) => {
    let con;

    try {
        con = await oracledb.getConnection({
            user: "system",
            password: "ak",
            connectString: "XE"
        });

        const userId = req.body.userid;
        const password_user = req.body.psw;  
        const email_id_usr = req.body.email_id; 
        const phone_number = req.body.ph_no; 

        await con.execute(
            "INSERT INTO users (name, password, email, ph_no) VALUES (:name, :password, :email, :ph_no)",
            { name: userId, password: password_user, email:email_id_usr, ph_no:phone_number},
            { autoCommit: true }
        );
        res.send("Signup successful!");
    } catch (err) {
        res.status(500).send("Error signing up: " + err.message);
    } finally {
        if (con) {
            con.close();
        }
    }
});