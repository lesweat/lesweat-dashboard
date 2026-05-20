import { useState, useEffect } from 'react';

const todayStr = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

// ─── INITIAL DATA ─────────────────────────────────────────────────────────────

const initialTasks = {
  mustDo: [
    { id: 1, text: 'Post on social', time: '30-45 min', done: false },
    {
      id: 2,
      text: 'Voiceover edits on 2T exercise-only videos',
      time: '30-45 min',
      done: false,
    },
    {
      id: 3,
      text: 'Build Agent 1',
      time: 'ongoing',
      note: 'LSTV Strategy chat',
      done: false,
    },
  ],
  carryOver: [
    {
      id: 4,
      text: 'Schedule June–Sept community prompts',
      time: '30 min',
      note: '⚠️ Due May 15',
      done: false,
    },
    {
      id: 5,
      text: 'Schedule June–mid Aug LSTV Workouts of the Week',
      time: '45-60 min',
      note: '⚠️ Due May 15',
      done: false,
    },
    {
      id: 6,
      text: 'Check Klaviyo users',
      time: '15 min',
      note: '⚠️ Due May 15',
      done: false,
    },
    {
      id: 7,
      text: 'Schedule 10 more YouTube regular videos through Sept',
      time: '30 min',
      done: false,
    },
    {
      id: 8,
      text: 'Edit + schedule 23 YouTube Shorts through Sept',
      time: 'big lift',
      done: false,
    },
  ],
  filming: [
    {
      id: 9,
      text: '3x Third Trimester Strength workouts',
      time: '2-3 hrs',
      done: false,
    },
    {
      id: 10,
      text: '2x 15-minute quickie workouts',
      time: '2-3 hrs',
      done: false,
    },
  ],
};

const initialHabits = [
  {
    id: 'h1',
    text: 'GGS study — next chapter',
    time: '30-60 min',
    tag: 'CSCS',
  },
  {
    id: 'h2',
    text: 'Tag 1 challenge with LSTV callout phrase',
    time: '10 min',
    tag: 'App Growth',
  },
  {
    id: 'h3',
    text: 'Reply to 3 IG comments or DMs',
    time: '10 min',
    tag: 'Social',
  },
  {
    id: 'h4',
    text: 'Watch 1 Opus AI tutorial',
    time: '15 min',
    tag: 'Automation',
  },
  {
    id: 'h5',
    text: 'Research iPostal1 NYC signup',
    time: '15 min',
    tag: 'Admin',
  },
  {
    id: 'h6',
    text: "Check GA4 Realtime — who's on the site?",
    time: '5 min',
    tag: 'Analytics',
  },
  {
    id: 'h7',
    text: 'Draft one social caption in Notes app',
    time: '10 min',
    tag: 'Social',
  },
  {
    id: 'h8',
    text: 'Review 1 workout for voiceover edit',
    time: '15 min',
    tag: 'Content',
  },
  {
    id: 'h9',
    text: 'Check Uscreen community for unanswered posts',
    time: '10 min',
    tag: 'Community',
  },
  {
    id: 'h10',
    text: 'Add one T3 exercise to the exercise list',
    time: '5 min',
    tag: 'Programming',
  },
];

const tagColors = {
  CSCS: { bg: 'rgba(74,108,247,0.18)', text: '#7B9FFF' },
  'App Growth': { bg: 'rgba(229,62,62,0.18)', text: '#FC8181' },
  Social: { bg: 'rgba(56,161,105,0.18)', text: '#68D391' },
  Automation: { bg: 'rgba(214,158,46,0.18)', text: '#F6C944' },
  Admin: { bg: 'rgba(128,90,213,0.18)', text: '#B794F4' },
  Analytics: { bg: 'rgba(49,151,149,0.18)', text: '#4FD1C5' },
  Content: { bg: 'rgba(221,107,32,0.18)', text: '#F6AD55' },
  Community: { bg: 'rgba(90,103,216,0.18)', text: '#A3BFFA' },
  Programming: { bg: 'rgba(39,103,73,0.18)', text: '#68D391' },
};

const lstvContent = [
  {
    category: '🎬 Filming Queue',
    items: [
      '3x Third Trimester Strength workouts (this week)',
      '2x 15-minute quickie workouts (this week)',
      'June challenge — 6-8 workouts (Low Intensity High HIIT)',
      'Free bundle IG reel',
    ],
  },
  {
    category: '✂️ Editing',
    items: ['Voiceover edits on 2T exercise-only videos (ongoing)'],
  },
  {
    category: '📅 Scheduling / Uploads',
    items: [
      'Schedule June–mid August LSTV Workouts of the Week (due May 15)',
      'Create June challenge program in Uscreen',
      '2T Strength program — in Uscreen ✅',
    ],
  },
  {
    category: '🗓️ Monthly Content',
    items: [
      'Deep Cuts — ready through September ✅',
      'Trending Now — live on 15th each month',
      'Featured Challenges — update 1st of month',
      'Community prompts — through August ✅ (September needed)',
    ],
  },
];

const socialContent = [
  {
    category: '📱 Posting Cadence',
    items: [
      '3-4 posts per week — building the muscle',
      'Stories daily — tone locked, just needs reps',
      'Promote new LSTV YouTube workout 1x/week via stories',
      'IMPO series (In My Pregnant Opinion) — ongoing',
    ],
  },
  {
    category: '🎥 Content to Film',
    items: [
      'Free bundle IG reel (filmed ✅ — post it!)',
      'Batch social content — 3-6 pieces per filming session',
      'Talking-to-camera reels (AI, prenatal, industry hot takes)',
      'B-roll: filming days, bump, workouts in progress',
    ],
  },
  {
    category: '✅ Content Pillars',
    items: [
      'Prenatal/postnatal expertise — current differentiator',
      'Industry veteran POV (13+ years)',
      'App founder credibility — behind the scenes',
      'IMPO — strong personal perspective content',
    ],
  },
  {
    category: '🔗 Every Post CTA',
    items: [
      'Drive to Le Sweat TV — $9.99 first month',
      'Free bundle → lesweattv.com',
      'Link in bio → Linktree',
    ],
  },
];

const youtubeContent = [
  {
    category: '📺 Long Form (Sundays 6pm ET)',
    items: [
      'Scheduled through June 21 ✅',
      'Need 10 more to fill through end of September',
      'Pull from existing 500+ workout library',
      'Every video CTA → Le Sweat TV $9.99 first month',
    ],
  },
  {
    category: '📱 Shorts (Thursdays)',
    items: [
      'Last Short: April 22',
      'Need 23 more Shorts through end of September',
      'Edit from existing workout footage',
      'Batch edit sessions needed — big lift',
    ],
  },
  {
    category: '📊 Analytics (check Fridays)',
    items: [
      'Views + watch time trend',
      'Click-through rate to Le Sweat TV',
      'Which videos are converting subscribers',
      'Revisit strategy: week of March 24 ✅',
    ],
  },
];

const upcomingReminders = [
  {
    date: 'May 15',
    text: 'HARD DEADLINE — June-Sept content + community prompts + Klaviyo users',
    urgent: true,
  },
  { date: 'May 20', text: 'Deep Cuts July/Aug/Sept reminder' },
  {
    date: 'May 25-28',
    text: 'Drop new Deep Cuts data — pull fresh from Uscreen',
  },
  {
    date: 'Aug 1',
    text: 'Le Sweat Insurance revisit — NEXT Insurance + Hiscox',
  },
  { date: 'Mid-Sept', text: 'Build new Deep Cuts — pull fresh Uscreen data' },
  { date: 'Mid-Aug', text: 'Plan September Comeback Sale' },
  { date: 'End of Oct', text: 'Plan Black Friday Sale' },
  { date: 'Early Jan', text: "New Year's Sale" },
];

const weeklyRhythm = [
  {
    day: 'MON',
    tasks: 'LSTV community message (6am, pre-scheduled) · Week check-in',
  },
  {
    day: 'TUE–THU',
    tasks: 'Active work days · Film · Post · Create · GGS study',
  },
  { day: 'THU', tasks: 'Draft LSTV Workouts of the Week for Monday 6am' },
  {
    day: 'FRI',
    tasks: 'GA4 check · YouTube analytics · Schedule YouTube video · Post',
  },
  { day: 'SAT–SUN', tasks: 'Offline 🙌' },
];

const monthlyTasks = [
  {
    timing: '1st of month',
    emoji: '📅',
    tasks: [
      'Deep Cuts playlist goes live',
      'Monthly featured workouts theme',
      'Update Featured Challenges',
      'Add finances to tracker',
      'Income check-in — Stripe, Apple, Google Play',
    ],
  },
  {
    timing: '10th of month',
    emoji: '🗓️',
    tasks: ['Ideate Trending Now playlist (30 min)'],
  },
  {
    timing: '15th of month',
    emoji: '📋',
    tasks: ['Trending Now playlist goes live', 'Check Klaviyo users'],
  },
  {
    timing: 'Last week',
    emoji: '📨',
    tasks: [
      'Draft + send Monthly Recap email',
      'Ideate Deep Cuts for next month (26th)',
    ],
  },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function TaskItem({ task, onToggle }) {
  return (
    <div
      onClick={() => onToggle(task.id)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '13px 16px',
        borderRadius: '10px',
        cursor: 'pointer',
        background: task.done
          ? 'rgba(255,255,255,0.03)'
          : 'rgba(255,255,255,0.06)',
        marginBottom: '8px',
        border: task.done
          ? '1px solid rgba(255,255,255,0.06)'
          : '1px solid rgba(255,255,255,0.12)',
        transition: 'all 0.2s',
        opacity: task.done ? 0.4 : 1,
      }}
    >
      <div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          flexShrink: 0,
          marginTop: '2px',
          border: task.done
            ? '2px solid #C8F564'
            : '2px solid rgba(255,255,255,0.3)',
          background: task.done ? '#C8F564' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
        }}
      >
        {task.done && (
          <span
            style={{ color: '#1a1a1a', fontSize: '10px', fontWeight: 'bold' }}
          >
            ✓
          </span>
        )}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: '14px',
            color: task.done ? 'rgba(255,255,255,0.35)' : '#fff',
            textDecoration: task.done ? 'line-through' : 'none',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: '500',
            lineHeight: '1.4',
          }}
        >
          {task.text}
        </div>
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginTop: '5px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          {task.time && (
            <span
              style={{
                fontSize: '11px',
                color: '#C8F564',
                fontFamily: "'DM Mono', monospace",
                background: 'rgba(200,245,100,0.1)',
                padding: '2px 8px',
                borderRadius: '20px',
              }}
            >
              {task.time}
            </span>
          )}
          {task.note && (
            <span
              style={{
                fontSize: '11px',
                color: task.note.includes('⚠️')
                  ? '#FBD38D'
                  : 'rgba(255,255,255,0.4)',
                fontStyle: 'italic',
                fontFamily: "'DM Sans', sans-serif",
                background: task.note.includes('⚠️')
                  ? 'rgba(251,211,141,0.12)'
                  : 'transparent',
                padding: task.note.includes('⚠️') ? '2px 8px' : '0',
                borderRadius: '20px',
              }}
            >
              {task.note}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function HabitItem({ task, onToggle }) {
  const tagStyle = tagColors[task.tag] || {
    bg: 'rgba(255,255,255,0.1)',
    text: '#aaa',
  };
  return (
    <div
      onClick={() => onToggle(task.id)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '13px 16px',
        borderRadius: '10px',
        cursor: 'pointer',
        background: task.done
          ? 'rgba(255,255,255,0.03)'
          : 'rgba(255,255,255,0.06)',
        marginBottom: '8px',
        border: task.done
          ? '1px solid rgba(255,255,255,0.06)'
          : '1px solid rgba(255,255,255,0.12)',
        transition: 'all 0.2s',
        opacity: task.done ? 0.4 : 1,
      }}
    >
      <div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '6px',
          flexShrink: 0,
          marginTop: '2px',
          border: task.done
            ? '2px solid #C8F564'
            : '2px solid rgba(255,255,255,0.3)',
          background: task.done ? '#C8F564' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
        }}
      >
        {task.done && (
          <span
            style={{ color: '#1a1a1a', fontSize: '10px', fontWeight: 'bold' }}
          >
            ✓
          </span>
        )}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: '14px',
            color: task.done ? 'rgba(255,255,255,0.35)' : '#fff',
            textDecoration: task.done ? 'line-through' : 'none',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: '500',
            lineHeight: '1.4',
          }}
        >
          {task.text}
        </div>
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginTop: '5px',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              color: tagStyle.text,
              fontFamily: "'DM Mono', monospace",
              background: tagStyle.bg,
              padding: '2px 8px',
              borderRadius: '20px',
              fontWeight: '500',
            }}
          >
            {task.tag}
          </span>
          <span
            style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.35)',
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {task.time}
          </span>
        </div>
      </div>
    </div>
  );
}

function Section({ label, emoji, tasks, onToggle, accentColor }) {
  if (!tasks || tasks.length === 0) return null;
  const done = tasks.filter((t) => t.done).length;
  return (
    <div style={{ marginBottom: '28px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>{emoji}</span>
          <span
            style={{
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: accentColor || 'rgba(255,255,255,0.5)',
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {label}
          </span>
        </div>
        <span
          style={{
            fontSize: '11px',
            color: 'rgba(255,255,255,0.3)',
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {done}/{tasks.length}
        </span>
      </div>
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} />
      ))}
    </div>
  );
}

function ContentBlock({ data }) {
  return (
    <div>
      {data.map((block, i) => (
        <div key={i} style={{ marginBottom: '24px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: '700',
              color: '#C8F564',
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: '10px',
              padding: '6px 12px',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '8px',
              borderLeft: '3px solid #C8F564',
            }}
          >
            {block.category}
          </div>
          {block.items.map((item, j) => (
            <div
              key={j}
              style={{
                padding: '10px 14px',
                marginBottom: '6px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontSize: '13px',
                color: item.includes('✅')
                  ? '#C8F564'
                  : 'rgba(255,255,255,0.75)',
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: '1.4',
              }}
            >
              <span style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>
                →
              </span>{' '}
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function LeSweatDashboard() {
  const [activeTab, setActiveTab] = useState('today');
  const [focusTask, setFocusTask] = useState(
    'Post on social + show up for Le Sweat 💪'
  );
  const [editingFocus, setEditingFocus] = useState(false);
  const [focusInput, setFocusInput] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskSection, setNewTaskSection] = useState('mustDo');

  const [tasks, setTasks] = useState(() => {
    try {
      const s = localStorage.getItem('ls_tasks_v3');
      return s ? JSON.parse(s) : initialTasks;
    } catch {
      return initialTasks;
    }
  });

  const [habits, setHabits] = useState(() => {
    try {
      const s = localStorage.getItem('ls_habits_v3');
      return s ? JSON.parse(s) : initialHabits;
    } catch {
      return initialHabits;
    }
  });

  const saveTasks = (t) => {
    localStorage.setItem('ls_tasks_v3', JSON.stringify(t));
    setTasks(t);
  };
  const saveHabits = (h) => {
    localStorage.setItem('ls_habits_v3', JSON.stringify(h));
    setHabits(h);
  };

  const toggleTask = (id) => {
    const updated = {};
    for (const s in tasks)
      updated[s] = tasks[s].map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      );
    saveTasks(updated);
  };

  const toggleHabit = (id) =>
    saveHabits(habits.map((h) => (h.id === id ? { ...h, done: !h.done } : h)));

  const clearCompleted = () => {
    const updated = {};
    for (const s in tasks) updated[s] = tasks[s].filter((t) => !t.done);
    saveTasks(updated);
  };

  const resetTasks = () => saveTasks(initialTasks);
  const clearCompletedHabits = () => saveHabits(habits.filter((h) => !h.done));
  const resetHabits = () => saveHabits(initialHabits);

  const addTask = () => {
    if (!newTaskText.trim()) return;
    const newTask = {
      id: Date.now(),
      text: newTaskText.trim(),
      time: '',
      done: false,
    };
    const updated = {
      ...tasks,
      [newTaskSection]: [...(tasks[newTaskSection] || []), newTask],
    };
    saveTasks(updated);
    setNewTaskText('');
    setShowAddTask(false);
  };

  const allTasks = [
    ...(tasks.mustDo || []),
    ...(tasks.carryOver || []),
    ...(tasks.filming || []),
  ];
  const totalDone = allTasks.filter((t) => t.done).length;
  const totalTasks = allTasks.length;
  const progress =
    totalTasks === 0 ? 100 : Math.round((totalDone / totalTasks) * 100);

  const tabs = [
    { id: 'today', label: 'Today', emoji: '✅' },
    { id: 'lstv', label: 'LSTV', emoji: '🎬' },
    { id: 'social', label: 'Social', emoji: '📱' },
    { id: 'youtube', label: 'YouTube', emoji: '▶️' },
    { id: 'habits', label: 'Habit Stack', emoji: '⚡' },
    { id: 'weekly', label: 'Weekly', emoji: '📆' },
    { id: 'monthly', label: 'Monthly', emoji: '🗓️' },
    { id: 'upcoming', label: 'Upcoming', emoji: '🔔' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#111',
        fontFamily: "'DM Sans', sans-serif",
        color: '#fff',
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,700;1,700&display=swap"
        rel="stylesheet"
      />

      {/* ── HEADER ── */}
      <div style={{ background: '#1a1a1a', padding: '24px 20px 0' }}>
        {/* Logo + progress */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#C8F564',
                fontFamily: "'DM Mono', monospace",
                marginBottom: '4px',
              }}
            >
              Le Sweat HQ
            </div>
            <div
              style={{
                fontSize: '24px',
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                fontWeight: '700',
                color: '#fff',
                lineHeight: '1.1',
              }}
            >
              Daily Dashboard
            </div>
            <div
              style={{
                fontSize: '11px',
                color: 'rgba(255,255,255,0.35)',
                marginTop: '4px',
              }}
            >
              {todayStr}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontSize: '38px',
                fontFamily: "'DM Mono', monospace",
                fontWeight: '500',
                color: '#C8F564',
                lineHeight: '1',
              }}
            >
              {progress}%
            </div>
            <div
              style={{
                fontSize: '11px',
                color: 'rgba(255,255,255,0.3)',
                marginTop: '2px',
              }}
            >
              {totalDone}/{totalTasks} done
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            height: '2px',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '1px',
            marginBottom: '14px',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: '#C8F564',
              borderRadius: '1px',
              transition: 'width 0.4s',
            }}
          />
        </div>

        {/* Today's Focus — editable */}
        <div style={{ marginBottom: '16px' }}>
          {editingFocus ? (
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                value={focusInput}
                onChange={(e) => setFocusInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setFocusTask(focusInput);
                    setEditingFocus(false);
                  }
                }}
                placeholder="Set today's focus..."
                autoFocus
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(200,245,100,0.4)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: '#fff',
                  fontSize: '12px',
                  fontFamily: "'DM Sans', sans-serif",
                  outline: 'none',
                }}
              />
              <button
                onClick={() => {
                  setFocusTask(focusInput);
                  setEditingFocus(false);
                }}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  background: '#C8F564',
                  color: '#1a1a1a',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                Set
              </button>
            </div>
          ) : (
            <div
              onClick={() => {
                setFocusInput(focusTask);
                setEditingFocus(true);
              }}
              style={{
                padding: '9px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
                background: 'rgba(200,245,100,0.08)',
                border: '1px solid rgba(200,245,100,0.2)',
                fontSize: '12px',
                color: '#C8F564',
                fontFamily: "'DM Mono', monospace",
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>🎯 {focusTask}</span>
              <span
                style={{ fontSize: '10px', color: 'rgba(200,245,100,0.4)' }}
              >
                tap to edit
              </span>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '0',
            paddingBottom: '0',
            scrollbarWidth: 'none',
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 12px',
                fontSize: '11px',
                fontWeight: '600',
                fontFamily: "'DM Sans', sans-serif",
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                whiteSpace: 'nowrap',
                borderBottom:
                  activeTab === tab.id
                    ? '2px solid #C8F564'
                    : '2px solid transparent',
                color:
                  activeTab === tab.id ? '#C8F564' : 'rgba(255,255,255,0.4)',
                transition: 'all 0.15s',
              }}
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div
        style={{ padding: '24px 20px', maxWidth: '680px', margin: '0 auto' }}
      >
        {/* ── TODAY ── */}
        {activeTab === 'today' && (
          <div>
            {/* Action buttons */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '20px',
                flexWrap: 'wrap',
              }}
            >
              {totalDone > 0 && (
                <button
                  onClick={clearCompleted}
                  style={{
                    padding: '9px 16px',
                    borderRadius: '8px',
                    background: '#C8F564',
                    color: '#1a1a1a',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: '700',
                    fontFamily: "'DM Sans', sans-serif",
                    cursor: 'pointer',
                  }}
                >
                  ✓ Clear {totalDone} done
                </button>
              )}
              <button
                onClick={resetTasks}
                style={{
                  padding: '9px 16px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.07)',
                  color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  fontSize: '12px',
                  fontWeight: '600',
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: 'pointer',
                }}
              >
                ↺ Reset
              </button>
              <button
                onClick={() => setShowAddTask(!showAddTask)}
                style={{
                  padding: '9px 16px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.07)',
                  color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  fontSize: '12px',
                  fontWeight: '600',
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: 'pointer',
                }}
              >
                + Add task
              </button>
            </div>

            {/* Add task form */}
            {showAddTask && (
              <div
                style={{
                  marginBottom: '20px',
                  padding: '16px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <input
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTask()}
                  placeholder="What do you need to do?"
                  autoFocus
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    color: '#fff',
                    fontSize: '14px',
                    fontFamily: "'DM Sans', sans-serif",
                    outline: 'none',
                    marginBottom: '10px',
                    boxSizing: 'border-box',
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <select
                    value={newTaskSection}
                    onChange={(e) => setNewTaskSection(e.target.value)}
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '6px',
                      padding: '6px 10px',
                      color: '#fff',
                      fontSize: '12px',
                      fontFamily: "'DM Sans', sans-serif",
                      cursor: 'pointer',
                    }}
                  >
                    <option value="mustDo">🔴 Must Do</option>
                    <option value="carryOver">⚠️ Carry Over</option>
                    <option value="filming">🎬 Filming</option>
                  </select>
                  <button
                    onClick={addTask}
                    style={{
                      padding: '7px 16px',
                      borderRadius: '6px',
                      background: '#C8F564',
                      color: '#1a1a1a',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer',
                    }}
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowAddTask(false)}
                    style={{
                      padding: '7px 12px',
                      borderRadius: '6px',
                      background: 'transparent',
                      color: 'rgba(255,255,255,0.4)',
                      border: 'none',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <Section
              label="Top Priorities"
              emoji="🔴"
              tasks={tasks.mustDo}
              onToggle={toggleTask}
              accentColor="#FC8181"
            />
            <Section
              label="Filming This Week"
              emoji="🎬"
              tasks={tasks.filming}
              onToggle={toggleTask}
              accentColor="#F6AD55"
            />
            <Section
              label="Carry Over"
              emoji="⚠️"
              tasks={tasks.carryOver}
              onToggle={toggleTask}
              accentColor="#FBD38D"
            />
          </div>
        )}

        {activeTab === 'lstv' && <ContentBlock data={lstvContent} />}
        {activeTab === 'social' && <ContentBlock data={socialContent} />}
        {activeTab === 'youtube' && <ContentBlock data={youtubeContent} />}

        {/* ── HABIT STACK ── */}
        {activeTab === 'habits' && (
          <div>
            <div
              style={{
                padding: '14px 16px',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#fff',
                  marginBottom: '4px',
                }}
              >
                ⚡ Habit Stack
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: '1.5',
                }}
              >
                Got 5-15 minutes? Pick anything. Low-lift, high-value.
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.3)',
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {habits.filter((h) => h.done).length}/{habits.length} done
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {habits.some((h) => h.done) && (
                  <button
                    onClick={clearCompletedHabits}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      background: '#C8F564',
                      color: '#1a1a1a',
                      border: 'none',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer',
                    }}
                  >
                    ✓ Clear done
                  </button>
                )}
                <button
                  onClick={resetHabits}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    background: 'rgba(255,255,255,0.07)',
                    color: 'rgba(255,255,255,0.45)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    fontSize: '11px',
                    cursor: 'pointer',
                  }}
                >
                  ↺ Reset
                </button>
              </div>
            </div>
            {habits.map((h) => (
              <HabitItem key={h.id} task={h} onToggle={toggleHabit} />
            ))}
          </div>
        )}

        {/* ── WEEKLY ── */}
        {activeTab === 'weekly' && (
          <div>
            <div
              style={{
                fontSize: '11px',
                fontFamily: "'DM Mono', monospace",
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              Weekly Rhythm
            </div>
            {weeklyRhythm.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '14px',
                  padding: '12px 16px',
                  marginBottom: '8px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div
                  style={{
                    fontSize: '10px',
                    fontFamily: "'DM Mono', monospace",
                    color: '#C8F564',
                    fontWeight: '700',
                    minWidth: '58px',
                    marginTop: '2px',
                    background: 'rgba(200,245,100,0.1)',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    textAlign: 'center',
                    height: 'fit-content',
                  }}
                >
                  {item.day}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.65)',
                    lineHeight: '1.5',
                  }}
                >
                  {item.tasks}
                </div>
              </div>
            ))}
            <div
              style={{
                marginTop: '20px',
                padding: '16px',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#C8F564',
                  marginBottom: '10px',
                }}
              >
                Non-Negotiables
              </div>
              {[
                '3-4 workout days — 45-60 min each',
                '1 filming day — 2-3 hrs',
                '3-4 social posts — 30-45 min each',
                '1 YouTube video — Friday scheduled, Sunday 6pm ET',
                'Friday: GA4 + YouTube analytics (40 min)',
                'GGS study — 1-2x/week, 30-60 min',
              ].map((item, i, arr) => (
                <div
                  key={i}
                  style={{
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.65)',
                    padding: '7px 0',
                    borderBottom:
                      i < arr.length - 1
                        ? '1px solid rgba(255,255,255,0.06)'
                        : 'none',
                    display: 'flex',
                    gap: '10px',
                  }}
                >
                  <span
                    style={{
                      color: '#1a1a1a',
                      background: '#C8F564',
                      borderRadius: '4px',
                      padding: '0 5px',
                      fontSize: '10px',
                      marginTop: '2px',
                      flexShrink: 0,
                      fontWeight: '700',
                    }}
                  >
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── MONTHLY ── */}
        {activeTab === 'monthly' && (
          <div>
            {monthlyTasks.map((block, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: '#C8F564',
                    fontFamily: "'DM Mono', monospace",
                    marginBottom: '8px',
                    display: 'flex',
                    gap: '6px',
                  }}
                >
                  {block.emoji} {block.timing.toUpperCase()}
                </div>
                {block.tasks.map((task, j) => (
                  <div
                    key={j}
                    style={{
                      padding: '10px 14px',
                      marginBottom: '6px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.7)',
                      display: 'flex',
                      gap: '10px',
                    }}
                  >
                    <span style={{ color: 'rgba(255,255,255,0.2)' }}>–</span>{' '}
                    {task}
                  </div>
                ))}
              </div>
            ))}
            <div
              style={{
                padding: '16px',
                borderRadius: '10px',
                background: 'rgba(200,245,100,0.07)',
                border: '1px solid rgba(200,245,100,0.2)',
                marginTop: '8px',
              }}
            >
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#C8F564',
                  marginBottom: '8px',
                }}
              >
                📚 CSCS Renewal — Due Dec 2026
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: '1.6',
                }}
              >
                Chapter 12 → 20 (8 left) · GGS = 2 CECs · Need 2 more
                <br />
                Total: 6 needed · 2 complete · 4 remaining
              </div>
              <div
                style={{
                  marginTop: '10px',
                  height: '5px',
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '3px',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: '33%',
                    background: '#C8F564',
                    borderRadius: '3px',
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: 'rgba(200,245,100,0.5)',
                  marginTop: '4px',
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                2 / 6 CECs
              </div>
            </div>
          </div>
        )}

        {/* ── UPCOMING ── */}
        {activeTab === 'upcoming' && (
          <div>
            <div
              style={{
                fontSize: '11px',
                fontFamily: "'DM Mono', monospace",
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              Reminders & Deadlines
            </div>
            {upcomingReminders.map((r, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '13px 16px',
                  marginBottom: '8px',
                  borderRadius: '10px',
                  background: r.urgent
                    ? 'rgba(251,211,141,0.08)'
                    : 'rgba(255,255,255,0.05)',
                  border: r.urgent
                    ? '1px solid rgba(251,211,141,0.25)'
                    : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div
                  style={{
                    fontSize: '11px',
                    fontFamily: "'DM Mono', monospace",
                    color: r.urgent ? '#FBD38D' : '#C8F564',
                    fontWeight: '700',
                    minWidth: '70px',
                    marginTop: '2px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {r.date}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    color: r.urgent ? '#FBD38D' : 'rgba(255,255,255,0.65)',
                    lineHeight: '1.5',
                  }}
                >
                  {r.text}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── FOOTER ── */}
        <div
          style={{
            marginTop: '40px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.2)',
              fontFamily: "'DM Mono', monospace",
              letterSpacing: '0.08em',
            }}
          >
            LE SWEAT · Show up on social · Get people on the app
          </div>
        </div>
      </div>
    </div>
  );
}
