const express=require("express");
const app=express();
const https=require("https");
const bodyParse=require("body-parser");
const request=require("request");

app.use(bodyParse.urlencoded({extended:true}));

app.use(express.static("static"));

app.get("/", function(req, res){
    
    res.sendFile(__dirname+"/index.html");

 
})

app.post("/", function(req, res){
    const firstName=req.body.first;
    const lastName=req.body.second;
    const email=req.body.email;
        const data={
            members:[
                {
                    email_address: email,
                    status: "subscribed",
                    merge_fields:{
                        FNAME:firstName,
                        LNAME:lastName
                    }

                }
            ]
        }
        const jsonData=JSON.stringify(data);
        const URL="https://us<your_api_last_number>.api.mailchimp.com/3.0/lists/<your_list_id>";
       const options={
          method:"POST",
          auth:"Sachin:<your api_key>"
       }

       const request=https.request(URL,options,function(response){
            response.on("data",function(data){
                console.log(JSON.parse(data));
            })
            if(response.statusCode===200){
                res.write("<h1>Awesome!</h1>");
                res.write("<p>You have been successfully signed up to the newsletter.</p>")
            }
            else{
                res.write("<h1>sorry</h1>");
                res.write("<p>an unexpected failure occured, Please retry.</p>")
            }
            res.send();
       })
       
       request.write(jsonData);
       request.end();
})
app.listen(3000,()=>{
    console.log("server is running at 3000");
})


