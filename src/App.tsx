import { RouterProvider } from 'react-router/dom'
import './App.css'
import {router} from './routes.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <ToastContainer
        position="bottom-right"      // Placement (e.g., top-right, bottom-left)
        autoClose={5000}             // Duration before closing (in ms)
        theme="dark"                 // Theme (light, dark, colored)
        pauseOnHover                 // Pause timer on mouse hover
        draggable                    // Allow dragging to dismiss
        toastClassName="custom-toast" // Custom CSS class for the toast itself
      />
      <ThemeProvider>
      <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}

export default App
