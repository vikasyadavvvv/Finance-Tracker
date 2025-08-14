import React, { useEffect, useState } from "react";
import { getTransactions, deleteTransaction, updateTransaction } from "../services/api";
import Navbar from "../components/Navbar";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";
import StatsChart from "../components/StatsChart";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [userEmail, setUserEmail] = useState("");

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
    // Get user email from localStorage
    const email = localStorage.getItem("userEmail") || "";
    setUserEmail(email);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50">
      <Navbar />
      <div className="p-4 container mx-auto">
        {/* Welcome Banner with email */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-emerald-100">
          <h1 className="text-2xl font-bold text-emerald-800">
            Welcome back, <span className="text-amber-600">{userEmail}</span>!
          </h1>
          <p className="text-gray-600">Manage your finances efficiently</p>
        </div>

        {/* Mobile: Stacked layout */}
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