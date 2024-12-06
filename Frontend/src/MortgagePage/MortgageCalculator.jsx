import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { handleError } from '../utils';

const MortgageCalculator = () => {
    const [searchParams] = useSearchParams();
    const propertyPrice = searchParams.get('price');
    const [principal, setPrincipal] = useState(propertyPrice || '');
    const [interestRate, setInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(null);

    const calculatePayment = () => {
        const P = parseFloat(principal);
        const r = parseFloat(interestRate) / 100 / 12;
        const n = parseInt(loanTerm) * 12;

        if (P && r && n) {
            const M = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            setMonthlyPayment(M.toFixed(2));
        } else {
            handleError('Please enter valid inputs');
        }
    };

    const clearInputs = () => {
        setInterestRate('');
        setLoanTerm('');
        setMonthlyPayment(null);
    };

    return (
        <div className="p-4 bg-gray-100 rounded shadow-md max-w-md mx-auto mt-[5rem]">
            <h2 className="text-xl font-bold mb-4">Mortgage Calculator</h2>
            <div className="mb-4">
                <label className="block mb-1">Loan Amount (Principal)</label>
                <input
                    type="number"
                    className="w-full px-3 py-2 border rounded"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Annual Interest Rate (%)</label>
                <input
                    type="number"
                    className="w-full px-3 py-2 border rounded"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Loan Term (Years)</label>
                <input
                    type="number"
                    className="w-full px-3 py-2 border rounded"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                />
            </div>
            <div className="flex gap-4">
                <button
                    onClick={calculatePayment}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Calculate
                </button>
                <button
                    onClick={clearInputs}
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                    Clear
                </button>
            </div>
            {monthlyPayment && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Monthly Payment</h3>
                    <p className="text-xl font-bold">${monthlyPayment}</p>
                </div>
            )}
        </div>
    );
};

export default MortgageCalculator;
