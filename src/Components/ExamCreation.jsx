import React, { useState } from 'react';


const ExamCreation = () => {
  const [examName, setExamName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endDateError, setEndDateError] = useState('');

  const handleStartDateChange = (date) => {
    setStartDate(date);
    // Clear end date and error when start date changes
    setEndDate('');
    setEndDateError('');
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);

    if (startDate && date < startDate) {
      setEndDateError('End date cannot be before the start date.');
    } else {
      setEndDateError('');
    }
  };
  return (
    <div>
      <div>
        <label>Exam Name:</label>
        <input
          type="text"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
        />
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => handleStartDateChange(e.target.value)}
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => handleEndDateChange(e.target.value)}
          min={startDate}
        />
          {endDateError && <p style={{ color: 'red' }}>{endDateError}</p>}
      </div>
    </div>
  );
};

export default ExamCreation;
