-- Create publications table
CREATE TABLE public.publications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  authors TEXT NOT NULL,
  journal TEXT NOT NULL,
  year INTEGER NOT NULL,
  volume TEXT,
  pages TEXT,
  doi TEXT,
  citations INTEGER DEFAULT 0,
  type TEXT DEFAULT 'journal',
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create research_areas table
CREATE TABLE public.research_areas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ongoing',
  duration TEXT NOT NULL,
  collaborators TEXT[] NOT NULL DEFAULT '{}',
  funding TEXT NOT NULL,
  outcomes TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  level TEXT NOT NULL,
  semester TEXT NOT NULL,
  year INTEGER NOT NULL,
  enrollment_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create students table
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  degree_type TEXT NOT NULL,
  research_topic TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'current',
  start_year INTEGER NOT NULL,
  end_year INTEGER,
  avatar_url TEXT,
  linkedin_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profile_info table for general site information
CREATE TABLE public.profile_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin users table
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view publications" ON public.publications FOR SELECT USING (true);
CREATE POLICY "Anyone can view research areas" ON public.research_areas FOR SELECT USING (true);
CREATE POLICY "Anyone can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Anyone can view courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Anyone can view students" ON public.students FOR SELECT USING (true);
CREATE POLICY "Anyone can view profile info" ON public.profile_info FOR SELECT USING (true);

-- Create security definer function to check admin status
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE admin_users.user_id = is_admin.user_id
  );
$$;

-- Create admin policies
CREATE POLICY "Admins can do everything on publications" ON public.publications 
FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can do everything on research_areas" ON public.research_areas 
FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can do everything on projects" ON public.projects 
FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can do everything on courses" ON public.courses 
FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can do everything on students" ON public.students 
FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can do everything on profile_info" ON public.profile_info 
FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can view admin users" ON public.admin_users 
FOR SELECT USING (public.is_admin(auth.uid()));

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_publications_updated_at BEFORE UPDATE ON public.publications
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_research_areas_updated_at BEFORE UPDATE ON public.research_areas
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON public.students
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profile_info_updated_at BEFORE UPDATE ON public.profile_info
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.research_areas (title, description, icon, order_index) VALUES
('Blockchain Technology', 'Research in consensus algorithms, privacy preservation, and scalability solutions for blockchain networks.', 'Coins', 1),
('FinTech Innovation', 'Development of secure financial technologies and digital payment systems.', 'CreditCard', 2),
('Cybersecurity', 'Advanced security protocols, threat detection, and digital forensics.', 'Shield', 3),
('Internet of Things', 'Secure IoT architectures and privacy-preserving solutions for connected devices.', 'Wifi', 4),
('Machine Learning', 'Federated learning, privacy-preserving ML, and AI security applications.', 'Brain', 5);

INSERT INTO public.publications (title, authors, journal, year, volume, pages, doi, citations) VALUES
('A Scalable Blockchain for Secure IoT Data Management', 'S. Biswas, et al.', 'IEEE Transactions on Industrial Informatics', 2023, '19', '1234-1245', '10.1109/TII.2023.1234567', 45),
('Privacy-Preserving Consensus in Blockchain Networks', 'S. Biswas, A. Rahman', 'IEEE Security & Privacy', 2022, '20', '67-78', '10.1109/MSEC.2022.7654321', 38),
('FinTech Security: Challenges and Solutions', 'S. Biswas, M. Khan, R. Ali', 'Journal of Financial Technology', 2023, '8', '123-145', '10.1016/j.jft.2023.01.002', 29);

INSERT INTO public.profile_info (key, value) VALUES
('name', 'Dr. Sujit Biswas'),
('title', 'Assistant Professor (Lecturer equivalent)'),
('department', 'Cybersecurity & FinTech, Department of Computer Science'),
('institution', 'City, University of London'),
('email', 'sujit.biswas@city.ac.uk'),
('bio', 'Assistant Professor specializing in Cybersecurity and FinTech with expertise in blockchain technology, IoT security, and privacy-preserving systems.');