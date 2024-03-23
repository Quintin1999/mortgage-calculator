'use client'

import React, { useState} from 'react';

export default function Home() {

  const [principalAmount, setPrincipalAmount] = useState ('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCalculate = () => {

    if (
      principalAmount.trim() === '' ||
      interestRate.trim() === '' ||
      loanTerm.trim() === '' ||
      parseFloat(principalAmount) <= 0 || 
      parseFloat(interestRate) <= 0 ||
       parseFloat(loanTerm) <= 0) {
      setErrorMessage('Please enter positive integer values for all inputs.');
      return;
    }

    const principal = parseFloat(principalAmount);
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12;
    const totalPayments = parseFloat(loanTerm) * 12;
  
    const monthlyPayment =
      (principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));
  

    setMonthlyPayment(monthlyPayment.toFixed(2));
    return '';
  };

  const handleSubmit = () => {
    handleCalculate();
    if (!errorMessage) {
      setMonthlyPayment; 
    } else {
      setErrorMessage('');
    }
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-stone-800">
      <div>
        <input
          type="number"
          value={principalAmount}
          onChange={(e) => setPrincipalAmount(e.target.value)}
          placeholder="Principal Amount ($)"
          className="text-black rounded-md border border-black p-2"
        />
      </div>
      <div>
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          placeholder="Interest Rate (%)"
          className="text-black rounded-md border border-black p-2"
        />
      </div>
      <div>
        <input
          type="number"
          value={loanTerm}
          onChange={(e) => setLoanTerm(e.target.value)}
          placeholder="Loan Term (in years)"
          className="text-black rounded-md border border-black p-2"
        />
      </div>
      <div className="border border-slate-100 p-4 bg-amber-500 text-black rounded-md border border-black p-2">
        <button onClick={handleSubmit}>Calculate Mortgage</button>
      </div>
      {errorMessage && (
        <div className="border border-slate-100 p-4 text-red-500">
          <p>{errorMessage}</p>
        </div>
      )}
      {monthlyPayment && !errorMessage && (
        <div className="border border-slate-100 p-4">
          <p>Monthly Payment: ${monthlyPayment}</p>
        </div>
      )}
    </main>
  );
}