# ⚙️ DevTracker Pro - Backend API

This is the backend service for DevTracker Pro. It is a RESTful API built using the "Clean Architecture" pattern with Node.js, Express, and TypeScript. It utilizes the Prisma ORM to interact safely and efficiently with a MySQL database.

## 🚀 Tech Stack & Installation

If you are setting this up from scratch, here are the exact commands used to build the environment.

**1. Initialize Project & Core Express setup:**
\`\`\`bash
npm init -y
npm install express cors dotenv
\`\`\`

**2. Install Security & Authentication (JWT & Bcrypt):**
\`\`\`bash
npm install bcrypt jsonwebtoken
\`\`\`

**3. Install Prisma & Database Client:**
\`\`\`bash
npm install -D prisma
npm install @prisma/client
npx prisma init
\`\`\`

**4. Install TypeScript & Development Tools:**
\`\`\`bash
npm install -D typescript @types/node @types/express @types/cors @types/bcrypt @types/jsonwebtoken tsx
npx tsc --init
\`\`\`

---

## 📂 Project Structure (Clean Architecture)

We separate our concerns so the codebase remains scalable and easy to test. Data flows from the Routes -> Controllers -> Services -> Database.

\`\`\`text
backend/
├── prisma/               # Database schema and migration history (DDL)
├── src/
│   ├── config/           # Global configurations (e.g., Prisma client instance)
│   ├── controllers/      # Extracts data from HTTP requests (req.body) and sends HTTP responses
│   ├── middleware/       # Intercepts requests (e.g., verifying JWTs before allowing access)
│   ├── routes/           # Maps URL endpoints (like /api/auth) to specific controllers
│   ├── services/         # The "Brain". Core business logic and direct database queries
│   ├── utils/            # Reusable helper functions (e.g., date formatting, custom error handlers)
│   └── index.ts          # The application entry point. Wires up middleware, routes, and starts the server
├── .env                  # Environment variables (Database URL, JWT Secret)
└── package.json          # Project metadata and npm scripts
\`\`\`

---

## 💾 Database Setup (Prisma)

You do not need to create tables manually in MySQL. Prisma handles the Database Definition Language (DDL) generation and execution.

**1. Configure Environment:**
Ensure your `.env` file contains your local MySQL connection string:
\`\`\`env
DATABASE_URL="mysql://root:password@localhost:3306/devtracker_pro"
\`\`\`

**2. Run Migrations:**
This command reads `schema.prisma`, creates the database (if it doesn't exist), builds the tables, and generates the TypeScript types.
\`\`\`bash
npx prisma migrate dev --name init_devtracker
\`\`\`

---

## 🏃‍♂️ Running the Server

Start the development server using `tsx`, which compiles and hot-reloads TypeScript on the fly:

Note
 "scripts": {
    "dev": "tsx watch src/index.ts"
  },
Add this in your script.
  
\`\`\`bash
npm run dev
\`\`\`
*The server will run on `http://localhost:5000`.*