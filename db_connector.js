const oracledb = require("oracledb");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
async function fun(){
    let con;

    try{
        con = await oracledb.getConnection({
            user : "system",
            password : "ak",
            connectString: "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=DESKTOP-C19R0LO)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=XE)))"
        });

        const name = "Charan";
        const id = 103;
        await con.execute(
            "INSERT INTO customers (id, name) VALUES (:id, :name)",
            { id: id, name: name }, 
            {autoCommit : true}
        );
        const data = await con.execute(
            "SELECT name, id FROM customers "
        );
        console.log(data.rows);

    }
    catch(err){
        console.log(err);
    }
}
fun();