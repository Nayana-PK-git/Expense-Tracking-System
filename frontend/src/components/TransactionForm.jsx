import { useState } from "react";
import {useExpenses} from '../context/ExpenseContext'
import styled from 'styled-components'

const CATEGORIES = {
    income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
    expense: ['Food', 'Rent', 'Transport', 'Shopping', 'Bills', 'Health', 'Entertainment', 'Other']
}

const FormWrapper = styled.div`
    max-width: 500px;
    margin: 0 auto;
    background: #fff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);

    h2{
        margin-bottom: 1.5rem;
        color: #333;
        text-align: center;
    }

    @media screen and (max-width:480px){
        padding: 1.5rem;
    }
`

const FormGroup = styled.div`
    margin-bottom: 1.25rem;

    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #333;
        font-size: 0.9rem;
    }

    input, select {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.2s;

        &:focus{
            outline: none;
            border-color: #2563eb;
        }
    }
`

const ToggleButton = styled.button`
    flex: 1;
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    background: #fff;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    ${props => props.active && props.variant === 'income' && 
    `background:#10b981;
    border-color:#10b981;
    color:#fff
    `}

    ${props => props.active && props.variant === 'expense' && 
    `background:#ef4444;
    border-color:#ef4444;
    color:#fff
    `}
`

const Message = styled.div`
    padding: 0.75rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    text-align: center;

    ${props => props.type === 'error' &&
    `background:#fef2f2;
    color:#dc2626
    `}

    ${props => props.type === 'success' &&
    `background:#f0fdf4;
    color:#16a34a
    `}
`

const SubmitButton = styled.button`
    width: 100%;
    padding: 0.875rem;
    background: #2563eb;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;

    &:hover{
        background: #1d4ed8;
    }

    &:disabled{
        background: #9ca3af;
        cursor: not-allowed;
    }
`


function TransactionForm(){
    const {addTransaction} =useExpenses();
    const [formData,setFormData] = useState({
        amount: '',
        type: 'expense',
        category: 'Food',
        date: new Date().toISOString().split('T')[0],
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            //Reset category when type changes
            ...(name === 'type' && { category: CATEGORIES[value][0]})
        }));
        setError('');
        setSuccess('');
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if(!formData.amount || Number(formData.amount) <= 0){
            setError('Amount must be greater than 0');
            return;
        }
        try {
            await addTransaction({
                ...formData,
                amount: Number(formData.amount),
                date: new Date(formData.date)
            })

            setSuccess('Transaction added successfully');
            setFormData({
                amount: '',
                type: 'expense',
                category: 'Food',
                date: new Date().toISOString().split('T')[0],
            });

            setTimeout(() => setSuccess(''),3000)
        } catch (error) {
            setError('Failed to add transaction');
        }
    }

    return(
        <div className="transaction-form">
            <h2>Add Transaction</h2> 

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Type</label>
                    <div className="type-toggle">
                        <button 
                        type="button" 
                        className={formData.type === 'income' ? 'active income' : ''} 
                        onClick={() => handleChange({target: {name: 'type', value: 'income'}})}>Income</button>

                        <button 
                        type="button" 
                        className={formData.type === 'expense' ? 'active expense' : ''} 
                        onClick={() => handleChange({target: {name: 'type', value: 'expense'}})}>Expense</button>
                    </div>
                </div>

                <div className="form-group">
                    <label>Amount</label>
                    <input type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00" required />
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <select name="category" value={formData.category}
                    onChange={handleChange} required>{CATEGORIES[formData.type].map(cat => (
                        <option key={cat} value={cat}> {cat} </option>
                    ))}</select>
                </div>

                <div className="form-group">
                    <label>Date</label>
                    <input 
                    type="date" 
                    name="date" 
                    value={formData.date} 
                    onChange={handleChange} 
                    max={new Date().toISOString().split('T')[0]} required />
                </div>
                    {error && <div className="error-msg">{error}</div>}
                    {success && <div className="success-msg">{success}</div>}
                <button type="submit" className="submit-btn">Add Transaction</button>
            </form>
        </div>
    )
}

export default TransactionForm
