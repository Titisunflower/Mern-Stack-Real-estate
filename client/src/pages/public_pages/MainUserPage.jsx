import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderClient from '../../components/HeaderClient';

const MainUserPage = () => {
  return (
    <div>
      <HeaderClient />
      <Outlet />
    </div>
  );
};

export default MainUserPage;
