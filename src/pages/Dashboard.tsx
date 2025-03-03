import { useAuth } from "../context/AuthContext"

const Dashboard = () => {
  const { logout } = useAuth()
  return (
    <div>
      <button onClick={logout} className="bg-red-400">
        logout
      </button>
    </div>
  )
}

export default Dashboard