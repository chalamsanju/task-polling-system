Dapp To Build The polling system 

//created the folder named task 
 
>> npx create-next-app .  

//package.json file
{
  "name": "Polling-System",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@metamask/detect-provider": "^2.0.0",
    "@next/font": "13.4.13",
    "axios": "^1.6.8",
    "chart.js": "^4.4.4",
    "ethers": "^5.7.2",
    "file-saver": "^2.0.5",
    "jspdf": "^2.5.2",
    "next": "13.4.13",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-dropzone": "^14.2.3",
    "react-hot-toast": "^2.4.1",
    "react-icons": "^4.10.1",
    "react-is": "^18.3.1",
    "react-router-dom": "^6.26.2",
    "recharts": "^2.12.7",
    "web3": "^4.13.0",
    "web3modal": "^1.9.9"
  }
}

>>npm install -it will install all dependencies

//used the remix to deploy and test the smart contracts

1.created the smart contract PollingSystem.sol
2.compiled it and runned it by connecting the metamask and got the 
PollingSystem address-0x1Bb1618ab240b188945C324880cd6BeE3cBf08A3

//Created the Pinata api and secreat key
//create the Environment File env.local and stored the 
#CONTRACT ADDRESS
NEXT_PUBLIC_POLLINGSYSTEM_ADDRESS = 0x1Bb1618ab240b188945C324880cd6BeE3cBf08A3

#PINATA KEYS
NEXT_PUBLIC_PINATA_API_KEY= d54fa1e6bbb06ce4cb6d
NEXT_PUBLIC_PINATA_SECREAT_KEY= 069c41fd970c3367f9414a6da41b308affb8f3d32f5ab7ddb379dd233ed0c4b3


//In Context File Created The
1.PollingSystem.json file which i got from artifacts from the remix ide while deploying the PollingSystem.sol
2.created Constants.js to connect with differnt Test Networks
3.Created Index.js

//Create the utils and created the index.js file which to connect metamask

//Created the Pages
1._app.js
2.index.js
3.poll.js
4.PollCreationForm.js
5.PollDetailsPage.js
6.UserProfilePage.js

and used some commands

>>npm install react-router-dom
>>npm install web3 @metamask/detect-provider
>>npm install react-is

//created the Components 
1.Header
2.Footer
3.PollCreationForm
4.HeroSection
5.PollDetailsPage
6.SearchComponent
7.Button.jsx
9.Error.jsx
7.Layout.jsx

//finally to runing it in localhost

>>npm run dev