# URL Shortener (MERN Stack)

A full‑stack **MERN URL Shortener** that allows users to generate short URLs and share them easily. Non‑logged‑in users can generate and copy short URLs instantly, while authenticated users can save and manage their custom short URLs. JWT authentication is used for secure access.

---

## 🚀 Features

### 🔹 **Public (Non‑Logged‑In) Users**

* Generate short URLs instantly.
* Copy generated URLs from the UI.
* Share short URLs directly on WhatsApp.

### 🔹 **Authenticated Users**

* Login/Register using JWT authentication.
* Save generated short URLs to their account.
* Only authenticated users can persist URLs.
* View all saved URLs.
* Delete or update saved URLs.

---

## 🛠 Tech Stack (MERN)

* **MongoDB** – Database
* **Express.js** – Backend Framework
* **React.js** – Frontend
* **Node.js** – Server Runtime
* **JWT** – Authentication

---

## 📂 Folder Structure

```
backend/
│
├── controller/
├── dao/
├── middleware/
├── model/
├── routes/
├── services/
└── utils/

frontend/
│
├── api/
├── components/
├── pages/
├── store/
└── utils/
```

---

## 🔐 Authentication API Routes

| Method | Route       | Description                            |
| ------ | ----------- | -------------------------------------- |
| POST   | `/register` | Register a new user                    |
| POST   | `/login`    | Login user + issue JWT                 |
| GET    | `/logout`   | Logout user                            |
| GET    | `/me`       | Get current logged‑in user (Protected) |

Example:

```
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/me', authMiddleware, getUser)
```

---

## 🔗 URL Shortening API Routes

### **Public URL Routes**

| Method | Route     | Description              |
| ------ | --------- | ------------------------ |
| POST   | `/create` | Create a short URL       |
| GET    | `/:id`    | Redirect to original URL |

Example:

```
router.post('/create', createShortUrl)
router.get('/:id', redirectFromUrl)
```

### **User URL Routes (Authenticated)**

| Method | Route           | Description                         |
| ------ | --------------- | ----------------------------------- |
| PATCH  | `/url/:id`      | Save/persist URL for logged‑in user |
| DELETE | `/url/:id`      | Delete saved URL                    |
| GET    | `/urls/:userId` | Get all URLs saved by a user        |

Example:

```
router.patch('/url/:id', persistUrl)
router.delete('/url/:id', deleteUrl)
router.get('/urls/:userId', getUserUrls)
```

---

## 🧪 How It Works

* User enters a long URL.
* Backend generates a unique short ID using utilities.
* Short URL can be shared or copied instantly.
* If logged in, the URL can be saved using the persist route.
* On accessing `/shortId`, user is redirected to the original URL.

---

## 📦 Installation & Setup

### Clone the repository:

```
git clone <repo-url>
cd url-shortener
```

### Install dependencies:

#### Backend:

```
cd backend
npm install
```

#### Frontend:

```
cd frontend
npm install
```

---

## ▶️ Running the Project

### Start Backend:

```
cd backend
npm run dev
```

### Start Frontend:

```
cd frontend
npm start
```

---

## 📌 Environment Variables

Create `.env` files in backend & frontend.

### Backend `.env`

```
MONGO_URI=
JWT_SECRET=
BASE_URL=
PORT=5000
```

---

## 📝 License

MIT License.

---

If you want, I can also create a **project architecture diagram**, **API documentation table**, or **frontend screenshots section**.
