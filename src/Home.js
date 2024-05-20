import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleClickMaster = () => {
    navigate('/protected/component/sidebar/Sidebar');
  };

  const handleClickOperation = () => {
    navigate('/protected/componentop/sidebarop/Sidebarop');
  };

  const handleClickAccounting = () => {
    navigate('/protected/componentac/sidebarac/Sidebarac');
  };

  return (
    <div className="flex flex-wrap justify-center m-20">
      <div className="w-1/3 sm:w-1/5 md:w-1/6 lg:w-1/8 xl:w-1/10 mx-2 my-4">
        <img
          src="/master.png"
          alt="Master"
          onClick={handleClickMaster}
          className="cursor-pointer"
        />
      </div>
      <div className="w-1/3 sm:w-1/5 md:w-1/6 lg:w-1/8 xl:w-1/10 mx-2 my-4">
        <img
          src="/operation.png"
          alt="Operation"
          onClick={handleClickOperation}
          className="cursor-pointer"
        />
      </div>
      <div className="w-1/3 sm:w-1/5 md:w-1/6 lg:w-1/8 xl:w-1/10 mx-2 my-4">
        <img
          src="/accounting.png"
          alt="Accounting"
          onClick={handleClickAccounting}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};
export default Home;



// import React from 'react';

// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const navigate = useNavigate()

//   const handleClickmaster = () => {
//     navigate('/component1');
//   };
//   const handleClickopration = () => {
//     navigate('/component2');
//   };
//   const handleClickacconting = () => {
//     navigate('/component3');
//   };
//   return (
//       <div className='flex' >
//     <div style={{ width: '10%', margin: '2%' }}>
//       <img
//        src="/master.png"
//         alt="Master"
//         onClick={handleClickmaster}
//         style={{ cursor: 'pointer' }}
//       />
//     </div>
//     <div style={{ width: '10%', margin: '2%' }}>
//     <img
//       src="/opration.png"
//       alt="Master"
//       onClick={handleClickopration}
//       style={{ cursor: 'pointer' }}
//     />
//   </div>
//   <div style={{ width: '10%', margin: '2%' }}>
//   <img
//     src="/acconting.png"
//     alt="Master"
//     onClick={handleClickacconting}
//     style={{ cursor: 'pointer' }}
//   />
// </div>
// </div>
//   );
// };

// export default Home;
