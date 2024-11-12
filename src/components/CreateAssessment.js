import React, { useState, useContext } from 'react';
import { JobContext } from '../state/jobContext';
import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  margin: 20px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 95%;
    padding: 15px;
  }
`;

const AssessmentContainer = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.8rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    border-color: #1abc9c;
    outline: none;
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  resize: none;

  &:focus {
    border-color: #1abc9c;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #1abc9c;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #16a085;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
`;

const QuestionCard = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const OptionInput = styled(Input)`
  margin-top: 5px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    border-color: #1abc9c;
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 0.9rem;
`;

const QuestionList = styled.div`
  margin-top: 20px;
`;

const CreateAssessment = () => {
    const { state, dispatch } = useContext(JobContext);
    const [selectedJob, setSelectedJob] = useState('');
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [answer, setAnswer] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [error, setError] = useState('');

    const handleJobChange = (e) => {
        setSelectedJob(e.target.value);
    };

    const handleAddOption = () => {
        if (options.length >= 4) {
            setError('A question can have a maximum of 4 options.');
            return;
        }
        setOptions([...options, '']);
        setError('');
    };

    // Handle changing the value of an option
    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    // Handle adding a question to the assessment
    const handleAddQuestion = () => {
        if (!question || options.length < 2 || !answer) {
            setError('Please provide a question, at least two options, and an answer.');
            return;
        }
        const newQuestion = { question, options, answer };

        if (editingIndex !== null) {
            // If we are editing a question, update it in the state
            dispatch({
                type: 'UPDATE_QUESTION',
                payload: { jobId: selectedJob, questionId: editingIndex, updatedQuestion: newQuestion },
            });
            setEditingIndex(null);  // Reset editing state
        } else {
            // If it's a new question, add it to the state
            dispatch({
                type: 'ADD_QUESTION',
                payload: { jobId: selectedJob, question: newQuestion },
            });
        }

        setQuestion('');
        setOptions([]);
        setAnswer('');
        setError('');
    };

    // Handle editing a question
    const handleEditQuestion = (index) => {
        const questionToEdit = state.assessments[selectedJob][index];
        setQuestion(questionToEdit.question);
        setOptions(questionToEdit.options);
        setAnswer(questionToEdit.answer);
        setEditingIndex(index);
    };

    const handleDeleteQuestion = (index) => {
        dispatch({
            type: 'DELETE_QUESTION',
            payload: { jobId: selectedJob, questionId: index },
        });
    };

    const handleSubmit = () => {
        if (!selectedJob) {
            setError('Please select a job.');
            return;
        }
        if (!state.assessments[selectedJob] || state.assessments[selectedJob].length === 0) {
            setError('Please add at least one question.');
            return;
        }
        setError('');
        console.log(`Saving assessment for job: ${selectedJob} `);

        // Dispatch SAVE_ASSESSMENT action to save the questions to the store
        dispatch({
            type: 'SAVE_ASSESSMENT',
            payload: { jobId: selectedJob, questions: state.assessments[selectedJob] },
        });

        // Reset state or show success message
        alert('Assessment saved successfully!');
    };

    return (
        <Container>
            <AssessmentContainer>
                <Title>Create or Edit Assessment</Title>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Form>
                    <Label>Choose Job</Label>
                    <Select value={selectedJob} onChange={handleJobChange}>
                        <option value="">Select a job</option>
                        {state.jobs.map((job) => (
                            <option key={job.id} value={job.id}>
                                {job.title}
                            </option>
                        ))}
                    </Select>

                    <Label>Question</Label>
                    <Textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Enter the question"
                    />

                    <Label>Options</Label>
                    {options.map((option, index) => (
                        <OptionInput
                            key={index}
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`Option ${index + 1} `}
                        />
                    ))}
                    <Button type="button" onClick={handleAddOption}>
                        Add Option
                    </Button>

                    <Label>Answer</Label>
                    <Input
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Enter the correct answer"
                    />

                    <Button type="button" onClick={handleAddQuestion}>
                        {editingIndex !== null ? 'Update Question' : 'Add Question'}
                    </Button>

                </Form>
                
            </AssessmentContainer>

            <QuestionList>
                {state.assessments[selectedJob]?.map((q, index) => (
                    <QuestionCard key={index}>
                        <h3>Question {index + 1}: {q.question}</h3>
                        <p>Options:</p>
                        <ul>
                            {q.options.map((opt, idx) => (
                                <li key={idx}>{opt}</li>
                            ))}
                        </ul>
                        <p>Answer: {q.answer}</p>
                        <ButtonContainer>
                            <Button type="button" onClick={() => handleEditQuestion(index)}>
                                Edit Question
                            </Button>
                            <Button type="button" onClick={() => handleDeleteQuestion(index)}>
                                Delete Question
                            </Button>
                        </ButtonContainer>
                    </QuestionCard>
                ))}
            </QuestionList>


        </Container>
    );
};

export default CreateAssessment;
