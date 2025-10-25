import { GraduationCap, Calendar, Users, Eye, BookOpen } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const Teaching = () => {
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
  
  const { data: coursesFromDB = [] } = useQuery({
    queryKey: ['courses-public'],
    queryFn: async () => {
      const res = await fetch(`${apiBase}/courses`);
      if (!res.ok) return [];
      return await res.json();
    },
  });

  const courses = coursesFromDB;

  return (
    <section id="teaching" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Teaching
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Educating the next generation of cybersecurity professionals and technology leaders 
            through innovative curriculum and hands-on learning experiences.
          </p>
        </div>

        {/* Current Courses */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Current Courses</h3>
          
          <div className="grid lg:grid-cols-1 gap-8">
            {courses.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No courses found. Please add courses from the admin panel.</p>
              </div>
            ) : (
              courses.map((course, index) => (
              <div key={index} className="bg-card rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <GraduationCap size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-foreground">
                        {course.code}: {course.title}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center space-x-1">
                          <Calendar size={16} />
                          <span>{course.term}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users size={16} />
                          <span>{course.students} students</span>
                        </div>
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                          {course.level}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {course.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-foreground mb-3">Course Topics:</h5>
                    <div className="space-y-2">
                      {(Array.isArray(course.topics) ? course.topics : []).map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-muted-foreground text-sm">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-foreground mb-3">Course Materials:</h5>
                    <div className="space-y-2">
                      {(Array.isArray(course.materials) ? course.materials : []).map((material, materialIndex) => (
                        <button 
                          key={materialIndex}
                          className="flex items-center space-x-2 text-primary hover:text-primary-deep transition-colors text-sm w-full text-left"
                          onClick={() => alert(`${material} - Content available for enrolled students`)}
                        >
                          <Eye size={16} />
                          <span>{material}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Teaching;