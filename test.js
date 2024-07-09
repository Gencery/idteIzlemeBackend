let api1ep = "https://fake-json-api.mock.beeceptor.com/companies";
let api2ep = "https://api.sampleapis.com/coffee/hot";

async function fetchData(url) {

  return fetch(url)
    .then(res => res.json())
}

let result1 = await fetchData(api1ep);
let result2 = await fetchData(api2ep);

console.log([...result1, ...result2].length);