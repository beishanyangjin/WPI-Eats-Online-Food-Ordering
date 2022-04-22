const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql');
const port = process.env.PORT || 3080;

const error_handler = ({ res, ex, status } = {}) => {
  console.log(ex);
  res.status(status || 400).json({ message: ex.message || ex.msg || ex });
};

const conn = mysql.createConnection({ connectionLimit: 10, host: 'localhost', port: 3306, user: 'root', password: '12345678', database: '542' });
const execSQL = async (sql) => {
  return new Promise((resolve, reject) => {
    console.log(sql);
    conn.query(sql, (err, rows, fields) => {
      console.log(err);
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
};
// Security_linkwith
// Customer_ID ,---> auto gen
// Security_id ,---> account_name
// Password_id ,
// user_name ,
// user_phone ,
const tableName = 'Security_linkwith';
const customer = 'Customer'

app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(express.static(path.join(__dirname, 'public')))
  .use((req, res, next) => {
    const { method, url } = req;
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization,token, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    console.log(method.toLowerCase(), url);
    if (req.method == 'OPTIONS') {
      res.sendStatus(200);
      return;
    }
    next();
  })
  .get('/api', (req, res) => {
    res.json({ code: 200, ts: new Date().getTime() });
  })
  .post('/api/user/signup', async (req, res) => {
    try {
      const { Security_id, Password_id, user_name, user_phone, address } = req.body;
      if (!Security_id) {
        throw Error('Security id can be not empty');
      }
      if (!Password_id) {
        throw Error('Password can be not empty');
      }
      if (!user_name) {
        throw Error('User name can be not empty');
      }
      if (!user_phone) {
        throw Error('User phone can be not empty');
      }
      if (!address) {
        throw Error('Address can be not empty');
      }
      let sql = mysql.format(`select count(1) total from ?? where Security_id = ? limit 1`, [tableName, Security_id]);
      const [{ total }] = await execSQL(sql);
      if (total > 0) {
        throw Error('Security id exists');
      }
      sql = mysql.format(`select count(*) total1 from ?? where Customer_address = ?`, [customer, address])
      const [{ total1 }] = await execSQL(sql);
      if (total1 > 0) {
        throw Error('Address exists')
      }
      
      // get customer total records
      sql = mysql.format(`select count(1) countV from ?? `, [customer])
      const [{ countV = 0 }] = await execSQL(sql);
      // 
      const Customer_ID = countV + 1;
      // customer insert 
      sql = mysql.format(`insert into ?? (Customer_ID,Customer_address,Customer_name,Balance) values(?,?,?,?)`, [customer, Customer_ID, address, user_name, 0]);
      await execSQL(sql);
      // user insert
      sql = mysql.format('insert into ?? (Customer_ID,Security_id,Password_id, user_name, user_phone)values(?,?,?,?,?)', [tableName, Customer_ID, Security_id, Password_id, user_name, user_phone]);
      const info = await execSQL(sql);
      
      res.json({ message: info.affectedRows > 0 ? 'Sign UP success' : 'Sign UP error' });
    } catch (ex) {
      error_handler({ res, ex });
    }
  })
  .post('/api/user/signin', async (req, res) => {
    try {
      const { Security_id, Password_id } = req.body;
      if (!Security_id) {
        throw Error('Security id can be not empty');
      }
      if (!Password_id) {
        throw Error('Password can be not empty');
      }
      let sql = mysql.format(`select * from ?? where Security_id = ? and Password_id = ? limit 1`, [tableName, Security_id, Password_id]);
      const [info] = await execSQL(sql);
      if (!info) {
        throw Error('Username or password incorrect');
      }
      res.json(info);
    } catch (ex) {
      error_handler({ res, ex });
    }
  })
  .use('*', (req, res) => {
    res.status(404).json({ message: 'api not found' });
  })
  .listen(port, () => {
    console.log(`http://127.0.0.1:${port}/api/`);
  });
