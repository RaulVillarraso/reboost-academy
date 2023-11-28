import './Root.css'
import { Outlet } from "react-router-dom"
import Footer from "../components/footer/Footer"

function Root() {
  return (
      <div className="layout">
        <Outlet />  
       
        <Footer />
      </div>
  )
}

export default Root