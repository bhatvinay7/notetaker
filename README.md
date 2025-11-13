# Notetaker - Turborepo Monorepo

Notetaker is a modern web application designed to help users create, organize, and manage their notes efficiently. Built with Turborepo, it offers a clean and intuitive interface where users can write, edit, and search notes seamlessly. Each note is auto-saved, timestamped, and organized under sessions for better categorization.


This Turborepo includes the following packages and apps:

### Apps
- **`web`**: Next.js frontend application (runs on port 3000)
- **`http-server`**: Backend API server (runs on port 3002)

### Packages
- **`@repo/ui`**: Shared React component library
- **`@repo/eslint-config`**: ESLint configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- **`@repo/typescript-config`**: Shared `tsconfig.json` used throughout the monorepo

### Tools
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Docker](https://www.docker.com/) for containerization

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Docker and Docker Compose (for containerized setup)
- Git

### Clone the Repository

```bash
git clone https://github.com/bhatvinay7/notetaker.git
cd notetaker
```

## 🐳 Docker Setup (Recommended)

The easiest way to run the application locally is using Docker Compose.

### Step 1: Create Environment Files

Create `.env` files for each application:

#### `apps/http-server/.env`

```env
# API Configuration
API_KEY=your_api_key_here

# Frontend URL
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000

# Database Configuration
DATABASE_URL=postgresql://user:password@postgres:5432/notetaker

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3002/auth/google/callback

# Security Keys
SECRET_KEY=your_secret_key_here
ACCESS_KEY=your_access_key_here
```

#### `apps/web/.env`

```env
# Frontend Configuration
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_URL=http://localhost:3002

# Security Key
SECRET_KEY=your_secret_key_here
```

### Step 2: Create Docker Compose File

Create a `docker-compose.yml` file in the root directory:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: notetaker-postgres
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: notetaker
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 10s
      timeout: 5s
      retries: 5

  http-server:
    build:
      context: .
      dockerfile: apps/http-server/Dockerfile
    container_name: notetaker-api
    env_file:
      - apps/http-server/.env
    ports:
      - "3002:3002"
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - ./apps/http-server:/app/apps/http-server
      - /app/node_modules
      - /app/apps/http-server/node_modules

  web:
    build:
      context: .
      dockerfile: apps/web/Dockerfile
    container_name: notetaker-web
    env_file:
      - apps/web/.env
    ports:
      - "3000:3000"
    depends_on:
      - http-server
    volumes:
      - ./apps/web:/app/apps/web
      - /app/node_modules
      - /app/apps/web/node_modules

volumes:
  postgres_data:
```

### Step 3: Create Dockerfiles

#### `apps/http-server/Dockerfile`

```dockerfile
FROM node:18-alpine AS base

FROM base AS builder
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune http-server --docker

FROM base AS installer
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install

COPY --from=builder /app/out/full/ .
RUN npm run build --filter=http-server

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

COPY --from=installer /app/apps/http-server/package.json .
COPY --from=installer --chown=nodejs:nodejs /app/apps/http-server/dist ./dist
COPY --from=installer --chown=nodejs:nodejs /app/node_modules ./node_modules

EXPOSE 3002
CMD ["node", "dist/index.js"]
```

#### `apps/web/Dockerfile`

```dockerfile
FROM node:18-alpine AS base

FROM base AS builder
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune web --docker

FROM base AS installer
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install

COPY --from=builder /app/out/full/ .
RUN npm run build --filter=web

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/web/next.config.js .
COPY --from=installer /app/apps/web/package.json .
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

EXPOSE 3000
ENV PORT 3000
CMD ["node", "apps/web/server.js"]
```

### Step 4: Run with Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (database data)
docker-compose down -v
```

### Step 5: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3002
- **PostgreSQL**: localhost:5432

## 💻 Local Development Setup (Without Docker)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Environment Variables

Create the same `.env` files as described in the Docker setup section, but update the database URL:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/notetaker
```

### Step 3: Set Up PostgreSQL Database

Install and run PostgreSQL locally, then create the database:

```bash
createdb notetaker
```

### Step 4: Run Database Migrations

```bash
cd apps/http-server
npm run migrate
```

### Step 5: Start Development Servers

Run all apps in development mode:

```bash
# From the root directory
npm run dev
```

Or run specific apps:

```bash
# Run only the web app
npm run dev --filter=web

# Run only the http-server
npm run dev --filter=http-server
```

## 🔧 Configuration

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3002/auth/google/callback` (development)
6. Copy the Client ID and Client Secret to your `.env` file

### Environment Variables Explained

#### HTTP Server (Backend)

| Variable | Description | Example |
|----------|-------------|---------|
| `API_KEY` | API key for external services | `your_api_key` |
| `NEXT_PUBLIC_FRONTEND_URL` | Frontend application URL | `http://localhost:3000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@localhost:5432/notetaker` |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | From Google Console |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | From Google Console |
| `GOOGLE_REDIRECT_URI` | OAuth callback URL | `http://localhost:3002/auth/google/callback` |
| `SECRET_KEY` | Secret key for JWT/session | Random secure string |
| `ACCESS_KEY` | Access key for authentication | Random secure string |

#### Web Server (Frontend)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_FRONTEND_URL` | Frontend URL (public) | `http://localhost:3000` |
| `NEXT_PUBLIC_BACKEND_URL` | Backend API URL (public) | `http://localhost:3002` |
| `SECRET_KEY` | Secret key matching backend | Same as backend |

## 📝 Available Scripts

### Build

Build all apps and packages:

```bash
npm run build
```

Build specific app:

```bash
npm run build --filter=web
npm run build --filter=http-server
```

### Development

Start all apps in dev mode:

```bash
npm run dev
```

Start specific app:

```bash
npm run dev --filter=web
```

### Linting

```bash
npm run lint
```

### Format Code

```bash
npm run format
```

### Type Checking

```bash
npm run type-check
```

## 🏗️ Project Structure

```
notetaker/
├── apps/
│   ├── web/                 # Next.js frontend
│   │   ├── src/
│   │   ├── public/
│   │   ├── .env
│   │   ├── Dockerfile
│   │   └── package.json
│   └── http-server/         # Backend API
│       ├── src/
│       ├── .env
│       ├── Dockerfile
│       └── package.json
├── packages/
│   ├── ui/                  # Shared UI components
│   ├── eslint-config/       # Shared ESLint config
│   └── typescript-config/   # Shared TypeScript config
├── docker-compose.yml
├── turbo.json
└── package.json
```

## 🔍 Key Features

- **Session-based Note Organization**: Notes are organized under sessions for better categorization
- **Auto-save**: All notes are automatically saved as you type
- **Timestamps**: Each note includes creation and modification timestamps
- **Search Functionality**: Quickly find notes with built-in search
- **Google OAuth**: Secure authentication using Google accounts
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Troubleshooting

### Docker Issues

**Problem**: Containers won't start
```bash
# Check logs
docker-compose logs

# Rebuild containers
docker-compose up --build
```

**Problem**: Database connection errors
```bash
# Check if PostgreSQL is ready
docker-compose ps

# Restart PostgreSQL
docker-compose restart postgres
```

### Port Conflicts

If ports 3000, 3002, or 5432 are already in use, modify the port mappings in `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Change host port
```

### Environment Variable Issues

Ensure all required environment variables are set. Check with:

```bash
docker-compose config
```

## 📚 Learn More

- [Turborepo Documentation](https://turborepo.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Docker Documentation](https://docs.docker.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For issues and questions:
- Open an issue on [GitHub](https://github.com/bhatvinay7/notetaker/issues)
- Check existing documentation
- Review closed issues for solutions

---