import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';


const GithubContext = React.createContext();

// Provider, Consumer - GithubContext.Provider
const GithubProvider = ({children}) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [request, setRequest] = React.useState(0);
  
  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
    .then(({data})=>{
      let {
        rate: {remaining}
      } = data;
      setRequest(remaining);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  useEffect(()=>{
    checkRequest();
  },[]);

  return (
    <GithubContext.Provider value={{
      githubUser,
      repos,
      followers,
      request
    }}>{children}</GithubContext.Provider>
  )
}

export {GithubContext, GithubProvider}