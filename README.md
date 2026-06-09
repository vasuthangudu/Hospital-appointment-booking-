# 🏥 Hospital Appointment Booking System

A modern and responsive Hospital Appointment Booking System built using React.js, Bootstrap, HTML5, CSS3, and JavaScript. The application enables patients to book appointments with doctors, browse doctor profiles, check availability, and manage appointments through an intuitive user interface.

---

## 🎨 UI Design

**Figma Design**

https://www.figma.com/design/ZLkjwG5ehxNRrC4SUA2WG7/Prescripto---UI-Design?node-id=0-1&p=f&t=8NaB6KKalLvNad2G-0

---

## 🚀 Features

* Patient Registration & Login
* Doctor Listing and Profiles
* Appointment Booking System
* Available Time Slot Management
* Appointment Management
* Search and Filter Doctors
* User-Friendly Dashboard
* Form Validation
* Responsive Design
* Mobile-Friendly Interface

---

## 🛠️ Technologies Used

### Frontend

* React.js
* JavaScript (ES6+)
* Bootstrap 5
* HTML5
* CSS3

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Version Control

* Git
* GitHub

---

## 📁 Project Structure

```text
Hospital-Appointment-Booking/
│
├── admin/
│   ├── public/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── package.json
│
├── client/
│   ├── public/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json
```

### Folder Description

| Folder        | Description                                                   |
| ------------- | ------------------------------------------------------------- |
| `admin`       | Admin Dashboard for managing doctors, appointments, and users |
| `client`      | Patient-facing application for booking appointments           |
| `server`      | Backend API built with Node.js, Express.js, and MongoDB       |
| `controllers` | Business logic for handling requests                          |
| `models`      | MongoDB/Mongoose schemas                                      |
| `routes`      | API route definitions                                         |
| `middleware`  | Authentication and custom middleware                          |
| `config`      | Database and application configuration                        |
| `uploads`     | Stores uploaded files and images                              |

```
```


## 🌿 Git Branch Strategy

```text
main
│
└── PROJECT-CODE
    ├── developer1
    ├── developer2
    ├── developer3
    └── developer4
```

### Development Workflow

```text
developer1 ─┐
developer2 ─┼──► PROJECT-CODE ───► main
developer3 ─┤
developer4 ─┘
```

### Team Collaboration Process

1. Each developer works on their own branch.
2. Developers push code to their respective branches.
3. Pull Requests are created from developer branches to `PROJECT-CODE`.
4. Team reviews and tests all changes in `PROJECT-CODE`.
5. After successful testing, changes are merged into `main`.
6. The `main` branch always contains stable and production-ready code.

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/vasuthangudu/Hospital-appointment-booking-.git
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Install Backend Dependencies

```bash
cd server
npm install
```

### Start Frontend

```bash
npm start
```

### Start Backend

```bash
npm run server
```

---

## 🎯 Project Goals

* Simplify appointment scheduling
* Improve doctor-patient interaction
* Reduce manual booking processes
* Provide a responsive healthcare platform
* Deliver a seamless user experience across devices

---

## 👨‍💻 Team Project

This project is being developed collaboratively using GitHub branch-based development, ensuring efficient teamwork, code review, testing, and stable releases.
