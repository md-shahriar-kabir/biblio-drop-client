# 📖 BiblioDrop — Online Book Delivery Management System

🚀 **Live Site URL:** [Click Here to View Live Demo](https://biblio-drop-client-sage.vercel.app/)  
📦 **Client Repository:** [GitHub Frontend](https://github.com/md-shahriar-kabir/biblio-drop-client)  
🖥️ **Server Repository:** [GitHub Backend](https://github.com/md-shahriar-kabir/biblio-drop-server)  

---

## 📌 Project Overview
**BiblioDrop** is a modern, digital platform designed to democratize access to books by bridging the gap between readers, local libraries, and independent book owners. Traditional library systems require physical visits, which can be a barrier for busy professionals or remote students. **BiblioDrop** resolves this through an online marketplace featuring full-stack concepts, role-based dashboards, secure Stripe transactions for delivery fees, and an anti-spam verified review engine.

---

## 💎 Core Features

### 👥 Multi-Role Workspaces
* **Readers (Users):** Browse books, securely request doorstep delivery using Stripe checkout, track live order history matrices, and leave verified reviews.
* **Librarians (Providers):** Dynamic inventory publishing controls, status pipeline management (`Pending` ➡️ `Dispatched` ➡️ `Delivered`), and integrated balance counters.
* **System Administrators:** Global account control, administrative approval queues for newly added books, platform-wide transaction audits, and analytical summaries.

### 🔐 Advanced Technical Features
* **Stripe Gateway Integration:** Seamless execution of live payment modules processing dynamic delivery fees.
* **Verified Review Protocols:** A data pipeline that validates database logs to ensure only users with a verified `Delivered` status can rate or review a specific book.
* **Advanced Data Processing:** Integrated custom server-side pagination, instant search inputs, and dynamic genres query mapping.
* **Luxury Modern UI:** A fully responsive layout with clean visual hierarchy utilizing an eye-pleasing **Royal Purple, Indigo, and Slate** palette.

---

## 📦 Installed Packages & Dependencies

### Frontend (Client-Side)
* **Framework:** `next` (Next.js 14+/15 App Router Architecture)
* **Styling & UI components:** `tailwindcss`, `@heroui/react` (formerly NextUI)
* **Animations:** `framer-motion` (Micro-interactions and fluid entry configurations)
* **Icons Framework:** `react-icons` (Lucide/Feather sets via `fi` variants)
* **Authentication Handlers:** `better-auth` (Credential configuration and Google OAuth)
* **Data Visualization:** `recharts` / `chart.js` (Analytical distribution data graphs)

### Backend (Server-Side)
* **Runtime Layer:** `node` (Node.js runtime environment)
* **API Framework:** `express` (Express.js robust routing structures)
* **Database Engine:** `mongodb`, `mongoose` (Data modeling tool architecture)
* **Security & Encryption:** `jsonwebtoken` (JWT tracking architecture via secure cookies)
* **Payment Processor:** `stripe` (Server-side checkout integration toolkit)

---
