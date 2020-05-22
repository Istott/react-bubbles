import React, {useState} from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
// import Loader from "react-loader-spinner";

// const Login = () => {
//   // make a post request to retrieve a token from the api
//   // when you have handled the token, navigate to the BubblePage route
//   return (
//     <>
//       <h1>Welcome to the Bubble App!</h1>
//       <p>Build a login page here</p>
//     </>
//   );
// };

// export default Login;



const Login = props => {
  // const [username, setUserName] = useState('');
  // const [password, setPassword] =  useState('');
  // const [fetchingData, setFetchingData] = useState('');
  
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    fetchingData: false
  })


  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  };

  const login = e => {
    e.preventDefault();

    axiosWithAuth()
      .post("/api/login", credentials)
      .then(res => {
        console.log(res);
        // setTimeout(() => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/protected");
        // }, 2000)
        setCredentials.fetchingData(true)
        console.log('will mount', this.state.fetchingData)
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <form onSubmit={login}>
        <input
          type="text"
          name="username"
          placeholder='username'
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder='password'
          value={credentials.password}
          onChange={handleChange}
        />
        <button>Log in</button>
      </form>
      {/* <div className='loader' >
          {this.state.fetchingData && (
          <div className="key spinner">
              <Loader type="Puff" color="#204963" height="60" width="60" />
              <p>Loading Data</p>
          </div>
          )}
      </div> */}
    </div>
  );

}


export default Login;
