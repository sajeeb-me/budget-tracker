import TransactionList from "../components/TransactionList";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">PennyPincher</h1>
        <p className="text-lg text-gray-600">
          Where Every Penny Counts
        </p>
      </div>
      <TransactionList />
    </main>
  );
}
