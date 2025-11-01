# QSOL Web Template - Technical Notes

## What's Included

This is a production-ready React + Tailwind template following QSOL (Quick & Simple Open-source Library) principles, adapted for modern web development.

### Core Philosophy
- **Small**: Components < 200 lines, pages < 400 lines
- **Fast**: Renders < 100ms, bundle < 200KB gzipped
- **Clear**: Explicit over implicit, obvious over clever
- **Focused**: One component does one thing well

## Files Included

### Documentation
- **README.md** - Philosophy, constraints, patterns, examples
- **QUICK_START.md** - 30-second setup, common patterns, copy-paste examples
- **Guidelines.md** - Detailed development guidelines with DO/DON'T examples
- **LICENSE.md** - MIT License (GitHub-recognizable)
- **TEMPLATE_NOTES.md** - This file

### Code
- **App.tsx** - Working demo showcasing principles (checklist + constraints viewer)
- **components/ui/** - 40+ shadcn/ui components (pre-built, production-ready)
- **styles/globals.css** - Tailwind v4 config + design tokens

## Key Technical Decisions

### 1. Component Size Limits
Enforced through guidelines:
- Single components: < 200 lines
- Page components: < 400 lines  
- Custom hooks: < 100 lines

**Why**: Comprehensible in one sitting, easier to test, maintain, and reason about.

### 2. Explicit Styling
**CRITICAL**: shadcn/ui components have built-in defaults that must be overridden:

```tsx
// Card defaults: gap-6
// CardHeader defaults: px-6 pt-6 gap-1.5
// CardContent defaults: px-6, [&:last-child]:pb-6
// CardTitle defaults: leading-none

// ✅ Always override explicitly:
<Card className="gap-0">
  <CardHeader className="px-6 pt-6 pb-0 gap-0">
    <CardTitle className="leading-normal">Title</CardTitle>
  </CardHeader>
  <CardContent className="px-6 pb-6 pt-4">
    Content
  </CardContent>
</Card>
```

This gives you full control and prevents unexpected spacing issues.

### 3. No Typography Classes (Usually)
Per Tailwind v4 guidelines in this environment:
- **Avoid**: `text-2xl`, `font-bold`, `leading-none` (unless specifically needed)
- **Why**: `globals.css` has default typography for h1-h6, p, label, button, input
- **Override**: Only when you need different styling than the defaults

### 4. Dependency Philosophy
```
Decision tree:
1. Can I use native JS? → Use native
2. Can I use React built-in? → Use React
3. Can I use Tailwind? → Use Tailwind
4. Can I use shadcn/ui? → Use shadcn
5. Can I write in < 50 lines? → Write custom
6. Is it well-maintained? → Consider adding
```

**Always OK:**
- lucide-react (icons)
- clsx (className merging, 200 bytes)
- date-fns (tree-shakeable)

**Question first:**
- recharts (70KB+)
- framer-motion (50KB+)

**Avoid:**
- lodash → use native array methods
- axios → use fetch
- moment.js → use date-fns or native Date

### 5. State Management
1. **Local state first** - useState in component
2. **Lift state up** - When 2+ components need it
3. **Context** - For deep trees (theme, auth)
4. **External state** - Only when 10+ components share state

No Redux/Zustand unless absolutely necessary.

## Common Patterns

### Form with Validation
```tsx
import { useState } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

function ContactForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Invalid email');
      return;
    }
    // Submit logic
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email@example.com"
      />
      {error && <p className="text-red-600">{error}</p>}
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Data Fetching
```tsx
import { useState, useEffect } from 'react';

function DataDisplay() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => {
        if (!res.ok) throw new Error('Failed');
        return res.json();
      })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  return <div>{/* Render data */}</div>;
}
```

### Tabs/Navigation
```tsx
import { useState } from 'react';
import { Button } from './components/ui/button';

function TabExample() {
  const [tab, setTab] = useState<'a' | 'b'>('a');

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <Button 
          variant={tab === 'a' ? 'default' : 'outline'}
          onClick={() => setTab('a')}
        >
          Tab A
        </Button>
        <Button 
          variant={tab === 'b' ? 'default' : 'outline'}
          onClick={() => setTab('b')}
        >
          Tab B
        </Button>
      </div>
      {tab === 'a' ? <TabAContent /> : <TabBContent />}
    </div>
  );
}
```

## File Organization

```
project/
├── App.tsx                    # Main entry, routing only
├── components/
│   ├── TaskCard.tsx          # Feature components
│   ├── TaskForm.tsx
│   ├── TaskList.tsx
│   └── ui/                   # shadcn components (don't modify)
├── hooks/
│   └── useLocalStorage.ts    # Custom hooks < 100 lines
├── lib/
│   └── utils.ts              # Pure functions only
└── styles/
    └── globals.css           # Design tokens, no component styles
```

**Rules:**
- One component per file
- PascalCase for components (`TaskCard.tsx`)
- camelCase for hooks (`useAuth.ts`)
- camelCase for utils (`formatDate.ts`)
- kebab-case for types (`user-types.ts`)

## Code Review Checklist

Before pushing to GitHub:

- [ ] All components < 200 lines (pages < 400)
- [ ] Props have TypeScript interfaces
- [ ] No unused imports/variables
- [ ] Event handlers named `handleX` (not `onX` or `h`)
- [ ] No magic numbers/strings (use const)
- [ ] List items have stable keys (from data.id, not index)
- [ ] No console.logs
- [ ] Dependencies justified
- [ ] Someone new understands in < 5 min

## Anti-Patterns to Avoid

❌ **God components** (one file does everything)
❌ **Prop drilling** (passing props through 5+ levels)
❌ **Magic values** (status === 3, setTimeout(fn, 5000))
❌ **Premature abstraction** (creating systems before you need them)
❌ **Dependency soup** (50+ npm packages)
❌ **Relying on component defaults** (not overriding shadcn spacing)

## Performance Tips

1. **Lazy load heavy features:**
   ```tsx
   const Charts = lazy(() => import('./components/Charts'));
   ```

2. **Memoize expensive renders:**
   ```tsx
   const List = React.memo(({ items }) => ...);
   ```

3. **Debounce user input:**
   ```tsx
   const debouncedValue = useDebounce(inputValue, 300);
   ```

4. **Use stable keys:**
   ```tsx
   items.map(item => <Item key={item.id} />)
   ```

## Measuring Success

Your app follows QSOL if:

✅ New developer understands codebase in < 1 hour  
✅ Adding a feature takes minutes, not hours  
✅ Bundle size < 200KB gzipped  
✅ First render < 100ms  
✅ No "Where is this used?" confusion  
✅ No "What does this do?" confusion  

## Publishing to GitHub

1. **Initialize repo:**
   ```bash
   git init
   git add .
   git commit -m "Initial QSOL web template"
   ```

2. **Create GitHub repo** (don't initialize with README/LICENSE)

3. **Push:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/qsol-web-template.git
   git branch -M main
   git push -u origin main
   ```

4. **Add topics:** `react`, `tailwind`, `template`, `qsol`, `minimal`, `fast`

5. **Enable GitHub Pages** (optional) to demo the App.tsx

## Community Guidelines

When sharing this template:

1. **Fork, don't clone** - Let people customize
2. **Credit appreciated** - Link back to original QSOL principles
3. **Share improvements** - PRs welcome for guidelines/docs
4. **Keep it minimal** - Resist feature creep

## License

MIT License - Use freely, modify as needed, credit appreciated.

See LICENSE.md for full text.

---

**Remember: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away."**

Built with QSOL principles for Figma Make environment.
