import React from 'react'
import CustomerTable from '../CustomTableData/CustomTableData';




export default function Home() {

  return (
    <>
    <div className='d-flex align-items-center w-25 text-center m-auto mb-5'>
      <img className='w-25 me-2' src="Images/6.png" alt="Transaction" />
    <h1>Transaction App</h1>
    </div>
      <CustomerTable />
    </>
  )
}
