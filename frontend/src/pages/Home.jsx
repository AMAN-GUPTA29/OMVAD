import { Link } from 'react-router-dom';

/**
 * Home component that displays the landing page
 * @returns {JSX.Element} The landing page interface
 */
const Home = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Link Saver +</span>
          <span className="block text-primary-600 dark:text-primary-400">Auto-Summary</span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
          Save your favorite links, get automatic summaries, and organize your bookmarks all in one place.
        </p>
        <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link
              to="/register"
              className="btn btn-primary w-full px-8 py-3 text-base font-medium md:py-4 md:px-10 md:text-lg"
            >
              Get Started
            </Link>
          </div>
          <div className="mt-3 sm:ml-3 sm:mt-0">
            <Link
              to="/login"
              className="btn btn-secondary w-full px-8 py-3 text-base font-medium md:py-4 md:px-10 md:text-lg"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <div className="text-primary-600 dark:text-primary-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Save Links</h3>
            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
              Easily save and organize your favorite links with automatic metadata extraction.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <div className="text-primary-600 dark:text-primary-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Auto-Summary</h3>
            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
              Get AI-powered summaries of your saved links to quickly understand their content.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <div className="text-primary-600 dark:text-primary-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Smart Tags</h3>
            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
              Automatically generate tags for your links to make them easy to find and organize.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 