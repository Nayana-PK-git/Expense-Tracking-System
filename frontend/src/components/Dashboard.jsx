import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, XAxis, YAxis, Bar } from "recharts"
import styled from "styled-components";
import { useExpenses } from "../context/ExpenseContext";
import { useAuth } from "../context/AuthContext";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import Navbar from "./Navbar";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658', '#ff7c7c']

const Container = styled.div`
  padding: 24px;
  max-width: 1280px;
  margin: 0 auto;
  background: #f9fafb;
  min-height: 100vh;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
`

const LogoutButton = styled.button`
  background: #ef4444;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;

  &:hover{
    background: #dc2626;
  }
`

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px,1fr));
  gap: 16px;
  margin-bottom: 32px;
`

const SummaryCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border-left: 4px solid ${props => props.color};
`

const CardLabel = styled.h3`
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0 0 8px 0;
`

const CardValue = styled.p`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${props => props.color};
  margin: 0;
`

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px,1fr));
  gap: 24px;
  margin-bottom: 32px;
`

const ChartCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`

const ChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: #111827;
`

const EmptyText = styled.p`
  color: #6b7280;
  text-align: center;
  padding: 80px 0;
`

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px,1fr));
  gap: 24px;
`

const LoadingText = styled.div`
  padding: 24px;
  text-align: center;
  color: #6b7280;
`

const ErrorText = styled.div`
  padding: 24px;
  text-align: center;
  color: #dc2626;
`

function Dashboard() {

  const {loading, error, summary, category, categoryData, monthlyData} = useExpenses()
  const {user, logout} = useAuth()

  if(loading && !summary){
    return <LoadingText>Loading dashboard...</LoadingText>
  }
  if(error){
    return <ErrorText>Error:{error}</ErrorText>
  }

  return(
    <>
    <Navbar />
    <Container>
      <Header>
        <Title>Welcome, {user?.name || 'User'}</Title>
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </Header>

      <SummaryGrid>
        <SummaryCard color='#10b981'>
          <CardLabel>Total Income</CardLabel>
          <CardValue color='#10b981'>${summary?.totalIncome?.toFixed(2) || '0.00'}</CardValue>
        </SummaryCard>

        <SummaryCard color='#ef4444'>
          <CardLabel>Total Expense</CardLabel>
          <CardValue color='#ef4444'>${summary?.totalExpense?.toFixed(2) || '0.00'}</CardValue>
        </SummaryCard>

        <SummaryCard color='#3b82f6'>
          <CardLabel>Balance</CardLabel>
          <CardValue color={summary?.balance >= 0? '#3b82f6' : '#ef4444'}>
            ${summary?.balance?.toFixed(2) || '0.00'}
          </CardValue>
        </SummaryCard>
      </SummaryGrid>

      <ChartGrid>
        <ChartCard>
          <ChartTitle>Expenses by Category</ChartTitle>
          {categoryData?.length > 0? (
            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius = {100}
                  label = {({name,value}) => `${name}: $${value.toFixed(0)}`} > {categoryData.map((entry,index) =>(
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                  <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyText>No expense data yet</EmptyText>
          )}
        </ChartCard>

        <ChartCard>
          <ChartTitle>Monthly Overview</ChartTitle>
          {monthlyData?.length > 0? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
                <Bar dataKey="income" fill="#00C49F" name="Income" />
                <Bar dataKey="expense" fill="#FF8042" name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyText>No monthly data yet</EmptyText>
          )}
        </ChartCard>
      </ChartGrid>

      <ContentGrid>
        <ChartCard>
          <TransactionForm />
        </ChartCard>

        <ChartCard>
          <TransactionList />
        </ChartCard>
      </ContentGrid>
    </Container>
    </>
  )
}

export default Dashboard