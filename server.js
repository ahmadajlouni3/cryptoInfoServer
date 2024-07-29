
require("dotenv").config();
const express = require("express");
const axios = require('axios');
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.get("/" ,(req,res) => {
  const {symbol} = req.query;
    let response = null;
    const promiseFetching = new Promise(async (resolve, reject) => {
      try {
        if (symbol){
          response = await axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${symbol}`, {
            headers: {
              'X-CMC_PRO_API_KEY': process.env.API_KEY || "f8177fc0-16ee-4c66-bda8-b2d6ff8a12c8",
            },
          });
        }else{
          response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?aux=circulating_supply,total_supply,max_supply,cmc_rank,num_market_pairs&start=1&limit=5`, {
            headers: {
              'X-CMC_PRO_API_KEY': process.env.API_KEY,
            },
          });
        }
        
      } catch(ex) {
        response = null;
        // error
        console.log(ex);
        reject(ex);
      }
      if (response) {
        // success
        const json = response.data;
        resolve(json);
      }
    });

    promiseFetching.then(data => {
      res.status(200).json(data.data);
    })

})




app.listen(process.env.PORT, () => {
    console.log("You are in the server at port 3000");
})