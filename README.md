🌍 Wanderlust

Wanderlust is a full-stack travel web application inspired by Airbnb.
It allows users to explore, list, and manage travel accommodations with an easy-to-use and responsive interface.

🚀 Features
🏠 Browse travel listings
🔍 Search places by location
👤 User authentication (Signup / Login)
➕ Add new property listings
✏️ Edit & ❌ Delete listings
📸 Image upload support (Cloudinary)
📍 Location-based listings with map
📱 Responsive UI

🐍 New Python-Powered Features

🌦️ Live Weather Information (Python + API)
Displays real-time weather data for selected travel destinations using a Python script.

🤖 Travel Suggestion Engine (Python Logic)
Suggests destinations based on user preferences (e.g. beach, mountains, budget).

These Python scripts are integrated with the Node.js backend using child processes, showcasing cross-language backend integration.

🛠️ Tech Stack
Frontend
HTML
CSS
JavaScript
EJS
Backend
Node.js
Express.js

Python (for weather, analytics & suggestions)

Database
MongoDB
Mongoose
Other Tools

Cloudinary (Image Upload)

Map API (Location Display)

OpenWeatherMap API

📁 Project Structure
wanderlust/
├── app.js
├── package.json
├── public/
│   ├── css/
│   └── js/
├── views/
├── models/
├── routes/
├── utils/
├── python/
│   ├── weather.py
│   ├── suggest.py
│   └── analytics.py
├── schema.js
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/hemant16singh/wanderlust.git
cd wanderlust

2️⃣ Install Node dependencies
npm install

3️⃣ Install Python dependencies
pip install requests pandas

4️⃣ Create a .env file
PORT=5000
DB_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
OPENWEATHER_API_KEY=your_api_key

5️⃣ Start the server
npm start

6️⃣ Open in browser
http://localhost:5000

🧪 Usage

Visit homepage to explore travel listings
Login/Register to add your own properties
Edit or delete your listings
View live weather info for destinations
Get travel suggestions using Python logic
Analyze popular locations via Python analytics

🎯 Key Learning Outcomes

Full-stack web development using Node.js & MongoDB
Secure user authentication and authorization
Media handling with Cloudinary
Python integration with Node.js backend

API consumption & data analytics using Python

Clean MVC project structure
