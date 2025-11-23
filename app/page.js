// Updated GoalPlanner with Lucide Icons + Tailwind Styling
'use client';

import { useState, useEffect } from 'react';
import {
  Target,
  PlusCircle,
  Wallet,
  Coins,
  CalendarDays,
  Tag,
  Pencil,
  Trash2,
  Flag
} from "lucide-react";
import './globals.css';

const API_URL = 'https://goal-planner-backend.onrender.com/goals';

function GoalPlanner() {
  const [goals, setGoals] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: ''
  });
  const [deposit, setDeposit] = useState({ goalId: '', amount: '' });

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(setGoals)
      .catch(console.error);
  }, []);

  const handleAddGoal = () => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        savedAmount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      })
    })
      .then(() => {
        fetch(API_URL).then(res => res.json()).then(setGoals);
        setFormData({ name: '', targetAmount: '', category: '', deadline: '' });
      })
      .catch(console.error);
  };

  const handleDeposit = () => {
    fetch(`${API_URL}/${deposit.goalId}`)
      .then(res => res.json())
      .then(goal => {
        return fetch(`${API_URL}/${deposit.goalId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...goal, savedAmount: goal.savedAmount + Number(deposit.amount) })
        });
      })
      .then(() => {
        fetch(API_URL).then(res => res.json()).then(setGoals);
        setDeposit({ goalId: '', amount: '' });
      })
      .catch(console.error);
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => {
        fetch(API_URL).then(res => res.json()).then(setGoals);
      })
      .catch(console.error);
  };

  const calculateProgress = (saved, target) => Math.min(100, (saved / target) * 100);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10 font-sans">

      {/* Header */}
      <h1 className="flex items-center gap-2 text-3xl font-bold text-center justify-center">
        <Target size={32} className="text-green-600" />
        Smart Goal Planner
      </h1>


      {/* Add Goal Form */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleAddGoal(); }}
        className="bg-white shadow p-5 rounded-xl space-y-3 border"
      >
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
          <PlusCircle className="text-green-600" /> Add New Goal
        </h2>

        <div className="flex items-center gap-2 border p-2 rounded">
          <Pencil size={18} className="text-gray-500" />
          <input className="w-full outline-none" placeholder="Goal name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        </div>

        <div className="flex items-center gap-2 border p-2 rounded">
          <Wallet size={18} className="text-gray-500" />
          <input className="w-full outline-none" type="number" placeholder="Target amount" value={formData.targetAmount} onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })} required />
        </div>

        <div className="flex items-center gap-2 border p-2 rounded">
          <Tag size={18} className="text-gray-500" />
          <input className="w-full outline-none" placeholder="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required />
        </div>

        <div className="flex items-center gap-2 border p-2 rounded">
          <CalendarDays size={18} className="text-gray-500" />
          <input className="w-full outline-none" type="date" value={formData.deadline} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} required />
        </div>

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
          Add Goal
        </button>
      </form>


      {/* Deposit Form */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleDeposit(); }}
        className="bg-white shadow p-5 rounded-xl space-y-3 border"
      >
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
          <Wallet className="text-green-600" /> Make Deposit
        </h2>

        <select value={deposit.goalId} onChange={(e) => setDeposit({ ...deposit, goalId: e.target.value })} required className="w-full border p-2 rounded">
          <option value="">Select goal</option>
          {goals.map(goal => (
            <option key={goal.id} value={goal.id}>
              {goal.name} (${goal.targetAmount})
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2 border p-2 rounded">
          <Coins size={18} className="text-gray-500" />
          <input className="w-full outline-none" type="number" placeholder="Amount" value={deposit.amount} onChange={(e) => setDeposit({ ...deposit, amount: e.target.value })} required />
        </div>

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
          Deposit
        </button>
      </form>


      {/* Goals List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Flag className="text-green-600" /> Your Goals
        </h2>

        {goals.map(goal => (
          <div key={goal.id} className="bg-white shadow p-4 border rounded-xl space-y-2">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Target size={18} className="text-green-600" /> {goal.name} ({goal.category})
            </h3>

            <p className="flex items-center gap-2 text-gray-600">
              <Wallet size={16} /> ${goal.savedAmount} / ${goal.targetAmount}
            </p>

            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
              <div className="bg-green-600 h-full" style={{ width: `${calculateProgress(goal.savedAmount, goal.targetAmount)}%` }} />
            </div>

            <p className="flex items-center gap-2 text-gray-500 text-sm">
              <CalendarDays size={16} /> Target Date: {goal.deadline}
            </p>

            <button onClick={() => handleDelete(goal.id)} className="flex items-center gap-2 text-red-600 hover:text-red-800">
              <Trash2 size={18} /> Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GoalPlanner;
