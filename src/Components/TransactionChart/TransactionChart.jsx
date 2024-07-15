import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function TransactionChart({ selectedUser }) {
  const [data, setData] = useState([]);

  async function getTransactions() {
    try {
      let { data } = await axios.get('http://localhost:3000/transactions');
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTransactions();
  }, []);

  const renderCharts = () => {
    return selectedUser.map((user) => {
      const filteredTransactions = data.filter(
        (transaction) => transaction.customer_id === user.id
      );

      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              
              font: {
                size: 14, 
                weight: 'bold', 
              },
              color: 'black', 
            },
          },
        },
      };

      const customerData = {
        labels: filteredTransactions.map((transaction) => transaction.date),
        datasets: [
          {
            fill: true,
            label: `Latest Transactions - ${user.name}`,
            data: filteredTransactions.map((transaction) => transaction.amount),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
          },
        ],
      };

      return (
        <div key={user.id} className='bg-white me-3 p-4 rounded-3 mb-3'>
          <Line data={customerData} options={options} />
          <hr />
        </div>
      );
    });
  };

  return <div>{renderCharts()}</div>;
}

export default TransactionChart;
