# 💸 Finance Tracker - MERN Stack  

![MERN](https://img.shields.io/badge/Stack-MERN-brightgreen)  

A full-stack personal finance management app with **transaction tracking, analytics, and history**. Built with MongoDB, Express, React, and Node.js.  

<img width="1127" height="860" alt="image" src="https://github.com/user-attachments/assets/97f73eab-4a97-478d-8fc7-7d93825192e7" />

<img width="1913" height="965" alt="image" src="https://github.com/user-attachments/assets/33e460fb-c8bb-4e3b-b3d0-0c0d0300c9de" />


---

## ✨ Features  
- **📥 Add Transactions** (Income/Expenses with categories)  
- **✏️ Edit & Delete Transactions**  
- **📊 Interactive Charts** (Monthly trends, category-wise spending)  
- **📈 Statistics Dashboard** (Net balance, income vs expenses)  
- **🔐 User Authentication** (JWT-based login/signup) *(Optional)*  

---

## 🛠️ Tech Stack  
### **Frontend**  
| Technology       | Use Case                |  
|------------------|-------------------------|  
| React.js         | UI Components           |  
| Redux/Toolkit    | State Management        |  
| Chart.js         | Data Visualization      |  
| Tailwind CSS     | Styled Components       |  
| Axios            | API Calls               |  

### **Backend**  
| Technology       | Use Case                |  
|------------------|-------------------------|  
| Node.js          | Runtime Environment     |  
| Express.js       | REST API Framework      |  
| MongoDB          | Database                |  
| Mongoose         | ODM for MongoDB         |  
| JWT              | Authentication          |  

---

## 🚀 Installation  

### Create a .env file in Backend Folder
```bash
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```
## To run locally go to frontend src/services/api.js change the baseURL to http://localhost:5000/api 

### 1. Clone the Repository  
```bash
git clone https://github.com/yourusername/finance-tracker.git
cd finance-tracker
cd backend
npm install
cd ../frontend
npm install
npm run dev
