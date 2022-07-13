import React from 'react';
import RegisterCostumer from '../../components/Costumer/Register/';
import Menu from '../../components/Menu';

const Dashboard = () => {
  return(
      <div>
          <Menu />
          <hr className="my-3"/>
          <p>Dashboard</p>
          <RegisterCostumer />
      </div>
  )
}

export default Dashboard;