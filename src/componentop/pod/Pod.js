import React, { useState } from 'react';
import axios from 'axios';

const Pod = () => {
    const [sourcePincode, setSourcePincode] = useState('');
    const [destinationPincodes, setDestinationPincodes] = useState(['']); // Initialize with an empty string
    const [distances, setDistances] = useState([]);
    const [error, setError] = useState('');

    const handleAddDestination = () => {
        setDestinationPincodes([...destinationPincodes, '']); // Add an empty string to the destinationPincodes array
    };

    const handleChangeDestination = (index, value) => {
        const newDestinationPincodes = [...destinationPincodes];
        newDestinationPincodes[index] = value;
        setDestinationPincodes(newDestinationPincodes);
    };

    const handleCalculateDistance = async () => {
        try {
            setError('');
            const response = await axios.post('http://localhost:5000/distancenikalo', {
                sourcePincode,
                destinationPincodes
            });
            setDistances(response.data);
        } catch (error) {
            console.error(error);
            setError('Failed to calculate distance. Please try again.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-4">Distance Calculator</h2>
           <div className='h-full w-full bg-green-300'>
            <div className="mb-4">
                <label className="block mb-2">Source Pincode:</label>
                <input
                    type="text"
                    value={sourcePincode}
                    onChange={(e) => setSourcePincode(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 "
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2">Destination Pincode:</label> {/* Display first destination input */}
                <input
                    type="text"
                    value={destinationPincodes[0]}
                    onChange={(e) => handleChangeDestination(0, e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2"
                />
            </div>
            {destinationPincodes.slice(1).map((destination, index) => (
                <div key={index} className="mb-2">
                    <input
                        type="text"
                        value={destination}
                        onChange={(e) => handleChangeDestination(index + 1, e.target.value)}
                        className="border border-gray-300 rounded px-4 py-2 "
                    />
                </div>
            ))}
            <button
                onClick={handleAddDestination}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Add Destination
            </button>
            <button
                onClick={handleCalculateDistance}
                className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
            >
                Calculate Distance
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <div className="mt-4">
                {distances.map((distance, index) => (
                    <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
                        <p className="font-semibold">Destination: {distance.destination}</p>
                        <p className="mt-2">Distance: {distance.distance}</p>
                    </div>
                ))}
            </div>
           </div>

        </div>
    );
};

export default Pod;



// import React, { useState } from 'react';
// import axios from 'axios';

// const Pod = () => {
//     const [sourcePincode, setSourcePincode] = useState('');
//     const [destinationPincodes, setDestinationPincodes] = useState([]);
//     const [distances, setDistances] = useState([]);
//     const [error, setError] = useState('');

//     const handleAddDestination = () => {
//         setDestinationPincodes([...destinationPincodes, '']);
//     };

//     const handleChangeDestination = (index, value) => {
//         const newDestinationPincodes = [...destinationPincodes];
//         newDestinationPincodes[index] = value;
//         setDestinationPincodes(newDestinationPincodes);
//     };

//     const handleCalculateDistance = async () => {
//         try {
//             setError('');
//             const response = await axios.post('http://localhost:5000/distancenikalo', {
//                 sourcePincode,
//                 destinationPincodes
//             });
//             setDistances(response.data);
//         } catch (error) {
//             console.error(error);
//             setError('Failed to calculate distance. Please try again.');
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h2 className="text-2xl font-semibold mb-4">Distance Calculator</h2>
//             <div className="mb-4">
//                 <label className="block mb-2">Source Pincode:</label>
//                 <input
//                     type="text"
//                     value={sourcePincode}
//                     onChange={(e) => setSourcePincode(e.target.value)}
//                     className="border border-gray-300 rounded px-4 py-2 w-full"
//                 />
//             </div>
//             <div className="mb-4">
//                 <label className="block mb-2">Destination Pincodes:</label>
//                 {destinationPincodes.map((destination, index) => (
//                     <div key={index} className="mb-2">
//                         <input
//                             type="text"
//                             value={destination}
//                             onChange={(e) => handleChangeDestination(index, e.target.value)}
//                             className="border border-gray-300 rounded px-4 py-2 w-full"
//                         />
//                     </div>
//                 ))}
//                 <button
//                     onClick={handleAddDestination}
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 >
//                     Add Destination
//                 </button>
//             </div>
//             <button
//                 onClick={handleCalculateDistance}
//                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//             >
//                 Calculate Distance
//             </button>
//             {error && <p className="text-red-500 mt-4">{error}</p>}
//             <div className="mt-4">
//                 {distances.map((distance, index) => (
//                     <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
//                         <p className="font-semibold">Destination: {distance.destination}</p>
//                         <p className="mt-2">Distance: {distance.distance}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Pod;


// import React, { useState } from 'react';
// import axios from 'axios';

// const Pod = () => {
//     const [sourcePincode, setSourcePincode] = useState('');
//     const [destinationPincodes, setDestinationPincodes] = useState([]);
//     const [distances, setDistances] = useState([]);
//     const [error, setError] = useState('');

//     const handleAddDestination = () => {
//         setDestinationPincodes([...destinationPincodes, '']); // Add an empty string to the destinationPincodes array
//     };

//     const handleChangeDestination = (index, value) => {
//         const newDestinationPincodes = [...destinationPincodes];
//         newDestinationPincodes[index] = value;
//         setDestinationPincodes(newDestinationPincodes);
//     };

//     const handleCalculateDistance = async () => {
//         try {
//             setError('');
//             const response = await axios.post('http://localhost:5000/distancenikalo', {
//                 sourcePincode,
//                 destinationPincodes
//             });
//             setDistances(response.data);
//         } catch (error) {
//             console.error(error);
//             setError('Failed to calculate distance. Please try again.');
//         }
//     };

//     return (
//         <div>
//             <h2>Distance Calculator</h2>
//             <div>
//                 <label>Source Pincode:</label>
//                 <input type="text" value={sourcePincode} onChange={(e) => setSourcePincode(e.target.value)} />
//             </div>
//             <div>
//                 <label>Destination Pincodes:</label>
//                 {destinationPincodes.map((destination, index) => (
//                     <div key={index}>
//                         <input
//                             type="text"
//                             value={destination}
//                             onChange={(e) => handleChangeDestination(index, e.target.value)}
//                         />
//                     </div>
//                 ))}
//                 <button onClick={handleAddDestination}>Add Destination</button>
//             </div>
//             <button onClick={handleCalculateDistance}>Calculate Distance</button>
//             {error && <p>{error}</p>}
//             <div>
//                 {distances.map((distance, index) => (
//                     <div key={index}>
//                         <p>Destination: {distance.destination}</p>
//                         <p>Distance: {distance.distance}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Pod;



// import React, { useState } from 'react';
// import axios from 'axios';

// const Pod = () => {
//   const [sourcePincode, setSourcePincode] = useState('');
//   const [destinationPincodes, setDestinationPincodes] = useState(['']);
//   const [distances, setDistances] = useState([]);
//   const [error, setError] = useState('');

//   const handleAddDestination = () => {
//     setDestinationPincodes([...destinationPincodes, '']);
//   };

//   const handleRemoveDestination = (index) => {
//     const updatedDestinations = [...destinationPincodes];
//     updatedDestinations.splice(index, 1);
//     setDestinationPincodes(updatedDestinations);
//   };

//   const handleDestinationChange = (index, value) => {
//     const updatedDestinations = [...destinationPincodes];
//     updatedDestinations[index] = value;
//     setDestinationPincodes(updatedDestinations);
//   };

//   const handleCalculateDistance = async () => {
//     try {
//       setError('');
//       const response = await axios.post('http://localhost:5000/distancenikalo', {
//         sourcePincode,
//         destinationPincodes
//       });
//       setDistances(response.data.distances);
//     } catch (error) {
//       console.error(error);
//       setError('Failed to calculate distances. Please try again.');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold mb-4">Distance Calculator</h2>
//         <input
//           type="text"
//           placeholder="Enter source pincode"
//           value={sourcePincode}
//           onChange={(e) => setSourcePincode(e.target.value)}
//           className="mb-4 p-2 border border-gray-300 rounded w-full"
//         />
//         {destinationPincodes.map((destination, index) => (
//           <div key={index} className="mb-4 flex items-center">
//             <input
//               type="text"
//               placeholder={`Enter destination pincode ${index + 1}`}
//               value={destination}
//               onChange={(e) => handleDestinationChange(index, e.target.value)}
//               className="p-2 border border-gray-300 rounded w-full"
//             />
//             <button
//               onClick={() => handleRemoveDestination(index)}
//               className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//         <button
//           onClick={handleAddDestination}
//           className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Add Destination
//         </button>
//         <button
//           onClick={handleCalculateDistance}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Calculate Distances
//         </button>
//         {error && <p className="text-red-500 mt-4">{error}</p>}
//         {distances.length > 0 && (
//           <div className="mt-4">
//             {distances.map((distance, index) => (
//               <p key={index}>Distance to Destination {index + 1}: {distance}</p>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Pod;


// import React, { useState } from 'react';
// import axios from 'axios';

// const Pod = () => {
//   const [sourcePincode, setSourcePincode] = useState('');
//   const [destinationPincode, setDestinationPincode] = useState('');
//   const [distance, setDistance] = useState('');
//   const [error, setError] = useState('');

//   const handleCalculateDistance = async () => {
//     try {
//       setError('');
//       const response = await axios.post('http://localhost:5000/distancenikalo', {
//         sourcePincode,
//         destinationPincode
//       });
//       setDistance(response.data.distance);
//     } catch (error) {
//       console.error(error);
//       setError('Failed to calculate distance. Please try again.');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold mb-4">Distance Calculator</h2>
//         <input
//           type="text"
//           placeholder="Enter source pincode"
//           value={sourcePincode}
//           onChange={(e) => setSourcePincode(e.target.value)}
//           className="mb-4 p-2 border border-gray-300 rounded"
//         />
//         <input
//           type="text"
//           placeholder="Enter destination pincode"
//           value={destinationPincode}
//           onChange={(e) => setDestinationPincode(e.target.value)}
//           className="mb-4 p-2 border border-gray-300 rounded"
//         />
//         <button
//           onClick={handleCalculateDistance}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Calculate Distance
//         </button>
//         {error && <p className="text-red-500 mt-4">{error}</p>}
//         {distance && (
//           <div className="mt-4">
//             <p>Distance: {distance}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Pod;



// import React, { useState } from 'react';
// import axios from 'axios';

// const Pod = () => {
//   const [sourcePincode, setSourcePincode] = useState('');
//   const [destinationPincode, setDestinationPincode] = useState('');
//   const [distance, setDistance] = useState('');
//   const [quantumrate, setQuantumrate] = useState('');
//   const [error, setError] = useState('');

//   const handleCalculateDistance = async () => {
//     try {
//       setError('');
//       setDistance('');
//       setQuantumrate('');
//       const response = await axios.post('http://localhost:5000/distancenikalo', {
//         sourcePincode,
//         destinationPincode
//       });
//       setDistance(response.data.distance);
//       setQuantumrate(response.data.quantumrate);
//     } catch (error) {
//       console.error(error);
//       setError('Failed to calculate distance. Please try again.');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Distance Calculator</h2>
//         <input
//           type="text"
//           placeholder="Enter source pincode"
//           value={sourcePincode}
//           onChange={(e) => setSourcePincode(e.target.value)}
//           className="mb-4 p-2 border border-gray-300 rounded w-full"
//         />
//         <input
//           type="text"
//           placeholder="Enter destination pincode"
//           value={destinationPincode}
//           onChange={(e) => setDestinationPincode(e.target.value)}
//           className="mb-4 p-2 border border-gray-300 rounded w-full"
//         />
//         <button
//           onClick={handleCalculateDistance}
//           className="bg-blue-500 text-white px-4 py-2 rounded w-full"
//         >
//           Calculate Distance
//         </button>
//         {error && <p className="text-red-500 mt-4">{error}</p>}
//         {distance && (
//           <div className="mt-4">
//             <p className="text-lg">Distance: {distance}</p>
//             <p className="text-lg">Rate: {quantumrate} INR</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Pod;







// import React, { useState } from 'react';
// import axios from 'axios';

// const Pod = () => {


//   const [origin, setOrigin] = useState('');
//   const [destination, setDestination] = useState('');
//   const [distance, setDistance] = useState('');
//   const [duration, setDuration] = useState('');
//   const [error, setError] = useState('');

 
//   const OPEN_CAGE_API_KEY = '3cbc181d77af45c498d94bd2195e7011';

//   const getCoordinates = async (location) => {
//     try {
//       const response = await axios.get(
//         `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${OPEN_CAGE_API_KEY}`
//       );
      
//       if (response.data.results.length > 0) {
//         const { lat, lng } = response.data.results[0].geometry;
//         return { lat, lng };
//       } else {
//         throw new Error('Location not found');
//       }
//     } catch (error) {
//       setError('Unable to find location. Please check the city names.');
//       throw error;
//     }
//   };

//   const calculateDistance = async () => {
//     try {
//       setError('');
//       const originCoords = await getCoordinates(origin);
//       const destinationCoords = await getCoordinates(destination);

//       const response = await axios.get(
//         `http://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.lat};${destinationCoords.lng},${destinationCoords.lat}?overview=false`
//       );

//       if (response.data.code === "Ok") {
//         const route = response.data.routes[0];
//         setDistance((route.distance / 1000).toFixed(2) + ' km'); // convert meters to kilometers
//         setDuration((route.duration / 60).toFixed(2) + ' mins'); // convert seconds to minutes
//       } else {
//         setError('Unable to find distance. Please check the city names.');
//         setDistance('');
//         setDuration('');
//       }
//     } catch (error) {
//       if (!error.message.includes('Location not found')) {
//         setError('An error occurred. Please try again.');
//       }
//       setDistance('');
//       setDuration('');
//     }
//   };


//   return (
//     <div>
//       <h2>Distance Calculator</h2>
//       <input
//         type="text"
//         placeholder="Enter origin city"
//         value={origin}
//         onChange={(e) => setOrigin(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Enter destination city"
//         value={destination}
//         onChange={(e) => setDestination(e.target.value)}
//         onClick={calculateDistance}
//       />

//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {distance && (
//         <div>
//           <p>Distance: {distance}</p>
//           <p>Duration: {duration}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Pod;


// import React from 'react'

// function Pod() {
//   return (
//     <div>
//       pod
//     </div>
//   )
// }

// export default Pod
