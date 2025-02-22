## TaskMaster : Task Management App's Frontend

TaskMaster is a web-based task management application that allows users to add, update, and organize tasks using drag-and-drop functionality.

## 🚀 Live Demo
- [Netlify Deployment](https://taskmaster-task.netlify.app/)
- [Surge Deployment](https://task-master.surge.sh/)

## 📌 Features
- User Authentication (Firebase)
- Drag-and-Drop Task Management
- Categories: To-Do, In Progress, Done
- Responsive Design
- Real-time Data Sync with Backend

## 🛠️ Technologies Used
- React.js (Vite)
- Tailwind CSS
- Firebase Authentication
- Axios (API requests)
- React DnD Kit (Drag-and-Drop)
- React Router
- MongoDB (Backend)

## 🏰 Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/taskmaster-frontend.git
   cd taskmaster-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_BACKEND_URL=https://taskmaster-backend-mocha.vercel.app
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## 🔗 API Endpoints (Backend)
- **GET** `/tasks/:email` → Get user tasks
- **POST** `/tasks` → Add new task
- **PUT** `/tasks/update` → Update task category
- **DELETE** `/tasks/:email/:taskId` → Delete task

## 🤝 Contributing
Pull requests are welcome! Feel free to fork and enhance the project.
