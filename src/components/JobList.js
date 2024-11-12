import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { JobContext } from '../state/jobContext';
import styled from 'styled-components';

const JobListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
`;

const JobCard = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }
`;

const JobDetails = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const JobTitle = styled.h4`
  margin: 0;
  font-size: 1.2rem;
  color: #2c3e50;
`;

const JobDescription = styled.p`
  margin: 5px 0;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.4;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background-color: ${({ color }) => (color === 'primary' ? '#3498db' : '#e74c3c')};
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ color }) => (color === 'primary' ? '#2980b9' : '#c0392b')};
  }
`;

const JobList = ({ jobs }) => {
  const { dispatch } = useContext(JobContext);

  const deleteJob = (id) => {
    dispatch({ type: 'DELETE_JOB', payload: id });
  };

  return (
    <JobListContainer>
      {jobs.map((job) => (
        <JobCard key={job.id}>
          <JobDetails>
            <JobTitle>{job.title}</JobTitle>
            <JobDescription>{`${job.description.substring(0, 50)}...`}</JobDescription>
          </JobDetails>
          <ActionButtons>
            <ActionButton color="primary" as={Link} to={`/job/${job.id}`}>
              View
            </ActionButton>
            <ActionButton color="secondary" onClick={() => deleteJob(job.id)}>
              Delete
            </ActionButton>
          </ActionButtons>
        </JobCard>
      ))}
    </JobListContainer>
  );
};

export default JobList;
