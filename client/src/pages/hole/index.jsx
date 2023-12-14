import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { onFinishedHole, onGetGolfClubs, onGetGolfHole, onGetGolfHoleScore, onGetHoleShots, onNewGolfHole, onNewGolfShot } from '../../api/api.routes'

const NewHole = () => {
    const location = useLocation()
    const { round_id, course_id, edit, hole_number, par, distance, holeScore, hole_id } = location.state;
    const [values, setValues] = useState({
        round_id: round_id,
        course_id: course_id,
        hole_number: null,
        par: null,
        distance: null,
        holeScore: 0
      });

      const [shotValues, setShotValues] = useState({
        hole_id: null,
        distance: null,
        golf_club_id: "",
        shape: null,
        outcome: null,
        good_shot: null,
      });

    const [step, setStep] = useState(1);
    const [golfClubs, setGolfClubs] = useState(null);
    const [editScore, setEditScore] = useState(0)
    const [holeShots, setHoleShots] = useState([])

    useEffect(() => {
      fetchHoleShots(hole_id);
      fetchGolfClubs();
      if (edit === true){
        // fetchHoleScore(hole_id)
        setValues({...values, hole_number: hole_number, par: par, distance: distance, holeScore: holeScore})
        setShotValues({...shotValues, hole_id: hole_id})
        setStep(2);
      };
      }, [holeShots])
    
      const fetchHoleShots = async (id) => {
        try {
          await onGetHoleShots(hole_id)
          .then(response => setHoleShots(response.data.golf_hole_shots))
          .catch(error => console.error('Error fetching shots:', error));
        } catch (error) {
          console.error('Error fetching golf shots:', error);
        }
      }
        
      const fetchGolfClubs = async () => {
          try {
              const response = await onGetGolfClubs();
              setGolfClubs(response.data.golf_clubs.sort((a, b) => a.club_id - b.club_id));
          } catch (error) {
              console.error('Error fetching golf clubs:', error);
          }
      }

      const fetchHoleScore = async () => {
          try {
              const response = await onGetGolfHoleScore({id: shotValues.hole_id});
              const updatedHoleScore = response.data.golf_hole_score.hole_score;
              setValues({ ...values, holeScore: updatedHoleScore });
          } catch (error) {
              console.error('Error fetching golf hole score:', error);

          }
      }
    
        const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };

      const onShotChange = (e) => {
        setShotValues({ ...shotValues, [e.target.name]: e.target.value });
      };

      const onSubmitGolfShot = async (e) => {
        e.preventDefault();
        try {
            await onNewGolfShot(shotValues)
            await fetchHoleScore(shotValues.hole_id)
        } catch (error) {
          console.error(error.response ? error.response.data : error.message);
        } finally {
            setShotValues({
                ...shotValues, distance: null, golf_club_id: null, shape: null, outcome: null, good_shot: null,
            })
            if (edit === true){
              setEditScore(editScore+1)
            } 
        }
      };
    
      const findClubDetails = (clubId) => {
        const club = golfClubs.find((club) => club.club_id === clubId);
        return club ? `${club.club_number} ${club.club_type}` : 'Unknown Club';
      };

      const onSubmitHoleDetails = async (e) => {
        e.preventDefault();
        try {
            const result = await onNewGolfHole(values)
            let hole_id = result.data.res.id
            setShotValues({...shotValues, hole_id: hole_id});
            // Step 2: Update the step when the hole details are submitted
            setStep(2);
        } catch (error) {
            console.log('Error creating hole', error)
        }
      };

      const onAddHole = async (updateData) => {
        try {
            const res = await onFinishedHole(updateData)

            return;
        } catch (error) {
            console.log('Error updating hole score', error)
        }
      };

      return (
        <div className="px-5 flex flex-col">
          <div>
            {step === 1 && (
            <form className="flex flex-col" onSubmit={onSubmitHoleDetails}>
            <input
              className="border border-black my-2 px-2"
              type="text"
              name="hole_number"
              placeholder="Hole #"
              onChange={onChange}
            />
            <input
              className="border border-black my-2 px-2"
              type="text"
              name="par"
              placeholder="Par"
              onChange={onChange}
            />
            <input
              className="border border-black my-2 px-2"
              type="text"
              name="distance"
              placeholder="Distance"
              onChange={onChange}
            />
            <button type="submit">Save</button>
          </form>
            )}
    
            {step === 2 && (
              <div>
                <div>
                  {/* Display hole details */}
                  <p>Hole Number: {values.hole_number}</p>
                  <p>Par: {values.par}</p>
                  <p>Distance: {values.distance}</p>
                  <p>Hole Score: {values.holeScore}</p>
                </div>
                {golfClubs && (                  
                <div>
                  <ul className="flex flex-col">
                  {holeShots.map((shot, index) => (
                    <li key={shot.id} className="p-5 bg-white rounded-md border shadow-md m-2">
                      <p className='font-bold text-start'>Shot {index + 1}</p>
                        <p><span className='font-bold'>Club: </span>{findClubDetails(shot.golf_club_id)}</p>
                        <p><span className='font-bold'>Distance: </span>{shot.distance} yds</p>
                        <p><span className='font-bold'>Shape: </span>{shot.shape}</p>
                        <p><span className='font-bold'>Outcome: </span>{shot.outcome}</p>
                        <p><span className='font-bold'>Result: </span>{shot.good_shot ? 'Good Shot': 'Bad Shot'}</p>
                    </li>
                  ))}
                  </ul>
                </div>
                  )}
              </div>
            )}
          </div>
          {step === 2 && golfClubs && (
            <div>
              <form className="flex flex-col" onSubmit={onSubmitGolfShot}>
                {/* New form for adding a shot */}
                <input className='border border-black my-2 px-2'
                  type="text"
                  name="distance"
                  placeholder="Distance"
                  onChange={onShotChange}
                />
                <select
                value={shotValues.golf_club_id}
                name='golf_club_id'
                onChange={(e) => onShotChange({ target: { name: 'golf_club_id', value: e.target.value } })}                className="mt-1 p-2 border rounded-md w-full"
                >
                <option value="" disabled>Select a club</option>
                {golfClubs.map((club) => (
                    <option key={club.club_id} value={club.club_id}>
                    {club.club_type}: {club.club_number}
                    </option>
                ))}
                </select>
                {/* Add other shot details inputs */}
                <input className='border border-black my-2 px-2'
                  type="text"
                  name="shape"
                  placeholder="Shape"
                  onChange={onShotChange}
                />
                <input className='border border-black my-2 px-2'
                  type="text"
                  name="outcome"
                  placeholder="Outcome"
                  onChange={onShotChange}
                />
                <div className='flex'>
                    <div className='mr-5'>
                    <label>
                        Good Shot
                        <input
                        type="radio"
                        name="good_shot"
                        value="true"
                        checked={shotValues.good_shot === 'true'}
                        onChange={onShotChange}
                        />
                    </label>
                    </div>
                <label>
                    Bad Shot
                    <input
                    type="radio"
                    name="good_shot"
                    value="false"
                    checked={shotValues.good_shot === 'false'}
                    onChange={onShotChange}
                    />
                </label>
                </div>
                <button className='bg-blue-500 text-white p-2 my-2 rounded-md w-32 text-center' type="submit">Add Shot</button>
              </form>
            </div>
          )}
    
          {step === 2 && (
            <Link to={`/viewround/${round_id}`} onClick={() => {let submitScore = values.holeScore; if (edit === true){submitScore = editScore} onAddHole({hole_score: submitScore, round_id: round_id}) }} className="bg-blue-500 text-white p-2 my-2 rounded-md w-32 text-center">
              Finish Hole
            </Link>
          )}
        </div>
      );
};

export default NewHole;