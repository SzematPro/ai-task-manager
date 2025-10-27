# Live Demo: 

# AI Task Manager

<div align="center">
  <h3>Transform your thoughts into organized tasks with Artificial Intelligence</h3>
  <p>A modern task management application powered by AI that processes natural language in multiple languages</p>
</div>

## 🚀 Key Features

> This application uses **GPT-4** to transform natural thoughts into structured tasks with **25+ analysis fields**, including emotional context, necessary tools, success criteria, and potential blockers. All with **enterprise-level security** through Row Level Security (RLS) and OAuth authentication.

### 🤖 **Advanced AI Processing**
- **Intelligent Analysis**: Uses GPT-4 to extract structured information from natural language
- **Multiple Languages**: Automatically detects language and translates to English for processing
- **Contextual Analysis**: Identifies priority, urgency, complexity, and emotional context
- **Smart Suggestions**: Generates suggested actions, success criteria, and potential blockers
- **Fallback System**: Automatic basic analysis if OpenAI is unavailable
- **Date Validation**: Intelligent correction of invalid or past dates
- **Advanced Prompt Engineering**: Implements 10+ modern prompt engineering techniques

### 🌍 **Multilingual Support**
- **Automatic Detection**: Recognizes 6 main languages: Spanish, English, French, German, Italian, and Portuguese among others
- **Intelligent Translation**: Automatically converts text to English for processing with GPT-4
- **Professional Titles**: Generates optimized titles for database storage
- **Robust Fallback**: Backup translation system for common phrases

### 🎯 **Intelligent Task Management**
- **Complete Analysis**: Each task includes:
  - Title and description
  - Priority (low, medium, high)
  - Urgency and importance (1-10 scale)
  - Complexity (simple, moderate, complex)
  - Due date
  - Category and tags
  - Estimated duration
  - Suggested subtasks
  - Emotional and work context
  - Necessary tools
  - Success criteria
  - Potential blockers

### 🎨 **Modern and Responsive Interface**
- **Adaptive Design**: Optimized for mobile, tablets, and desktop
- **Dark/Light Theme**: Automatic switching based on system preferences
- **Smooth Animations**: Fluid transitions with Framer Motion
- **Optimized UI/UX**: Separated action buttons to prevent accidental errors

### 🔐 **Authentication and Security**
- **Google OAuth**: Secure login with Google
- **Supabase Auth**: Robust authentication with Row Level Security (RLS)
- **Private Data**: Each user can only view and manage their own tasks
- **Security Policies**: 4 RLS policies that guarantee complete data isolation
- **Error Handling**: Robust management of authentication errors and redirection
- **Demo Mode**: Operation without authentication for demonstration
- **Database Security**: Functions use explicit `search_path` to prevent SQL injection attacks
- **Performance Optimized**: RLS policies use subselects for optimal query performance at scale

### 📊 **Monitoring and Status**
- **Service Status**: Real-time monitoring of Supabase, OpenAI, and local storage
- **Visual Indicators**: Connection status with intuitive colors and icons
- **Connection Status**: Automatic verification of backend service status
- **User Analytics**: Vercel Analytics for user behavior and engagement tracking
- **Performance Monitoring**: Vercel Speed Insights for performance analytics

### 🎛️ **Advanced Features**
- **Smart Filtering**: By status, priority, and category
- **Sorting**: By due date, priority, or creation date
- **Search**: Real-time search by title, category, and tags
- **Collapse/Expand**: Expandable AI analysis for each task
- **State Management**: Zustand for efficient global state management

### 🚧 **Demo Mode with Limits**
- **Configurable Limit**: Maximum number of tasks per user
- **Informative Modal**: Elegant notification when limit is reached
- **Support Contact**: Direct link to request full version

## 🛠️ Technologies Used

### **Frontend**
- **Next.js 14**: React framework with App Router
- **React 18**: User interface library
- **TypeScript**: Static typing for greater robustness
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animations and transitions
- **Lucide React**: Modern iconography

### **Backend and Services**
- **Supabase**: PostgreSQL database and authentication
- **OpenAI GPT-4**: Natural language processing
- **Zustand**: Global state management
- **Next.js API Routes**: Server endpoints
- **Vercel Analytics**: User behavior and engagement tracking
- **Vercel Speed Insights**: Performance monitoring and analytics

### **Advanced Technical Capabilities**

#### **🧠 Comprehensive AI Analysis**
Transform simple thoughts into detailed task plans with 25+ intelligent analysis fields:

- **Smart Prioritization**: Automatically determines task priority (low/medium/high) and urgency (1-10 scale) based on content analysis
- **Intelligent Categorization**: Assigns relevant categories (Work, Health, Personal, etc.) for better organization
- **Contextual Due Dates**: Calculates realistic deadlines based on task complexity and urgency
- **Emotional Intelligence**: Recognizes emotional context (stressed, excited, worried) to provide appropriate suggestions
- **Work-Life Balance**: Distinguishes between personal and professional tasks for better time management
- **Energy & Social Context**: Considers your energy level and whether tasks are solo or collaborative
- **Practical Planning**: Suggests specific tools needed and identifies potential obstacles
- **Success Metrics**: Defines clear success criteria so you know when tasks are truly complete
- **Actionable Steps**: Breaks complex tasks into manageable subtasks with specific actions
- **Confidence Scoring**: Shows how certain the AI is about its analysis (1-100%)

#### **🌍 Multilingual Intelligence**
- **Universal Input**: Write tasks in any language - the AI understands and processes them seamlessly
- **Smart Translation**: Automatically translates to English for processing while preserving original meaning
- **Cultural Context**: Maintains cultural nuances and context during translation
- **Mixed Language Support**: Handles Spanglish and other mixed-language inputs naturally

#### **🛡️ Enterprise-Grade Security**
- **Data Isolation**: Each user's tasks are completely private and isolated from others
- **Secure Authentication**: Google OAuth integration with enterprise-level security
- **Database Protection**: Row Level Security ensures no data leakage between users
- **Performance Optimized**: RLS policies use subselects for optimal query performance at scale
- **Fallback Systems**: Continues working even if AI services are temporarily unavailable

### **🧠 Advanced Prompt Engineering Techniques**
- **Structured Outputs**: Detailed JSON specification for consistent responses
- **Chain-of-Thought**: Step-by-step reasoning for complex analysis
- **Few-Shot Learning**: Specific examples for better understanding
- **Context Injection**: Dynamic injection of temporal and user context
- **Role-Based Prompting**: Specialized prompts by domain (analysis, translation, writing)
- **Constraint-Based Prompting**: Specific business rules (date calculation, validations)
- **Multi-Step Processing**: 3-stage pipeline (detection → translation → analysis)
- **Temperature Optimization**: Optimized temperatures per task (0.1-0.2 for consistency)
- **Error Handling**: Robust fallback systems for maximum availability
- **Domain-Specific Prompting**: Specialized prompts for task management and productivity

### **Development Tools**
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Jest**: Testing framework
- **Docker**: Containerization

## 📦 Installation and Configuration

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Supabase account
- OpenAI API Key

### **1. Clone the Repository**
   ```bash
git clone https://github.com/tu-usuario/ai-task-manager.git
   cd ai-task-manager
   ```

### **2. Install Dependencies**
   ```bash
   npm install
   ```

### **3. Configure Environment Variables**
Create a `.env.local` file based on `env.example`:

   ```bash
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Task Limiting Configuration (Demo Mode)
NEXT_PUBLIC_ENABLE_TASK_LIMIT=false
NEXT_PUBLIC_MAX_TASKS_PER_USER=5
NEXT_PUBLIC_SUPPORT_EMAIL=support@your-company.com
```

### **4. Configure Supabase**
1. Create a new project at [Supabase](https://supabase.com)
2. Run the SQL script in `supabase/schema.sql` (includes security fixes & performance optimizations)
3. Configure authentication with Google OAuth

### **5. Environment Variables**
Choose the appropriate environment file based on your deployment method:

**For Local Development:**
```bash
cp env.example .env.local
# Edit .env.local with your values
```

**For Docker Deployment:**
```bash
cp env.docker.example .env.docker
# Edit .env.docker with your values
```

### **6. Run in Development**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your repository to Vercel
2. Go to your project settings → Environment Variables
3. Add the following environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your Supabase anon key
   - `OPENAI_API_KEY` = Your OpenAI API key
   - `NEXTAUTH_URL` = Your Vercel domain (e.g., `https://your-app.vercel.app`)
   - `NEXTAUTH_SECRET` = A random secret string
4. Deploy automatically (uses `vercel.json` configuration)

**Troubleshooting Vercel Deployment:**
- If you get environment variable errors, ensure all variables are set in Vercel dashboard
- Make sure `NEXTAUTH_URL` matches your Vercel domain exactly
- Check that `NEXTAUTH_SECRET` is a strong random string (32+ characters)
- Verify Supabase URL and keys are correct

### **🐳 Docker - Container Deployment**

#### **Docker Prerequisites**
- Docker 20.10+ installed
- Docker Compose 2.0+ (for complete option)
- At least 2GB RAM available
- Port 3000 free (or change to another port)

#### **Option 1: Simple Docker (Application Only)**
```bash
# 1. Configure environment variables
cp env.docker.example .env.docker
# Edit .env.docker with your real values

# 2. Build image
docker build -t ai-task-manager .

# 3. Run container
docker run -d \
  --name ai-task-manager \
  -p 3000:3000 \
  --env-file .env.docker \
  --restart unless-stopped \
  ai-task-manager

# 4. Verify operation
docker logs ai-task-manager
curl http://localhost:3000/api/health
```

#### **Option 2: Docker Compose (Application + Database)**
```bash
# 1. Configure environment variables
cp env.docker.example .env.docker
# Edit .env.docker with your real values

# 2. Start all services
docker-compose up -d

# 3. Verify service status
docker-compose ps
docker-compose logs app

# 4. Access the application
# Application: http://localhost:3000
# Database: localhost:5432
# Redis: localhost:6379
```

#### **Docker Management Commands**

**Stop services:**
```bash
# Simple Docker
docker stop ai-task-manager

# Docker Compose
docker-compose down
```

**Restart services:**
```bash
# Simple Docker
docker restart ai-task-manager

# Docker Compose
docker-compose restart
```

**View logs:**
```bash
# Simple Docker
docker logs -f ai-task-manager

# Docker Compose
docker-compose logs -f app
```

**Complete removal:**
```bash
# Simple Docker
docker stop ai-task-manager
docker rm ai-task-manager
docker rmi ai-task-manager

# Docker Compose
docker-compose down -v  # Also removes volumes
docker-compose down --rmi all  # Also removes images
```

**Update application:**
```bash
# Simple Docker
docker stop ai-task-manager
docker rm ai-task-manager
docker build -t ai-task-manager .
docker run -d --name ai-task-manager -p 3000:3000 --env-file .env.docker --restart unless-stopped ai-task-manager

# Docker Compose
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

#### **Optional Services (Docker Compose)**

**Enable monitoring:**
```bash
docker-compose --profile monitoring up -d
# Grafana: http://localhost:3001
# Prometheus: http://localhost:9090
```

**Enable Nginx (production):**
```bash
docker-compose --profile production up -d
# Application: http://localhost (port 80)
```

#### **⚡ Quick Management Commands**

**Quick start:**
```bash
# Build and run in one command
docker build -t ai-task-manager . && docker run -d --name ai-task-manager -p 3000:3000 --env-file .env.docker --restart unless-stopped ai-task-manager
```

**Quick verification:**
```bash
# Check status
docker ps | grep ai-task-manager

# View logs in real time
docker logs -f ai-task-manager

# Check health
curl http://localhost:3000/api/health
```

**Quick cleanup:**
```bash
# Stop and remove everything
docker stop ai-task-manager && docker rm ai-task-manager && docker rmi ai-task-manager

# Clean Docker system
docker system prune -a
```

**Quick backup:**
```bash
# Export image
docker save ai-task-manager > ai-task-manager-backup.tar

# Import image
docker load < ai-task-manager-backup.tar
```

#### **🔧 Docker Troubleshooting**

**Problem: Container won't start**
```bash
# View detailed logs
docker logs ai-task-manager

# Check environment variables
docker exec ai-task-manager env | grep -E "(SUPABASE|OPENAI|NEXTAUTH)"

# Check connectivity
docker exec ai-task-manager curl -f http://localhost:3000/api/health
```

**Problem: Environment variables not loading**
```bash
# Check .env.docker file
cat .env.docker

# Recreate container with variables
docker run -d --name ai-task-manager -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL="your_url" \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY="your_key" \
  -e OPENAI_API_KEY="your_key" \
  ai-task-manager
```

**Problem: Port 3000 occupied**
```bash
# Use different port
docker run -d --name ai-task-manager -p 3001:3000 ai-task-manager
# Access at http://localhost:3001
```

**Problem: Database won't connect (Docker Compose)**
```bash
# Check PostgreSQL status
docker-compose logs postgres

# Restart only database
docker-compose restart postgres

# Check connectivity
docker-compose exec postgres pg_isready -U postgres
```

**Problem: Image won't build**
```bash
# Clean Docker cache
docker system prune -a

# Build without cache
docker build --no-cache -t ai-task-manager .

# Check Dockerfile
docker build --progress=plain -t ai-task-manager .
```

**Problem: Volume permissions**
```bash
# Fix permissions
sudo chown -R $USER:$USER ./logs
sudo chmod -R 755 ./logs
```

#### **✅ Functionality Verification**

**Step by step to verify everything works:**

1. **Verify container is running:**
```bash
docker ps | grep ai-task-manager
# Should show container in "Up" state
```

2. **Check application logs:**
```bash
docker logs ai-task-manager
# Should show "Ready - started server on 0.0.0.0:3000"
```

3. **Check health endpoint:**
```bash
curl http://localhost:3000/api/health
# Should return: {"status":"ok","timestamp":"..."}
```

4. **Verify application loads:**
```bash
curl -I http://localhost:3000
# Should return: HTTP/1.1 200 OK
```

5. **Check environment variables:**
```bash
docker exec ai-task-manager env | grep -E "(SUPABASE|OPENAI|NEXTAUTH)"
# Should show your configured variables
```

6. **Access the application:**
- Open browser at `http://localhost:3000`
- Should load AI Task Manager main page
- Should show "Continue with Google" button

**If everything works correctly, you have a fully functional production version in Docker! 🎉**

#### **📋 Complete Verification Checklist**

**✅ Initial configuration:**
- [ ] Docker installed and working
- [ ] `.env.docker` file configured with real values
- [ ] Port 3000 available

**✅ Successful build:**
- [ ] `docker build -t ai-task-manager .` runs without errors
- [ ] Image created correctly
- [ ] No critical warnings in build

**✅ Container working:**
- [ ] Container starts without errors
- [ ] Logs show "Ready in XXms"
- [ ] Health check responds correctly
- [ ] Application accessible in browser

**✅ Features verified:**
- [ ] Main page loads correctly
- [ ] "Continue with Google" button visible
- [ ] Health API responds
- [ ] Environment variables loaded

**✅ Production ready:**
- [ ] Container configured with `--restart unless-stopped`
- [ ] Health check working
- [ ] Logs monitorable
- [ ] Data backup configured (if applicable)

## 📱 Application Usage

### **1. Login**
- Click "Continue with Google" to authenticate
- The application will automatically detect your configuration

### **2. Create Tasks**
- Write your task in natural language (e.g., "Prepare presentation for client on Friday")
- AI will automatically analyze:
  - Priority and urgency
  - Due date
  - Category and tags
  - Emotional and work context
  - Necessary tools
  - Success criteria

### **3. Manage Tasks**
- **Filter**: By status, priority, or category
- **Sort**: By date, priority, or urgency
- **Search**: Real-time search by title or content
- **Expand**: View detailed AI analysis
- **Complete**: Mark tasks as completed
- **Delete**: Remove unwanted tasks

### **4. Supported Languages**
The application automatically processes text in:
- **Spanish**: "Llamar a mamá este fin de semana"
- **English**: "Prepare quarterly report for board meeting"
- **French**: "Préparer le rapport trimestriel"
- **German**: "Quartalsbericht für Vorstandssitzung vorbereiten"
- **Italian**: "Preparare il rapporto trimestrale"
- **Portuguese**: "Preparar relatório trimestral"

*Note: Language detection uses advanced AI and can recognize other languages, but translation is optimized for these 6 main languages.*

## 🔧 Advanced Configuration

### **Task Limits (Demo Mode)**
```bash
# Enable limits
NEXT_PUBLIC_ENABLE_TASK_LIMIT=true
NEXT_PUBLIC_MAX_TASKS_PER_USER=5
NEXT_PUBLIC_SUPPORT_EMAIL=support@your-company.com
```

### **AI Customization**
- Modify `lib/ai-enhanced.ts` to adjust analysis
- Configure `lib/language-detection.ts` for new languages
- Adjust prompts in `app/api/process-task/route.ts`

### **Implemented Prompt Engineering Techniques**
- **Structured Outputs**: Detailed JSON schema in `lib/ai-enhanced.ts` lines 60-84
- **Chain-of-Thought**: Structured reasoning in lines 86-94
- **Few-Shot Learning**: Specific examples in `lib/language-detection.ts` lines 404-408
- **Context Injection**: Dynamic temporal context in lines 52-58
- **Role-Based Prompting**: Specialized prompts by domain
- **Temperature Optimization**: 0.1-0.2 for maximum consistency
- **Multi-Step Processing**: 3-stage specialized pipeline
- **Error Handling**: Robust fallback systems
- **Domain-Specific**: Prompts optimized for task management
- **Constraint-Based**: Specific business rules (dates, validations)

### **Themes and Styles**
- Customize colors in `tailwind.config.js`
- Modify mobile styles in `app/mobile-styles.css`
- Adjust animations in `components/theme-toggle.tsx`

## 📊 Project Structure

```
ai-task-manager/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── health/       # Health check endpoint
│   │   └── process-task/ # AI task processing
│   ├── auth/              # Authentication pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── mobile-styles.css  # Mobile-specific styles
│   └── page.tsx          # Main application page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── providers.tsx     # Context providers
│   ├── task-limit-modal.tsx # Demo limit modal
│   └── theme-toggle.tsx  # Theme switching
├── hooks/                # Custom React hooks
│   ├── use-backend-status.ts # Service monitoring
│   └── use-task-store.ts # Task state management
├── lib/                  # Utility libraries
│   ├── ai-enhanced.ts    # AI processing logic
│   ├── language-detection.ts # Multilingual support
│   ├── openai.ts         # OpenAI client
│   ├── supabase.ts       # Supabase client
│   ├── theme-provider.tsx # Theme management
│   └── utils.ts          # Utility functions
├── public/               # Static assets
│   ├── favicon files     # App icons
│   └── site.webmanifest  # PWA manifest
├── scripts/               # Utility scripts
│   └── verify-database-optimizations.sql  # Database security & performance verification
├── supabase/             # Database schema
│   └── schema.sql        # PostgreSQL schema (includes security fixes & performance optimizations)
├── types/                # TypeScript definitions
│   └── task.ts           # Task type definitions
├── env.example           # Environment variables template (local dev)
├── env.docker.example    # Environment variables template (Docker)
├── vercel.json           # Vercel deployment configuration
└── Configuration files   # Project configuration
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Tests with coverage
npm run test:coverage

# Tests in watch mode
npm run test:watch

# Type checking
npm run type-check
```

## 📈 Performance

### **Implemented Optimizations**
- **Lazy Loading**: Components loaded on demand
- **Memoization**: Re-render optimization
- **Caching**: Intelligent cache for AI responses
- **Bundle Splitting**: Code divided by routes
- **Image Optimization**: Automatic image optimization
- **Fallback Systems**: Backup systems for AI and translation
- **Error Boundaries**: Robust AI error handling

### **Build Metrics**
```
Route (app)                              Size     First Load JS
┌ ○ /                                    98.6 kB         193 kB
├ ○ /_not-found                          873 B          88.1 kB
├ ○ /api/health                          0 B                0 B
├ ƒ /api/process-task                    0 B                0 B
├ ○ /auth/auth-code-error                1.65 kB          96 kB
└ ƒ /auth/callback                       0 B                0 B
```

## 🤝 Contributing

### **How to Contribute**
1. Fork the repository
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### **Contribution Guidelines**
- Follow existing code conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- **OpenAI** for GPT-4 and natural language processing capabilities
- **Supabase** for database infrastructure and authentication
- **Vercel** for the deployment platform
- **Next.js Team** for the React framework
- **Tailwind CSS** for the design system
- **Framer Motion** for smooth animations

## 📞 Support

- **Email**: waldemar@szemat.pro
- **Issues**: [GitHub Issues](https://github.com/SzematPro/ai-task-manager/issues)

---

<div align="center">
  <p>Made with ❤️</p>
  <p>⭐ If you like this project, give it a star!</p>
</div>