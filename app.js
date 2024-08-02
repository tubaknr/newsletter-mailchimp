const client = require("@mailchimp/mailchimp_marketing");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
console.log("yes");

app.use(bodyParser.urlencoded({extended: true}));
console.log("yes2");

app.use(express.static(path.join(__dirname, 'public')));
console.log("yes3");

client.setConfig({
    apiKey: 'c0a7ea5723bd79c7cee32c7537d4b8a8',
    server: 'us22'
  });
  console.log("yes4");






app.post("/signup", async (req, res) => {
    console.log("yes5");
    const {firstName, lastName, email} = req.body;
    console.log(firstName);
    try{
        console.log("in the try now.");
    const response = await client.lists.batchListMembers('6cec192592', {
      members: [{
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
      }],
    });

    if (response.errors && response.errors.length > 0) {
        console.log("err");
        res.redirect('/fail.html');
      } else {
        console.log('succ');
        res.redirect('/success.html');
      }
    } catch (error) {
        console.log("err2")
      console.error('Error adding member to Mailchimp:', error);
      res.redirect('/fail.html');
    }
  });


  

console.log("yes5.5");
const PORT = process.env.PORT || 5000;
console.log("yes6");

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
console.log("yes7");
