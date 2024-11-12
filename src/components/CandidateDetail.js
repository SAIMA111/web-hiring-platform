import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { JobContext } from '../state/jobContext';

const CandidateDetailContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 20px auto;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const CandidateHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #2c3e50;
`;

const CandidateInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #34495e;
  flex-basis: 30%;
`;

const Info = styled.p`
  flex-basis: 70%;
  color: #555;
  margin: 0;
  word-wrap: break-word;
`;

const ResumeLink = styled.a`
  color: #1abc9c;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const StatusSelect = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  font-size: 0.9rem;
  color: #2c3e50;

  &:focus {
    outline: none;
    border-color: #1abc9c;
  }
`;

const SaveButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px 15px;
  background-color: #1abc9c;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #16a085;
  }
`;

const CandidateDetail = () => {
  const { id } = useParams(); // Get the candidate's ID from the URL
  const [candidate, setCandidate] = useState(null);
  const navigate = useNavigate(); // To redirect after status change
  const { state, dispatch } = useContext(JobContext);

  useEffect(() => {
    const filterCandidate = state.candidates.filter(
      (candidate) => candidate.id === Number(id)
    );

    if (filterCandidate.length > 0) {
      setCandidate(filterCandidate[0]);
    }
  }, [id, state.candidates]);

  const handleStatusChange = (newStatus) => {
    setCandidate((prev) => ({
      ...prev,
      status: newStatus,
    }));

    dispatch({
      type: 'UPDATE_CANDIDATE_STATUS',
      payload: {
        jobId: candidate.jobId,
        candidateId: Number(id),
        newStatus,
      },
    });

    // Optionally redirect to another page after status update
    navigate(`/job/${id}`);
  };

  if (!candidate) return <div>Loading...</div>;

  return (
    <CandidateDetailContainer>
      <CandidateHeader>{candidate.name}'s Profile</CandidateHeader>
      <CandidateInfo>
        <Label>Email:</Label>
        <Info>{candidate.email}</Info>
      </CandidateInfo>
      <CandidateInfo>
        <Label>Contact:</Label>
        <Info>{candidate.contact}</Info>
      </CandidateInfo>
      <CandidateInfo>
        <Label>Skills:</Label>
        <Info>{candidate.skills.join(', ')}</Info>
      </CandidateInfo>
      <CandidateInfo>
        <Label>Experience:</Label>
        <Info>{candidate.experience} years</Info>
      </CandidateInfo>
      <CandidateInfo>
        <Label>Resume:</Label>
        <Info>
          <ResumeLink href={candidate.resumeLink} target="_blank">
            Download Resume
          </ResumeLink>
        </Info>
      </CandidateInfo>
      <CandidateInfo>
        <Label>Status:</Label>
        <StatusSelect
          value={candidate.status}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="Under Review">Under Review</option> 
          <option value="Rejected">Rejected</option>
          <option value="Interview Scheduled">Interview Scheduled</option>
          <option value="Hired">Hired</option>
         
        </StatusSelect>
      </CandidateInfo>
      <SaveButton onClick={() => navigate('/jobs')}>Back to Jobs</SaveButton>
    </CandidateDetailContainer>
  );
};

export default CandidateDetail;
