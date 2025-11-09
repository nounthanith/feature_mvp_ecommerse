import useAuth from './useAuth'
import { useEffect, useState } from 'react'
import { RxPerson } from "react-icons/rx";

function Profile() {
  const { logout, getProfile, profile, } = useAuth();
  const [loading, setLoading] = useState(false)
  const date = new Date(profile?.createdAt);

  console.log(profile)

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
    <div className="flex flex-col items-center justify-center py-40 text-center">
      <div>
        <RxPerson className='w-20 h-20 rounded-none' />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">{profile?.name}</h3>
        <p className="text-gray-500 max-w-md">
          {profile?.email}
        </p>
        <p className="text-black font-semibold max-w-md">
          {date.toLocaleDateString()}
        </p>
      </div>
      <button
        onClick={() => logout()}
        className="mt-3 px-4 py-2 bg-white ring-2 ring-black text-red-500 rounded hover:bg-black hover:text-white hover:ring-black hover:ring-2 transition-colors text-sm font-medium"
      >
        Logout
      </button>
    </div>
  )
}

export default Profile