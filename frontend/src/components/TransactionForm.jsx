import { useState } from "react";


function TransactionForm(){
    return(
        <div className="transaction-form">
            <h2>Add Transaction</h2> 

            <form action="">
                <div className="form-group">
                    <label>Type</label>
                    <div className="type-toggle">
                        <button type="button">Income</button>
                        <button type="button">Expense</button>
                    </div>
                </div>

                <div className="form-group">
                    <label>Amount</label>
                    <input type="number" />
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <select name="category" id=""></select>
                </div>
            </form>
        </div>
    )
}
