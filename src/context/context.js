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

  const [isLoading, setIsLoading] = useState(false);
  const [request, setRequest] = React.useState(0);
  const [error, setError] = useState({show: false, msg: ''});
  
  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
    .then(({data})=>{
      let {
        rate: {remaining}
      } = data;
      setRequest(remaining);
      
      if (remaining === 0) {
        toogleError(true, 'sorry! you have exceeded your hourly rate limit');
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  const toogleError = (show = false, msg = '') => {
    setError({show, msg});
  }
  
  const searchGithubUser = async(user) => {
    setIsLoading(true);
    if (user) {
      const response = await axios(`${rootUrl}/users/${user}`)
      .catch((err)=>{
        console.log(err);
      });
      if (response && response.data) {
        console.log(response.data);
      } else {
        toogleError(true, 'user not found!');
      }
      setIsLoading(false);
    }
  }
  
  useEffect(()=>{
    checkRequest();
  },[]);

  return (
    <GithubContext.Provider value={{
      githubUser,
      repos,
      followers,
      request,
      error,
      searchGithubUser,
      isLoading,
    }}>{children}</GithubContext.Provider>
  )
}

export {GithubContext, GithubProvider}