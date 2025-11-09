import useAuth from './useAuth'
import { useEffect, useState } from 'react'
import Dialog from '../../components/Dialog'
import { RxPerson } from "react-icons/rx";
import Order from '../order/Order'
import { FiLogOut } from 'react-icons/fi';

function Profile() {
  const { logout, getProfile, profile, } = useAuth();
  const [loading, setLoading] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const date = new Date(profile?.createdAt);

  useEffect(() => {
    setLoading(true)
    getProfile()
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-40 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      {/* Profile header at top */}
      <div className="bg-gradient-to-r from-rose-50 to-pink-100 shadow-lg rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-rose-200">

        {/* Left Section - Profile Info */}
        <div className="flex items-center">
          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-white shadow-md ring-4 ring-rose-200 flex items-center justify-center">
            <RxPerson className="w-12 h-12 sm:w-14 sm:h-14 text-rose-600" />
          </div>

          <div className="ml-5">
            <h3 className="text-2xl font-bold text-gray-900">{profile?.name}</h3>
            <p className="text-gray-600 text-sm sm:text-base break-all">{profile?.email}</p>
            <p className="text-gray-500 text-sm mt-1">
              Member since <span className="font-medium text-gray-700">{date.toLocaleDateString()}</span>
            </p>
          </div>
        </div>

        {/* Right Section - Logout Button */}
        <div className="w-full sm:w-auto flex justify-start sm:justify-end">
          <button
            onClick={() => setConfirmOpen(true)}
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-lg shadow hover:opacity-90 hover:scale-105 transform transition duration-200"
          >
            <span className="flex items-center gap-2">Logout <FiLogOut className="w-6 h-6" /></span>
          </button>
        </div>
      </div>

      {/* Orders section below */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-3">Your Orders</h2>
        <Order />
      </div>

      {/* Logout confirmation dialog */}
      <Dialog
        open={confirmOpen}
        title="Logout"
        description="Are you sure you want to log out?"
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={() => { logout(); setConfirmOpen(false); }}
        onCancel={() => setConfirmOpen(false)}
        onClose={() => setConfirmOpen(false)}
      />
    </div>
  )
}

export default Profile