import React, { useState, useEffect } from 'react';
import { onDeleteGolfHole, onGetGolfRound, onGetRoundHoles } from '../../api/api.routes';
import {Link, useParams} from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";

const ViewRound = ({ match }) => {
  const [round, setRound] = useState({});
  const [holes, setHoles] = useState([]);
  let {id} = useParams();
  
  const fetchData = () => {
      // Fetch round information
      onGetGolfRound(id)
        .then(response => setRound(response.data.golf_round))
        .catch(error => console.error('Error fetching round:', error));
  
      // Fetch holes for the round
      onGetRoundHoles(id)
        .then(response => setHoles(response.data.golf_roundholes))
        .catch(error => console.error('Error fetching holes:', error));

  }
  
  useEffect(() => {
    fetchData();
  }, [id, round.round_score]);

  const formatRoundDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleDelete = async (hole_id, roundData) => {
    try {
      await onDeleteGolfHole(hole_id, roundData);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="px-5 container mx-auto mt-8">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">{round.course_name} Round Information</h1>
        <p>Round Score: {round.round_score}</p>
        <p>Round Date: {formatRoundDate(round.round_date)}</p>
        <p>Number of Holes: {round.num_holes}</p>
      </div>

      <div>
      <h2 className="text-2xl font-bold mb-4">Holes Played</h2>
        <ul className="flex flex-col">
          {holes.map(hole => (
            <li key={hole.id} className="p-5 bg-white rounded-md border shadow-md my-4">
              <p>Hole Number: {hole.hole_number}</p>
              <p>Par: {hole.par}</p>
              <p>Distance: {hole.distance}</p>
              <p>Score: {hole.hole_score}</p>
              <div className='flex'>
                <Link to="/newhole" state={{ round_id: round.id, course_id: round.course_id, edit: true, hole_number: hole.hole_number, par: hole.par, distance: hole.distance, holeScore: hole.hole_score, hole_id: hole.id }}>
                  <MdEdit/>
                </Link>
                <button onClick={() => handleDelete(hole.id, {round_id: round.id, hole_score: hole.hole_score})}><MdDelete/></button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Link to="/newhole" state={{ round_id: round.id, course_id: round.course_id, edit: false }} className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
        Add Hole
      </Link>
    </div>
  );
};

export default ViewRound;