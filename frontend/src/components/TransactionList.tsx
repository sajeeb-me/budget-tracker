/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import useSWR from 'swr';
import AddTransactionForm from './AddTransactionForm'; // Make sure path is correct
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

const fetcher = (url: string) => fetch(`${API_BASE}${url}`).then((res) => res.json());

export default function TransactionList() {
    const { data, error, mutate } = useSWR('/api/transactions', fetcher);

    const deleteTx = async (id: string) => {
        await fetch(`${API_BASE}/api/transactions/${id}`, { method: 'DELETE' });
        mutate();
    };

    if (error) {
        console.error('Error fetching transactions:', error);
    }
    if (error) return <p className="text-red-600">Failed to load</p>;
    if (!data) return <p className="text-gray-600">Loading...</p>;

    return (
        <>
            <AddTransactionForm mutate={mutate} />

            <ul className="bg-white shadow rounded divide-y divide-gray-200">
                {data.map((tx: any) => (
                    <li key={tx._id} className="p-4 flex justify-between items-center">
                        <div>
                            <p className="font-medium text-gray-800">{tx.description}</p>
                            <p className="text-sm text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className={`font-semibold ${tx.amount < 0 ? 'text-red-500' : 'text-green-600'}`}>
                                ${tx.amount}
                            </span>
                            <button
                                onClick={() => deleteTx(tx._id)}
                                className="text-sm text-red-600 hover:text-red-800"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}
