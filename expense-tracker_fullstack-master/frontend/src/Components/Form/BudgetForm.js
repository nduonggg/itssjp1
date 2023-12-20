import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';


function BudgetForm() {
    const {addBudget, budgets, getBudgets, deteleBudget, totalBudget} = useGlobalContext()

    const [inputState, setInputState] = useState({
        incomebudget: '',
        expensebudget: ''
    })

    const { incomebudget, expensebudget } = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        addBudget(setInputState(incomebudget, expensebudget))
        setInputState({
            incomebudget: '',
        expensebudget: ''
        })
        console.log(incomebudget, expensebudget);
    }

    return (
        <FormStyled onSubmit={handleSubmit}>
            <div className="input-control">
                <input value={incomebudget}  
                    type="text" 
                    name={'incomebudget'} 
                    placeholder={'Income Budget'}
                    onChange={handleInput('incomebudget')} 
                />
            </div>
           <div className="input-control">
                <input value={expensebudget}  
                    type="text" 
                    name={'expensebudget'} 
                    placeholder={'Expense Budget'}
                    onChange={handleInput('expensebudget')} 
                />
            </div>
            
            <div className="submit-btn">
                <Button 
                    name={'Add Budget'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
        </FormStyled>
    )
}


const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }

    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }
`;
export default BudgetForm