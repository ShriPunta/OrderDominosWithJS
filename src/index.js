const fetch = require('node-fetch');
const API_URL = 'https://order.dominos.com/power';

const orderTypes = {
    Delivery: 'Delivery',
    Carryout: 'Carryout',

};

async function getStoresNearAddress(orderType, cityRegionOrPostalCode, streetAddress) {
    const res = await fetch(`${API_URL}/store-locator?type=${orderType}&c=${cityRegionOrPostalCode}&s=${streetAddress}`);

    return res.json();


}

async function getStoreInfo(storeId) {
    const res = await fetch(`${API_URL}/store/${storeId}/profile`);
    return res.json();
}

// getStoresNearAddress('Delivery', 'Denver, CO, 80202', '1280')
// .then(incomingJson => {
//     console.log('FirstStore-->',incomingJson.Stores[0])
// })
// ;

// difference between ASYNC and Promise is that.. ASYNC cannot exist outside a function..
// SO to sustain it we write an IIFE - Immediately invoked function expression which allows us to write async key word

(async () => {
    const storeInfo = await getStoreInfo('6297');
    console.log('--->', storeInfo);
    //These below lines do the exact same thing when written outside a function
    // getStoreInfo('6297')
    // .then(jsonR => console.log('--->',jsonR));
})();