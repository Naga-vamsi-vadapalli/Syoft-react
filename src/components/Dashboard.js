import React from 'react';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  console.log(user); // Check if user data is logged in the console

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <p>First Name: {user.user_firstname || 'N/A'}</p>
          <p>Email: {user.user_email || 'N/A'}</p>
          <p>Phone: {user.user_phone || 'N/A'}</p>
          
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default Dashboard;
