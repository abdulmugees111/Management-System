export const invoiceData = [
  {
    id: 1,
    orderId: "746F5K2",
    name: "Abu Bin Ishtiyak",
    email: "info@softnio.com",
    phone: "+811 847-4958",
    date: "23 Jan 2019, 10:45pm",
    invoiceItem1: "500.00",
    invoiceItem2: "500.00",
    invoiceItem3: "1000.00",
    invoiceItem4: "40.00",
    totalAmount: "2300.00",
    status: "Complete",
  },

];

export const paymentData = [
  {
    id: 1,
    ref: 4947,
    bill: "Enterprize Year Subscription",
    issue: "10-05-2019",
    due: "10-13-2019",
    total: "599.00",
    status: "Due",
  },
 
];

export const statusOptions = [
  { value: "Paid", label: "Paid" },
  { value: "Due", label: "Due" },
  { value: "Canceled", label: "Cancelled" },
];

export const cryptoActivityOptions = [
  { value: "Deposit", label: "Deposit" },
  { value: "Buy", label: "Buy Coin" },
  { value: "Sell", label: "Sell Coin" },
  { value: "Transfer", label: "Transfer" },
  { value: "Withdraw", label: "Withdraw" },
];

export const filterStatusOptions = [
  { value: "Pending", label: "Pending" },
  { value: "Rejected", label: "Rejected" },
  { value: "Upcoming", label: "Upcoming" },
  { value: "Completed", label: "Completed" },
];

export const filterCoin = [
  { value: "Bitcoin", label: "Bitcoin" },
  { value: "Etherium", label: "Etherium" },
  { value: "Litecoin", label: "Litecoin" },
];

export const filterPaymentmethod = [
  { value: "Paypal", label: "Paypal" },
  { value: "Bank", label: "Bank" },
];
