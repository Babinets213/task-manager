import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header: React.FC = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center mb-6">
      <h1 className="text-xl font-bold text-gray-800">Task Manager</h1>
      <button
        onClick={handleLogout}
        className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Вийти
      </button>
    </header>
  )
}

export default Header
