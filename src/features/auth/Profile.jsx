import useAuth from './useAuth'

function Profile() {
  const { logout } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center">
      <svg className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
      <h3 className="text-lg font-medium text-gray-900 mb-1">You are not logged in</h3>
      <p className="text-gray-500 max-w-md">
        Please login to view your profile.
      </p>
      <button
        onClick={() => logout()}
        className="mt-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors text-sm font-medium"
      >
        Logout
      </button>
    </div>
  )
}

export default Profile