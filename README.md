# AI Task Manager

A minimalist productivity app powered by AI that transforms natural language into structured tasks. Built with Next.js, Tailwind CSS, OpenAI API, and Supabase.

## Features

- 🤖 **AI-Powered Task Processing**: Type tasks in natural language and let AI structure them automatically
- 📱 **Responsive Design**: Beautiful, modern UI that works on all devices
- 🔐 **Secure Authentication**: Google OAuth integration with Supabase Auth
- 📊 **Task Analytics**: Track your productivity with detailed statistics
- 🎯 **Smart Filtering**: Filter tasks by status, priority, and category
- ⚡ **Real-time Updates**: Instant synchronization across devices
- 🌙 **Dark Mode**: Automatic dark/light mode support

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI, Radix UI
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **AI**: OpenAI GPT-4 API
- **Animations**: Framer Motion
- **State Management**: Zustand

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the SQL schema from `supabase/schema.sql` in your Supabase SQL editor
   - Enable Google OAuth in Supabase Auth settings
   - Add your domain to the allowed redirect URLs

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
ai-task-manager/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── providers.tsx     # Context providers
│   ├── task-input.tsx    # Task input component
│   ├── task-list.tsx     # Task list component
│   └── ...
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   ├── supabase.ts       # Supabase client
│   ├── openai.ts         # OpenAI integration
│   └── utils.ts          # Helper functions
├── types/                 # TypeScript type definitions
└── supabase/             # Database schema
```

## Key Features

### AI Task Processing

The app uses OpenAI's GPT-4 to process natural language input and extract:
- Task title
- Description (if needed)
- Due date (if mentioned)
- Priority level (low, medium, high)
- Category (if inferable)

Example inputs:
- "Remind me to email Ana tomorrow" → Task with due date
- "Buy groceries this weekend" → Task with due date
- "Urgent: Fix the bug in production" → High priority task

### Task Management

- **Create**: Add tasks via natural language or structured form
- **Update**: Edit task details inline
- **Delete**: Remove tasks with confirmation
- **Toggle**: Mark tasks as complete/incomplete
- **Filter**: Filter by status, priority, and category

### Authentication

- Google OAuth integration
- Secure session management
- User-specific data isolation

## API Endpoints

### Tasks API

- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task

### AI Processing

- `POST /api/process-task` - Process natural language input

## Database Schema

### Tasks Table

```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')),
  status TEXT CHECK (status IN ('pending', 'in_progress', 'completed')),
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `OPENAI_API_KEY` | OpenAI API key | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please:
1. Check the [Issues](https://github.com/your-repo/ai-task-manager/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## Roadmap

- [ ] Task templates and recurring tasks
- [ ] Team collaboration features
- [ ] Mobile app (React Native)
- [ ] Advanced AI features (task suggestions, time estimation)
- [ ] Integration with calendar apps
- [ ] Offline support with sync
- [ ] Advanced analytics and reporting
