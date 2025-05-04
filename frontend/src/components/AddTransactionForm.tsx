'use client';

import { useState } from 'react';

type Props = {
    mutate: () => void;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

export default function AddTransactionForm({ mutate }: Props) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!description.trim() || !amount.trim()) {
            setError('Please fill in both fields.');
            return;
        }

        const amountValue = parseFloat(amount);
        if (isNaN(amountValue)) {
            setError('Amount must be a valid number.');
            return;
        }

        try {
            setLoading(true);
            const res = await fetch(`${API_BASE}/api/transactions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description, amount: amountValue }),
            });

            if (!res.ok) {
                throw new Error('Failed to add transaction.');
            }

            setDescription('');
            setAmount('');
            mutate(); // Refresh the transaction list
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow rounded p-4 mb-6 grid gap-4 sm:grid-cols-3"
        >
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-2 p-2 border border-gray-300 rounded"
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-2 border border-gray-300 rounded"
            />
            <button
                type="submit"
                disabled={loading}
                className="col-span-3 sm:col-span-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Adding...' : 'Add'}
            </button>

            {error && (
                <p className="col-span-3 text-red-600 text-sm">{error}</p>
            )}
        </form>
    );
}
