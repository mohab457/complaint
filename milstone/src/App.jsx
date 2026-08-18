import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import NotFound from './components/NotFound/NotFound'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Layout from './components/Layout/Layout'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Complaint from './components/Complaint/Complaint';
import MyComplaints from './components/MyComplaints/MyComplaints';
import {QueryClient , QueryClientProvider} from '@tanstack/react-query'
import Complaintdetailes from './components/Complaintdetailes/Complaintdetailes';



let routers = createBrowserRouter([
  {path:'/' ,element: <Layout/> ,children:[
    {path:'/' , element: <Login/>},
    {path:'login' , element: <Login/>},
    {path:'register' , element:<Register/>},
    {path:'Complaint' , element:<Complaint/>},
    {path:'Complaintdetailes' , element:<Complaintdetailes/>},
    {path:'MyComplaints' , element:<MyComplaints/>},
    {path:'*' , element: <NotFound/>}
  ]}
])
let queryClient = new QueryClient()
function App() {
  return<>
        <QueryClientProvider client={queryClient}>
        <RouterProvider router={routers}></RouterProvider>
        </QueryClientProvider>
  </>

}

export default App;
