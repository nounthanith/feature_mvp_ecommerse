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
      <div className="bg-white border-2 border-black p-6 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-8 relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12">

        {/* Decorative Background "ID" Text - optional for high-fashion look */}
        <div className="absolute top-2 right-4 text-[60px] font-black text-gray-50 select-none pointer-events-none tracking-tighter">
          PROFILE
        </div>

        {/* Left Section - Profile Info */}
        <div className="flex items-center z-10">
          <div className="h-24 w-24 sm:h-28 sm:w-28 bg-white border-2 border-black flex items-center justify-center relative">
            <RxPerson className="w-14 h-14 sm:w-16 text-black" />
            {/* Small square badge for status */}
            <div className="absolute -bottom-2 -right-2 bg-black text-white text-[10px] px-2 py-1 font-bold uppercase tracking-widest">
              Active
            </div>
          </div>

          <div className="ml-6 sm:ml-8">
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-1">Authenticated User</div>
            <h3 className="text-3xl sm:text-4xl font-black text-black uppercase tracking-tighter italic">
              {profile?.name}
            </h3>
            <div className="flex flex-col mt-2">
              <p className="text-gray-500 font-mono text-sm break-all">{profile?.email}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase mt-2 border-t border-gray-100 pt-2">
                Registration Date: <span className="text-black">{date.toLocaleDateString('en-GB')}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Logout Button */}
        <div className="w-full sm:w-auto flex justify-start sm:justify-end z-10">
          <button
            onClick={() => setConfirmOpen(true)}
            className="group relative w-full sm:w-auto px-8 py-4 bg-black text-white font-black uppercase tracking-widest text-xs transition-all hover:bg-white hover:text-black border-2 border-black active:translate-y-1"
          >
            <span className="flex items-center justify-center gap-3">
              Logout
              <FiLogOut className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </div>

      {/* Orders section below */}
      <div className="mt-8">
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