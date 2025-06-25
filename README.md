# Rate My Professor - Web Application

A full-stack MERN application where students can view, rate, and provide feedback on professors at **SASTRA University**. Built with React, Express, MongoDB, and Google OAuth, this platform enables transparent and secure sharing of academic experiences.

---

##  Live Demo

- 🔗 **Frontend:** [https://rmp-sastra.vercel.app](https://rmp-sastra.vercel.app)

---

## 🛠 Tech Stack

| Layer        | Technologies                                                                    |
|--------------|---------------------------------------------------------------------------------|
| **Frontend** | React, Vite, Axios, React Router DOM, Toastify                                  |
| **Backend**  | Node.js, Express, MongoDB, Mongoose, Passport.js (Google OAuth)                 |
| **Scraping** | Puppeteer (for professor info/image scraping)                                   |
| **Cloud**    | Cloudinary (for image hosting), Vercel (frontend/backend)                       |

---

## ✨ Features

- 🔍 **Browse Professors** with image, name, and average rating.
- ⭐ **Rate Professors** using a star-based system (0.5 – 5).
- 💬 **Give Feedback** and update it anytime.
- 🔐 **Login via Google** (restricted to `@sastra.ac.in` emails).
- 🧾 **Track Your Reviews** – see, update, or delete them.
- 📸 **Professor Images** auto-scraped via Puppeteer + Cloudinary.
- 📱 **Fully Responsive** for mobile and desktop users.
- 🌙 **Dark/Light Mode** toggle using CSS variables.

---

## 🔐 Authentication

- OAuth2 via Google
- Email domain restricted to `@sastra.ac.in`
- Session-based login using `passport` and `express-session`

---

##  Sample Flow

1. **User visits the app** — can view all professors and their average ratings.
2. **Clicks "Rate"** — redirected to Google login.
3. **Post login**, user lands on the rating page for that professor.
4. **Can view, submit, update, or clear their rating and feedback.**
5. **Frontend shows unique feedbacks** in a modal carousel for each professor.

---
## Author
**Srinath Gosakan**

🏫 Built for SASTRA University students

📬 Feedback/suggestions welcome!
