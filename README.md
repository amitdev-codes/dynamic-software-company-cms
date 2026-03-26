# 🚀 Dynamic Software Company CMS

![Laravel](https://img.shields.io/badge/Laravel_12-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Inertia.js](https://img.shields.io/badge/Inertia.js-9553E9?style=for-the-badge&logo=inertia&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

> A fully dynamic, backend-driven **Content Management System** for software companies — built with **Laravel 12 + React + Inertia.js**. Every section of the website — products, services, testimonials, team, and more — is manageable from a powerful admin panel without touching a single line of code.

---

## 📸 Screenshots

> _Add screenshots: Homepage, Admin Dashboard, Products Manager, Services Manager, Testimonials, Contact/Email_

---<img width="1826" height="944" alt="Screenshot from 2026-03-26 20-54-13" src="https://github.com/user-attachments/assets/81713b03-73c3-45cf-b72c-4db35a3744de" />
<img width="1826" height="944" alt="Screenshot from 2026-03-26 20-54-24" src="https://github.com/user-attachments/assets/bfcb035c-2da3-493e-9207-9ebfb8523ed8" />
<img width="1852" height="921" alt="Screenshot from 2026-03-26 20-54-53" src="https://github.com/user-attachments/assets/fcf00b3a-e983-47df-83f8-d26367631764" /><img width="1852" height="921" alt="Screenshot from 2026-03-26 20-55-13" src="https://github.com/user-attachments/assets/9de70533-35aa-42c9-9819-536301cc9fde" />



## ✨ Key Features

### 🎛️ Fully Dynamic Backend CMS
- Every section of the public website is controlled from the admin panel
- No hardcoded content — everything is database-driven
- Real-time content updates reflect instantly on the frontend
- Media manager for uploading images, logos, and banners

### 🛍️ Products Management
- Add, edit, delete company products with rich text descriptions
- Upload product images and set featured products
- Organize products by category
- Toggle product visibility (show/hide from website)
- SEO fields per product (meta title, description, slug)

### 🧩 Services Management
- Manage all company services dynamically
- Set service icons, descriptions, and ordering
- Highlight featured services on the homepage
- Group services by category or department

### 💬 Testimonials Management
- Add client testimonials with name, company, photo, and rating
- Approve / reject testimonials before publishing
- Drag-and-drop ordering for display sequence
- Star rating system (1–5)

### 📧 Email / Contact System
- Contact form on the public website
- All submitted messages stored in the admin panel inbox
- Auto-reply email sent to the client upon submission
- Admin gets notified of new inquiries via email
- Email templates fully customizable from backend

### 🌐 Public Website Sections (All Dynamic)
| Section | Managed From Backend |
|---------|---------------------|
| Hero / Banner | ✅ Title, subtitle, CTA button, background image |
| About Us | ✅ Company story, vision, mission, team photo |
| Products | ✅ Full CRUD with images and categories |
| Services | ✅ Icons, descriptions, ordering |
| Testimonials | ✅ Client reviews with approval workflow |
| Team Members | ✅ Name, role, photo, social links |
| FAQ Section | ✅ Questions & answers |
| Contact Info | ✅ Address, phone, email, map embed |
| Footer | ✅ Links, social media, copyright text |

### 🔐 Admin Panel
- Secure login with role-based access
- Dashboard with website stats (messages, products, services count)
- Activity log for all admin actions
- SEO settings per page (title, meta description, OG image)
- Site settings: logo, favicon, company name, social links

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Laravel 12 (PHP 8.3) |
| **Frontend** | React.js 18 |
| **Bridge** | Inertia.js (no separate API needed) |
| **Styling** | Tailwind CSS |
| **Database** | MySQL / PostgreSQL |
| **File Storage** | Laravel Storage + AWS S3 (optional) |
| **Email** | Laravel Mail (SMTP / Mailgun / SES) |
| **Authentication** | Laravel Breeze / Sanctum |
| **Rich Text Editor** | TipTap / TinyMCE |
| **Containerization** | Docker + Docker Compose |
| **CI/CD** | GitHub Actions |

---

## 📁 Project Structure

```
software-cms/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/
│   │   │   │   ├── ProductController.php
│   │   │   │   ├── ServiceController.php
│   │   │   │   ├── TestimonialController.php
│   │   │   │   ├── TeamController.php
│   │   │   │   └── SettingsController.php
│   │   │   └── Public/
│   │   │       ├── HomeController.php
│   │   │       └── ContactController.php
│   ├── Models/
│   │   ├── Product.php
│   │   ├── Service.php
│   │   ├── Testimonial.php
│   │   ├── TeamMember.php
│   │   └── ContactMessage.php
│   └── Mail/
│       ├── ContactAutoReply.php
│       └── NewInquiryNotification.php
├── resources/
│   └── js/
│       ├── Pages/
│       │   ├── Public/
│       │   │   ├── Home.jsx
│       │   │   ├── Products.jsx
│       │   │   ├── Services.jsx
│       │   │   └── Contact.jsx
│       │   └── Admin/
│       │       ├── Dashboard.jsx
│       │       ├── Products/
│       │       │   ├── Index.jsx
│       │       │   ├── Create.jsx
│       │       │   └── Edit.jsx
│       │       ├── Services/
│       │       ├── Testimonials/
│       │       └── Settings/
│       └── Components/
│           ├── Navbar.jsx
│           ├── Footer.jsx
│           └── TestimonialCard.jsx
├── routes/
│   ├── web.php
│   └── admin.php
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites
- PHP 8.3+
- Composer
- Node.js 18+
- MySQL or PostgreSQL
- Docker (optional)

### 1. Clone the Repository
```bash
git clone https://github.com/amitkumardev/software-company-cms.git
cd software-company-cms
```

### 2. Install Dependencies
```bash
composer install
npm install
```

### 3. Environment Setup
```bash
cp .env.example .env
php artisan key:generate
```

Configure your `.env`:
```env
APP_NAME="Your Software Company"
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=software_cms
DB_USERNAME=root
DB_PASSWORD=your_password

# Mail Configuration
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=587
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_FROM_ADDRESS=info@yourcompany.com
MAIL_FROM_NAME="Your Software Company"

# File Storage (optional - AWS S3)
FILESYSTEM_DISK=local
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=ap-south-1
AWS_BUCKET=
```

### 4. Run Migrations & Seed
```bash
php artisan migrate --seed
```

### 5. Link Storage
```bash
php artisan storage:link
```

### 6. Build Frontend & Start Server
```bash
npm run dev
php artisan serve
```

---

## 🐳 Docker Setup

```bash
docker-compose up -d
docker-compose exec app php artisan migrate --seed
docker-compose exec app php artisan storage:link
```

---

## 🔄 How Inertia.js Works Here

```
Browser Request
      │
      ▼
Laravel Router (routes/web.php)
      │
      ▼
Controller → Inertia::render('Page', ['data' => $data])
      │
      ▼
React Component receives props directly (no REST API needed)
      │
      ▼
Renders dynamic content from database in real-time
```

> **Why Inertia?** No need to build a separate REST API. Laravel passes data directly as React props — giving the speed of an SPA with the simplicity of a traditional server-side app.

---

## 📧 Email Flow

```
Visitor fills Contact Form
        │
        ▼
ContactController stores message in DB
        │
        ├──► Auto-reply email sent to visitor (Thank You template)
        │
        └──► Notification email sent to Admin (New Inquiry alert)
```

---

## 🔑 Default Credentials (Development Only)

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@company.com | password |
| Editor | editor@company.com | password |

> ⚠️ Change all credentials before deploying to production.

---

## 🧪 Running Tests

```bash
php artisan test
# or with Pest
./vendor/bin/pest
```

---

## 🚀 Deployment Checklist

- [ ] Set `APP_ENV=production` and `APP_DEBUG=false`
- [ ] Configure production mail credentials
- [ ] Run `npm run build` for production assets
- [ ] Set up SSL certificate
- [ ] Configure proper file permissions (`storage/`, `bootstrap/cache/`)
- [ ] Set up cron job for Laravel scheduler
- [ ] Configure queue worker for email sending

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add: your feature'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

**Amit Kumar Dev**
Full Stack Developer | Laravel · React · Inertia.js | 8+ Years

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/amitkumardev/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/amitkumardev)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ using Laravel 12 + React + Inertia.js</sub>
</div>
