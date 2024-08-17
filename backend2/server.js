let express = require("express");
let bcrypt = require("bcrypt");
let cors = require("cors");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let userdetail = require("../backend2/models/Usercred.js");
let bookdetail = require("../backend2/models/Book.js");
let cartsdetail = require("../backend2/models/Cart.js");

console.log("***************************************************************************************************************")
const salt = 5;
const port = 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json())

const connect = async () => {

    try {
        await mongoose.connect("mongodb://localhost:27017/bookstore").then(() => {
            console.log("Database connection successfull :)");
            app.listen(port, () => {
                console.log("App is listening at ", port);
            });
        });
    } catch (e) {
        console.log(e);
    }

}

connect();

// ********************************************************* Sign in

app.post("/register", async (request, response) => {
    try {
        let { username, email, password, level } = request.body;
        const hashedPassword = await bcrypt.hash(password, salt);
        // console.log(request.body);

        let check = await userdetail.findOne({ email: email });
        if (check) {
            return (response.send("successfull"));
        } else {
            let action = await userdetail.create({
                name: username,
                email: email,
                password: hashedPassword,
                level: level
            });
            // console.log(action);
            return (response.send("successfull"));
        }

    } catch (e) {
        console.log(e);
    }
});


// ********************************************************* login

app.post('/login', async (request, response) => {
    try {
        const { username, password } = request.body;
        // console.log(request.body);
        let check = await userdetail.findOne({ $or: [{ name: username }, { email: username }] });
        // console.log(check);
        if (check) {
            await bcrypt.compare(password, check.password).then((compared) => {
                if (compared === true) {
                    let resultdata = { user: { username: check.name, userid: check._id } };
                    return (response.send(resultdata));
                } else {
                    return (response.send(false));
                }
            });
        } else {
            return (response.send(false));
        }
    } catch (e) {
        console.log(e);
    }
});


// ********************************************************* Homepage category

app.post("/homepage", async (request, response) => {
    try {
        let { column } = request.body;
        // console.log(column);
        let result = await bookdetail.distinct(column);
        // console.log(result);
        if (result) {
            return (response.send(result));
        }

    } catch (e) {
        console.log(e);
    }
});


// ********************************************************* cart count

app.post("/cartcount", async (request, response) => {
    try {
        let { userid } = request.body;
        let check = await cartsdetail.find({ uid: userid }).countDocuments();
        // console.log(check);
        return (response.send({ count: check }));

    } catch (e) {
        console.log(e);
    }
});

// ********************************************************* All products

app.get("/homepage/allproducts", async (request, response) => {
    try {
        let result = await bookdetail.find();
        // console.log(result);
        if (result) {
            return (response.send(result));
        } else {
            return (response.send(false))
        }
    } catch (e) {
        console.log(e);
    }
});


// ********************************************************* Products

app.post("/homepage/products", async (request, response) => {
    try {
        let { value, column } = request.body;
        // console.log(value,column);
        let query = {};
        query[column] = value;
        let result = await bookdetail.find(query);
        // console.log(result)
        if (result) {
            return (response.send(result));
        } else {
            return (response.send(false));
        }
    } catch (e) {
        console.log(e)
    }
});

// ********************************************************* product

app.post("/homepage/product", async (request, response) => {
    try {
        let { id } = request.body;
        let result = await bookdetail.findOne({ id: id });
        if (result) {
            return (response.send(result));
        } else {
            return (response.send(false));
        }

    } catch (e) {
        console.log(e);
    }
});

// ********************************************************* add to cart

app.post('/homepage/products/cart',async (request, response) => {
    let { userid, bookid } = request.body;
    // console.log(userid, bookid);
    try {
        let action=await cartsdetail.create({
            uid:userid,
            bookid:bookid
        })
        if(action){
            return(response.send(true));
        }else{
            return(response.send(false));
        }
    } catch (e) {
        console.log(e);
    }
});

// ********************************************************* cart data

app.post('/cart',async (request, response) => {
    let userid = request.body;
    // console.log("console", userid.userid);
    try {
        // let result=await cartsdetail.find({uid:id});
        let result=await bookdetail.aggregate([{$lookup:{from:"carts",localField:"id",foreignField:"bookid",as:"details"}},{$unwind:"$details"},{$match:{"details.uid":userid.userid}},{$project:{_id:0,details:0}}]);
        if(result){
            return(response.send(result));
        }else{
            return(response.send(false));
        }
    } catch (e) {
        console.log(e);
    }
});


// ********************************************************* cart delete data

app.post("/cart-delete",async (request,response)=>{
    try{
        let { userid, bookid } = request.body;
        // console.log(userid, bookid);
        let action=await cartsdetail.deleteOne({uid:userid,bookid:bookid});
        if(action){
            return(response.send(true));
        }else{
            return(response.send(false));
        }
    }catch(e){
        console.log(e);
    }
});