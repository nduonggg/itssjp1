import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import History from "../../History/History";
import { InnerLayout } from "../../styles/Layouts";
import { dollar } from "../../utils/Icons";
import Chart from "../Chart/Chart";
import ChartMonth from "../Chart/ChartMonth";
import ChartYear from "../Chart/ChartYear";

function Dashboard() {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const calculateExpenseByDate = () => {
    console.log(`Ngày bắt đầu: ${startDate}`);
    console.log(`Ngày kết thúc: ${endDate}`);
  
  };
  return (
    <DashboardStyled>
      <InnerLayout>
        {/* <h1>Statistics</h1> */}
        <div className="stats-con">
          <div className="chart-con">
            <h1>Statistics</h1>
            <div>
              <label htmlFor="startDate">From:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={handleStartDateChange}
              />

              <label htmlFor="endDate">To:</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
            <Chart startDate={startDate} endDate={endDate} />

            <h1>Monthly</h1>
            <div>
              <label htmlFor="startDate">From:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={handleStartDateChange}
              />

              <label htmlFor="endDate">To:</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
            <ChartMonth startDate={startDate} endDate={endDate} />
            <h1>Yearly</h1>
            <div>
              <label htmlFor="startDate">From:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={handleStartDateChange}
              />

              <label htmlFor="endDate">To:</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={handleEndDateChange}
              />

            </div>
            <ChartYear startDate={startDate} endDate={endDate} />

            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>
                  {dollar} {totalIncome()}
                </p>
              </div>
              <div className="expense">
                <h2>Total Expense</h2>
                <p>
                  {dollar} {totalExpenses()}
                </p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p>
                  {dollar} {totalBalance()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  .stats-con {
    display: grid;

    gap: 2rem;
    .chart-con {
      grid-column: 1 / 4;
      height: 500px;
      .amount-con {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 2rem;
        .income,
        .expense {
          grid-column: span 2;
        }
        .income,
        .expense,
        .balance {
          text-align: center;
          background: #fcf6f9;
          border: 2px solid #ffffff;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 1rem;
          p {
            font-size: 2.5rem;
            font-weight: 700;
          }
        }

        .balance {
          grid-column: 2 / 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p {
            color: var(--color-green);
            opacity: 0.6;
            font-size: 3rem;
          }
        }
      }
    }

    .history-con {
      grid-column: 4 / -1;
      h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .salary-title {
        font-size: 1.2rem;
        span {
          font-size: 1.8rem;
        }
      }
      .salary-item {
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-weight: 600;
          font-size: 1.6rem;
        }
      }
    }
  }
`;

export default Dashboard;
