import React from 'react'
import Dashboard from './components/Dashboard'
import UserRegister from './components/UserRegister'
import Login from './components/Login'
import TransactionForm from './components/TransactionForm'
import { ExpenseProvider } from './context/ExpenseContext'
import { Routes,Route } from 'react-router-dom'


const App = () => {
  return (
    <ExpenseProvider>
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </ExpenseProvider>
  )
}

export default App
 