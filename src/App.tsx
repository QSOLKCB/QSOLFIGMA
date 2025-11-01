import { useState } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Separator } from './components/ui/separator';
import { CheckCircle2, Zap, Package, Code } from 'lucide-react';

// Example QSOL-compliant component (< 200 lines)
export default function App() {
  const [activeTab, setActiveTab] = useState<'principles' | 'checklist'>('principles');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4">v1.0</Badge>
          <h1 className="mb-4">QSOL Web Template</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A minimal React + Tailwind starter for building <strong>fast, focused web applications</strong> that respect your users and your sanity.
          </p>
        </div>

        {/* Core Principles Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <PrincipleCard
            icon={<Package className="w-8 h-8" />}
            title="Small"
            description="Components < 200 lines"
            color="bg-blue-50 text-blue-600"
          />
          <PrincipleCard
            icon={<Zap className="w-8 h-8" />}
            title="Fast"
            description="Render < 100ms"
            color="bg-yellow-50 text-yellow-600"
          />
          <PrincipleCard
            icon={<Code className="w-8 h-8" />}
            title="Clear"
            description="Obvious > clever"
            color="bg-purple-50 text-purple-600"
          />
          <PrincipleCard
            icon={<CheckCircle2 className="w-8 h-8" />}
            title="Focused"
            description="One thing well"
            color="bg-green-50 text-green-600"
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'principles' ? 'default' : 'outline'}
            onClick={() => setActiveTab('principles')}
          >
            Core Constraints
          </Button>
          <Button
            variant={activeTab === 'checklist' ? 'default' : 'outline'}
            onClick={() => setActiveTab('checklist')}
          >
            Quick Checklist
          </Button>
        </div>

        {/* Content Area */}
        {activeTab === 'principles' ? (
          <ConstraintsSection />
        ) : (
          <ChecklistSection />
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500">
          <Separator className="my-8" />
          <p className="italic">
            "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away."
          </p>
          <p className="mt-2">— Antoine de Saint-Exupéry</p>
        </div>
      </div>
    </div>
  );
}

// Sub-components (following single-responsibility principle)

interface PrincipleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

function PrincipleCard({ icon, title, description, color }: PrincipleCardProps) {
  return (
    <Card className="gap-0">
      <CardContent className="pt-6 pb-6 px-6">
        <div className={`inline-flex p-3 rounded-lg mb-3 ${color}`}>
          {icon}
        </div>
        <h3 className="mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}

function ConstraintsSection() {
  const constraints = [
    {
      category: 'Component Size',
      rules: [
        { label: 'Single components', value: '< 200 lines', pass: true },
        { label: 'Page components', value: '< 400 lines', pass: true },
        { label: 'Custom hooks', value: '< 100 lines', pass: true },
      ]
    },
    {
      category: 'Performance',
      rules: [
        { label: 'First render', value: '< 100ms', pass: true },
        { label: 'Bundle size', value: '< 200KB gzipped', pass: true },
        { label: 'Re-renders', value: 'Minimal', pass: true },
      ]
    },
    {
      category: 'Dependencies',
      rules: [
        { label: 'Always use', value: 'React, Tailwind, shadcn/ui', pass: true },
        { label: 'Use sparingly', value: 'recharts, date-fns', pass: true },
        { label: 'Avoid', value: 'lodash, moment, axios', pass: false },
      ]
    },
  ];

  return (
    <div className="space-y-6">
      {constraints.map((section) => (
        <Card key={section.category} className="gap-0">
          <CardHeader className="px-6 pt-6 pb-0 gap-0">
            <CardTitle className="leading-normal mb-4">{section.category}</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="space-y-3">
              {section.rules.map((rule, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-gray-700">{rule.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900">{rule.value}</span>
                    {rule.pass ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <span className="text-red-600">✕</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ChecklistSection() {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const checklist = [
    'Component is < 200 lines (or < 400 for pages)',
    'Props have explicit TypeScript types',
    'No unused imports or variables',
    'Event handlers have clear names (handleX)',
    'No magic numbers or strings',
    'Keys on list items are stable',
    'No console.logs left in code',
    'Dependencies are justified',
    'Component does ONE thing well',
    'Someone new could understand it in < 5 min',
  ];

  const toggleCheck = (idx: number) => {
    const newChecked = new Set(checked);
    if (newChecked.has(idx)) {
      newChecked.delete(idx);
    } else {
      newChecked.add(idx);
    }
    setChecked(newChecked);
  };

  const progress = Math.round((checked.size / checklist.length) * 100);

  return (
    <Card className="gap-0">
      <CardHeader className="px-6 pt-6 pb-0 gap-2">
        <CardTitle className="leading-normal">Code Review Checklist</CardTitle>
        <CardDescription className="text-muted-foreground">
          Before submitting code, verify these requirements
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-6">
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-700">Progress</span>
            <span className="text-gray-900">{progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {checklist.map((item, idx) => (
            <label
              key={idx}
              className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
            >
              <input
                type="checkbox"
                checked={checked.has(idx)}
                onChange={() => toggleCheck(idx)}
                className="mt-1 w-4 h-4 text-blue-600 rounded"
              />
              <span className={checked.has(idx) ? 'text-gray-500 line-through' : 'text-gray-700'}>
                {item}
              </span>
            </label>
          ))}
        </div>

        {progress === 100 && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle2 className="w-5 h-5" />
              <span>Ready to ship! 🚀</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
