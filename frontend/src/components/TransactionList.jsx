import styled from "styled-components";
import { useExpenses } from "../context/ExpenseContext";

const ListWrapper = styled.div`
    background: #fff;
    border-radius: 12px;
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