import Navbar from '@/components/Navbar'

const Default = ({ children }) => (
  <>
    <main className="w-full max-w-3xl mx-auto pb-24">
      <Navbar />
      {children}
    </main>

    <footer className="fixed bottom-0 inset-x-0 h-16 flex flex-row justify-center items-center bg-coolGray-100 dark:bg-coolGray-800 font-medium text-xs text-coolGray-500 dark:text-coolGray-400">
      <div className="text-center">
        Powered by
        <a
          href="https://flatworldgs.com/pipeline-transportation-management-system/"
          target="_blank"
          rel="noreferrer"
          className="transition-colors duration-300 font-bold ml-1 hover:text-blue-500 dark:hover:text-blue-300"
        >
          Pipeline TMS&trade;
        </a>
        <br />
        <a
          href="https://flatworldgs.com"
          target="_blank"
          rel="noreferrer"
          className="transition-colors duration-300 font-bold mr-1 hover:text-blue-500 dark:hover:text-blue-300"
        >
          Flat World Global Solutions
        </a>
        &copy; {new Date().getFullYear()}
      </div>
    </footer>
  </>
)

export default Default
