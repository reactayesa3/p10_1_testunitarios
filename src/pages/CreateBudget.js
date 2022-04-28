import React, { useEffect, useState } from 'react'
import useDateInput from '../hooks/useDateInput';
import useNumberInput from '../hooks/useNumberInput';
import useSelectInput from '../hooks/useSelectInput';
import useTextInput from '../hooks/useTextInput'
import formatCurrency from '../utils/formatCurrency';

export default function CreateBudget() {

    const inputsData = {
        customer: {
            label: 'Cliente',
            value: '',
            maxLength: 100,
            errorMessages: ['*','El cliente debe tener al menos 4 caracteres'],
            valid: false,
            pattern: /^.{4,}$/
        },
        cif: {
            label: 'CIF',
            value: '',
            maxLength: 9,
            errorMessages: ['*','El CIF debe comenzar por letra válida y tener 9 caracteres'],
            valid: false,
            pattern: /([ABCDEFGHPQS])([0-9]{8})/i
        },
        contact: {
            label: 'Persona de contacto',
            value: '',
            maxLength: 100,
            errorMessages: ['',''],
            valid: true,
            pattern: /.*/i
        },
        budgetDate: {
            label: 'Fecha presupuesto',
            value: new Date().toISOString().substring(0,10)
        },
        amount: {
            label: 'Importe presupuesto',
            value: 0
        },
        tax: {
            label: '% de IVA',
            value: 0.21,
            options: [
                {value: 0, text: '0 %'},
                {value: 0.04, text: '4 %'},
                {value: 0.1, text: '10 %'},
                {value: 0.21, text: '21 %'},
            ]
        }
    }

    const [customerInput, customerValue, isCustomerValid] = useTextInput(inputsData.customer);
    const [cifInput, cifValue, isCifValid] = useTextInput(inputsData.cif);
    const [contactInput, contactValue] = useTextInput(inputsData.contact);
    const [budgetDateInput, budgetDateValue] = useDateInput(inputsData.budgetDate);
    const [amountInput, amountValue] = useNumberInput(inputsData.amount);
    const [taxInput, taxValue] = useSelectInput(inputsData.tax);

    const [calcFields, setCalcFields] = useState({
        taxAmount: 0,
        totalBudget: 0
    })

    const [isValidForm, setIsValidForm] = useState(false);

    useEffect(() => {
        const taxAmount = amountValue * taxValue;
        const totalBudget = amountValue + taxAmount;
        setCalcFields({taxAmount, totalBudget});
    }, [amountValue, taxValue])


    useEffect(() => {
        setIsValidForm(isCustomerValid && isCifValid);
    }, [isCustomerValid,isCifValid])

    const handleOnSubmit = e => {
        e.preventDefault();
        console.log({
            customer: customerValue,
            cif: cifValue,
            contact: contactValue,
            budgetDate: new Date(budgetDateValue),
            amount: amountValue,
            tax: Number(taxValue)
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-100">
                    <form onSubmit={handleOnSubmit}>
                        <div className="row">
                            <div className="col-100">
                                {customerInput}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-100">
                                {cifInput}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-100">
                                {contactInput}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50">
                                {budgetDateInput}
                            </div>
                            <div className="col-50">
                                {amountInput}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50"></div>
                            <div className="col-50">
                                {taxInput}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50"></div>
                            <div className="col-50">
                                <label>Importe de IVA</label>
                                <input type="text"
                                       readOnly
                                       value={formatCurrency(calcFields.taxAmount, 'EUR')} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-50"></div>
                            <div className="col-50">
                                <label>Total presupuesto</label>
                                <input type="text"
                                       readOnly
                                       value={formatCurrency(calcFields.totalBudget, 'EUR')} />
                            </div>
                        </div>
                        <div className="row end">
                            <button type="submit" disabled={!isValidForm}>Añadir</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
