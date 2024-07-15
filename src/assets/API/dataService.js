// import axios from 'axios';

// const API_URL = 'http://localhost:3000'; 

// // Function to fetch customers
// export const fetchCustomers = async () => {
//     debugger
//   try {
//     const response = await axios.get(`${API_URL}/customers`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching customers:', error);
//     throw error;
//   }
// };

// // Function to fetch transactions
// export const fetchTransactions = async () => {
//     debugger
//   try {
//     const response = await axios.get(`${API_URL}/transactions`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching transactions:', error);
//     throw error;
//   }
// };


// // Function to calculate total transactions for a customer
// export const getTotalTransactions = (customerId, transactions) => {
//     const customerTransactions = transactions.filter(
//       (transaction) => transaction.customer_id === customerId
//     );
  
//     return customerTransactions.reduce(
//       (total, transaction) => total + transaction.amount,
//       0
//     );
//   };
