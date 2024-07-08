import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await LoginApiCall(username, password);

      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', username);
        navigate('/protected');
      } else {
        // Handle login error
        console.error('Login failed:', response.message);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Login failed:', error.message);
    }
  };


  const handleLabelClick = (event) => {
    const input = event.target.previousElementSibling;
    input.focus();
    event.target.classList.add('text-sm', 'translate-y-[-100%]');
  };

  return (
    <>
  
  <div className="flex justify-center items-center h-screen bg-gradient-to-b from-red-400 to-blue-600">
        <div className="bg-white bg-opacity-50 p-4 rounded shadow-md flex flex-col md:flex-row md:max-w-3xl">
          
          <div className="md:w-1/2 bg-green-400 font-bold text-center py-8">
            <span className='text-[#FFFFFF]'>TRANSPORT WINGS (CAL) PVT LTD</span>
            <div className='mt-4'>
              <img src="/twcpl.png" alt="Login" className="h-40 w-40 mx-auto" />
            </div>
            <div className='mt-4 text-[#FFFFFF]'>
              <span>Logistics Management</span>
              <div><span>ERP</span></div>
            </div>
          </div>

          <div className='md:w-1/2 bg-blue-400 py-8 px-4'>
            <div className="flex justify-center items-center">
              <FaUser className='h-12 w-12 text-white'/>
            </div>

            <h2 className="text-2xl font-bold text-center mb-4 text-white">Please sign in</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative bg-red-600">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border-b border-blue-400 focus:outline-none bg-blue-400 text-white"
                  required
                />
                <label
                  className="absolute top-0 left-0 transition-all duration-300 ease-in-out cursor-text text-white"
                  onClick={handleLabelClick}
                >
                  Username
                </label>
              </div>
              <div className="relative bg-red-600">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-b border-blue-400 focus:outline-none bg-blue-400 text-white"
                  required
                />
                <label
                  className="absolute top-0 left-0 transition-all duration-300 ease-in-out cursor-text text-white"
                  onClick={handleLabelClick}
                >
                  Password
                </label>
              </div>

              <button type="submit" className="bg-white text-black font-bold py-2 px-4 rounded w-[200px]">
                Sign in
              </button>
            </form>
            <p className="mt-1 ml-[70px] text-gray-600 text-center">
              <a href="/forgot" className="text-white underline">Forgot password</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const LoginApiCall = async (username, password) => {
  try {
    const response = await fetch('https://twi-e-logistics.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the login request:', error);
    return { success: false, message: error.message };
  }
};

export default Login;



// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaUser } from "react-icons/fa";
// import NavbarMain from '../NavbarMain';



// function Login() {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('https://twi-e-logistics.onrender.com/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       console.log('Login successful:', data);

//       localStorage.setItem('token', data.token);
//       // or send it as a response back to the client if you're using server-side rendering

//       // Redirect to the protected route, which includes the Sidebar
//       navigate('/protected');

      

//     } catch (error) {
//       console.error('Error during login:', error.message);
//       // Optionally, you can display an error message to the user
//     }
//   };

//   const handleLabelClick = (event) => {
//     const input = event.target.previousElementSibling;
//     input.focus();
//     event.target.classList.add('text-sm', 'translate-y-[-100%]');
//   };

//   return (
//     <>
//    <NavbarMain />
   
//     <div className="flex justify-center items-center h-screen bg-gradient-to-b from-red-400 to-blue-600">
//       <div className="bg-white bg-opacity-50 p-4 rounded shadow-md flex flex-col md:flex-row md:max-w-3xl">
        
//         <div className="md:w-1/2 bg-green-400 font-bold text-center py-8">
//           <span className='text-[#FFFFFF]'>TRANSPORT WINGS (CAL) PVT LTD</span>
//           <div className='mt-4'>
//             <img src="/twcpl.png" alt="Login" className="h-40 w-40 mx-auto" />
//           </div>
//           <div className='mt-4 text-[#FFFFFF]'>
//             <span>Logistics Management</span>
//             <div><span>ERP</span></div>
//           </div>
//         </div>

//         <div className='md:w-1/2 bg-blue-400 py-8 px-4'>
//         <div className="flex justify-center items-center">
//           <FaUser className='h-12 w-12 text-white'/>
//         </div>

//           <h2 className="text-2xl font-bold text-center mb-4 text-white">Please sign in</h2>
//           <form onSubmit={handleSubmit} className="space-y-4 ">
//             <div className="relative bg-red-600">
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="w-full border-b border-blue-400 focus:outline-none bg-blue-400 text-white"
//                 required
//               />
//               <label
//                 className="absolute top-0 left-0 transition-all duration-300 ease-in-out cursor-text text-white"
//                 onClick={handleLabelClick}
//               >
//                 Username
//               </label>
//             </div>
//             <div className="relative bg-red-600">
//               <input
//                 type="password" // Set input type to "password"
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full border-b border-blue-400 focus:outline-none bg-blue-400 text-white"
//                 required
//               />
//               <label
//                 className="absolute top-0 left-0 transition-all duration-300 ease-in-out cursor-text text-white"
//                 onClick={handleLabelClick}
//               >
//                 Password
//               </label>
//             </div>

//             <button type="submit" className="bg-white text-black font-bold py-2 px-4 rounded w-[200px]">
//               Sign in
//             </button>
//           </form>
//           <p className="mt-1 ml-[70px] text-gray-600 text-center">
//             <Link to="/forgot" className="text-white underline">Forgot password</Link>
//           </p>

//         </div>
//       </div>
//     </div>
//     </>
//   );
// }

// export default Login;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie'; // Import js-cookie library

// function Login() {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Perform login logic here
//       // Assuming login is successful and you receive a token
//       const token = 'your_token_here'; // Replace this with the actual token received from the server
//       Cookies.set('token', token, { expires: 7 }); // Store token in cookies with expiry of 7 days
//       console.log('Token stored successfully:', token); // Print message in console
//       navigate('/protected'); // Redirect to the protected route
//     } catch (error) {
//       console.error('Error during login:', error.message);
//       // Optionally, you can display an error message to the user
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-200 to-blue-400">
//       <div className="bg-white p-8 rounded shadow-md">
//         <h2 className="text-2xl font-bold mb-4">User Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="username" className="block">Username:</label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="w-full border rounded-md py-2 px-3"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block">Password:</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full border rounded-md py-2 px-3"
//               required
//             />
//           </div>
//           <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
//             Login
//           </button>
//         </form>
//         <p className="mt-4 text-gray-600">
//           Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;



// // Login.js

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function Login() {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   // Inside handleSubmit function in Login.js

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     // Perform login logic here
//     // Assuming login is successful and you receive a token
//     const token = 'your_token_here'; // Replace this with the actual token received from the server
//     localStorage.setItem('token', token);
//     navigate('/protected'); // Redirect to the protected route
//   } catch (error) {
//     console.error('Error during login:', error.message);
//     // Optionally, you can display an error message to the user
//   }
// };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     // Perform login logic here
//   //     // For demo purposes, immediately redirect to /sidebar
//   //     navigate('/home');
//   //   } catch (error) {
//   //     console.error('Error during login:', error.message);
//   //     // Optionally, you can display an error message to the user
//   //   }
//   // };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-200 to-blue-400">
//       <div className="bg-white p-8 rounded shadow-md">
//         <h2 className="text-2xl font-bold mb-4">User Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="username" className="block">Username:</label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="w-full border rounded-md py-2 px-3"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block">Password:</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full border rounded-md py-2 px-3"
//               required
//             />
//           </div>
//           <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
//             Login
//           </button>
//         </form>
//         <p className="mt-4 text-gray-600">
//           Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function Login() {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });

//   const navigate = useNavigate(); // Initialize useNavigate hook

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('https://twi-e-logistics.onrender.com/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       console.log('Login successful:', data);

//       // Redirect to the protected route upon successful login
//       navigate('/sidebar');

//     } catch (error) {
//       console.error('Error during login:', error.message);
//       // Optionally, you can display an error message to the user
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-200 to-blue-400">
//       <div className="bg-white p-8 rounded shadow-md">
//         <h2 className="text-2xl font-bold mb-4">User Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="username" className="block">Username:</label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="w-full border rounded-md py-2 px-3"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block">Password:</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full border rounded-md py-2 px-3"
//               required
//             />
//           </div>
//           <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
//             Login
//           </button>
//         </form>
//         <p className="mt-4 text-gray-600">
//           Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// function Login() {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('https://twi-e-logistics.onrender.com/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       console.log('Login successful:', data);
      
//       // Redirect to the sidebar route upon successful login
//       // You can replace this with a link if needed, but typically redirection
//       // after login is handled by the backend and the frontend will update accordingly

//     } catch (error) {
//       console.error('Error during login:', error.message);
//       // Optionally, you can display an error message to the user
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-200 to-blue-400">
//       <div className="bg-white p-8 rounded shadow-md">
//         <h2 className="text-2xl font-bold mb-4">User Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="username" className="block">Username:</label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="w-full border rounded-md py-2 px-3"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block">Password:</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full border rounded-md py-2 px-3"
//               required
//             />
//           </div>
//           <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
//             Login
//           </button>
//         </form>
//         <p className="mt-4 text-gray-600">
//           Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;