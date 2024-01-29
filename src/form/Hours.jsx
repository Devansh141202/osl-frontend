import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HoursChart from './HoursChart';

const App = () => {
  const [totalHoursData, setTotalHoursData] = useState([]);
  const [hoursByMonthData, setHoursByMonthData] = useState([]);
  const [hoursByStateData, setHoursByStateData] = useState([]);
  const [hoursByDistrictData, setHoursByDistrictData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalHours = async () => {
      try {
        const response = await axios.get('/api/getHours');
        setTotalHoursData(response.data);
      } catch (error) {
        console.error('Error fetching total hours data:', error);
      }
    };

    const fetchHoursByMonth = async () => {
      try {
        const response = await axios.get('/api/getHoursByMonth');
        setHoursByMonthData(response.data);
      } catch (error) {
        console.error('Error fetching hours by month data:', error);
      }
    };

    const fetchHoursByState = async () => {
      try {
        const response = await axios.get('/api/getHoursByState/STATE_ID'); // Replace STATE_ID with the actual state ID
        setHoursByStateData(response.data);
      } catch (error) {
        console.error('Error fetching hours by state data:', error);
      }
    };

    const fetchHoursByDistrict = async () => {
      try {
        const response = await axios.get('/api/getHoursByDistrict/DISTRICT_ID'); // Replace DISTRICT_ID with the actual district ID
        setHoursByDistrictData(response.data);
      } catch (error) {
        console.error('Error fetching hours by district data:', error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchTotalHours(), fetchHoursByMonth(), fetchHoursByState(), fetchHoursByDistrict()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <HoursChart data={totalHoursData} title="Total Hours Worked" />
      <HoursChart data={hoursByMonthData} title="Hours Worked by Month" />
      <HoursChart data={hoursByStateData} title="Hours Worked by State" />
      <HoursChart data={hoursByDistrictData} title="Hours Worked by District" />
    </div>
  );
};

export default App;
