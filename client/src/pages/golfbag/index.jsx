import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { onCreateGolfBag } from '../../api/api.routes';
axios.defaults.withCredentials = true

const GolfBag = () => {
    const [golfBag, setGolfBag] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [values, setValues] = useState({
        bag_name: '',
    })

    useEffect(() => {
        // Make API call to check user's golf bag
        axios.get('http://localhost:3000/golfbag')
          .then(response => {
            setGolfBag(response.data.golf_bag);
          })
          .catch(error => {
            console.error('Error fetching golf bag:', error);
          })
          .finally(() => {
            setLoading(false);
          });
      }, [formSubmitted]); // Empty dependency array ensures the effect runs once when component mounts
    
      const onChange = (e) => {
          setValues({ ...values, [e.target.name]: e.target.value })
      }

      const onSubmit = async (e) => {
        e.preventDefault()
        try {
            await onCreateGolfBag(values)
            setFormSubmitted(true); // Trigger useEffect after form submission
          } catch (error) {
            console.log(error)
          }
      }

  return (
    <div className='px-5 flex flex-col items-center'>
        <h1 className='text-3xl'>MY GOLF BAG</h1>
        {loading && <p>Loading...</p>}

        {golfBag && golfBag.length > 0 ? (
        // User has a golf bag, display the current bag
        <div>
            <h2>Current Bag: {golfBag[0].bag_name}</h2>
            {/* Add other details if needed */}
        </div>
        ) : (
        // User has no golf bags, display a button to create one
        <div>
            <form action="submit" onSubmit={onSubmit} className='flex flex-col'>
                <input className='border border-black my-2 px-2' type="text" name='bag_name' placeholder='Enter a bag name...' onChange={onChange} />
                <button type='submit' className='border border-black'>
                    Create Golf Bag
                </button>
            </form>
        </div>
        )}
    </div>
  )
}

export default GolfBag