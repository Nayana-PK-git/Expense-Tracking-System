import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const COLORS = {
  income: '#16a34a',
  expense: '#dc2626',
  category: ['#2563eb', '#dc2626', '#16a34a', '#ea580c', '#7c3aed', '#db2777', '#0891b2', '#65a30d'] 
};

function Dashboard() {

  // const totals = {
  //   balance: 5000,
  //   income: 10000,
  //   expense: 5000
  // }

  // const categoryData = [
  //   { name: "Food", value: 400 },
  //   { name: "Travel", value: 300 }
  // ]

  // const formatCurrency = (amount) => `₹${amount}`

  return (
    <div className='dashboard'>

      <div className='summary-card'>

        <div className='card balance'>
          <span className='card-label'>Balance</span>
          <span className='card-amount'>
            {/* {formatCurrency(totals.balance)} */}
          </span>
        </div>

        <div className='card income'>
          <span className='card-label'>Total Income</span>
          <span className='card-amount'>
            {/* {formatCurrency(totals.income)} */}
          </span>
        </div>

        <div className='card expense'>
          <span className='card-label'>Total Expense</span>
          <span className='card-amount'>
            {/* {formatCurrency(totals.expense)} */}
          </span>
        </div>

      </div>

      <div className='charts-grid'>
        <div className='chart-container'>

          <h3>Expenses by Category</h3>

          {categoryData.length === 0 ? (
            <div className='chart-empty'>
              No expense data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  dataKey="value"
                />
              </PieChart>
            </ResponsiveContainer>
          )}

        </div>
      </div>

    </div>
  )
}

export default Dashboard