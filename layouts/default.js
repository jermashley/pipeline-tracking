import Navbar from '@/components/Navbar'

const Default = ({ children }) => (
  <main className="w-full max-w-3xl mx-auto">
    <Navbar />
    {children}
  </main>
)

export default Default
