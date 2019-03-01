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

async function getStoreMenu(storeId) {
    const res = await fetch(`${API_URL}/store/${storeId}/menu?lang=en&structured=true`);
    return res.json();
}

async function getStoreCoupon(storeId, couponId) {
    const res = await fetch(`${API_URL}/store/${storeId}/coupon/${couponId}?lang=en`);
    return res.json();
}

async function validateOrder(order) {
    fetch("https://order.dominos.com/power/validate-order", {
        "credentials": "omit",
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "content-type": "application/json; charset=UTF-8",
            "dpz-language": "en",
            "dpz-market": "UNITED_STATES",
            "market": "UNITED_STATES",
            "x-dpz-d": "b268b48206ac28679a31d6096ff5d0eec22372253c48b8ea5b0055c73e8520ff"
        },
        "referrer": "https://order.dominos.com/en/assets/build/xdomain/proxy.html",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": "{\"Order\":{\"Address\":{\"PostalCode\":\"95112\"},\"Coupons\":[{\"Code\":\"9204\",\"Qty\":1,\"ID\":2}],\"CustomerID\":\"\",\"Email\":\"\",\"Extension\":\"\",\"FirstName\":\"\",\"LastName\":\"\",\"LanguageCode\":\"en\",\"OrderChannel\":\"OLO\",\"OrderID\":\"JnWlnnmrGWJHLxv2qFLF\",\"OrderMethod\":\"Web\",\"OrderTaker\":null,\"Payments\":[],\"Phone\":\"\",\"PhonePrefix\":\"\",\"Products\":[],\"ServiceMethod\":\"Carryout\",\"SourceOrganizationURI\":\"order.dominos.com\",\"StoreID\":\"7994\",\"Tags\":{},\"Version\":\"1.0\",\"NoCombine\":true,\"Partners\":{},\"OrderInfoCollection\":[]}}",
        "method": "POST",
        "mode": "cors"
    });
}

// getStoresNearAddress('Delivery', 'Denver, CO, 80202', '1280')
// .then(incomingJson => {
//     console.log('FirstStore-->',incomingJson.Stores[0])
// })
// ;

// difference between ASYNC and Promise is that.. ASYNC cannot exist outside a function..
// SO to sustain it we write an IIFE - Immediately invoked function expression which allows us to write async key word

(async () => {
    const storeCoupon = await getStoreCoupon('6297', '9193');
    console.log('--->', storeCoupon);
    //These below lines do the exact same thing when written outside a function
    // getStoreInfo('6297')
    // .then(jsonR => console.log('--->',jsonR));
})();