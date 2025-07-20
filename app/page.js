'use client';
import { useState, useEffect } from 'react';
import './globals.css';

const API_URL = 'http://localhost:3001/goals';

function GoalPlanner() {
  const [goals, setGoals] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: ''
  });
  const [deposit, setDeposit] = useState({
    goalId: '',
    amount: ''
  });

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
        fetch(API_URL)
          .then(res => res.json())
          .then(setGoals);
        setFormData({
          name: '',
          targetAmount: '',
          category: '',
          deadline: ''
        });
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
          body: JSON.stringify({
            ...goal,
            savedAmount: goal.savedAmount + Number(deposit.amount)
          })
        });
      })
      .then(() => {
        fetch(API_URL)
          .then(res => res.json())
          .then(setGoals);
        setDeposit({ goalId: '', amount: '' });
      })
      .catch(console.error);
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => {
        fetch(API_URL)
          .then(res => res.json())
          .then(setGoals);
      })
      .catch(console.error);
  };

  const calculateProgress = (saved, target) => {
    return Math.min(100, (saved / target) * 100);
  };

  return (
    <div>
      <h1>Smart Goal Planner</h1>

      <form onSubmit={(e) => { e.preventDefault(); handleAddGoal(); }}>
        <h2>Add New Goal</h2>
        <input
          placeholder="Goal name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Target amount"
          value={formData.targetAmount}
          onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
          required
        />
        <input
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        />
        <input
          type="date"
          value={formData.deadline}
          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
          required
        />
        <button type="submit">Add Goal</button>
      </form>

      <form onSubmit={(e) => { e.preventDefault(); handleDeposit(); }}>
        <h2>Make Deposit</h2>
        <select
          value={deposit.goalId}
          onChange={(e) => setDeposit({ ...deposit, goalId: e.target.value })}
          required
        >
          <option value="">Select goal</option>
          {goals.map(goal => (
            <option key={goal.id} value={goal.id}>
              {goal.name} (${goal.targetAmount})
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={deposit.amount}
          onChange={(e) => setDeposit({ ...deposit, amount: e.target.value })}
          required
        />
        <button type="submit">Deposit</button>
      </form>

      <div>
        <h2>Your Goals</h2>
        {goals.map(goal => (
          <div key={goal.id} className="goal-card">
            <h3>{goal.name} ({goal.category})</h3>
            <p>${goal.savedAmount} / ${goal.targetAmount}</p>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${calculateProgress(goal.savedAmount, goal.targetAmount)}%` }}
              />
            </div>
            <p>Target Date: {goal.deadline}</p>
            <button onClick={() => handleDelete(goal.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GoalPlanner;