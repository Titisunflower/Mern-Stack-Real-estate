import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderAdmin from '../../components/HeaderAdmin';

const MainAdminPage = () => {
  return (
    <div>
      <HeaderAdmin />
      <Outlet />
    </div>
  );
};

export default MainAdminPage;
