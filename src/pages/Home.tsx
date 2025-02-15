import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      This is the home page
      <br />
      <Outlet />
    </div>
  )
}

export default Home