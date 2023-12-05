import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { onAddGolfClubs, onDeleteGolfClubs, onGetGolfClubs, onUpdateGolfClub } from '../../api/api.routes';
import { MdDelete, MdEdit } from "react-icons/md";

const GolfClubs = () => {
  const [golfClubs, setGolfClubs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [values, setValues] = useState({
    club_type: '',
    club_number: '',
  });
  const [editingClub, setEditingClub] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [formSubmitted]);

  const fetchData = async () => {
    try {
      const response = await onGetGolfClubs();
      setGolfClubs(response.data.golf_clubs.sort((a, b) => a.club_id - b.club_id));
    } catch (error) {
      console.error('Error fetching golf clubs:', error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingClub) {
        await onUpdateGolfClub(editingClub.club_id, values);
        setEditingClub(null);
      } else {
        await onAddGolfClubs(values);
      }
      setFormSubmitted(true);
      setIsFormOpen(false);
      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setValues({ club_type: '', club_number: '' }); // Clear form values after submission
    }
  };

  const handleDelete = async (club_id) => {
    try {
      await onDeleteGolfClubs(club_id);
      fetchData();
      setFormSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (club) => {
    setValues({ club_type: club.club_type, club_number: club.club_number });
    setEditingClub(club);
    setIsFormOpen(true);
  };

  return (
    <div className='w-full'>
      {loading && <p>Loading...</p>}
      <div className='my-5'>
        {golfClubs && golfClubs.length > 0 && (
          <>
            {golfClubs.map((club) => (
              <div className='flex justify-between' key={club.club_id}>
                {editingClub && editingClub.club_id === club.club_id && isFormOpen ? (
                  <form className='flex flex-col' onSubmit={onSubmit}>
                    <input
                      className='border border-black my-2 px-2'
                      type="text"
                      name='club_type'
                      placeholder='Driver, Iron, Wedge, Wood...'
                      value={values.club_type}
                      onChange={onChange}
                    />
                    <input
                      className='border border-black my-2 px-2'
                      type="text"
                      name='club_number'
                      placeholder='Club #'
                      value={values.club_number}
                      onChange={onChange}
                    />
                    <button type="submit">Update Club</button>
                  </form>
                ) : (
                  <div className='flex'>
                    <p>{club.club_type}</p>
                    <p>: {club.club_number}</p>
                  </div>
                )}
                <div>
                  <button onClick={() => handleEdit(club)}><MdEdit/></button>
                  <button onClick={() => handleDelete(club.club_id)}><MdDelete/></button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {
      isFormOpen ? <div></div> : <button className='w-full' onClick={() => setIsFormOpen(true)}>Add Club</button>
      }

      {isFormOpen && !editingClub && (
        <form className='my-10 flex flex-col items-center' onSubmit={onSubmit}>
          <input
            className='border border-black my-2 px-2'
            type="text"
            name='club_type'
            placeholder='Driver, Iron, Wedge, Wood...'
            value={values.club_type}
            onChange={onChange}
          />
          <input
            className='border border-black my-2 px-2'
            type="text"
            name='club_number'
            placeholder='Club #'
            value={values.club_number}
            onChange={onChange}
          />
          <button className='' type="submit">Add Club</button>
        </form>
      )}
    </div>
  );
};

export default GolfClubs;
