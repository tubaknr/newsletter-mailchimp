const client = require("@mailchimp/mailchimp_marketing");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

client.setConfig({
    apiKey: '', // buraya api yi açıkça yazınca oldu.
    server: 'us22'
  });
  console.log(client.apiKey);


app.post("/signup", async (req, res) => {
    const {firstName, lastName, email} = req.body;
    try{
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
        res.redirect('/fail.html');
      } else {
        res.redirect('/success.html');
      }
    } catch (error) {
      console.error('Error adding member to Mailchimp:', error);
      res.redirect('/fail.html');
    }
  });


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

