import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from '../Dashboard'
import Login from '../Login'
import Navbar from '../Navbar'
import TransactionForm from '../TransactionForm'
import TransactionList from '../TransactionList'
import UserRegister from '../UserRegister'

export const RoutePath = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/navbar' element={<Navbar />} />
        <Route path='/transactionform' element={<TransactionForm />} />
        <Route path='/transactionlist' element={<TransactionList />} />
        <Route path='/register' element={<UserRegister />} />
    </Routes></>
  )
}
