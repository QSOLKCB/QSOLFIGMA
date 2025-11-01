# Quick Start Guide

## 30-Second Setup

1. **Fork this template** (click "Fork" on GitHub)
2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/qsol-web-template.git
   cd qsol-web-template
   ```
3. **Start building** - Modify `App.tsx` and create components in `/components`

That's it! No npm install, no build step needed in Figma Make.

## Your First Component

Create `/components/TaskCard.tsx`:

```tsx
import { Button } from './ui/button';
import { Card } from './ui/card';

interface TaskCardProps {
  title: string;
  completed: boolean;
  onToggle: () => void;
}

export function TaskCard({ title, completed, onToggle }: TaskCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggle}
          className="w-5 h-5"
        />
        <span className={completed ? 'line-through text-gray-500' : ''}>
          {title}
        </span>
      </div>
    </Card>
  );
}
```

Use it in `App.tsx`:

```tsx
import { useState } from 'react';
import { TaskCard } from './components/TaskCard';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Read README', completed: true },
    { id: 2, title: 'Build something', completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto space-y-4">
        <h1 className="mb-6">My Tasks</h1>
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            title={task.title}
            completed={task.completed}
            onToggle={() => toggleTask(task.id)}
          />
        ))}
      </div>
    </div>
  );
}
```

## Available Components (shadcn/ui)

You have 40+ pre-built components in `/components/ui`:

**Common:**
- `button`, `card`, `input`, `label`, `badge`
- `dialog`, `sheet`, `drawer` (modals)
- `tabs`, `accordion`, `collapsible`
- `table`, `pagination`
- `form`, `select`, `checkbox`, `switch`

**Advanced:**
- `chart` (recharts integration)
- `calendar`, `date-picker`
- `command` (search/command palette)
- `carousel`, `scroll-area`

**⚠️ Important: Override Component Defaults**

shadcn/ui components have built-in spacing. Always explicitly set your spacing:

```tsx
// Card has gap-6 by default, CardHeader has px-6 pt-6, CardContent has px-6
<Card className="gap-0">
  <CardHeader className="px-6 pt-6 pb-0">
    <CardTitle className="leading-normal">Title</CardTitle>
  </CardHeader>
  <CardContent className="px-6 pb-6 pt-4">
    Content
  </CardContent>
</Card>
```

**Example:**
```tsx
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';
import { Badge } from './components/ui/badge';
```

## Icons (lucide-react)

```tsx
import { Check, X, Plus, Trash, Edit, Search, Settings } from 'lucide-react';

<Button>
  <Plus className="w-4 h-4 mr-2" />
  Add Item
</Button>
```

Browse all icons: [lucide.dev](https://lucide.dev)

## Styling with Tailwind

```tsx
// Spacing
className="p-4 px-6 py-2 m-4 mx-auto gap-4"

// Layout
className="flex items-center justify-between"
className="grid grid-cols-3 gap-4"

// Colors
className="bg-blue-500 text-white"
className="bg-gray-100 text-gray-900"

// Responsive
className="text-sm md:text-base lg:text-lg"
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// States
className="hover:bg-gray-100 active:bg-gray-200"
className="focus:ring-2 focus:ring-blue-500"
```

## Common Patterns

### Form with State
```tsx
import { useState } from 'react';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';

function TodoForm({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task..."
      />
      <Button type="submit">Add</Button>
    </form>
  );
}
```

### Modal/Dialog
```tsx
import { useState } from 'react';
import { Button } from './components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './components/ui/dialog';

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
          <p>Dialog content goes here</p>
        </DialogContent>
      </Dialog>
    </>
  );
}
```

### Loading State
```tsx
import { useState, useEffect } from 'react';

function DataDisplay() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;

  return <div>{JSON.stringify(data)}</div>;
}
```

## Best Practices Reminder

✅ **DO:**
- Keep components < 200 lines
- Use TypeScript types for props
- One component per file
- Clear function names
- Extract reusable logic to hooks

❌ **DON'T:**
- Create god components
- Pass props through 5+ levels
- Use magic numbers/strings
- Import unused libraries
- Premature optimization

## Next Steps

1. **Read the full README.md** - Understand the philosophy
2. **Check Guidelines.md** - Learn the constraints
3. **Build something small** - Todo list, calculator, timer
4. **Iterate** - Start simple, add complexity only when needed

## Getting Help

- Read the code - It's designed to be self-explanatory
- Check shadcn/ui docs - [ui.shadcn.com](https://ui.shadcn.com)
- Review guidelines - `/guidelines/Guidelines.md`

---

**Remember: Start simple. Add complexity only when needed. Optimize for deletion.**
