import { Link } from "react-router-dom";
import compnies from "../assets/compnies/compnies"

const Banner1 = () => {
  const { amazon, github, hosting, tesla, adobe, messanger, chrome } = compnies;

  return (
    <section role="banner">
      <section className="bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-20 lg:py-32 lg:flex lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-focus-in bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl md:text-6xl lg:text-6xl mb-6">
              Raise Your Career
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-cyan-300">50K+</h3>
                <p className="text-gray-300">Job Listings</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-cyan-300">10K+</h3>
                <p className="text-gray-300">Companies</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-cyan-300">95%</h3>
                <p className="text-gray-300">Success Rate</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-cyan-300">24/7</h3>
                <p className="text-gray-300">Support</p>
              </div>
            </div>
            <p className="mx-auto text-base text-gray-300 sm:text-xl md:text-2xl mb-5">
              Discover Exciting Opportunities in Tech, Finance, Healthcare, and More
            </p>
            <p className="mx-auto text-lg text-cyan-300 font-semibold mb-8">
              Thousands of Top Companies Are Hiring Now!
            </p>
            <div className="mt-8 bg-gray-800/50 p-6 rounded-lg">
              <p className="text-gray-300 italic">"This platform helped me find my dream job in just two weeks! The process was seamless and the support team was incredibly helpful."</p>
              <p className="text-right text-cyan-300 mt-2">- Sarah T., Software Engineer</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/post/search"
                className="block w-full sm:w-auto px-8 py-2 text-sm md:text-base font-semibold tracking-wider rounded-lg max-md:rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Find Opportunities
              </Link>
              <Link
                to="/browsecompanies"
                className="block w-full sm:w-auto px-8 py-2 text-sm md:text-base font-semibold tracking-wider rounded-lg max-md:rounded-md bg-transparent border-2 border-cyan-400 hover:bg-cyan-400 hover:text-gray-900 transition duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
              >
                Find organizations
              </Link>
            </div>
          </div>
        </div>
      </section>

    <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-900 shadow-lg">
              <h3 className="text-xl font-bold text-cyan-500 mb-4">Personalized Matching</h3>
              <p className="text-gray-600 dark:text-gray-300">Our AI-powered system matches you with the best opportunities based on your skills and preferences.</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-900 shadow-lg">
              <h3 className="text-xl font-bold text-cyan-500 mb-4">Career Guidance</h3>
              <p className="text-gray-600 dark:text-gray-300">Get expert advice and resources to help you navigate your career path effectively.</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-900 shadow-lg">
              <h3 className="text-xl font-bold text-cyan-500 mb-4">Global Opportunities</h3>
              <p className="text-gray-600 dark:text-gray-300">Access job listings from top companies worldwide across various industries.</p>
            </div>
          </div>
        </div>
      </section>

      <section className=" py-6 max-md:py-4">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-3">
            Trusted by Industry Leaders
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
            {[amazon, github, tesla, adobe, messanger, chrome, hosting].map((src, index) => (
              <img
                key={index}
                className={`h-8 md:h-12 cursor-pointer lg:h-14 grayscale hover:grayscale-0 transition duration-300 ${index >= 4 ? 'max-md:hidden' : ''}`}
                src={src}
                alt={`company-logo`}
                loading="lazy"
                width="auto"
                height="auto"
              />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Banner1;
