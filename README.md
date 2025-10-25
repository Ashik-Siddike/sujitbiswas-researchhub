# Dr. Sujit Biswas Research Hub

## Project Overview

This is the personal research hub website for **Dr. Sujit Biswas**, Assistant Professor in Cybersecurity & FinTech at City, University of London.

## About the Project

This website showcases Dr. Biswas's research in:
- Cybersecurity
- FinTech and Blockchain Technology
- IoT Security
- Machine Learning Applications
- Academic Publications
- Teaching Portfolio
- Student Supervision

## Technologies Used

This project is built with:

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel/Netlify ready

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```sh
# Clone the repository
git clone <YOUR_REPOSITORY_URL>

# Navigate to the project directory
cd sujitbiswas-researchhub

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Local API (Express + MySQL via XAMPP)

1) XAMPP-এ Apache, MySQL চালু করুন
2) phpMyAdmin খুলে `server/sql/schema.sql` ইমপোর্ট করে `researchhub` ডাটাবেস তৈরি করুন
3) `server/` ডিরেক্টরিতে `.env` বানান (নিচের মতো):

```
PORT=4000
CORS_ORIGIN=http://localhost:5173
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=researchhub
```

4) সার্ভার ডিপেন্ডেন্সি ইন্সটল ও চালু করুন:

```
cd server
npm i
npm run dev
```

5) Vite ক্লায়েন্টে API URL সেট করুন (রুটে `.env`):

```
VITE_API_URL=http://localhost:4000/api
```

তারপর ফ্রন্টএন্ড চালু করুন:

```
npm i
npm run dev
```

এখন `Research Areas` সেকশনের ডেটা MySQL থেকে আসবে।

### Admin Login (JWT)
Admin ব্যবহার করতে `admin_users` এ পাসওয়ার্ড সেট করুন (bcrypt hash):

```sql
UPDATE admin_users
SET password_hash = '$2a$10$QG5VJrQ6Q8Z0j1qfH0mAWe5j5Ttqk0xgk3jY0eYt7n0l1Z7y5TQHe'
WHERE email = 'admin@example.com';
-- উপরের হ্যাশটি "admin123" পাসওয়ার্ডের উদাহরণ
```

Login API:

```
POST http://localhost:4000/api/auth/login
{ "email": "admin@example.com", "password": "admin123" }
```

Client-এ টোকেন localStorage-এ রেখে Authorization: Bearer <token> হেডার ব্যবহার করুন।

### সম্পূর্ণ ডাটাবেস সেটআপ (একবারে)

**সবচেয়ে সহজ উপায় - একটি ফাইলে সব কিছু:**

1. phpMyAdmin খুলুন → SQL ট্যাবে যান
2. `server/sql/complete_setup.sql` ফাইল কপি করে পেস্ট করুন
3. "Go" বাটনে ক্লিক করুন

এতে স্বয়ংক্রিয়ভাবে যুক্ত হবে:
- ✅ সব 7টি টেবিল তৈরি (admin_users, courses, profile_info, projects, publications, research_areas, students)
- ✅ Admin User (Email: sujitsujitbiswas@ieee.org, Password: @ieee.org4141daerES%)
- ✅ Profile Info (নাম, পদবী, ইউনিভার্সিটি, CV লিঙ্ক, Google Scholar লিঙ্ক)
- ✅ Research Areas (6টি এরিয়া)
- ✅ **Publications (37টি - সব লিঙ্ক সহ IEEE, ACM, arXiv, Springer, MDPI, etc.)**
- ✅ Projects (3টি - চলমান ও সম্পন্ন)
- ✅ Courses (3টি কোর্স)
- ✅ Students (4টি ছাত্র)

**Publications View বাটন:**
- যদি PDF URL থাকে → সরাসরি PDF ওপেন হবে (নতুন ট্যাবে)
- যদি DOI থাকে → DOI লিঙ্কে redirect হবে
- না হলে → Contact মেসেজ দেখাবে

---

### ম্যানুয়াল সেটআপ (যদি উপরের পদ্ধতি কাজ না করে)

phpMyAdmin SQL Editor-এ নিচের SQL ব্লক রান করুন (সব টেবিল):

```sql
CREATE DATABASE IF NOT EXISTS `researchhub` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `researchhub`;

CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` CHAR(36) NOT NULL DEFAULT (UUID()),
  `user_id` CHAR(36) NOT NULL UNIQUE,
  `email` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) NOT NULL DEFAULT 'admin',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `courses` (
  `id` CHAR(36) NOT NULL DEFAULT (UUID()),
  `code` VARCHAR(50) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `level` VARCHAR(50) NOT NULL,
  `semester` VARCHAR(50) NOT NULL,
  `year` INT NOT NULL,
  `enrollment_count` INT DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `profile_info` (
  `id` CHAR(36) NOT NULL DEFAULT (UUID()),
  `key` VARCHAR(100) NOT NULL UNIQUE,
  `value` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `projects` (
  `id` CHAR(36) NOT NULL DEFAULT (UUID()),
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'ongoing',
  `duration` VARCHAR(100) NOT NULL,
  `collaborators` JSON NOT NULL DEFAULT (JSON_ARRAY()),
  `funding` VARCHAR(255) NOT NULL,
  `outcomes` JSON NOT NULL DEFAULT (JSON_ARRAY()),
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `publications` (
  `id` CHAR(36) NOT NULL DEFAULT (UUID()),
  `title` VARCHAR(500) NOT NULL,
  `authors` TEXT NOT NULL,
  `journal` VARCHAR(255) NOT NULL,
  `year` INT NOT NULL,
  `volume` VARCHAR(100) NULL,
  `pages` VARCHAR(100) NULL,
  `doi` VARCHAR(255) NULL,
  `citations` INT DEFAULT 0,
  `type` VARCHAR(100) DEFAULT 'journal',
  `pdf_url` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `research_areas` (
  `id` CHAR(36) NOT NULL DEFAULT (UUID()),
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `icon` VARCHAR(100) NOT NULL,
  `order_index` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `students` (
  `id` CHAR(36) NOT NULL DEFAULT (UUID()),
  `name` VARCHAR(255) NOT NULL,
  `degree_type` VARCHAR(100) NOT NULL,
  `research_topic` VARCHAR(500) NOT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'current',
  `start_year` INT NOT NULL,
  `end_year` INT NULL,
  `avatar_url` TEXT NULL,
  `linkedin_url` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── integrations/       # External service integrations
└── assets/            # Static assets
```

## Features

- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, professional interface using shadcn/ui
- **SEO Optimized**: Meta tags and Open Graph support
- **Fast Performance**: Built with Vite for optimal development experience
- **Type Safety**: Full TypeScript support

## Deployment

This project can be deployed to any static hosting service:

- **Vercel**: Recommended for React apps
- **Netlify**: Great for static sites
- **GitHub Pages**: Free hosting option

## Contributing

This is a personal research website. For collaboration opportunities, please contact Dr. Sujit Biswas directly.

## License

This project is for academic and research purposes.

## Contact

- **Email**: [Your Email]
- **University**: City, University of London
- **Research Areas**: Cybersecurity, FinTech, Blockchain, IoT Security
