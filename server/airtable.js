let Airtable = require("airtable");
Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.API_KEY,
});
let base = Airtable.base(process.env.BASE_KEY);
module.exports = base;
