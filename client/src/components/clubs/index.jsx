import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { onAddGolfClubs, onDeleteGolfClubs, onGetGolfClubs } from '../../api/api.routes';
import { MdDelete } from "react-icons/md";

const GolfClubs = () => {
    const [golfClubs, setGolfClubs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [values, setValues] = useState({
        club_type: '',
        club_number: '',
    })

useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await onGetGolfClubs();
      setGolfClubs(response.data.golf_clubs);
    } catch (error) {
      console.error('Error fetching golf clubs:', error);
    } finally {
      setLoading(false);
    }
  };


    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            await onAddGolfClubs(values)
            fetchData();
          } catch (error) {
            console.log(error)
          }
      }

    const handleDelete = async (club_id) => {
      try {
        await onDeleteGolfClubs(club_id)
        fetchData();
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div>
        {loading && <p>Loading...</p>}
        {golfClubs && golfClubs.length > 0 ? (
        // User has a golf bag, display the current bag
        <div className='my-5'>
        {golfClubs.map((club) => (
            <div className='flex justify-between' key={club.club_id}> {/* Added a key for each mapped item */}
              <div className='flex'>
                  <p>{club.club_type}</p>
                  <p>: {club.club_number}</p>
              </div>
                <button onClick={() => handleDelete(club.club_id)}><MdDelete /></button>

            </div>
        ))}
        </div>
        ) : (
        // User has no golf bags, display a button to create one
            <h1>Add a new club!</h1>
        )}
        <form className='my-10 flex flex-col' action="submit" onSubmit={onSubmit}>
            <input className='border border-black my-2 px-2' type="text" name='club_type' placeholder='Driver, Iron, Wedge, Wood...' onChange={onChange} />
            <input className='border border-black my-2 px-2' type="text" name='club_number' placeholder='Club #' onChange={onChange} />
            <button type="submit">Add Club</button>
        </form>

    </div>
  )
}

export default GolfClubs