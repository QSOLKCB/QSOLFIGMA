# QSOL Web Development Guidelines

## Constraints Summary

| Category | Constraint | Reason |
|----------|-----------|---------|
| **Component Size** | < 200 lines | Comprehensible in one sitting |
| **Page Components** | < 400 lines | Maintainable complexity |
| **Custom Hooks** | < 100 lines | Single responsibility |
| **First Render** | < 100ms | User perception of instant |
| **Bundle Size** | < 200KB gzipped | Fast load on slow networks |
| **Dependencies** | Justify each one | Every import is technical debt |

## Component Patterns

### File Naming
```
✅ GOOD:
UserCard.tsx          // PascalCase for components
useAuth.ts            // camelCase with 'use' prefix for hooks
formatDate.ts         // camelCase for utilities
user-types.ts         // kebab-case for types/constants

❌ BAD:
usercard.tsx          // Inconsistent casing
UserCardComponent.tsx // Redundant 'Component' suffix
utils.ts              // Too generic
```

### Component Structure
```tsx
// Template: Every component follows this structure

import { useState } from 'react';
import { Button } from './ui/button';

// 1. Types/Interfaces first
interface ComponentProps {
  title: string;
  onAction: () => void;
}

// 2. Component definition
export function Component({ title, onAction }: ComponentProps) {
  // 3. Hooks at the top
  const [isOpen, setIsOpen] = useState(false);

  // 4. Derived values
  const displayTitle = title.toUpperCase();

  // 5. Event handlers
  const handleClick = () => {
    setIsOpen(true);
    onAction();
  };

  // 6. Early returns for loading/error states
  if (!title) return null;

  // 7. Main render
  return (
    <div>
      <h2>{displayTitle}</h2>
      <Button onClick={handleClick}>Action</Button>
    </div>
  );
}
```

### Prop Design
```tsx
// ✅ GOOD: Explicit, typed props
interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

// ❌ BAD: Generic, untyped props
interface TodoItemProps {
  data: any;
  handlers: any;
  config?: any;
}

// ✅ GOOD: Composition over configuration
<Modal>
  <ModalHeader>Title</ModalHeader>
  <ModalBody>Content</ModalBody>
</Modal>

// ❌ BAD: Props for everything
<Modal 
  title="Title" 
  content="Content"
  hasHeader={true}
  headerAlign="center"
  // ... 20 more props
/>
```

## State Management

### Local State First
```tsx
// ✅ GOOD: State lives where it's used
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// ✅ GOOD: Lift state only when 2+ components need it
function Parent() {
  const [sharedValue, setSharedValue] = useState('');
  return (
    <>
      <ComponentA value={sharedValue} onChange={setSharedValue} />
      <ComponentB value={sharedValue} />
    </>
  );
}
```

### Context for Deep Trees
```tsx
// ✅ GOOD: Context for theme, auth, user preferences
const ThemeContext = createContext<Theme>(defaultTheme);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ❌ BAD: Context for frequently changing data
// Don't put form state, API responses, or UI state in context
```

### When to Use External State
Only when you have:
- 10+ components sharing the same state
- Complex state interactions (e.g., undo/redo)
- DevTools requirements for debugging

Before adding Redux/Zustand, try:
1. Lift state up
2. Use Context
3. URL state (search params)
4. localStorage

## Performance Optimization

### Memoization
```tsx
// ✅ GOOD: Memoize expensive computations
const sortedItems = useMemo(
  () => items.sort((a, b) => a.date - b.date),
  [items]
);

// ✅ GOOD: Memoize expensive renders
const ItemList = React.memo(({ items }: { items: Item[] }) => {
  return <div>{items.map(item => <Item key={item.id} {...item} />)}</div>;
});

// ❌ BAD: Premature memoization
const simpleValue = useMemo(() => a + b, [a, b]); // Just do: const simpleValue = a + b;
```

### Lazy Loading
```tsx
// ✅ GOOD: Lazy load heavy features
import { lazy, Suspense } from 'react';

const AdminPanel = lazy(() => import('./components/AdminPanel'));
const Charts = lazy(() => import('./components/Charts'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isAdmin && <AdminPanel />}
    </Suspense>
  );
}
```

### List Rendering
```tsx
// ✅ GOOD: Stable keys from data
items.map(item => <Item key={item.id} {...item} />)

// ⚠️ OK: Index as key ONLY if list never reorders
staticList.map((item, i) => <Item key={i} {...item} />)

// ❌ BAD: Random/unstable keys
items.map(item => <Item key={Math.random()} {...item} />)
```

## Dependencies

### Decision Tree
```
Need a feature?
├─ Can I use native JS/browser API?
│  └─ YES: Use native (Array.map, fetch, Date)
├─ Can I use React built-in?
│  └─ YES: Use React (hooks, Context)
├─ Can I use Tailwind?
│  └─ YES: Use Tailwind (utilities)
├─ Can I use shadcn/ui?
│  └─ YES: Copy component from shadcn
├─ Can I write it in < 50 lines?
│  └─ YES: Write custom utility
└─ Is it complex/well-maintained library?
   └─ YES: Consider adding dependency
```

### Approved Libraries
**Always OK:**
- lucide-react (icons, tree-shakeable)
- clsx (className merging, 200 bytes)
- date-fns (tree-shakeable date utils)

**Question Before Using:**
- recharts (70KB+ for charts)
- framer-motion (50KB+ for animations)
- react-hook-form (complex forms only)

**Avoid:**
- moment.js (use date-fns or native Date)
- lodash (use native array/object methods)
- axios (use native fetch)
- jquery (you're using React!)

### Native Alternatives
```tsx
// ❌ BAD: Import lodash
import _ from 'lodash';
const unique = _.uniq(array);
const grouped = _.groupBy(items, 'category');

// ✅ GOOD: Use native JS
const unique = [...new Set(array)];
const grouped = items.reduce((acc, item) => {
  (acc[item.category] = acc[item.category] || []).push(item);
  return acc;
}, {});

// ❌ BAD: Import axios
import axios from 'axios';
const data = await axios.get('/api/users');

// ✅ GOOD: Use native fetch
const response = await fetch('/api/users');
const data = await response.json();
```

## Styling with Tailwind

### Utility-First Approach
```tsx
// ✅ GOOD: Tailwind utilities
<div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow">

// ⚠️ OK: Extract for repeated patterns (3+ uses)
// globals.css
.card { @apply p-6 bg-white rounded-lg shadow; }

// ❌ BAD: Inline styles (unless dynamic)
<div style={{ padding: '24px', background: 'white' }}>
```

### Conditional Classes
```tsx
// ✅ GOOD: Use clsx or template literals
import { clsx } from 'clsx';

<button className={clsx(
  'px-4 py-2 rounded',
  isActive && 'bg-blue-500',
  isDisabled && 'opacity-50 cursor-not-allowed'
)}>

// ✅ GOOD: Template literals for simple cases
<div className={`p-4 ${isOpen ? 'block' : 'hidden'}`}>
```

### Responsive Design
```tsx
// ✅ GOOD: Mobile-first responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// ✅ GOOD: Container patterns
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

## Error Handling

### Error Boundaries
```tsx
// ✅ GOOD: Wrap risky components
<ErrorBoundary fallback={<ErrorPage />}>
  <ThirdPartyComponent />
</ErrorBoundary>

// ✅ GOOD: User-friendly errors
function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1>Something went wrong</h1>
        <p className="text-gray-600">Please refresh the page</p>
      </div>
    </div>
  );
}
```

### Async Error Handling
```tsx
// ✅ GOOD: Handle fetch errors
const [data, setData] = useState<Data | null>(null);
const [error, setError] = useState<string | null>(null);
const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/data');
      if (!response.ok) throw new Error('Failed to fetch');
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
```

## Testing Philosophy

**Write tests for:**
- ✅ Complex business logic (pure functions)
- ✅ Critical user flows (checkout, auth)
- ✅ Bug fixes (regression tests)

**Don't test:**
- ❌ Implementation details
- ❌ Third-party library behavior
- ❌ Trivial components (simple display components)

**Keep it simple:**
```tsx
// ✅ GOOD: Test behavior, not implementation
test('adds item to cart', () => {
  const { getByText, getByRole } = render(<App />);
  const button = getByText('Add to Cart');
  fireEvent.click(button);
  expect(getByText('Cart (1)')).toBeInTheDocument();
});

// ❌ BAD: Testing implementation
test('calls useState when button clicked', () => {
  // Don't test React internals
});
```

## Code Review Checklist

Before submitting code:

- [ ] Component is < 200 lines (or < 400 for pages)
- [ ] Props have explicit TypeScript types
- [ ] No unused imports or variables
- [ ] Event handlers have clear names (handleX, not h or onX)
- [ ] No magic numbers/strings (use constants)
- [ ] Keys on list items are stable
- [ ] No console.logs left in code
- [ ] Dependencies are justified
- [ ] Component does ONE thing well
- [ ] Someone new could understand it in < 5 minutes

## Common Violations

### ❌ Violation: God Component
```tsx
// 800 lines of mixed concerns
function Dashboard() {
  // Auth logic
  // Data fetching
  // Charts
  // Forms
  // Navigation
  // Everything!
}
```
**Fix:** Split into smaller components: DashboardHeader, DashboardStats, DashboardCharts

### ❌ Violation: Prop Drilling
```tsx
<App>
  <Layout user={user}>
    <Sidebar user={user}>
      <Menu user={user}>
        <MenuItem user={user} />
      </Menu>
    </Sidebar>
  </Layout>
</App>
```
**Fix:** Use Context for deep trees

### ❌ Violation: Magic Values
```tsx
if (status === 3) { /* ... */ }
setTimeout(() => {}, 5000);
```
**Fix:** Named constants
```tsx
const STATUS_ACTIVE = 3;
const TOAST_DURATION_MS = 5000;
```

### ❌ Violation: Unnecessary Abstraction
```tsx
// You have ONE button that's red
<Button variant="danger" />

// Don't create a system for 20 button variants you'll never use
```
**Fix:** Just make it red: `<button className="bg-red-500">Delete</button>`

## Philosophy Reminders

1. **Start simple, add complexity only when needed**
   - Don't build for imaginary future requirements

2. **Code is a liability, not an asset**
   - The best code is no code
   - The second best code is simple code

3. **Optimize for deletion**
   - Can you remove this component?
   - Can you remove this prop?
   - Can you remove this dependency?

4. **Users feel bloat**
   - Every KB of JS is load time
   - Every re-render is jank
   - Every dependency is risk

5. **Clarity beats cleverness**
   - Boring code is good code
   - Obvious code is maintainable code

---

**Remember: You're not paid by lines of code. You're paid to solve problems simply.**
