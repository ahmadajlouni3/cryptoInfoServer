
require("dotenv").config();
const express = require("express");
const axios = require('axios');
const cors = require("cors");

const app = express();

app.use(cors())
app.use(express.json());


app.get("/" ,(req,res) => {
  const {limit} = req.query;
    let response = null;
    const promiseFetching = new Promise(async (resolve, reject) => {
      try {
        if (limit){
          response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?aux=circulating_supply,total_supply,max_supply,cmc_rank,num_market_pairs&start=1&limit=${limit}`, {
            headers: {
              'X-CMC_PRO_API_KEY': process.env.API_KEY,
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




app.listen(process.env.PORT , () => {
    console.log("You are in the server at port 3000");
})