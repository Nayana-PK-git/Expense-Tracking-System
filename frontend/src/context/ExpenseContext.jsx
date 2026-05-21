import { createContext, useContext, useState, useEffect, Children } from "react";
import { api } from '../Api/api'
import { useAuth } from './AuthContext'

const ExpenseContext = createContext()

export const useExpenses = () => {
    const context = useContext(ExpenseContext);
    if(!context){
        throw new Error('useExpenses must be used within ExpenseProvider')  
    }
    return context;
};

export const ExpenseProvider = ({ children }) => {
    const [transactions,setTransactions] =useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuth();



//Fetch all transactions when user logs in
useEffect(() => {
    if(user){
        fetchTransactions();
    }else{
        setTransactions([])
    }
}, [user]);

const fetchTransactions = async() => {
    setLoading(true);
    setError('');
    try {
        const data = await api.get('/transactions')
        setTransactions(data)
    } catch (error) {
        setError(error.msg || 'Failed to fetch transactions')
    } finally {
        setLoading(false)
    }
} 

const addTransaction = async (transactionData) => {
    setLoading(true)
    setError('')
    try {
        const data = await api.post('/transactions',transactionData)
        setTransactions(prev => [data, ...prev])
        return data
    } catch (error) {
        setError(error.msg || 'Failed to add transaction')
        throw error
    } finally {
        setLoading(false)
    }
}


const deleteTransaction = async (id) => {
    setLoading(true)
    setError('')
    try {
        await api.delete(`/transactions/${id}`)
        setTransactions(prev => prev.filter(t => t._id!== id))
    } catch (error) {
        setError(error.msg || 'Failed to delete transaction')
        throw error
    } finally {
        setLoading(false)
    }
}


const updateTransaction = async (id, updateData) => {
    setLoading(true)
    setError('')
    try {
        const data = await api.put(`/transactions/${id}`,updateData)
        setTransactions(prev => prev.map(t => t._id === id ? data :t))
        return data
    } catch (error) {
        setError(error.msg || 'Failed to update transaction')
        throw error
    } finally {
        setLoading(false)
    }
}

const summary = transactions.reduce((acc, t) => {
    if(t.type === 'income'){
        acc.totalIncome += t.amount
    } else {
        acc.totalExpense += t.amount
    }
    acc.balance = acc.totalIncome - acc.totalExpense
    return acc
}, { totalIncome:0, totalExpense:0, balance:0 })


const categoryData = transactions
.filter(t => t.type === 'expense')
.reduce((acc,t) => {
    const existing = acc.find(item => item.name === t.category)
    if(existing) {
        existing.value += t.amount
    } else {
        acc.push({ name:t.category, value: t.amount})
    }
    return acc
},[])


const monthlyData = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleDateString('en-US', { month: 'short'})
    const existing = acc.find(item => item.month === month)
    if(existing) {
        if(t.type === 'income'){
            existing.income += t.amount
        } else {
            existing.expense += t.amount
        }
    } else {
        acc.push({
            month,
            income: t.type === 'income' ? t.amount : 0,
            expense: t.type === 'expense' ? t.amount : 0
        })
    }
    return acc
},[])


const value = {
    transactions,loading,error,
    fetchTransactions,addTransaction,deleteTransaction,updateTransaction,
    summary,categoryData,monthlyData
}
return(
    <ExpenseContext.Provider value={value}>
        {Children}
    </ExpenseContext.Provider>
)
}