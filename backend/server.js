let express = require('express');
let cors = require('cors');
let mysql = require('mysql');
let bcrypt = require('bcrypt');

const port = 5000;
const mysqlUrl = {
    host: "localhost",
    user: "root",
    password: "",
    database: "bookstore"
};
const salt = 5;

const app = express();
app.use(cors());
app.use(express.json());

// connec to the database

let conn = mysql.createConnection(mysqlUrl);
console.log(" database connection is available");
conn.connect();


// default path response
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to the Book Store app');
});


// request check
app.post('/check', async (request, response) => {
    try {
        const { username, password } = request.body;
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);
        console.log(username, password);
    } catch (e) {
        console.log(e);
    }
});

// 
// Actual request
//                                                  login

app.post('/login', (request, response) => {
    try {
        const { username, password } = request.body;
        // try on sql
        console.log("database connection successful");
        conn.query('select id,name, password from users where name = ? or email= ?', [username, username], (error, result, fields) => {
            if (error) {
                console.error("error on show tables");
            }
            if (result.length !== 0) {
                console.log(result);
                let name = result[0].name;
                let hash = result[0].password;
                let id = result[0].id;

                bcrypt.compare(password, hash).then((compared) => {
                    if (compared === true) {
                        let resultData = { user: { username: name, userid: id } };
                        console.log(resultData);
                        response.send(resultData);

                    } else {
                        response.send(false);
                    }
                });
            } else {
                return response.send(false);
            }
        });
        // conn.end();

        console.log({ username, password });
    } catch (e) {
        console.log(e)
    }
});

//                                                   register

app.post('/register', async (request, response) => {
    try {
        let { username, email, password, level } = request.body;
        // try on sql
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);

        console.log("database connection successful");
        conn.query('insert into users (name,password,email,level) values(?,?,?,?)', [username, hashedPassword, email, level], (error, result, fields) => {
            if (error) {
                console.error("error on new user reacord");
            }
            console.log(result);
            if (result) {
                response.send('successfull');
            } else if (!result) {
                response.send('Unsuccessfull')
            }

        });
        conn.end();

        console.log({ username, password, email });
    } catch (e) {
        console.log(e)
    }
});

//                                                        Homepage category

app.post('/homepage', (request, response) => {
    let { column } = request.body;
    console.log(column);
    try {
        // conn.connect();
        console.log("database connection successful");
        conn.query('SELECT distinct(' + column + ') from book', (error, result, fields) => {
            if (error) {
                console.log("error on category on homepage");
            }
            if (result) {
                // console.log(result);
                response.send(result);
            }
            console.log(fields);
        });

        // conn.end();
    } catch (e) {
        console.log(e);
    }
});

//                                                    products

app.post('/homepage/products', (request, response) => {
    let { value, column } = request.body;
    console.log(value, column);
    try {
        // conn.connect();
        console.log("database connection successfull");
        conn.query('select * from book where ' + column + ' = ?', [value], (error, result, fields) => {
            if (error) {
                console.log("error on products");
            }
            if (result) {
                console.log(result);
                return response.send(result);
            } else {
                return response.send(false);
            }
        });
        // conn.end();

    } catch (e) {
        console.log(e);
    }
});

//                                                                   All Products

app.get('/homepage/allproducts', (request, response) => {
    try {
        conn.query('select id,title,rating,price from book', (error, result, fields) => {
            if (error) {
                console.log("Error on all products");
            }
            if (result.length !== 0) {
                console.log(result);
                return response.send(result);
            } else {
                return response.send(false);
            }
        });

    } catch (e) {
        console.log(e);
    }
});

//                                                    product

app.post('/homepage/product', (request, response) => {
    let { id } = request.body;
    console.log(id);
    try {
        conn.query('select * from book where id = ?', [id], (error, result, fields) => {
            if (error) {
                console.log("error on products");
            }
            if (result.length !== 0) {
                console.log(result);
                return response.send(result);
            } else {
                return response.send(false);
            }
        });
        // conn.end();

    } catch (e) {
        console.log(e);
    }
});

//                                                                   Add to Cart
app.post('/homepage/products/cart', (request, response) => {
    let { userid, bookid } = request.body;
    console.log(userid, bookid);
    try {
        // conn.connect();
        console.log("database connection successfull");
        conn.query('insert into cart (userid,bookid) values(?,?)', [userid, bookid], (error, result, fields) => {
            if (error) {
                console.log("Error on the Add to Cart");
            }
            if (result) {
                return response.send(true);
            } else {
                return response.send(false);
            }
        });

    } catch (e) {
        console.log(e);
    }

});

//                                                                cart count

app.post('/cartcount', (request, response) => {
    let { userid } = request.body;
    console.log(userid);
    try {
        // conn.connect();
        console.log("database connection successfull");
        conn.query('select count(*) as count from cart where userid = ? ', [userid], (error, result, fields) => {
            if (error) {
                console.log("Error on the cart count ");
            }
            if (result.length !== 0) {
                let data = result[0]
                console.log(data);
                return response.send(data);

            } else {
                return response.send(false);
            }
        });
    } catch (e) {
        console.log(e);
    }
});

//                                                        cart data

app.post('/cart', (request, response) => {
    let userid = request.body;
    let id = userid.userid;
    console.log("console", userid);
    try {
        conn.query('SELECT book.* FROM book JOIN cart  ON book.id=cart.bookid WHERE cart.userid= ?', [id], (error, result, fields) => {
            if (error) {
                console.log("Error on cart data ");
            }
            if (result) {
                console.log(result);
                return response.send(result);
            } else {
                return response.send(false);
            }
        });
    } catch (e) {
        console.log(e);
    }

});
// 
// 

//                                                         delete cart item

app.post('/cart-delete', (request, response) => {
    let { userid, bookid } = request.body;
    console.log(userid, bookid);
    try {
        // conn.connect();
        console.log("database connection successfull");
        conn.query('Delete from cart where userid= ? and bookid= ?', [userid, bookid], (error, result, fields) => {
            if (error) {
                console.log("Error on the Add to Cart");
            }
            if (result) {
                return response.send(true);
            } else {
                return response.send(false);
            }
        });

    } catch (e) {
        console.log(e);
    }

});



// get the app online
app.listen(port, () => {
    console.log("App is online at port the :", port)
});

// sample query

