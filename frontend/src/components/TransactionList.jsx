import styled from "styled-components";
import { useExpenses } from "../context/ExpenseContext";

const ListWrapper = styled.div`
    background: #fff;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`

const ListHeader = styled.h3`
    margin-bottom: 1rem;
    color: #1f2937;
`

const TransactionItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #f3f4f6;

    &:last-child{
        border-bottom: none;
    }
`

const TransactionInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`

const Category = styled.span`
    font-weight: 600;
    color: #1f2937;
`

const DateText = styled.span`
    font-size: 0.75rem;
    color: #9ca3af;
`

const Amount = styled.span`
    font-weight: 700;
    font-size: 1.125rem;
    color: ${props => props.type === 'income' ? '#10b981' : '#ef4444'};
`

const DeleteBtn = styled.button`
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    padding: 0.5rem;

    &:hover {
        color: #ef4444;
    }
`

const EmptyState = styled.div`
    text-align: center;
    color: #9ca3af;
    padding: 2rem;
`

function TransactionList(){
    const {transactions,deleteTransaction,loading} = useExpenses()
    if(loading){
        return <ListWrapper>Loading...</ListWrapper>
    }

    if(!transactions.length){
        return <ListWrapper>No transaction yet</ListWrapper>
    }

    return(
        <ListWrapper>
            <ListHeader>Recent transactions</ListHeader>
            {transactions.map(t => (
                <TransactionItem key={t._id}>
                    <TransactionInfo>
                        <Category>{t.category}</Category>
                        <DateText>{new Date(t.date).toLocaleDateString()}</DateText>
                    </TransactionInfo>
                    <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                        <Amount type={t.type}>
                            {t.type === 'income' ? '+' : '-'} ${t.amount.toFixed(2)}
                        </Amount>
                        <DeleteBtn onClick={() => deleteTransaction(t._id)}>delete transaction</DeleteBtn>
                    </div>
                </TransactionItem>
            ))}
        </ListWrapper>
    )
}

export default TransactionList