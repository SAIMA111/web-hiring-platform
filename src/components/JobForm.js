import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 20px auto;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #34495e;
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 1rem;
  color: #555;

  &:focus {
    border-color: #1abc9c;
    box-shadow: 0 0 5px rgba(26, 188, 156, 0.3);
    outline: none;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 1rem;
  color: #555;
  resize: none;

  &:focus {
    border-color: #1abc9c;
    box-shadow: 0 0 5px rgba(26, 188, 156, 0.3);
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #1abc9c;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: block;
  width: 100%;
  text-align: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #16a085;
  }
`;

const JobForm = ({ job, onSubmit }) => {
  const [jobTitle, setJobTitle] = useState(job ? job.title : '');
  const [jobDescription, setJobDescription] = useState(job ? job.description : '');

  useEffect(() => {
    if (job) {
      setJobTitle(job.title);
      setJobDescription(job.description);
    }
  }, [job]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (jobTitle && jobDescription) {
      const newJob = {
        id: job ? job.id : Math.random(),
        title: jobTitle,
        description: jobDescription,
        candidates: job ? job.candidates : 0,
      };
      onSubmit(newJob);
      setJobTitle('');
      setJobDescription('');
    } else {
      alert('Please fill in both fields');
    }
  };

  return (
    <FormContainer>
      <Title>{job ? 'Edit Job' : 'Create New Job'}</Title>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label>Job Title</Label>
          <Input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Enter job title"
          />
        </FormField>
        <FormField>
          <Label>Job Description</Label>
          <Textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Enter job description"
            rows="5"
          />
        </FormField>
        <Button type="submit">{job ? 'Update Job' : 'Create Job'}</Button>
      </form>
    </FormContainer>
  );
};

export default JobForm;
