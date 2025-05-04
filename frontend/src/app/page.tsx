import TransactionList from "../../components/TransactionList";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Budget Tracker</h1>
      <TransactionList />
    </main>
  );
}
