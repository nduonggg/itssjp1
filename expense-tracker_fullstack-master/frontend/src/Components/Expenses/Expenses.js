import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';

function Expenses() {
    const {addIncome,expenses, getExpenses, deleteExpense,totalBalance , totalExpenses} = useGlobalContext()
  const [exceededBudget, setExceededBudget] = useState(false);
  const [balanceLimit, setBalenceLimit] = useState(false);
    useEffect(() =>{
        getExpenses()
    }, [])


  useEffect(() => {
      if (totalExpenses() > 10000 ) {
          setExceededBudget(true);
      } else {
          setExceededBudget(false);
      }
      if(totalBalance() < 0){
        setBalenceLimit(true);
      }
      else {
        setBalenceLimit(false);
      }
  }, [totalExpenses(), totalBalance()]);
    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-income">Total Expense: <span>${totalExpenses()}</span>
                Budget: <span>$10000</span></h2>

                {exceededBudget && (
                    <div className="budget-exceeded">
                        <p>The total expense has exceeded the budget!</p>
                    </div>
                )}
                {balanceLimit && (
                    <div className="budget-exceeded">
                        <p>Not enough money</p>
                    </div>
                )}

                <div className="income-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="incomes">
                        {expenses.map((income) => {
                            const {_id, title, amount, date, category, description, type} = income;
                            console.log(income)
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                type={type}
                                category={category} 
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteExpense}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
    .budget-exceeded{
        color: red;
        padding-bottom: 10px;
        font-size: 1.5rem;
      }
`;

export default Expenses