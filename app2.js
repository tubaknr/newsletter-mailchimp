const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const path = require("path");
const client = require("@mailchimp/mailchimp_marketing");

//const app = express();

//BodyParser Middleware
//app.use(bodyParser.urlencoded({extended: true}));

//Static folder
//app.use(express.static(path.join(__dirname, 'public')));

app.post("/signup", (req, res) => {
    //console.log(req.body)
    //res.send("hello");
    console.log("in the fcn.");
    const {firstName, lastName, email} = req.body;

    if (!firstName || !lastName || !email){
        res.redirect('/fail.html');
        return;
    }

/*
    const data = {
        members: [
            {
                email_address: email,
                status: 'suscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }*/
/*
    const postData = JSON.stringify(data);

    const options = {
        url: 'https://us22.api.mailchimp.com/4.0/lists/6cec192592',
        method: 'POST',
        headers: {
            Authorization: 'auth ' + process.env.MAILCHIM_API_KEY,
        },
        body: postData,
    }


//batch sub/unsub list members POST list/list_id
    request(options, (err, response, body) => {
        if(err){
            console.log("Error!!! in request!!");
            res.redirect('/fail.html');
        }else{
            if(response.statusCode === 200){
                res.redirect('/success.html');
            }
            else{
                console.log("sth else. error. ");
                res.redirect('/fail.html');
            }
        }
    } 
    
});*/


client.setConfig({
  apiKey: 'c0a7ea5723bd79c7cee32c7537d4b8a8',
  server: 'us22'
});

const run = async () => {
  const response = await client.lists.batchListMembers('6cec192592', {
    members: [{
        email_address: email,
        status: "subscribed",
    }],
  });
  console.log(response);
}

run();
});
/* const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
 */