# 💡 Smart Goal Planner

This is a single-page interactive React component (`GoalPlanner`) that allows users to manage personal financial goals. Users can add savings goals, make deposits toward them, view progress visually, and delete goals no longer needed. The app connects to a simple backend (`json-server` or Express) for full CRUD functionality.

---

## ✨ Features

- Add new financial goals (name, target amount, category, deadline)
- Make deposits toward specific goals
- View progress with animated progress bars
- Delete goals from the list
- Automatically reloads goals on each operation
- Clean and minimal form-based UI
- Fetches data from a RESTful API (`localhost:3001/goals`)

---

## 🧱 Technologies Used

- **React** – Functional components + Hooks
- **Fetch API** – For data fetching
- **CSS** – Basic styles in `globals.css`
- **json-server or Express** – For a local REST API

---

## 🚀 Getting Started

### 1. Clone the project

`
git clone https://github.com/yourusername/smart-goal-planner.git
cd smart-goal-planner
`

### 2.Install dependencies
`
npm install
`

### 3.Start the frontend
`
npm run dev
`

### 4. Start the backend (json-server)

#### Install and start json-server if not using Express:
`
npm install -g json-server
`

#### Create a file db.json:
`
{
  "goals": []
}
`

- Start the server:
`
json-server --watch db.json --port 3001
`

    The API will now be available at http://localhost:3001/goals

## 🧾 API Structure

- Each goal object should have this structure:
`
{
  "id": 1,
  "name": "Vacation",
  "targetAmount": 2000,
  "savedAmount": 500,
  "category": "Travel",
  "deadline": "2025-12-31",
  "createdAt": "2025-07-20"
}
`

## Endpoints Used


GET	/goals	Fetch all goals
POST	/goals	Create a new goal
PUT	/goals/:id	Update a goal (e.g., deposit)
DELETE	/goals/:id	Delete a goal

## 🧠 Component Overview
🧩 GoalPlanner Logic

    useEffect loads goals on initial mount.

    handleAddGoal() posts a new goal and refreshes the list.

    handleDeposit() fetches the goal, adds to savedAmount, and updates it via PUT.

    handleDelete(id) deletes a goal and refreshes.

    calculateProgress(saved, target) calculates progress percentage for the progress bar.

🖼 UI Layout

    Add New Goal – Text/number/date inputs + submit button

    Make Deposit – Select dropdown and input

    Goals Display – Title, saved/target amount, animated progress bar, deadline, and delete button

🧪 Testing

No test setup is provided by default. You may integrate:

    Jest – for unit testing logic

    React Testing Library – for UI interaction tests

🛠 Future Enhancements

    Add user authentication (e.g. Firebase)

    Support goal editing

    Add filtering by category or deadline

    Notifications/reminders for upcoming deadlines

    Persist data to real database (e.g., MongoDB)

📄 License

This component is open-source under the MIT License.
📬 Contact

Have questions or suggestions?

    Email: [griffinsshem254@gmail.com]

    GitHub: https://github.com/griffinsshem


