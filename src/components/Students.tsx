import { User, GraduationCap, Calendar, BookOpen, Award } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const Students = () => {
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
  
  const { data: studentsFromDB = [] } = useQuery({
    queryKey: ['students-public'],
    queryFn: async () => {
      const res = await fetch(`${apiBase}/students`);
      if (!res.ok) return [];
      return await res.json();
    },
  });

  const students = studentsFromDB;

  return (
    <section id="students" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Research Students
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mentoring and supervising the next generation of researchers and cybersecurity professionals 
            in cutting-edge areas of technology and innovation.
          </p>
        </div>

        {/* Students */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center">
            <User className="mr-3" size={24} />
            Research Students
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <p>No students found. Please add students from the admin panel.</p>
              </div>
            ) : (
              students.map((student, index) => (
                <div key={student.id || index} className="bg-card rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {student.name?.split(' ').map(n => n[0]).join('') || 'S'}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">{student.name}</h4>
                      <p className="text-sm text-muted-foreground">{student.degree_type}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-start">
                      <BookOpen size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
                      <p className="text-sm text-foreground font-medium">{student.research_topic}</p>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar size={16} className="mr-2" />
                      <span>Started {student.start_year}</span>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">Status:</span> {student.status}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Students;