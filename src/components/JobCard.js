import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const JobCard = ({ job, onEdit, onDelete }) => {
  return (
    <JobCardContainer>
      <JobHeader>
        <JobTitle>{job.title}</JobTitle>
        <ActionButtons>
          <ActionButton onClick={() => onEdit(job.id)}>Edit</ActionButton>
          <DeleteButton onClick={() => onDelete(job.id)}>Delete</DeleteButton>
        </ActionButtons>
      </JobHeader>
      <JobDescription>{job.description}</JobDescription>
      <CandidatesCount>{job.candidates} Candidates Applied</CandidatesCount>
      <ViewButton to={`/job/${job.id}`}>View Details</ViewButton>
    </JobCardContainer>
  );
};

export default JobCard;

// Styled Components

export const JobCardContainer = styled.div`
  background-color: #ffffff;
  padding: 15px;
  margin: 10px 0;
  border-radius: 6px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 10px;
    margin: 8px 0;
  }
`;

export const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
`;

export const JobTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #2c3e50;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const JobDescription = styled.p`
  margin: 8px 0;
  font-size: 13px;
  color: #555;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const CandidatesCount = styled.span`
  display: block;
  margin-bottom: 10px;
  font-size: 11px;
  color: #888;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 768px) {
    align-self: flex-start;
  }
`;

export const ActionButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }

  @media (max-width: 768px) {
    padding: 5px 8px;
    font-size: 11px;
  }
`;

export const DeleteButton = styled(ActionButton)`
  background-color: #e74c3c;

  &:hover {
    background-color: #c0392b;
  }
`;

export const ViewButton = styled(Link)`
  display: inline-block;
  text-align: center;
  background-color: #1abc9c;
  color: white;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #16a085;
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 11px;
  }
`;
