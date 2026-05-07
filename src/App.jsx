import Hero from './components/Hero';
import { FeaturedProject } from './components/FeaturedProject';
import { AboutServices } from './components/AboutServices';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';

function App() {
  return (
    <div className="bg-capibara-black">
      <Hero />
      <FeaturedProject />
      <AboutServices />
      <Portfolio />
      <Contact />
    </div>
  );
}
export default App;