import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";

export default function TransactionTable({ transactions, onDelete, onUpdate }) {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    type: "",
    amount: "",
    category: "",
    note: "",
    date: "",
  });

  const startEdit = (t) => {
    setEditId(t._id);
    setEditData({
      type: t.type,
      amount: t.amount,
      category: t.category,
      note: t.note,
      date: t.date.split("T")[0], // format for input date
    });
  };

  const handleSave = async () => {
    try {
      await onUpdate(editId, editData);
      setEditId(null);
    } catch (err) {
      console.error("Error updating transaction", err);
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "income":
        return "text-emerald-600 bg-emerald-50";
      case "expense":
        return "text-amber-600 bg-amber-50";
      case "saving":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-emerald-100 shadow-md">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-emerald-700 to-emerald-800 text-white">
          <tr>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-right">Amount</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left hidden md:table-cell">Note</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t._id} className="border-b border-emerald-100 hover:bg-emerald-50">
              {editId === t._id ? (
                <>
                  <td className="p-3">
                    <select
                      value={editData.type}
                      onChange={(e) =>
                        setEditData({ ...editData, type: e.target.value })
                      }
                      className={`w-full p-2 rounded-md border border-emerald-300 focus:ring-2 focus:ring-emerald-500 ${getTypeColor(editData.type)}`}
                    >
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                      <option value="saving">Saving</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <div className="relative">
                      <span className="absolute left-3 top-2">₹</span>
                      <input
                        type="number"
                        value={editData.amount}
                        onChange={(e) =>
                          setEditData({ ...editData, amount: e.target.value })
                        }
                        className="w-full pl-8 p-2 rounded-md border border-emerald-300 focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={editData.category}
                      onChange={(e) =>
                        setEditData({ ...editData, category: e.target.value })
                      }
                      className="w-full p-2 rounded-md border border-emerald-300 focus:ring-2 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <input
                      type="text"
                      value={editData.note}
                      onChange={(e) =>
                        setEditData({ ...editData, note: e.target.value })
                      }
                      className="w-full p-2 rounded-md border border-emerald-300 focus:ring-2 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="date"
                      value={editData.date}
                      onChange={(e) =>
                        setEditData({ ...editData, date: e.target.value })
                      }
                      className="w-full p-2 rounded-md border border-emerald-300 focus:ring-2 focus:ring-emerald-500"
                    />
                  </td>
                  <td className="p-3 flex justify-center space-x-2">
                    <button
                      onClick={handleSave}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-md flex items-center"
                    >
                      <FaSave className="mr-1" />
                      <span className="hidden sm:inline">Save</span>
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="bg-amber-600 hover:bg-amber-700 text-white p-2 rounded-md flex items-center"
                    >
                      <FaTimes className="mr-1" />
                      <span className="hidden sm:inline">Cancel</span>
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className={`p-3 font-medium ${getTypeColor(t.type)}`}>
                    <div className="flex items-center">
                      <GiMoneyStack className="mr-2" />
                      {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                    </div>
                  </td>
                  <td className="p-3 text-right font-mono">
                    ₹{parseFloat(t.amount).toFixed(2)}
                  </td>
                  <td className="p-3">{t.category}</td>
                  <td className="p-3 hidden md:table-cell text-gray-600">
                    {t.note || "-"}
                  </td>
                  <td className="p-3">
                    {new Date(t.date).toLocaleDateString()}
                  </td>
                  <td className="p-3 flex justify-center space-x-2">
                    <button
                      onClick={() => startEdit(t)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-md flex items-center"
                    >
                      <FaEdit className="mr-1" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => onDelete(t._id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md flex items-center"
                    >
                      <FaTrash className="mr-1" />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}