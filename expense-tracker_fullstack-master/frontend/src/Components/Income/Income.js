import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';

function Income() {
  const { addIncome, incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();
  const [exceededBudget, setExceededBudget] = useState(false);

  useEffect(() => {
    getIncomes();
  }, []);

  useEffect(() => {
    setExceededBudget(totalIncome() > 10000);
  }, [incomes]);

  return (
    <IncomeStyled>
      <InnerLayout>
        <h1>Incomes</h1>
        <h2 className={`total-income ${exceededBudget ? 'exceeded' : ''}`}>
          Total Income: <span>${totalIncome()}</span> Budget: <span>$10000</span>
        </h2>

        {exceededBudget && <p className="notification">Đã vượt quá ngân sách!</p>}

        <div className="income-content">
          <div className="form-container">
            <Form />
          </div>
          <div className="incomes">
            {incomes.map((income) => {
              const { _id, title, amount, date, category, description, type } = income;
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteIncome}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </IncomeStyled>
  );
}

const IncomeStyled = styled.div`
  // ...styles...
  .total-income {
    // ...existing styles...
    &.exceeded {
      color: red;
    }
  }
  .notification {
    color: red;
    margin: 1rem 0;
  }
`;

export default Income;