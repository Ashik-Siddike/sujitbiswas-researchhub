import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { seedDatabase } from '@/scripts/seedDatabaseBrowser';

export default function Hero() {
  const handleSeedDatabase = async () => {
    try {
      const result = await seedDatabase();
      if (result.success) {
        alert('🎉 Database seeded successfully! Check the admin panel to see all the data.');
        // Refresh the page to show new data
        window.location.reload();
      } else {
        alert('❌ Error seeding database: ' + result.error);
      }
    } catch (error) {
      alert('❌ Error: ' + error.message);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Dr. Sujit Biswas
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Senior Lecturer in Cybersecurity & FinTech at City, University of London
          </p>
          <p className="mt-4 text-base leading-7 text-gray-500">
            Leading research in blockchain technology, IoT security, and machine learning applications in cybersecurity
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              View Research
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" onClick={handleSeedDatabase}>
              🌱 Seed Database
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center text-sm text-gray-500">
            <MapPin className="mr-2 h-4 w-4" />
            City, University of London • Northampton Square, London
          </div>
        </div>
      </div>
    </section>
  );
}