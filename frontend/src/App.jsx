import React from 'react'
import Dashboard from './components/Dashboard'
import UserRegister from './components/UserRegister'
import Login from './components/Login'
import TransactionForm from './components/TransactionForm'


const App = () => {
  return (
    <div>
        <Dashboard />
        <UserRegister />
        <Login />
        <TransactionForm />
    </div>
  )
}

export default App
 