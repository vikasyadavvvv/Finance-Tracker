import React from "react";
import { useState } from "react";
import { addTransaction } from "../services/api";
import { FaMoneyBillWave, FaCalendarAlt, FaTags, FaStickyNote, FaPlus } from "react-icons/fa";

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    type: "income",
    amount: "",
    category: "",
    note: "",
    date: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTransaction(form);
    onAdd();
    setForm({ type: "income", amount: "", category: "", note: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md border border-emerald-100 mb-6">
      <h2 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center">
        <FaMoneyBillWave className="mr-2 text-amber-500" />
        Add New Transaction
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
        {/* Transaction Type */}
        <div className="relative">
          <select 
            name="type" 
            value={form.type} 
            onChange={handleChange} 
            className="w-full pl-3 pr-8 py-2 border border-emerald-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            <option value="saving">Saving</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Amount */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">₹</span>
          </div>
          <input 
            type="number" 
            name="amount" 
            value={form.amount} 
            onChange={handleChange} 
            placeholder="Amount" 
            className="w-full pl-8 pr-3 py-2 border border-emerald-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent" 
            required 
          />
        </div>

        {/* Category */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaTags className="text-gray-400" />
          </div>
          <input 
            type="text" 
            name="category" 
            value={form.category} 
            onChange={handleChange} 
            placeholder="Category" 
            className="w-full pl-10 pr-3 py-2 border border-emerald-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent" 
          />
        </div>

        {/* Note */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaStickyNote className="text-gray-400" />
          </div>
          <input 
            type="text" 
            name="note" 
            value={form.note} 
            onChange={handleChange} 
            placeholder="Note" 
            className="w-full pl-10 pr-3 py-2 border border-emerald-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent" 
          />
        </div>

        {/* Date */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaCalendarAlt className="text-gray-400" />
          </div>
          <input 
            type="date" 
            name="date" 
            value={form.date} 
            onChange={handleChange} 
            className="w-full pl-10 pr-3 py-2 border border-emerald-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent" 
          />
        </div>

        {/* Submit Button */}
      <button
  type="submit"
  className="w-full bg-gradient-to-r from-emerald-600 to-amber-600 text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center"
  disabled={isAdding} // Disable during loading
>
  {isAdding ? (
    <>
      <svg 
        className="animate-spin h-5 w-5 text-white" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span className="hidden sm:inline ml-2">Adding...</span>
    </>
  ) : (
    <>
      <FaPlus className="mr-2" />
      <span className="hidden sm:inline">Add</span>
    </>
  )}
</button>
</div>
    </form>
  );
}
