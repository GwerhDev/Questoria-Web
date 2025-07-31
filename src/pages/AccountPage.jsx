import React from 'react';
import { useSelector } from 'react-redux';

const AccountPage = () => {
  const accountData = useSelector((state) => state.account.data);
  const { username, email, isVerified, role, profilePic } = accountData.userData || {};

  return (
    <div className="p-4 text-text-primary w-full">
      <div className="bg-surface p-6 rounded-lg shadow-md mx-auto w-full flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4 text-center">Account Information</h2>
        {profilePic && (
          <div className="flex justify-center mb-4">
            <img src={profilePic} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
          </div>
        )}
        <div className="space-y-2">
          <p><strong>Username:</strong> {username}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Verified:</strong> {isVerified ? 'Yes' : 'No'}</p>
          <p><strong>Role:</strong> {role}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;