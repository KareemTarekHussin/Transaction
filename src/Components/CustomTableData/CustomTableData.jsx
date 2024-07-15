import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CustomTableData.css'; 
import TransactionChart from '../TransactionChart/TransactionChart';

function CustomerTable() {
    const [data, setData] = useState([]);
    const [transactionsData, setTransactionsData] = useState([]);
    const [filter, setFilter] = useState('');
  
  async  function getCustomers(){
       try {
        let {data} = await axios.get('http://localhost:3000/customers')
        // console.log(data);
        setData(data)
       } catch (error){
        console.log(error);
       }
    }
  async  function getCustomerTransactions(){
       try {
        let {data} = await axios.get('http://localhost:3000/transactions')
        // console.log(data);
        setTransactionsData(data)
       } catch (error){
        console.log(error);
       }
    }

    useEffect(() => {
        getCustomers()
        getCustomerTransactions()
    }, []);
  

// Storing the corrected filtered Data object in the array
    const filteredData = data.filter((customer)=>{
      const customerNameMatches = customer.name.toLowerCase().includes(filter.toLocaleLowerCase())
//  Test console.log(customerNameMatches);
      const transactionAmountMatches = transactionsData.some((transaction)=>
        transaction.customer_id === customer.id && transaction.amount.toString() === filter
      )
      console.log(transactionAmountMatches);
      return transactionAmountMatches || customerNameMatches
    })
  
    const handleFilterChange = (e) => {
      console.log(e.target.value);
     setFilter(e.target.value);
    };
  console.log(filteredData);
    return (
      <>
       <div className='row ms-2'>
      <div className="col-md-6">
      <div className='d-flex justify-content-between align-items-center mt-5'>
            <h4>Customers Transactions Data</h4>
        <input
          type="text"
          placeholder="Filter by name or amount"
          value={filter}
          onChange={handleFilterChange}
          className='form-control w-25 d-flex'
        />
        </div>
      <table className='customerTable table-striped bg-white '>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Transaction Date</th>
            <th>Transaction Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(customer => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>
                {transactionsData
                  .filter(transaction => transaction.customer_id === customer.id)
                  .map(transaction => (
                    <div key={transaction.id}>{transaction.date}</div>
                  ))}
              </td>
              <td>
                {transactionsData
                  .filter(transaction => transaction.customer_id === customer.id)
                  .map(transaction => (
                    <div key={transaction.id}>{transaction.amount} $</div>
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className='col-md-6 mt-5 pt-5'>
      <TransactionChart selectedUser={filteredData} />
      </div>
       </div>
      </>
      
    );
}

export default CustomerTable;
