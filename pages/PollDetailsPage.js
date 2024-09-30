import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../Components/PollDetailsPage/PollDetailsPage.module.css';

const PollDetailsPage = ({ polls = [], currentAccount, vote }) => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [totalVotes, setTotalVotes] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    
    if (!polls.length) {
      console.error("Polls data is not available");
      return;
    }

    
    const currentPoll = polls.find(p => p.id === parseInt(pollId));
    if (currentPoll) {
      setPoll(currentPoll);

     
      const total = currentPoll.options.reduce((acc, option) => acc + option.voteCount, 0);
      setTotalVotes(total);

      
      const endTime = new Date(currentPoll.endTime);
      const now = new Date();
      const timeDiff = endTime - now;
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeRemaining(`${hours} hours and ${minutes} minutes remaining`);
    } else {
      console.error("Poll not found for ID:", pollId);
    }
  }, [pollId, polls]);


  const handleVote = async (optionId) => {
    try {
      await vote(pollId, optionId, currentAccount);
     
    } catch (error) {
      console.error("Error while voting: ", error);
    }
  };

  // If poll is not found, return loading message or redirect
  if (!poll) {
    return <p>Loading poll details or Poll not found...</p>; // You could also use a redirect or a 404 component here
  }

  return (
    <div className={styles['poll-details-container']}>
      <h1 className={styles['poll-title']}>{poll.title}</h1>
      <p className={styles['poll-description']}>{poll.description}</p>
      <p><strong>Creator:</strong> {poll.creator}</p>
      <p><strong>Total Votes:</strong> {totalVotes}</p>
      <p><strong>Time Remaining:</strong> {timeRemaining}</p>

      <ul className={styles['options-list']}>
        {poll.options.map((option, index) => (
          <li key={index} className={styles['option-item']}>
            {option.text} - {option.voteCount} votes ({((option.voteCount / totalVotes) * 100).toFixed(2)}%)
            <button 
              className={styles['vote-button']} 
              onClick={() => handleVote(index)}
            >
              Vote
            </button>
          </li>
        ))}
      </ul>

      <h3>Related Polls</h3>
      <ul className={styles['related-polls-list']}>
        {polls
          .filter(p => p.id !== poll.id)
          .slice(0, 3)
          .map(relatedPoll => (
            <li key={relatedPoll.id}>
              <a href={`/polls/${relatedPoll.id}`}>
                {relatedPoll.title}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PollDetailsPage;
