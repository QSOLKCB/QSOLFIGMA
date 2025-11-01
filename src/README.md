# QSOL Web Template v1.0

> **"Small Components. Fast Renders. Zero Bloat."**

## Philosophy

A minimal React + Tailwind template for building **fast, focused web applications** that respect your users and your sanity.

Inspired by QSOL principles, adapted for modern web development:
- **Small is Beautiful** - Components under 200 lines, pages under 400 lines
- **Fast is Holy** - Instant renders, minimal re-renders, lazy loading
- **Local-First** - localStorage/IndexedDB over external APIs when possible
- **Clarity over Complexity** - Explicit props, clear naming, no magic

## Core Constraints

### 1. Component Size
- ✅ Single components: **< 200 lines**
- ✅ Page components: **< 400 lines**
- ✅ Custom hooks: **< 100 lines**
- ❌ If it's bigger, split it

### 2. Render Performance
- ✅ First render: **< 100ms** (target < 50ms)
- ✅ Use `React.memo()` for expensive components
- ✅ Lazy load routes and heavy components
- ❌ No unnecessary re-renders

### 3. Dependency Discipline
- ✅ Use built-in: React hooks, Tailwind, shadcn/ui
- ✅ Small libraries OK: lucide-react, date-fns, clsx
- ⚠️ Question medium libraries: recharts, framer-motion
- ❌ Avoid heavy libraries: moment.js, lodash (use native JS)

### 4. Clarity Rules
- ✅ One component per file
- ✅ Explicit prop types (TypeScript interfaces)
- ✅ Clear function names: `handleSubmit`, not `onS`
- ✅ Comments for "why", not "what"
- ❌ No magic numbers or strings

## File Structure

```
project/
├── App.tsx                      # Main entry, routing only
├── components/
│   ├── [Feature]Card.tsx        # Single-purpose components
│   ├── [Feature]Form.tsx
│   └── ui/                      # shadcn components (pre-built)
├── hooks/
│   └── use[Feature].ts          # Custom hooks < 100 lines
├── lib/
│   └── utils.ts                 # Pure functions only
└── styles/
    └── globals.css              # Tailwind + design tokens
```

## Quick Start Template

```tsx
// App.tsx - Minimal routing example
import { useState } from 'react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="p-8 max-w-md">
        <h1 className="mb-4">QSOL Web Template</h1>
        <p className="mb-4">Count: {count}</p>
        <Button onClick={() => setCount(c => c + 1)}>
          Increment
        </Button>
      </Card>
    </div>
  );
}
```

## Development Guidelines

### Component Design
```tsx
// ✅ GOOD: Clear, focused, single-purpose
interface TaskCardProps {
  title: string;
  completed: boolean;
  onToggle: () => void;
}

export function TaskCard({ title, completed, onToggle }: TaskCardProps) {
  return (
    <div className="border rounded p-4">
      <input type="checkbox" checked={completed} onChange={onToggle} />
      <span>{title}</span>
    </div>
  );
}

// ❌ BAD: Too much responsibility, unclear props
function TaskManager({ data, callbacks, config }: any) {
  // 500 lines of mixed concerns...
}
```

### State Management
```tsx
// ✅ GOOD: Local state for local concerns
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// ✅ GOOD: Lift state only when needed
function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  return (
    <>
      <TodoForm onAdd={(todo) => setTodos([...todos, todo])} />
      <TodoList items={todos} />
    </>
  );
}

// ❌ BAD: Global state for everything
// Don't use Redux/Zustand unless you have 10+ components sharing state
```

### Performance Patterns
```tsx
// ✅ GOOD: Memoize expensive renders
const ExpensiveList = React.memo(({ items }: { items: Item[] }) => {
  return <div>{items.map(item => <ExpensiveItem key={item.id} {...item} />)}</div>;
});

// ✅ GOOD: Lazy load heavy features
const HeavyChart = lazy(() => import('./components/HeavyChart'));

// ✅ GOOD: Debounce user input
const [query, setQuery] = useState('');
const debouncedQuery = useDebounce(query, 300);
```

## Sacred Rules

1. **If it doesn't render, it doesn't exist** - No speculative code
2. **Premature abstraction is evil** - Copy-paste twice, abstract on third use
3. **Dependencies are debt** - Every import is a liability
4. **Users feel bloat** - Fast load = happy users
5. **Code is read 10x more than written** - Optimize for clarity

## Anti-Patterns to Avoid

❌ **Over-abstraction**
```tsx
// BAD: Generic component that does everything
<DataDisplay type="list" variant="card" renderMode="virtualized" />
```

❌ **Prop drilling hell**
```tsx
// BAD: Passing props through 5+ levels
<A><B><C><D><E prop={value} /></D></C></B></A>
// Use context or composition instead
```

❌ **God components**
```tsx
// BAD: 800-line component that does everything
function DashboardMegaComponent() { /* ... */ }
```

❌ **Dependency soup**
```tsx
// BAD: 50+ npm packages for a simple app
import _ from 'lodash';
import moment from 'moment';
import axios from 'axios';
// ... use native fetch, Date, array methods instead
```

## Checklist for New Components

Before creating a component, ask:

- [ ] Is it < 200 lines? (If no, split it)
- [ ] Does it have clear, typed props?
- [ ] Does it do ONE thing well?
- [ ] Can someone understand it in 2 minutes?
- [ ] Does it avoid unnecessary re-renders?
- [ ] Are dependencies justified?

## Tools & Stack

**Core (Always):**
- React 18+ (hooks, suspense)
- Tailwind CSS v4 (utility-first)
- TypeScript (type safety)

**UI Components:**
- shadcn/ui (copy-paste components)
- lucide-react (icons)

**⚠️ Important: Component Defaults**
shadcn/ui components have built-in spacing (e.g., Card has `gap-6`, CardHeader has `px-6 pt-6`). Always explicitly override these with your own classes when needed to maintain full control over layout.

```tsx
// ✅ Explicit spacing control
<Card className="gap-0">
  <CardContent className="px-6 py-6">...</CardContent>
</Card>
```

**When Needed (Sparingly):**
- recharts (charts/graphs)
- date-fns (date manipulation)
- zod (form validation)

**Avoid Unless Essential:**
- Redux, MobX, Zustand (use React Context)
- Axios (use native fetch)
- Lodash (use native array methods)
- Moment.js (use date-fns or native Date)

## Example: Building a Todo App

```tsx
// ✅ QSOL-compliant implementation (3 files, ~250 total lines)

// App.tsx (50 lines)
import { useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const handleToggle = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="mb-6">Todo List</h1>
        <TodoForm onAdd={handleAdd} />
        <TodoList items={todos} onToggle={handleToggle} onDelete={handleDelete} />
      </div>
    </div>
  );
}

// components/TodoForm.tsx (40 lines)
// components/TodoList.tsx (60 lines)
// components/TodoItem.tsx (50 lines)
```

## Measuring Success

Your app follows QSOL principles if:

✅ New developers understand the codebase in < 1 hour  
✅ Adding a feature takes minutes, not hours  
✅ Bundle size is < 200KB (gzipped)  
✅ First render is < 100ms  
✅ No "Where is this used?" moments  
✅ No "What does this do?" confusion  

## Contributing

This template is designed to be forked and modified. Make it yours:

1. Clone and customize for your needs
2. Remove components you don't need
3. Add utilities that match your patterns
4. Keep the principles, adapt the implementation

## License

MIT - Use freely, credit appreciated

---

*"Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away."* - Antoine de Saint-Exupéry

**Built with QSOL principles. Adapted for modern web development.**
