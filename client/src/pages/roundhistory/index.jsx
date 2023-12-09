import React, { useEffect, useState } from 'react';
import { onGetGolfCourse, onGetGolfRounds } from '../../api/api.routes';

const RoundHistory = () => {
  const [golfRounds, setGolfRounds] = useState([]);

  useEffect(() => {
    fetchGolfRounds();
  }, []);

  const fetchGolfRounds = async () => {
    try {
      const response = await onGetGolfRounds();
      const roundsWithCourseNames = await Promise.all(
        response.data.golf_rounds.map(async (round) => {
          const courseName = await fetchGolfCourse(round.course_id);
          return { ...round, courseName, formattedDate: formatRoundDate(round.round_date) };
        })
      );
      setGolfRounds(roundsWithCourseNames);
    } catch (error) {
      console.error('Error fetching golf rounds', error);
    }
  };

  const fetchGolfCourse = async (course_id) => {
    try {
      const response = await onGetGolfCourse(course_id);
      return response.data.golf_course.course_name;
    } catch (error) {
      console.error('Error fetching course', error);
    }
  };

  const formatRoundDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="px-5 max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Golf Rounds</h2>
      {golfRounds.length === 0 ? (
        <p>No golf rounds available.</p>
      ) : (
        <ul className="space-y-4">
          {golfRounds.map((round) => (
            <li key={round.id} className="border p-4 rounded-md">
              <p>Course Name: {round.courseName}</p>
              <p>Date: {round.formattedDate}</p>
              <p>Score: {round.round_score}</p>
              <p>Number of Holes: {round.num_holes}</p>
              {/* Add more details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RoundHistory;
