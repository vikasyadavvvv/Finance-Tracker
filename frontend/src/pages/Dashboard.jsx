import React, { useEffect, useState } from "react";
import { getTransactions, deleteTransaction, updateTransaction } from "../services/api";
import Navbar from "../components/Navbar";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";
import StatsChart from "../components/StatsChart";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  const fetchData = async () => {
    const { data } = await getTransactions();
    setTransactions(data);
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    fetchData();
  };

  const handleUpdate = async (id, updatedData) => {
    await updateTransaction(id, updatedData);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50">
      <Navbar />
      <div className="p-4 container mx-auto">
        {/* Mobile: Stacked layout - simplified without bottom nav */}
        <div className="block md:hidden space-y-6 pb-6">
          <StatsChart transactions={transactions} />
          <TransactionForm onAdd={fetchData} />
          <TransactionTable
            transactions={transactions}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TransactionForm onAdd={fetchData} />
            <TransactionTable
            className="pb-5"
              transactions={transactions}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          </div>
          <div className="lg:col-span-1">
            <StatsChart transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
