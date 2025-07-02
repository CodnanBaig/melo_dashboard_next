import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import SupportWidget from '../Support/SupportWidget';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="lg:pl-64 pt-16 lg:pt-0 min-h-screen">
        <Outlet />
      </main>
      <SupportWidget />
    </div>
  );
}