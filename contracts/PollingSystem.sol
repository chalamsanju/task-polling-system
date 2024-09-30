// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract PollingSystem { 
   
   struct Poll{
     string title;
     string[] options;
     uint[] votes;
     address owner;
     bool exist;
   }

   uint public pollCount = 0;
   mapping(uint => Poll)public polls;
   
   //notify poll creation
   event PollCreated(uint pollID, string title, address owner);

   //notify voting
   event Voted(uint pollID, uint optionIndex, address voter);
 

   //function to create a new poll
   function createPoll(string memory _title, string[] memory _options)public{
    require(_options.length>1, "more then one option required");

    Poll storage newPoll = polls[pollCount];
    newPoll.title=_title;
    newPoll.options=_options;
    newPoll.votes=new uint[](_options.length);
    newPoll.owner=msg.sender;
    newPoll.exist= true;

    emit PollCreated(pollCount, _title, msg.sender);
    pollCount++;
   }

   //function to cast a vote
   function vote(uint _pollID, uint _optionIndex) public {
    require(polls[_pollID].exist, "poll does not exist");
    require(_optionIndex < polls[_pollID].options.length, "invaid option");

    polls[_pollID].votes[_optionIndex]++;

    emit Voted(_pollID, _optionIndex, msg.sender);
   }

   //functions to retrive the poll details and results

   //function to get poll details
   function getPolls(uint _pollID)public view returns(string memory, string[] memory, uint[] memory, address){
    require(polls[_pollID].exist, "poll does not exist");

    Poll storage poll = polls[_pollID];
    return (
        poll.title,
        poll.options,
        poll.votes,
        poll.owner
    );

   }

   //function to get poll count

   function getPollCount() public view returns (uint){
    return pollCount;
   }

}