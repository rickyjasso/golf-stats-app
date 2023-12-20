import React, { useEffect, useState } from 'react'
import { onGetGolfCourses, onNewGolfRound } from '../../api/api.routes';
import { useNavigate } from 'react-router-dom';

const GolfRound = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [values, setValues] = useState({
        course_id: '',
        num_holes: ''
    });
    useEffect(() => {
        fetchData();
    }, []);
    let newRoundId = null;
    const fetchData = async () => {
        try {
            onGetGolfCourses()
            .then(response => {
            setCourses(response.data.golf_courses)
            })
        } catch (error) {
            console.error('Error fetching courses', error);
        }
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Handle form submission with the selectedCourse value
      try {
        let response = await onNewGolfRound(values)
        newRoundId = response.data.res.id;
        console.log(newRoundId)
        navigate(`/viewround/${newRoundId}`);
      } catch (error) {
        console.log(error)
      }
    };
  
    return (
      <div className="px-5 max-w-md mx-auto mt-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Select a Course:</span>
            <select
              value={values.course_id}
              name='course_id'
              onChange={onChange}
              className="mt-1 p-2 border rounded-md w-full"
            >
              <option value="" disabled>Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.course_name}
                </option>
              ))}
            </select>
          </label>
  
          {/* Other form fields go here */}
          <label className="block">
          <span className="text-gray-700">Number of Holes:</span>
          <select
            value={values.num_holes}
            name='num_holes'
            onChange={onChange}
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="" disabled>Select number of holes</option>
            <option value="9">9 Holes</option>
            <option value="18">18 Holes</option>
          </select>
        </label>  
          <button type="submit" className="bg-blue-500 text-white p-2 my-2 rounded-md w-32 text-center">
            Create Golf Round
          </button>

        </form>
      </div>
    );
  };

export default GolfRound