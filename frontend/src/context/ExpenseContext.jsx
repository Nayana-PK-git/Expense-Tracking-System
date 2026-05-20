// import { createContext, useContext, useState, useEffect } from "react";
// import { useAuth } from './AuthContext'

// const ExpenseContext = createContext()

// export const useExpenses = () => {
//     const context = useContext(ExpenseContext);
//     if(!context){
//         res.status(400).json({msg:"useExpenses must be used within ExpenseProvider"})  
//     }
//     return context;
// };

// export const ExpenseProvider = ({ children }) => {
//     const [transactions,setTransactions] =useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const { user, token } = useAuth();
// }


// //Fetch all transactions when user logs in
// useEffect(() => {
//     if(user && token){
//         fetchTransactions();
//     }else{
//         setTransactions()
//     }
// }, [user, token]);

// const fetchTransactions = async() => {
//     setLoading(true);
//     setError('');
//     try {
//         const res = await 
//     } catch (error) {
        
//     }
// } 