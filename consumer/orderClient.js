const request = require("superagent");
const { Order } = require("./order");

// External collaborator client 
// Must write code that executes HTTP requests to service (not full stack of consumer code)
// Responsible for making external HTTP calls to the Order API and returning Order
const fetchOrders = () => {
  return request.get(`http://localhost:${process.env.API_PORT}/orders`).then(
    (res) => {
      return res.body.reduce((acc, o) => {
        acc.push(new Order(o.id, o.items));
        return acc;
      }, []);
    },
    (err) => {
      console.log(err)
      throw new Error(`Error from response: ${err.body}`);
    }
  );
};

module.exports = {
  fetchOrders,
};
