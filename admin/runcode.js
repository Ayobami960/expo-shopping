import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'

const App = () => {

  // // without using tanstack query
  const [data, setDate] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchbooks = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("api/book");
        const data = await res.json();
        setDate(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchbooks();
  }, [])

  
  return (
    <div>
      <h1 className='text-red-500 text-3xl'>Home Page</h1>
      
    </div>
  )
}

export default App