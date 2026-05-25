import React from 'react'
import { ExpenseProvider } from './context/ExpenseContext'
import { RoutePath } from './components/Routes/route'


const App = () => {
  return (
    <ExpenseProvider>
      <RoutePath />
    </ExpenseProvider>
  )
}

export default App
 