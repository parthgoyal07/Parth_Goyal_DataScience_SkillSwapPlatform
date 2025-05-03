import React, { useState, createContext, useContext, useEffect, useCallback } from 'react';
import { Mail, Lock, User, BookOpen, Search, LogOut, Check, ChevronsUpDown, Users, MessageSquare, Star, Phone, Edit3, Save, Loader2, AlertCircle } from 'lucide-react';

const API_BASE_URL = 'http://localhost:3001/api';

const MOCK_SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
  'History', 'Geography', 'Literature', 'Art', 'Music', 'Physical Education',
  'Web Development', 'Graphic Design', 'Creative Writing', 'Language Learning', 'Yoga'
];

const cn = (...classes) => classes.filter(Boolean).join(' ');

const Button = React.forwardRef(({ className, variant = 'default', size = 'default', children, disabled, ...props }, ref) => {
  const variants = {
    default: 'bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-400',
    destructive: 'bg-red-600 text-white hover:bg-red-500 disabled:bg-red-300',
    outline: 'border border-slate-300 bg-transparent hover:bg-slate-100 text-slate-900 disabled:text-slate-400 disabled:border-slate-200',
    secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300 disabled:bg-slate-100 disabled:text-slate-400',
    ghost: 'hover:bg-slate-100 disabled:hover:bg-transparent disabled:text-slate-400',
    link: 'text-slate-900 underline-offset-4 hover:underline disabled:text-slate-400',
  };
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  };
  return (
    <button
      className={cn('inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', variants[variant], sizes[size], className)}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {disabled && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
});
Button.displayName = 'Button';

const Input = React.forwardRef(({ className, type, icon: Icon, ...props }, ref) => {
  return (
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />}
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-slate-300 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          Icon ? 'pl-10' : '',
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = 'Input';

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-slate-300 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

const Card = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('rounded-xl border bg-white text-slate-900 shadow', className)} {...props}>
    {children}
  </div>
));
Card.displayName = 'Card';
const CardHeader = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props}>
    {children}
  </div>
));
CardHeader.displayName = 'CardHeader';
const CardTitle = React.forwardRef(({ className, children, ...props }, ref) => (
  <h3 ref={ref} className={cn('font-semibold leading-none tracking-tight', className)} {...props}>
    {children}
  </h3>
));
CardTitle.displayName = 'CardTitle';
const CardDescription = React.forwardRef(({ className, children, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-slate-600', className)} {...props}>
    {children}
  </p>
));
CardDescription.displayName = 'CardDescription';
const CardContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props}>
    {children}
  </div>
));
CardContent.displayName = 'CardContent';
const CardFooter = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props}>
    {children}
  </div>
));
CardFooter.displayName = 'CardFooter';

const Select = ({ children, ...props }) => (
  <select
    className="flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    {...props}
  >
    {children}
  </select>
);
const SelectItem = ({ children, value, ...props }) => <option value={value} {...props}>{children}</option>;

const Badge = ({ className, variant = 'default', ...props }) => {
  const variants = {
    default: 'border-transparent bg-slate-900 text-slate-50 hover:bg-slate-900/80',
    secondary: 'border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80',
    destructive: 'border-transparent bg-red-500 text-slate-50 hover:bg-red-500/80',
    outline: 'text-slate-950 border-slate-300',
  };
  return (
    <div
      className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2', variants[variant], className)}
      {...props}
    />
  );
}

const Avatar = ({ className, children, ...props }) => (
  <div className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-200 items-center justify-center', className)} {...props}>
    {children}
  </div>
);
const AvatarFallback = ({ children, ...props }) => (
  <span className="font-medium text-slate-700" {...props}>{children}</span>
);

function Alert({ variant = 'destructive', title, description, className }) {
    const variants = {
        destructive: 'bg-red-50 border border-red-200 text-red-800',
    };
    return (
        <div className={cn('rounded-md p-4', variants[variant], className)} role="alert">
            <div className="flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <div className="flex-1">
                    {title && <h5 className="font-medium mb-1">{title}</h5>}
                    <div className="text-sm">{description}</div>
                </div>
            </div>
        </div>
    );
}

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (details) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      setUser(data);
      console.log("Login successful via backend:", data);
      setLoading(false);
      return { success: true };

    } catch (err) {
      console.error("Login API call failed:", err);
      setError(err.message || 'Login failed. Please try again.');
      setLoading(false);
      return { success: false, message: err.message || 'Login failed. Please try again.' };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    console.log("Logged out");
  }, []);

  const updateUser = useCallback(async (userId, updates) => {
      if (!userId) {
          console.error("updateUser called without userId");
          return { success: false, message: "User ID missing." };
      }
      setLoading(true);
      setError(null);
      try {
          const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updates),
          });

          const data = await response.json();

          if (!response.ok) {
              throw new Error(data.message || `HTTP error! status: ${response.status}`);
          }

          setUser(data);
          console.log("Update successful via backend:", data);
          setLoading(false);
          return { success: true, user: data };

      } catch (err) {
          console.error("Update user API call failed:", err);
          setError(err.message || 'Update failed. Please try again.');
          setLoading(false);
          return { success: false, message: err.message || 'Update failed. Please try again.' };
      }
  }, []);

  const value = { user, loading, error, login, logout, updateUser, setError };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-slate-700" />
          <span className="text-xl font-bold text-slate-900">SkillSwap</span>
        </div>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600 hidden sm:inline">Welcome, {user.name}! ({user.role})</span>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}

function InterestSelector({ currentInterests = [], onInterestsChange, availableSubjects, title, description }) {
  const [selectedInterests, setSelectedInterests] = useState(new Set(currentInterests));

  const handleToggleInterest = (subject) => {
    const newInterests = new Set(selectedInterests);
    if (newInterests.has(subject)) {
      newInterests.delete(subject);
    } else {
      newInterests.add(subject);
    }
    setSelectedInterests(newInterests);
    onInterestsChange(Array.from(newInterests));
  };

  useEffect(() => {
      setSelectedInterests(new Set(currentInterests));
  }, [currentInterests]);

  return (
    <div className="space-y-2">
       {title && <h4 className="text-sm font-medium">{title}</h4>}
       {description && <p className="text-xs text-slate-500 mb-2">{description}</p>}
       <div className="flex flex-wrap gap-2 p-3 border rounded-md bg-slate-50">
        {availableSubjects.map(subject => (
          <Button
            key={subject}
            variant={selectedInterests.has(subject) ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleToggleInterest(subject)}
            className="flex items-center text-xs sm:text-sm"
            type="button"
          >
            {selectedInterests.has(subject) && <Check className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />}
            {subject}
          </Button>
        ))}
      </div>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');
  const [interests, setInterests] = useState([]);
  const { login, loading, error, setError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const loginDetails = { email, role, name, interests };
    const result = await login(loginDetails);

  };

  const handleInterestsChange = (newInterests) => {
      setInterests(newInterests);
  }

  const interestTitle = role === 'student' ? "Select Your Interests" : "Select Your Skills/Subjects";
  const interestDescription = role === 'student'
      ? "Choose subjects you want to learn or find help with."
      : "Choose the subjects or skills you can teach or share.";

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome to SkillSwap</CardTitle>
          <CardDescription className="text-center">Enter your details to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <Alert description={error} className="mb-4" />}
          <form onSubmit={handleSubmit} className="space-y-4">
             <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="role">I am a...</label>
              <Select id="role" value={role} onChange={(e) => setRole(e.target.value)} disabled={loading}>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="name">Name</label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                icon={User}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <InterestSelector
                currentInterests={interests}
                onInterestsChange={handleInterestsChange}
                availableSubjects={MOCK_SUBJECTS}
                title={interestTitle}
                description={interestDescription}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Processing...' : 'Sign Up / Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function TeacherProfileCard({ teacher, isConnected }) {
    const { user: currentUser, updateUser, loading: authLoading, setError } = useAuth();
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnectClick = async () => {
        if (currentUser && currentUser.role === 'student' && !isConnected && !isConnecting) {
            setIsConnecting(true);
            setError(null);
            const result = await updateUser(currentUser.id, { connectTeacherId: teacher.id });
            if (!result.success) {
                console.error("Connection failed:", result.message);
            }
            setIsConnecting(false);
        }
    }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Avatar className="h-16 w-16 text-xl">
          <AvatarFallback>{teacher.name?.split(' ').map(n => n[0]).join('') || 'T'}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <h4 className="text-lg font-semibold">{teacher.name}</h4>
          <p className="text-sm text-slate-600">{teacher.bio || 'No bio provided.'}</p>
          {teacher.rating && <div className="flex items-center space-x-1 mt-1">
             <Star className="h-4 w-4 text-yellow-500 fill-yellow-400" />
             <span className="text-sm font-medium">{teacher.rating.toFixed(1)}</span>
          </div>}
          <div className="mt-2 flex flex-wrap gap-1">
            {teacher.interests?.map(interest => (
              <Badge key={interest} variant="secondary">{interest}</Badge>
            ))}
          </div>
        </div>
        {currentUser?.role === 'student' && (
            <Button
                size="sm"
                onClick={handleConnectClick}
                disabled={isConnected || authLoading || isConnecting}
                className="w-full sm:w-auto mt-3 sm:mt-0"
            >
                {isConnected ? <><Check className="mr-2 h-4 w-4" /> Connected</> : <><Users className="mr-2 h-4 w-4" /> Connect</>}
            </Button>
        )}
      </CardContent>
    </Card>
  );
}

function StudentDashboard() {
  const { user, updateUser, loading: authLoading, error: authError, setError } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [studentBio, setStudentBio] = useState(user?.bio || '');
  const [isEditingBio, setIsEditingBio] = useState(false);

  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [isLoadingTeachers, setIsLoadingTeachers] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      setIsLoadingTeachers(true);
      setFetchError(null);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/teachers`);
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAvailableTeachers(data);
      } catch (err) {
        console.error("Failed to fetch teachers:", err);
        setFetchError(err.message || 'Failed to load teachers.');
      } finally {
        setIsLoadingTeachers(false);
      }
    };
    fetchTeachers();
  }, [setError]);

  useEffect(() => {
    setStudentBio(user?.bio || '');
  }, [user?.bio]);

  const filteredTeachers = availableTeachers.filter(teacher => {
      if (!searchTerm) return true;
      const lowerSearchTerm = searchTerm.toLowerCase();
      return teacher.name.toLowerCase().includes(lowerSearchTerm) ||
             teacher.interests?.some(interest => interest.toLowerCase().includes(lowerSearchTerm));
  });

  const handleSaveBio = async () => {
      if (user) {
          setError(null);
          const result = await updateUser(user.id, { bio: studentBio });
          if (result.success) {
              setIsEditingBio(false);
          }
      }
  }

  const connectedTeacherDetails = availableTeachers.filter(t => user?.connections?.includes(t.id));

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h2 className="text-3xl font-bold">Student Dashboard</h2>

       {authError && <Alert description={authError} className="mb-4" />}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>Your information and interests.</CardDescription>
            </div>
            {!isEditingBio && (
                <Button variant="ghost" size="sm" onClick={() => setIsEditingBio(true)} disabled={authLoading}>
                    <Edit3 className="mr-2 h-4 w-4" /> Edit Bio
                </Button>
            )}
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
                 <Avatar className="h-16 w-16 text-xl">
                      <AvatarFallback>{user.name?.split(' ').map(n => n[0]).join('') || 'S'}</AvatarFallback>
                  </Avatar>
                  <div>
                      <h3 className="text-xl font-semibold">{user.name}</h3>
                      <p className="text-slate-600">{user.email}</p>
                  </div>
            </div>
             <div>
                 <h4 className="text-sm font-medium mb-1">My Interests:</h4>
                 <div className="flex flex-wrap gap-1">
                    {user.interests?.length > 0 ? user.interests.map(interest => (
                    <Badge key={interest} variant="outline">{interest}</Badge>
                    )) : <p className="text-sm text-slate-500">No interests selected.</p>}
                </div>
             </div>
             <div>
                 <h4 className="text-sm font-medium mb-1">My Bio:</h4>
                 {isEditingBio ? (
                     <div className="space-y-2">
                         <Textarea
                            placeholder="Tell others a little about yourself and what you're looking to learn..."
                            value={studentBio}
                            onChange={(e) => setStudentBio(e.target.value)}
                            rows={3}
                            disabled={authLoading}
                         />
                         <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => { setIsEditingBio(false); setStudentBio(user.bio || ''); }} disabled={authLoading}>Cancel</Button>
                              <Button size="sm" onClick={handleSaveBio} disabled={authLoading}>
                                  {authLoading ? 'Saving...' : <><Save className="mr-2 h-4 w-4"/> Save Bio</>}
                              </Button>
                         </div>
                     </div>
                 ) : (
                     <p className="text-sm text-slate-700 whitespace-pre-wrap">
                         {user.bio || <span className="text-slate-500 italic">No bio added yet. Click 'Edit Bio' to add one.</span>}
                     </p>
                 )}
             </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Find Teachers / Experts</CardTitle>
          <CardDescription>Search available experts by name or subject.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="search"
            placeholder="Search by name or skill (e.g., Physics, Web Development)..."
            icon={Search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          {isLoadingTeachers && (
              <div className="flex justify-center items-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
                  <p className="ml-3 text-slate-500">Loading teachers...</p>
              </div>
          )}
           {fetchError && !isLoadingTeachers && (
              <Alert description={fetchError} />
           )}
          {!isLoadingTeachers && !fetchError && (
              <div className="space-y-4">
                {filteredTeachers.length > 0 ? (
                  filteredTeachers.map(teacher => (
                    <TeacherProfileCard
                      key={teacher.id}
                      teacher={teacher}
                      isConnected={user.connections?.includes(teacher.id)}
                    />
                  ))
                ) : (
                  <p className="text-center text-slate-500">No experts found matching your criteria.</p>
                )}
              </div>
          )}
        </CardContent>
      </Card>

       {connectedTeacherDetails.length > 0 && (
         <Card>
           <CardHeader>
             <CardTitle>My Connections</CardTitle>
             <CardDescription>Experts you are connected with.</CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
             {connectedTeacherDetails.map(teacher => (
               <Card key={teacher.id} className="p-4 flex flex-col sm:flex-row justify-between items-start">
                   <div className="flex items-center space-x-3 mb-3 sm:mb-0">
                       <Avatar className="h-10 w-10">
                           <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                       </Avatar>
                       <div>
                           <p className="font-medium">{teacher.name}</p>
                           <p className="text-xs text-slate-500">{teacher.interests?.join(', ')}</p>
                       </div>
                   </div>
                   <div className="text-sm text-slate-700 space-y-1 text-left sm:text-right w-full sm:w-auto">
                       <div className="flex items-center justify-start sm:justify-end space-x-2">
                           <Mail className="h-4 w-4 text-slate-500"/>
                           <a href={`mailto:${teacher.email}`} className="hover:underline">{teacher.email}</a>
                       </div>
                       <div className="flex items-center justify-start sm:justify-end space-x-2">
                           <Phone className="h-4 w-4 text-slate-500"/>
                           <span>{teacher.phone || 'Not available'}</span>
                       </div>
                        <div className="pt-2 flex justify-start sm:justify-end">
                            <Button variant="outline" size="sm">
                                <MessageSquare className="mr-2 h-4 w-4"/> Message
                            </Button>
                        </div>
                   </div>
               </Card>
             ))}
           </CardContent>
         </Card>
       )}
    </div>
  );
}

function TeacherDashboard() {
  const { user, updateUser, loading: authLoading, error: authError, setError } = useAuth();
  const [teacherBio, setTeacherBio] = useState(user?.bio || '');
  const [isEditingBio, setIsEditingBio] = useState(false);

  useEffect(() => {
      setTeacherBio(user?.bio || '');
  }, [user?.bio]);

  const handleSaveBio = async () => {
      if (user) {
          setError(null);
          const result = await updateUser(user.id, { bio: teacherBio });
          if (result.success) {
              setIsEditingBio(false);
          }
      }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h2 className="text-3xl font-bold">Teacher Dashboard</h2>

      {authError && <Alert description={authError} className="mb-4" />}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
             <div>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>Your information and skills.</CardDescription>
            </div>
            {!isEditingBio && (
                <Button variant="ghost" size="sm" onClick={() => setIsEditingBio(true)} disabled={authLoading}>
                    <Edit3 className="mr-2 h-4 w-4" /> Edit Bio
                </Button>
            )}
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 text-xl">
                    <AvatarFallback>{user.name?.split(' ').map(n => n[0]).join('') || 'T'}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <p className="text-slate-600">{user.email}</p>
                </div>
            </div>
             <div>
                 <h4 className="text-sm font-medium mb-1">My Skills/Subjects:</h4>
                 <div className="flex flex-wrap gap-1">
                    {user.interests?.length > 0 ? user.interests.map(interest => (
                    <Badge key={interest} variant="outline">{interest}</Badge>
                    )) : <p className="text-sm text-slate-500">No skills selected.</p>}
                </div>
             </div>
              <div>
                 <h4 className="text-sm font-medium mb-1">My Bio:</h4>
                 {isEditingBio ? (
                     <div className="space-y-2">
                         <Textarea
                            placeholder="Tell students about your experience and teaching style..."
                            value={teacherBio}
                            onChange={(e) => setTeacherBio(e.target.value)}
                            rows={3}
                            disabled={authLoading}
                         />
                         <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => { setIsEditingBio(false); setTeacherBio(user.bio || ''); }} disabled={authLoading}>Cancel</Button>
                              <Button size="sm" onClick={handleSaveBio} disabled={authLoading}>
                                  {authLoading ? 'Saving...' : <><Save className="mr-2 h-4 w-4"/> Save Bio</>}
                              </Button>
                         </div>
                     </div>
                 ) : (
                     <p className="text-sm text-slate-700 whitespace-pre-wrap">
                         {user.bio || <span className="text-slate-500 italic">No bio added yet. Click 'Edit Bio' to add one.</span>}
                     </p>
                 )}
             </div>
        </CardContent>
      </Card>

       {/* Connected Students section removed as backend doesn't easily support it yet */}
       {/*
       <Card>
        <CardHeader>
          <CardTitle>Connected Students</CardTitle>
          <CardDescription>Students who have connected with you.</CardDescription>
        </CardHeader>
        <CardContent>
           <p className="text-center text-slate-500">Feature not yet implemented.</p>
        </CardContent>
      </Card>
      */}
    </div>
  );
}

function App() {
  const { user } = useAuth();

  const renderContent = () => {
    if (!user) {
      return <LoginForm />;
    }
    switch (user.role) {
      case 'student':
        return <StudentDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      default:
        return <LoginForm />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <Header />
      <main>
        {renderContent()}
      </main>
      <footer className="text-center py-4 text-xs text-slate-500 border-t border-slate-200 mt-12">
          SkillSwap &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

