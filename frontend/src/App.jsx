import { Outlet } from 'react-router-dom'
import { lazy, Suspense } from "react"
function App() {
 return (
    <Suspense fallback="Loading...">
        <Outlet />
    </Suspense>
 )
}

export default App
