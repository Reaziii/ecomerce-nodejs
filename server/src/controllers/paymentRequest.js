import SSLCommerzPayment from 'sslcommerz-lts'
const storeId = "bdtra60bbb98b97f69";
const storePass = "bdtra60bbb98b97f69@ssl";
const isLive = false;

export const initPayment = (req, res) => {

}




export const sendPayment = (orderId, price, callback = (message) => { }) => {
    const data = {
        total_amount: price,
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url: 'http://localhost:1444/payment/success/' + orderId,
        fail_url: 'http://localhost:1444/payment/failed/' + orderId,
        cancel_url: 'http://localhost:1444/payment/cancel/' + orderId,
        ipn_url: 'http://localhost:1444/payment/ipn/' + orderId,
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    try {
        const sslcz = new SSLCommerzPayment(storeId, storePass, isLive)
        sslcz.init(data).then(apiResponse => {
            let GatewayPageURL = apiResponse.GatewayPageURL
            callback({ status: true, message: "redirect url", url: GatewayPageURL });
        });
    }
    catch (err) {
        callback({ status: false, message: "failed to init payment" })
    }
}