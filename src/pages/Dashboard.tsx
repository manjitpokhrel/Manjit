import React, { useState, useEffect } from 'react';
import { useFirebase, handleFirestoreError, OperationType } from '../context/FirebaseContext';
import { db, loginWithGoogle, logout } from '../lib/firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  serverTimestamp,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Save, 
  LogOut, 
  LogIn, 
  ArrowLeft,
  Briefcase,
  BookOpen,
  Code,
  Layers,
  User as UserIcon,
  Rss
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { personalInfo, projects, experiences, skills, education, researchInterests } from '../lib/data';

type TabType = 'projects' | 'skills' | 'experiences' | 'education' | 'blogs' | 'profile';

export default function Dashboard() {
  const { user, isAdmin, loading: authLoading } = useFirebase();
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [bootstrapping, setBootstrapping] = useState(false);
  const navigate = useNavigate();

  const handleBootstrap = async () => {
    if (!isAdmin || !window.confirm('This will populate empty collections from your static data. Continue?')) return;
    setBootstrapping(true);
    try {
      // Profile
      await setDoc(doc(db, 'profile', 'main'), {
        ...personalInfo,
        researchInterests,
        currentFocus: "Building reproducible attack pipelines for open-weight LLMs and investigating alignment bypasses through adversarial prompt engineering and activation analysis."
      });

      // Projects
      for (const p of projects) {
        await addDoc(collection(db, 'projects'), { ...p, order: projects.indexOf(p), createdAt: serverTimestamp() });
      }

      // Experiences
      for (const e of experiences) {
        await addDoc(collection(db, 'experiences'), { ...e, order: experiences.indexOf(e), createdAt: serverTimestamp() });
      }

      // Skills
      for (const s of skills) {
        await addDoc(collection(db, 'skills'), { ...s, order: skills.indexOf(s), createdAt: serverTimestamp() });
      }

      // Education
      for (const edu of education) {
        await addDoc(collection(db, 'education'), { ...edu, order: education.indexOf(edu), createdAt: serverTimestamp() });
      }

      alert('Bootstrap complete. Please refresh or switch tabs.');
    } catch (error) {
      console.error('Bootstrap error:', error);
      alert('Bootstrap failed. Check console.');
    } finally {
      setBootstrapping(false);
    }
  };

  const fetchData = async (tab: TabType) => {
    setLoading(true);
    try {
      const colRef = collection(db, tab);
      const q = query(colRef, orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, tab);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      if (activeTab === 'profile') {
        fetchProfile();
      } else {
        fetchData(activeTab);
      }
    }
  }, [activeTab, isAdmin]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, 'profile', 'main');
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setEditingItem(snapshot.data());
      } else {
        setEditingItem({});
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, 'profile/main');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    setLoading(true);
    try {
      if (activeTab === 'profile') {
        await setDoc(doc(db, 'profile', 'main'), editingItem);
      } else {
        if (editingItem.id) {
          const { id, ...data } = editingItem;
          await updateDoc(doc(db, activeTab, id), {
            ...data,
            updatedAt: serverTimestamp(),
          });
        } else {
          await addDoc(collection(db, activeTab), {
            ...editingItem,
            order: items.length,
            createdAt: serverTimestamp(),
          });
        }
        await fetchData(activeTab);
      }
      setEditingItem(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, activeTab);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin || !window.confirm('Delete this item?')) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, activeTab, id));
      await fetchData(activeTab);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${activeTab}/${id}`);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <div className="p-8 font-mono">Verifying identity...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg p-6">
        <div className="max-w-md w-full text-center space-y-8">
          <h1 className="text-3xl font-heading lowercase">Dashboard</h1>
          <p className="text-brand-muted font-mono text-sm uppercase tracking-widest">Administrative access only</p>
          <button 
            onClick={loginWithGoogle}
            className="w-full py-4 ink-border flex items-center justify-center gap-2 hover:bg-brand-accent hover:text-brand-bg transition-all font-mono text-xs uppercase tracking-widest"
          >
            <LogIn size={16} /> Sign in with Google
          </button>
          <Link to="/" className="block text-brand-muted hover:text-brand-accent font-mono text-[10px] uppercase tracking-widest">
            Back to Public Site
          </Link>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg p-6 text-center">
        <div>
          <h1 className="text-2xl font-heading mb-4">Unauthorized</h1>
          <p className="mb-6 text-brand-muted">You do not have permission to access the dashboard.</p>
          <button onClick={logout} className="font-mono text-xs uppercase underline">Sign Out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col p-6 md:p-12">
      <header className="flex justify-between items-baseline border-b border-brand-text pb-4 mb-8">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-brand-muted hover:text-brand-accent">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-2xl font-heading lowercase">Admin Dashboard</h1>
        </div>
        <button onClick={logout} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brand-muted hover:text-brand-accent">
          <LogOut size={14} /> Logout
        </button>
      </header>

      <div className="flex flex-col lg:flex-row gap-12 flex-1">
        {/* Navigation */}
        <nav className="flex flex-col gap-2 w-full lg:w-48 shrink-0">
          <TabButton active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={<UserIcon size={14} />} label="Profile" />
          <TabButton active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} icon={<Layers size={14} />} label="Projects" />
          <TabButton active={activeTab === 'blogs'} onClick={() => setActiveTab('blogs')} icon={<Rss size={14} />} label="Blogs" />
          <TabButton active={activeTab === 'skills'} onClick={() => setActiveTab('skills')} icon={<Code size={14} />} label="Skills" />
          <TabButton active={activeTab === 'experiences'} onClick={() => setActiveTab('experiences')} icon={<Briefcase size={14} />} label="Experience" />
          <TabButton active={activeTab === 'education'} onClick={() => setActiveTab('education')} icon={<BookOpen size={14} />} label="Education" />
          
          <div className="mt-auto pt-8 border-t border-brand-text/10">
            <button 
              onClick={handleBootstrap}
              disabled={bootstrapping}
              className="w-full text-left flex items-center gap-3 px-4 py-3 font-mono text-[9px] uppercase tracking-widest text-brand-muted hover:text-brand-accent disabled:opacity-30"
            >
              {bootstrapping ? 'Bootstrapping...' : 'Bootstrap Data'}
            </button>
          </div>
        </nav>

        {/* Content Area */}
        <main className="flex-1 space-y-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-heading lowercase">{activeTab}</h2>
            {activeTab !== 'profile' && !editingItem && (
              <button 
                onClick={() => setEditingItem({ title: '', slug: '', badge: '', highlights: [], tags: [], fullDescription: '' })}
                className="flex items-center gap-2 text-brand-accent hover:underline font-mono text-[10px] uppercase tracking-widest"
              >
                <Plus size={14} /> Add New
              </button>
            )}
          </div>

          {editingItem ? (
            <form onSubmit={handleSave} className="space-y-6 ink-border p-8 bg-brand-text/5">
              <FormContent tab={activeTab} item={editingItem} setItem={setEditingItem} />
              <div className="flex gap-4 pt-6 border-t border-brand-text/10">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="px-6 py-2 bg-brand-accent text-brand-bg font-mono text-[11px] uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  <Save size={14} /> {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setEditingItem(null)}
                  className="px-6 py-2 border border-brand-text/20 font-mono text-[11px] uppercase tracking-widest hover:bg-brand-text/5"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {loading && <p className="font-mono text-xs text-brand-muted">Fetching records...</p>}
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 ink-border flex justify-between items-start hover:bg-brand-text/[0.02] transition-colors group"
                  >
                    <div>
                      <h3 className="font-medium">{item.title || item.role || item.degree || item.category}</h3>
                      <p className="text-xs text-brand-muted font-mono">{item.slug || item.company || item.institution || 'List item'}</p>
                    </div>
                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setEditingItem(item)} className="text-brand-muted hover:text-brand-accent font-mono text-[10px] uppercase tracking-widest">Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="text-brand-muted hover:text-red-500"><Trash2 size={14} /></button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {!loading && items.length === 0 && <p className="text-brand-muted font-mono text-sm py-12 text-center border border-dashed border-brand-text/10">No records found. Start by adding one.</p>}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 font-mono text-[10px] uppercase tracking-widest transition-all ${active ? 'bg-brand-accent text-brand-bg' : 'text-brand-muted hover:bg-brand-text/5'}`}
    >
      {icon} {label}
    </button>
  );
}

function FormContent({ tab, item, setItem }: { tab: TabType, item: any, setItem: (item: any) => void }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (name: string, value: string) => {
    setItem({ ...item, [name]: value.split(',').map(s => s.trim()) });
  };

  if (tab === 'projects') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Title" name="title" value={item.title} onChange={handleChange} />
        <InputField label="Slug" name="slug" value={item.slug} onChange={handleChange} />
        <InputField label="Badge" name="badge" value={item.badge} onChange={handleChange} />
        <InputField label="Order" name="order" type="number" value={item.order} onChange={handleChange} />
        <div className="md:col-span-2">
          <InputField label="Highlights (comma separated)" name="highlights" value={item.highlights?.join(', ')} onChange={(e) => handleArrayChange('highlights', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <InputField label="Tags (comma separated)" name="tags" value={item.tags?.join(', ')} onChange={(e) => handleArrayChange('tags', e.target.value)} />
        </div>
        <div className="md:col-span-2">
            <TextAreaField label="Full Description" name="fullDescription" value={item.fullDescription} onChange={handleChange} />
        </div>
      </div>
    );
  }

  if (tab === 'blogs') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Title" name="title" value={item.title} onChange={handleChange} />
        <InputField label="URL" name="url" value={item.url} onChange={handleChange} />
        <InputField label="Date" name="date" type="date" value={item.date} onChange={handleChange} />
        <InputField label="Order" name="order" type="number" value={item.order} onChange={handleChange} />
        <div className="md:col-span-2">
          <TextAreaField label="Excerpt" name="excerpt" value={item.excerpt} onChange={handleChange} />
        </div>
      </div>
    );
  }

  if (tab === 'skills') {
    return (
      <div className="space-y-6">
        <InputField label="Category" name="category" value={item.category} onChange={handleChange} />
        <InputField label="Items (comma separated)" name="items" value={item.items?.join(', ')} onChange={(e) => handleArrayChange('items', e.target.value)} />
        <InputField label="Order" name="order" type="number" value={item.order} onChange={handleChange} />
      </div>
    );
  }

  if (tab === 'experiences') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Role" name="role" value={item.role} onChange={handleChange} />
        <InputField label="Company" name="company" value={item.company} onChange={handleChange} />
        <InputField label="Period" name="period" value={item.period} onChange={handleChange} />
        <InputField label="Order" name="order" type="number" value={item.order} onChange={handleChange} />
        <div className="md:col-span-2">
          <TextAreaField label="Description" name="description" value={item.description} onChange={handleChange} />
        </div>
      </div>
    );
  }

  if (tab === 'education') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Degree" name="degree" value={item.degree} onChange={handleChange} />
        <InputField label="Institution" name="institution" value={item.institution} onChange={handleChange} />
        <InputField label="Period" name="period" value={item.period} onChange={handleChange} />
        <InputField label="Focus" name="focus" value={item.focus} onChange={handleChange} />
        <InputField label="Concentration (Optional)" name="concentration" value={item.concentration} onChange={handleChange} />
        <InputField label="Order" name="order" type="number" value={item.order} onChange={handleChange} />
      </div>
    );
  }

  if (tab === 'profile') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Full Name" name="name" value={item.name} onChange={handleChange} />
        <InputField label="Location" name="location" value={item.location} onChange={handleChange} />
        <InputField label="Email" name="email" value={item.email} onChange={handleChange} />
        <InputField label="Website" name="website" value={item.website} onChange={handleChange} />
        <InputField label="GitHub" name="github" value={item.github} onChange={handleChange} />
        <InputField label="LinkedIn" name="linkedin" value={item.linkedin} onChange={handleChange} />
        <InputField label="X (Twitter)" name="x" value={item.x} onChange={handleChange} />
        <div className="md:col-span-2">
          <TextAreaField label="Bio" name="bio" value={item.bio} onChange={handleChange} />
        </div>
        <div className="md:col-span-2">
          <TextAreaField label="Current Focus" name="currentFocus" value={item.currentFocus} onChange={handleChange} />
        </div>
        <div className="md:col-span-2">
          <InputField label="Research Interests (comma separated)" name="researchInterests" value={item.researchInterests?.join(', ')} onChange={(e) => handleArrayChange('researchInterests', e.target.value)} />
        </div>
      </div>
    );
  }

  return null;
}

function InputField({ label, name, value, onChange, type = "text" }: any) {
  return (
    <div className="space-y-1">
      <label className="block font-mono text-[10px] uppercase tracking-widest text-brand-muted">{label}</label>
      <input 
        type={type} 
        name={name} 
        value={value || ''} 
        onChange={onChange}
        className="w-full bg-transparent border border-brand-text/20 p-2 text-sm focus:border-brand-accent outline-none transition-colors"
      />
    </div>
  );
}

function TextAreaField({ label, name, value, onChange }: any) {
  return (
    <div className="space-y-1">
      <label className="block font-mono text-[10px] uppercase tracking-widest text-brand-muted">{label}</label>
      <textarea 
        name={name} 
        value={value || ''} 
        onChange={onChange}
        rows={4}
        className="w-full bg-transparent border border-brand-text/20 p-2 text-sm focus:border-brand-accent outline-none transition-colors"
      />
    </div>
  );
}
