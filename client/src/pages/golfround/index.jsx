import React, { useEffect, useState } from 'react'
import { onGetGolfCourses, onNewGolfRound } from '../../api/api.routes';


const GolfRound = () => {
    const [courses, setCourses] = useState([]);
    const [values, setValues] = useState({
        course_id: '',
        num_holes: 0
    });
    useEffect(() => {
        fetchData();
    }, []);

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
        await onNewGolfRound(values)
      } catch (error) {
        console.log(error)
      }
    };
  
    return (
      <div className="max-w-md mx-auto mt-8">
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
  
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300" >
            Create Golf Round
          </button>
        </form>
      </div>
    );
  };

export default GolfRound