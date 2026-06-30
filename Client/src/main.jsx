import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContext from './Components/Context/AuthContext.jsx'
import UserContext from './Components/Context/UserContext.jsx'
import SocketContext from './Components/Context/SocketContext.jsx'


createRoot(document.getElementById('root')).render(
  
    <AuthContext>
      <UserContext>
        <SocketContext>
             <App />
        </SocketContext>   
      </UserContext>  
    </AuthContext>
 
)
