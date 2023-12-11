import React, { useState, useEffect } from 'react';
import { onGetGolfRound, onGetRoundHoles } from '../../api/api.routes';
import { useParams } from "react-router-dom";

const ViewRound = ({ match }) => {
  const [round, setRound] = useState({});
  const [holes, setHoles] = useState([]);

  console.log(holes)

  let {id} = useParams();
  
  useEffect(() => {
    console.log(id)
    // Fetch round information
    onGetGolfRound(id)
      .then(response => setRound(response.data.golf_round))
      .catch(error => console.error('Error fetching round:', error));

    // Fetch holes for the round
    onGetRoundHoles(id)
      .then(response => setHoles(response.data.golf_roundholes))
      .catch(error => console.error('Error fetching holes:', error));

  }, [id]);

  const formatRoundDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };


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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewRound;