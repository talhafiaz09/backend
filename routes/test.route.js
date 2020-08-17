
// var request = require("request");

// var options = {
//   method: "GET",
//   url: "https://tasty.p.rapidapi.com/tags/list",
//   headers: {
//     "x-rapidapi-host": "tasty.p.rapidapi.com",
//     "x-rapidapi-key": "2ed6105fa7msh693e10887ef2adcp1adf61jsna18482b68e2c",
//     useQueryString: true,
//   },
// };

// request(options, function (error, response, body) {
//   if (error) {
//     throw new Error(error);
//   } else {
//     var re = JSON.parse(body);
//     console.log(re.results[98].type);
    // console.log(re.results[1]);
//   }
// });
// const axios = require("axios");

// axios({
//   method: "GET",
//   url: "https://tasty.p.rapidapi.com/recipes/list",
//   headers: {
//     "content-type": "application/octet-stream",
//     "x-rapidapi-host": "tasty.p.rapidapi.com",
//     "x-rapidapi-key": "2ed6105fa7msh693e10887ef2adcp1adf61jsna18482b68e2c",
//     useQueryString: true,
//   },
//   params: {
//     tags: "under_30_minutes",
//     from: "0",
//     sizes: "20",
//   },
// })
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.log("Error");
//   });
