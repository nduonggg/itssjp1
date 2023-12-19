import React from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { dateFormat } from "../../utils/dateFormat";
import { format, parseISO } from 'date-fns';
ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
function ChartYear({ startDate, endDate }) {
   const { incomes, expenses } = useGlobalContext();
  const incomeByDate = {};
  const expenseByDate = {};
  if (startDate != "" && endDate != "") {
    incomes.forEach((income) => {
      const { date, amount } = income;
      const formattedDate = format(parseISO(date), "yyyy");
      const formattedStartDate = format(parseISO(startDate), "yyyy");
      const formattedEndDate = format(parseISO(endDate), "yyyy");
      if (
        formattedDate >= formattedStartDate &&
        formattedDate <= formattedEndDate
      ) {
        if (incomeByDate[formattedDate]) {
          incomeByDate[formattedDate] += amount;
        } else {
          incomeByDate[formattedDate] = amount;
        }
      }
    });
    expenses.forEach((expense) => {
      const { date, amount } = expense;
      const formattedDate = format(parseISO(date), "yyyy");
      const formattedStartDate = format(parseISO(startDate), "yyyy");
      const formattedEndDate = format(parseISO(endDate), "yyyy");
      if (
        formattedDate >= formattedStartDate &&
        formattedDate <= formattedEndDate
      ) {
        if (expenseByDate[formattedDate]) {
          expenseByDate[formattedDate] += amount;
        } else {
          expenseByDate[formattedDate] = amount;
        }
      }
    });
  } else if (startDate == "" || endDate == "") {
    incomes.forEach((income) => {
      const { date, amount } = income;
      const formattedDate = format(parseISO(date), "yyyy");
      if (incomeByDate[formattedDate]) {
        incomeByDate[formattedDate] += amount;
      } else {
        incomeByDate[formattedDate] = amount;
      }
    });
    expenses.forEach((expense) => {
      const { date, amount } = expense;
      const formattedDate = format(parseISO(date), "yyyy");
      if (expenseByDate[formattedDate]) {
        expenseByDate[formattedDate] += amount;
      } else {
        expenseByDate[formattedDate] = amount;
      }
    });
  }

  const uniqueDates = [
    ...new Set([...Object.keys(incomeByDate), ...Object.keys(expenseByDate)]),
  ];

  uniqueDates.sort((a, b) => {
    const dateA = new Date(a.split('-').reverse().join('-'));
    const dateB = new Date(b.split('-').reverse().join('-'));
    return dateB - dateA;
});
//   const data = {
//     labels: incomes.map((inc) =>{
//         const {date} = inc
//         return dateFormat(date)
//     }),
//     datasets: [
//         {
//             label: 'Income',
//             data: [
//                 ...incomes.map((income) => {
//                     const {amount} = income
//                     return amount
//                 })
//             ],
//             backgroundColor: 'green',
//             tension: .2
//         },
//         {
//             label: 'Expenses',
//             data: [
//                 ...expenses.map((expense) => {
//                     const {amount} = expense
//                     return amount
//                 })
//             ],
//             backgroundColor: 'red',
//             tension: .2
//         }
//     ]
//   };
  const data = {
    labels: uniqueDates.map((date) => date || 0),
    datasets: [
      {
        label: "Income",
        data: uniqueDates.map((date) => incomeByDate[date] || 0),
        backgroundColor: "green",
        tension: 0.2,
      },
      {
        label: "Expenses",
        data: uniqueDates.map((date) => expenseByDate[date] || 0),
        backgroundColor: "red",
        tension: 0.2,
      },
    ],
  };
  return (
<ChartStyled>
<Line data={data} />
</ChartStyled>
  );
}
const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
`;
export default ChartYear;