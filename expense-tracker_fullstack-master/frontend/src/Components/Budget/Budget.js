import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import BudgetForm from '../Form/BudgetForm';
import IncomeItem from '../IncomeItem/IncomeItem';

function Budget() {
    const {addBudget, budgets, getBudgets, deteleBudget, totalBudget, expensebudget, incomebudget} = useGlobalContext()

    useEffect(() =>{
        getBudgets()
    }, [])
    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Budgets</h1>
                <div className="income-content">
                    <div className="form-container">
                        <BudgetForm />
                    </div>
                    <div className="incomes">
                        {budgets.map((budget) => {
                            console.log(incomebudget, expensebudget);
                            const {incomebudget, expensebudget} = budget;
                            return <IncomeItem
                                incomebudget={incomebudget} 
                                expensebudget={expensebudget} 
                                deleteItem={deteleBudget}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    )
}

const IncomeStyled = styled.div`
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
`;

export default Budget