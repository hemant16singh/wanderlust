# wanderlust
# 🌍 Wanderlust

Wanderlust is a full-stack travel web application inspired by Airbnb.  
It allows users to explore, list, and manage travel accommodations with an easy-to-use interface.

---

## 🚀 Features

- 🏠 Browse travel listings
- 🔍 Search places by location
- 👤 User authentication (Signup / Login)
- ➕ Add new property listings
- ✏️ Edit & ❌ delete listings
- 📸 Image upload support
- 📍 Location-based listings
- 📱 Responsive UI

---

## 🛠️ Tech Stack

**Frontend**
- HTML
- CSS
- JavaScript
- EJS

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

**Other Tools**
- Cloudinary (for image upload)
- Map API (for location display)

---

## 📁 Project Structure

wanderlust/
├── app.js
├── package.json
├── public/
│ ├── css/
│ └── js/
├── views/
├── models/
├── routes/
├── utils/
├── schema.js
└── README.md

## ⚙️ Installation & Setup

1️⃣ Clone the repository  

git clone https://github.com/hemant16singh/wanderlust.git
cd wanderlust


2️⃣ Install dependencies

npm install


3️⃣ Create a .env file and add:

PORT=5000
DB_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


4️⃣ Start the server

npm start


5️⃣ Open in browser

http://localhost:5000

🧪 Usage

Visit homepage to explore listings

Login/Register to add your own listings

Update or delete your properties

Browse locations easily
