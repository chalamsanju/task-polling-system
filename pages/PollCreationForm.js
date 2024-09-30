import React, { useState } from "react";
import styles from '../Components/PollCreationForm/PollCreationForm.module.css'; 
import { useStateContext } from "../Context/index";

const PollCreationForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState(["", ""]); 
  const { createPoll } = useStateContext();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, ""]); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPoll({ title, description, options });
    setTitle("");
    setDescription("");
    setOptions(["", ""]); 
  };

  return (
    <form className={styles.pollCreationForm} onSubmit={handleSubmit}>
      <h2>Create a Poll</h2>
      <input
        type="text"
        placeholder="Poll Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Poll Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <h3>Options</h3>
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Option ${index + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          required
        />
      ))}
      <button type="button" onClick={handleAddOption}>Add Option</button>
      <button type="submit">Create Poll</button>
    </form>
  );
};

export default PollCreationForm;
