import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';

const JobOrder = () => {
  const [jobOrder, setJobOrder] = useState({
    jobOrder_no: '',
    indentNo: '',
    customer: '',
    orderNo: '',
    orderDate: '',
    orderMode: '',
    serviceMode: '',
    rfq: '',
    orderType: '',
    expectedDate: '',
    employee: '',
    source: '',
    destination: '',
    consignor: '',
    consignee: '',
    total: {
      pkgs: 0,
      weight: 0,
      tare: 0,
      container: 0,
      noOfVehicle: 0,
      status: 'Open',
      approvedComment: '',
      remark: ''
    }
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({
    pkgstype: '',
    INVOICE_NO: '',
    INVOICE_DATE: '',
    CONTENT: '',
    WEIGHT_TYPE: '',
    VOL_UNIT: '',
    PKGS: 0,
    WEIGHT: 0,
    TARE: 0,
    CONTAINER: 0,
    NO_OF_VEHICLE: 0,
    REMARKS: ''
  });

  const pkgstype = [
    'BAG', 'BOOK', 'BUNDLE', 'C BOX', 'LOOSE',
    'MT', 'NOS', 'W BOX' 
  ];
  
  const WEIGHT_TYPE = ['ACTUAL', 'TARE', 'VOLUMETRIC'];
  const VOL_UNIT = ['CMS', 'FEET', 'INCH'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [fieldName, nestedFieldName] = name.split('.');
      setJobOrder({
        ...jobOrder,
        [fieldName]: {
          ...jobOrder[fieldName],
          [nestedFieldName]: value
        }
      });
    } else {
      setJobOrder({
        ...jobOrder,
        [name]: value
      });
    }
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value
    });
  };

  const fetchIndentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/getsingleindentdetails/${jobOrder.indentNo}`);
      const indent = response.data;
      setJobOrder({
        ...jobOrder,
        customer: indent.customer,
        orderNo: indent.orderNo,
        orderDate: indent.orderDate,
        orderMode: indent.orderMode,
        serviceMode: indent.serviceMode,
        rfq: indent.rfq,
        orderType: indent.orderType,
        expectedDate: indent.expectedDate,
        employee: indent.employee,
        source: indent.source,
        destination: indent.destination,
        consignor: indent.other?.consignor || '',
        consignee: indent.other?.consignee || ''
      });
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching indent details', error);
      setErrorMessage('Indent not found');
    }
  };

  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem({
      pkgstype: '',
      INVOICE_NO: '',
      INVOICE_DATE: '',
      CONTENT: '',
      WEIGHT_TYPE: '',
      VOL_UNIT: '',
      PKGS: 0,
      WEIGHT: 0,
      TARE: 0,
      CONTAINER: 0,
      NO_OF_VEHICLE: 0,
      REMARKS: ''
    });
    setShowModal(false);
  };

  const handleEditItem = (index) => {
    const itemToEdit = items[index];
    setNewItem(itemToEdit);
    setItems(items.filter((_, i) => i !== index));
    setShowModal(true);
  };

  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/createJobOrder', {
        ...jobOrder,
        additem: items
      });
      alert('Job order created successfully!');
    } catch (error) {
      console.error('Error creating job order', error);
    }
  };


  useEffect(() => {
    calculateTotals();
  }, [items]);

  const calculateTotals = () => {
    let pkgs = 0;
    let weight = 0;
    let tare = 0;
    let container = 0;
    let noOfVehicle = 0;

    items.forEach(item => {
      pkgs += parseInt(item.PKGS) || 0;
      weight += parseInt(item.WEIGHT) || 0;
      tare += parseInt(item.TARE) || 0;
      container += parseInt(item.CONTAINER) || 0;
      noOfVehicle += parseInt(item.NO_OF_VEHICLE) || 0;
    });

    setJobOrder(prevState => ({
      ...prevState,
      total: {
        pkgs,
        weight,
        tare,
        container,
        noOfVehicle
      }
    }));
  };

  

  return (
    <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
      <h1 className="text-3xl font-bold mb-4">Create Job Order</h1>
      <form onSubmit={handleSubmit}>
        <div className="mt-6 mb-4">
          <button
            type="submit"
            className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
        <div className="space-y-4 bg-[#FFFFFF] p-2 sm:flex sm:flex-wrap gap-2">
          <div className="mb-4">
            <label htmlFor="jobOrder_no" className="block text-sm font-medium text-gray-700">Job Order No:</label>
            <input
              type="text"
              id="jobOrder_no"
              value={jobOrder.jobOrder_no}
              onChange={(e) => setJobOrder({ ...jobOrder, jobOrder_no: e.target.value })}
              required
              className="input w-full border border-black shadow-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="indentNo" className="block text-sm font-medium text-gray-700">Indent No:</label>
            <input
              type="text"
              id="indentNo"
              value={jobOrder.indentNo}
              onChange={(e) => setJobOrder({ ...jobOrder, indentNo: e.target.value })}
              onBlur={fetchIndentDetails}
              required
              className="input w-full border border-black shadow-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Customer:</label>
            <input type="text" id="customer" value={jobOrder.customer} readOnly className="input w-full border border-black shadow-md"/>
          </div>
          <div className="mb-4">
            <label htmlFor="orderNo" className="block text-sm font-medium text-gray-700">Order No:</label>
            <input type="text" id="orderNo" value={jobOrder.orderNo} readOnly className="input w-full border border-black shadow-md"/>
          </div>
          <div className="mb-4">
            <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700">Order Date:</label>
            <input type="text" id="orderDate" value={jobOrder.orderDate} readOnly className="input w-full border border-black shadow-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="orderMode" className="block text-sm font-medium text-gray-700">Order Mode:</label>
            <input type="text" id="orderMode" value={jobOrder.orderMode} readOnly className="input w-full border border-black shadow-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="serviceMode" className="block text-sm font-medium text-gray-700">Service Mode:</label>
            <input type="text" id="serviceMode" value={jobOrder.serviceMode} readOnly className="input w-full border border-black shadow-md"/>
          </div>
          <div className="mb-4">
            <label htmlFor="rfq" className="block text-sm font-medium text-gray-700">RFQ:</label>
            <input type="number" id="rfq" value={jobOrder.rfq} readOnly className="input w-full border border-black shadow-md"/>
          </div>
          <div className="mb-4">
            <label htmlFor="orderType" className="block text-sm font-medium text-gray-700">Order Type:</label>
            <input type="text" id="orderType" value={jobOrder.orderType} readOnly className="input w-full border border-black shadow-md"/>
          </div>
          <div className="mb-4">
            <label htmlFor="expectedDate" className="block text-sm font-medium text-gray-700">Expected Date:</label>
            <input type="text" id="expectedDate" value={jobOrder.expectedDate} onChange={handleChange} required className="input w-full border border-black shadow-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="employee" className="block text-sm font-medium text-gray-700">Employee:</label>
            <input type="text" id="employee" value={jobOrder.employee} readOnly className="input w-full border border-black shadow-md"/>
          </div>
          <div className="mb-4">
            <label htmlFor="source" className="block text-sm font-medium text-gray-700">Source:</label>
            <input type="text" id="source" value={jobOrder.source} readOnly className="input w-full border border-black shadow-md"/>
          </div>
          <div className="mb-4">
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destination:</label>
            <input type="text" id="destination" value={jobOrder.destination} readOnly className="input w-full border border-black shadow-md"/>
          </div>
          <div className="mb-4">
            <label htmlFor="consignor" className="block text-sm font-medium text-gray-700">Consignor:</label>
            <input type="text" id="consignor" value={jobOrder.consignor} readOnly className="input w-full border border-black shadow-md"/>
          </div>
          <div className="mb-4">
            <label htmlFor="consignee" className="block text-sm font-medium text-gray-700">Consignee:</label>
            <input type="text" id="consignee" value={jobOrder.consignee} readOnly className="input w-full border border-black shadow-md"/>
          </div>
        </div>
       

        <div className="bg-[#FFFFFF] p-2   gap-2">
              <button
                type="button"
                className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={() => setShowModal(true)}
              >
                Add Item
              </button>
            </div>
           <div className='bg-[#FFFFFF] p-2'>
            <table className="table-auto w-full border-collapse border border-black">
              <thead>
                <tr>
                  <th className="border border-black px-4 py-2">pkgstype</th>
                  <th className="border border-black px-4 py-2">INVOICE_NO</th>
                  <th className="border border-black px-4 py-2">INVOICE_DATE</th>
                  <th className="border border-black px-4 py-2">CONTENT</th>
                  <th className="border border-black px-4 py-2">WEIGHT_TYPE</th>
                  <th className="border border-black px-4 py-2">VOL_UNIT</th>
                  <th className="border border-black px-4 py-2">PKGS</th>
                  <th className="border border-black px-4 py-2">Weight</th>
                  <th className="border border-black px-4 py-2">TARE</th>
                  <th className="border border-black px-4 py-2"> CONTAINER</th>
                  <th className="border border-black px-4 py-2">No Of Vehicle</th>
                  <th className="border border-black px-4 py-2">Remarks</th>
                  <th className="border border-black px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-black px-4 py-2">{item.pkgstype}</td>
                    <td className="border border-black px-4 py-2">{item.INVOICE_NO}</td>
                    <td className="border border-black px-4 py-2">{item.INVOICE_DATE}</td>
                    <td className="border border-black px-4 py-2">{item.CONTENT}</td>
                    <td className="border border-black px-4 py-2">{item.WEIGHT_TYPE}</td>
                    <td className="border border-black px-4 py-2">{item.VOL_UNIT}</td>
                    <td className="border border-black px-4 py-2">{item.PKGS}</td>
                    <td className="border border-black px-4 py-2">{item.WEIGHT}</td>
                    <td className="border border-black px-4 py-2">{item.TARE}</td>
                    <td className="border border-black px-4 py-2">{item.CONTAINER}</td>
                    <td className="border border-black px-4 py-2">{item.NO_OF_VEHICLE}</td>
                    <td className="border border-black px-4 py-2">{item.REMARKS}</td>
                    <td className="border border-black px-4 py-2">
                      <button
                        type="button"
                        className="text-blue-500 hover:text-blue-700 mr-2"
                        onClick={() => handleEditItem(index)}
                      >
                        <RiEdit2Line />
                      </button>
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteItem(index)}
                      >
                        <RiDeleteBinLine />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

         
            <Tabs className="bg-[#FFFFFF] pt-2">
            <TabList className="flex flex-wrap border-b border-gray-200">
              <Tab className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto">TOTAL</Tab>
              <Tab className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto">OTHER</Tab>
            </TabList>


          <TabPanel>
            
          <div className="mt-4">
                <h3 className="text-lg font-semibold">Totals</h3>
                <div className="grid grid-cols-6 gap-6 p-2">
                  <div className="mb-4">
                    <label className="text-sm mb-1" htmlFor="totalPkgs">Total PKGS</label>
                    <input type="number" id="totalPkgs" value={jobOrder.total.pkgs} readOnly className="input w-full border border-black shadow-md" />
                  </div>
                  <div className="mb-4">
                    <label className="text-sm mb-1" htmlFor="totalWeight">Total WEIGHT</label>
                    <input type="number" id="totalWeight" value={jobOrder.total.weight} readOnly className="input w-full border border-black shadow-md" />
                  </div>
                  <div className="mb-4">
                    <label className="text-sm mb-1" htmlFor="tare">Total TARE</label>
                    <input type="number" id="tare" value={jobOrder.total.tare} readOnly className="input w-full border border-black shadow-md" />
                  </div>
                  <div className="mb-4">
                    <label className="text-sm mb-1" htmlFor="container">Total Container</label>
                    <input type="number" id="container" value={jobOrder.total.container} readOnly className="input w-full border border-black shadow-md" />
                  </div>
              
                  <div className="mb-4">
                    <label className="text-sm mb-1" htmlFor="totalNoOfVehicle">Total No. of Vehicles</label>
                    <input type="number" id="totalNoOfVehicle" value={jobOrder.total.noOfVehicle} readOnly className="input w-full border border-black shadow-md" />
                  </div>
                  <div className="mb-4">
                    <label className="text-sm mb-1" htmlFor="status">Status</label>
                    <select id="status" value={jobOrder.total.status} onChange={handleChange} className="input w-full border border-black shadow-md">
                      <option value="Open">Open</option>
                      <option value="Close">Close</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="text-sm mb-1" htmlFor="approvedComment">Approved Comment</label>
                    <input type="text" id="approvedComment" value={jobOrder.total.approvedComment} onChange={handleChange} className="input w-full border border-black shadow-md" />
                  </div>
                  <div className="mb-4">
                    <label className="text-sm mb-1" htmlFor="remark">Remark</label>
                    <input type="text" id="remark" value={jobOrder.total.remark} onChange={handleChange} className="input w-full border border-black shadow-md" />
                  </div>
                </div>
              </div>


          </TabPanel>

          <TabPanel>


          </TabPanel>
        </Tabs>
        </div>
      </form>

      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
    <div className="bg-white p-8 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Item</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label htmlFor="pkgstype" className="block text-sm font-medium text-gray-700">Pkgstype:</label>
          <select
            id="pkgstype"
            name="pkgstype"
            value={newItem.pkgstype}
            onChange={handleItemChange}
            required
            className="input w-full border border-black shadow-md"
          >
            <option value="">Select</option>
            {pkgstype.map((pkg, index) => (
              <option key={index} value={pkg}>{pkg}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="INVOICE_NO" className="block text-sm font-medium text-gray-700">Invoice No:</label>
          <input
            type="text"
            id="INVOICE_NO"
            name="INVOICE_NO"
            value={newItem.INVOICE_NO}
            onChange={handleItemChange}
            required
            className="input w-full border border-black shadow-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="INVOICE_DATE" className="block text-sm font-medium text-gray-700">Invoice Date:</label>
          <input
            type="date"
            id="INVOICE_DATE"
            name="INVOICE_DATE"
            value={newItem.INVOICE_DATE}
            onChange={handleItemChange}
            required
            className="input w-full border border-black shadow-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="CONTENT" className="block text-sm font-medium text-gray-700">Content:</label>
          <input
            type="text"
            id="CONTENT"
            name="CONTENT"
            value={newItem.CONTENT}
            onChange={handleItemChange}
            required
            className="input w-full border border-black shadow-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="WEIGHT_TYPE" className="block text-sm font-medium text-gray-700">Weight Type:</label>
          <select
            id="WEIGHT_TYPE"
            name="WEIGHT_TYPE"
            value={newItem.WEIGHT_TYPE}
            onChange={handleItemChange}
            required
            className="input w-full border border-black shadow-md"
          >
            {WEIGHT_TYPE.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="VOL_UNIT" className="block text-sm font-medium text-gray-700">Volume Unit:</label>
          <select
            id="VOL_UNIT"
            name="VOL_UNIT"
            value={newItem.VOL_UNIT}
            onChange={handleItemChange}
            required
            className="input w-full border border-black shadow-md"
          >
            {VOL_UNIT.map((unit, index) => (
              <option key={index} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="PKGS" className="block text-sm font-medium text-gray-700">PKGS:</label>
          <input
            type="number"
            id="PKGS"
            name="PKGS"
            value={newItem.PKGS}
            onChange={handleItemChange}
            required
            className="input w-full border border-black shadow-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="WEIGHT" className="block text-sm font-medium text-gray-700">Weight:</label>
          <input
            type="number"
            id="WEIGHT"
            name="WEIGHT"
            value={newItem.WEIGHT}
            onChange={handleItemChange}
            required
            className="input w-full border border-black shadow-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="TARE" className="block text-sm font-medium text-gray-700">Tare:</label>
          <input
            type="number"
            id="TARE"
            name="TARE"
            value={newItem.TARE}
            onChange={handleItemChange}
            required
            className="input w-full border border-black shadow-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="CONTAINER" className="block text-sm font-medium text-gray-700">Container:</label>
          <input
            type="number"
            id="CONTAINER"
            name="CONTAINER"
            value={newItem.CONTAINER}
            onChange={handleItemChange}
            required
            className="input w-full border border-black shadow-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="NO_OF_VEHICLE" className="block text-sm font-medium text-gray-700">No. of Vehicles:</label>
          <input
            type="number"
            id="NO_OF_VEHICLE"
            name="NO_OF_VEHICLE"
            value={newItem.NO_OF_VEHICLE}
            onChange={handleItemChange}
            required
            className="input w-full border border-black shadow-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="REMARKS" className="block text-sm font-medium text-gray-700">Remarks:</label>
          <textarea
            id="REMARKS"
            name="REMARKS"
            value={newItem.REMARKS}
            onChange={handleItemChange}
            required
            className="input w-full border border-black shadow-md"
          ></textarea>
        </div>
      </div >
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          className="bg-red-500 text-white py-2 px-4 rounded-md mr-2"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
        <button
          type="button"
          className="bg-green-500 text-white py-2 px-4 rounded-md"
          onClick={handleAddItem}
        >
          Add Item
        </button>
      </div>
    </div>
  </div>
)}

      {/* End of Modal */}
    </div>
  );
};

export default JobOrder;




// import React, { useState } from 'react';
// import axios from 'axios';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
// import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';

// const JobOrder = () => {
//   const [jobOrder, setJobOrder] = useState({
//     jobOrder_no: '',
//     indentNo: '',
//     customer: '',
//     orderNo: '',
//     orderDate: '',
//     orderMode: '',
//     serviceMode: '',
//     rfq: '',
//     orderType: '',
//     expectedDate: '',
//     employee: '',
//     source: '',
//     destination: '',
//     consignor: '',
//     consignee: '',
//     total: {
//       pkgs: 0,
//       weight: 0,
//       tare: 0,
//       container: 0,
//       noOfVehicle: 0,
//       status: 'Open',
//       approvedComment: '',
//       remark: ''
//     }
//   });
//   const [errorMessage, setErrorMessage] = useState('');
//   const [items, setItems] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [newItem, setNewItem] = useState({
//     pkgstype: '',
//     INVOICE_NO: '',
//     INVOICE_DATE: '',
//     CONTENT: '',
//     WEIGHT_TYPE: '',
//     VOL_UNIT: '',
//     PKGS: 0,
//     WEIGHT: 0,
//     TARE: '',
//     CONTAINER: 0,
//     NO_OF_VEHICLE: 0,
//     REMARKS: ''
//   });

//   const pkgstype = [
//     'BAG', 'BOOK', 'BUNDLE', 'C BOX', 'LOOSE',
//     'MT', 'NOS', 'W BOX' 
//   ];
  
//   const WEIGHT_TYPE = ['ACTUAL', 'TARE', 'VOLUMETRIC'];
//   const VOL_UNIT = ['CMS', 'FEET', 'INCH'];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes('.')) {
//       const [fieldName, nestedFieldName] = name.split('.');
//       setJobOrder({
//         ...jobOrder,
//         [fieldName]: {
//           ...jobOrder[fieldName],
//           [nestedFieldName]: value
//         }
//       });
//     } else {
//       setJobOrder({
//         ...jobOrder,
//         [name]: value
//       });
//     }
//   };

//   const handleItemChange = (e) => {
//     const { name, value } = e.target;
//     setNewItem({
//       ...newItem,
//       [name]: value
//     });
//   };

//   const fetchIndentDetails = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/getsingleindentdetails/${jobOrder.indentNo}`);
//       const indent = response.data;
//       setJobOrder({
//         ...jobOrder,
//         customer: indent.customer,
//         orderNo: indent.orderNo,
//         orderDate: indent.orderDate,
//         orderMode: indent.orderMode,
//         serviceMode: indent.serviceMode,
//         rfq: indent.rfq,
//         orderType: indent.orderType,
//         expectedDate: indent.expectedDate,
//         employee: indent.employee,
//         source: indent.source,
//         destination: indent.destination,
//         consignor: indent.other?.consignor || '',
//         consignee: indent.other?.consignee || ''
//       });
//       setErrorMessage('');
//     } catch (error) {
//       console.error('Error fetching indent details', error);
//       setErrorMessage('Indent not found');
//     }
//   };

//   const handleAddItem = () => {
//     setItems([...items, newItem]);
//     setNewItem({
//       pkgstype: '',
//       INVOICE_NO: '',
//       INVOICE_DATE: '',
//       CONTENT: '',
//       WEIGHT_TYPE: '',
//       VOL_UNIT: '',
//       PKGS: 0,
//       WEIGHT: 0,
//       TARE: 0,
//       CONTAINER: 0,
//       NO_OF_VEHICLE: 0,
//       REMARKS: ''
//     });
//     setShowModal(false);
//   };

//   const handleEditItem = (index) => {
//     const itemToEdit = items[index];
//     setNewItem(itemToEdit);
//     setItems(items.filter((_, i) => i !== index));
//     setShowModal(true);
//   };

//   const handleDeleteItem = (index) => {
//     setItems(items.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/createJobOrder', {
//         ...jobOrder,
//         additem: items
//       });
//       alert('Job order created successfully!');
//     } catch (error) {
//       console.error('Error creating job order', error);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//       <h1 className="text-3xl font-bold mb-4">Create Job Order</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mt-6 mb-4">
//           <button
//             type="submit"
//             className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Submit
//           </button>
//         </div>
//         <div className="space-y-4 bg-[#FFFFFF] p-2 sm:flex sm:flex-wrap gap-2">
//           <div className="mb-4">
//             <label htmlFor="jobOrder_no" className="block text-sm font-medium text-gray-700">Job Order No:</label>
//             <input
//               type="text"
//               id="jobOrder_no"
//               value={jobOrder.jobOrder_no}
//               onChange={(e) => setJobOrder({ ...jobOrder, jobOrder_no: e.target.value })}
//               required
//               className="input w-full border border-black shadow-md"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="indentNo" className="block text-sm font-medium text-gray-700">Indent No:</label>
//             <input
//               type="text"
//               id="indentNo"
//               value={jobOrder.indentNo}
//               onChange={(e) => setJobOrder({ ...jobOrder, indentNo: e.target.value })}
//               onBlur={fetchIndentDetails}
//               required
//               className="input w-full border border-black shadow-md"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Customer:</label>
//             <input type="text" id="customer" value={jobOrder.customer} readOnly className="input w-full border border-black shadow-md"/>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="orderNo" className="block text-sm font-medium text-gray-700">Order No:</label>
//             <input type="text" id="orderNo" value={jobOrder.orderNo} readOnly className="input w-full border border-black shadow-md"/>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700">Order Date:</label>
//             <input type="text" id="orderDate" value={jobOrder.orderDate} readOnly className="input w-full border border-black shadow-md" />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="orderMode" className="block text-sm font-medium text-gray-700">Order Mode:</label>
//             <input type="text" id="orderMode" value={jobOrder.orderMode} readOnly className="input w-full border border-black shadow-md" />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="serviceMode" className="block text-sm font-medium text-gray-700">Service Mode:</label>
//             <input type="text" id="serviceMode" value={jobOrder.serviceMode} readOnly className="input w-full border border-black shadow-md"/>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="rfq" className="block text-sm font-medium text-gray-700">RFQ:</label>
//             <input type="number" id="rfq" value={jobOrder.rfq} readOnly className="input w-full border border-black shadow-md"/>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="orderType" className="block text-sm font-medium text-gray-700">Order Type:</label>
//             <input type="text" id="orderType" value={jobOrder.orderType} readOnly className="input w-full border border-black shadow-md"/>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="expectedDate" className="block text-sm font-medium text-gray-700">Expected Date:</label>
//             <input type="text" id="expectedDate" value={jobOrder.expectedDate} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="employee" className="block text-sm font-medium text-gray-700">Employee:</label>
//             <input type="text" id="employee" value={jobOrder.employee} readOnly className="input w-full border border-black shadow-md"/>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="source" className="block text-sm font-medium text-gray-700">Source:</label>
//             <input type="text" id="source" value={jobOrder.source} readOnly className="input w-full border border-black shadow-md"/>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destination:</label>
//             <input type="text" id="destination" value={jobOrder.destination} readOnly className="input w-full border border-black shadow-md"/>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="consignor" className="block text-sm font-medium text-gray-700">Consignor:</label>
//             <input type="text" id="consignor" value={jobOrder.consignor} readOnly className="input w-full border border-black shadow-md"/>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="consignee" className="block text-sm font-medium text-gray-700">Consignee:</label>
//             <input type="text" id="consignee" value={jobOrder.consignee} readOnly className="input w-full border border-black shadow-md"/>
//           </div>
//         </div>
        
//         {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        
//         <Tabs>
//           <TabList>
//             <Tab>Add Item</Tab>
//           </TabList>

//           <TabPanel>
//             <div className="mb-4">
//               <button
//                 type="button"
//                 className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//                 onClick={() => setShowModal(true)}
//               >
//                 Add Item
//               </button>
//             </div>

//             <table className="table-auto w-full border-collapse border border-black">
//               <thead>
//                 <tr>
//                   <th className="border border-black px-4 py-2">pkgstype</th>
//                   <th className="border border-black px-4 py-2">INVOICE_NO</th>
//                   <th className="border border-black px-4 py-2">INVOICE_DATE</th>
//                   <th className="border border-black px-4 py-2">CONTENT</th>
//                   <th className="border border-black px-4 py-2">WEIGHT_TYPE</th>
//                   <th className="border border-black px-4 py-2">VOL_UNIT</th>
//                   <th className="border border-black px-4 py-2">PKGS</th>
//                   <th className="border border-black px-4 py-2">Weight</th>
//                   <th className="border border-black px-4 py-2">TARE</th>
//                   <th className="border border-black px-4 py-2"> CONTAINER</th>
//                   <th className="border border-black px-4 py-2">No Of Vehicle</th>
//                   <th className="border border-black px-4 py-2">Remarks</th>
//                   <th className="border border-black px-4 py-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.map((item, index) => (
//                   <tr key={index}>
//                     <td className="border border-black px-4 py-2">{item.pkgstype}</td>
//                     <td className="border border-black px-4 py-2">{item.INVOICE_NO}</td>
//                     <td className="border border-black px-4 py-2">{item.INVOICE_DATE}</td>
//                     <td className="border border-black px-4 py-2">{item.CONTENT}</td>
//                     <td className="border border-black px-4 py-2">{item.WEIGHT_TYPE}</td>
//                     <td className="border border-black px-4 py-2">{item.VOL_UNIT}</td>
//                     <td className="border border-black px-4 py-2">{item.PKGS}</td>
//                     <td className="border border-black px-4 py-2">{item.WEIGHT}</td>
//                     <td className="border border-black px-4 py-2">{item.TARE}</td>
//                     <td className="border border-black px-4 py-2">{item.CONTAINER}</td>
//                     <td className="border border-black px-4 py-2">{item.NO_OF_VEHICLE}</td>
//                     <td className="border border-black px-4 py-2">{item.REMARKS}</td>
//                     <td className="border border-black px-4 py-2">
//                       <button
//                         type="button"
//                         className="text-blue-500 hover:text-blue-700 mr-2"
//                         onClick={() => handleEditItem(index)}
//                       >
//                         <RiEdit2Line />
//                       </button>
//                       <button
//                         type="button"
//                         className="text-red-500 hover:text-red-700"
//                         onClick={() => handleDeleteItem(index)}
//                       >
//                         <RiDeleteBinLine />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </TabPanel>
//         </Tabs>
        
//         {showModal && (
//           <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
//             <div className="bg-white p-8 rounded shadow-lg">
//               <h2 className="text-2xl font-bold mb-4">Add Item</h2>
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor=" pkgstype" className="block text-sm font-medium text-gray-700"> pkgstype:</label>
//                   <select
//                     id=" pkgstype"
//                     name=" pkgstype"
//                     value={newItem. pkgstype}
//                     onChange={handleItemChange}
//                     required
//                     className="input w-full border border-black shadow-md"
//                   >
//                     <option value="">Select</option>
//                     { pkgstype.map(( pkgstype, index) => (
//                       <option key={index} value={ pkgstype}>
//                         { pkgstype}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label htmlFor="WEIGHT_TYPE" className="block text-sm font-medium text-gray-700"> pkgstype:</label>
//                   <select
//                     id=" WEIGHT_TYPE"
//                     name=" WEIGHT_TYPE"
//                     value={newItem. WEIGHT_TYPE}
//                     onChange={handleItemChange}
//                     required
//                     className="input w-full border border-black shadow-md"
//                   >
//                     <option value="">Select</option>
//                     { WEIGHT_TYPE.map(( WEIGHT_TYPE, index) => (
//                       <option key={index} value={ WEIGHT_TYPE}>
//                         { WEIGHT_TYPE}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label htmlFor="INVOICE_NO" className="block text-sm font-medium text-gray-700">INVOICE_NO:</label>
//                   <input
//                     type="number"
//                     id="INVOICE_NO"
//                     name="INVOICE_NO"
//                     value={newItem.INVOICE_NO}
//                     onChange={handleItemChange}
//                     required
//                     className="input w-full border border-black shadow-md"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="PKGS" className="block text-sm font-medium text-gray-700">PKGS:</label>
//                   <input
//                     type="number"
//                     id="PKGS"
//                     name="PKGS"
//                     value={newItem.PKGS}
//                     onChange={handleItemChange}
//                     required
//                     className="input w-full border border-black shadow-md"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="WEIGHT" className="block text-sm font-medium text-gray-700">Weight:</label>
//                   <input
//                     type="number"
//                     id="WEIGHT"
//                     name="WEIGHT"
//                     value={newItem.WEIGHT}
//                     onChange={handleItemChange}
//                     required
//                     className="input w-full border border-black shadow-md"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="TARE" className="block text-sm font-medium text-gray-700">TARE:</label>
//                   <input
//                     type="number"
//                     id="TARE"
//                     name="TARE"
//                     value={newItem.TARE}
//                     onChange={handleItemChange}
//                     required
//                     className="input w-full border border-black shadow-md"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="CONTAINER" className="block text-sm font-medium text-gray-700">CONTAINER:</label>
//                   <input
//                     type="number"
//                     id="CONTAINER"
//                     name="CONTAINER"
//                     value={newItem.CONTAINER}
//                     onChange={handleItemChange}
//                     required
//                     className="input w-full border border-black shadow-md"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="NO_OF_VEHICLE" className="block text-sm font-medium text-gray-700">No Of Vehicle:</label>
//                   <input
//                     type="number"
//                     id="NO_OF_VEHICLE"
//                     name="NO_OF_VEHICLE"
//                     value={newItem.NO_OF_VEHICLE}
//                     onChange={handleItemChange}
//                     required
//                     className="input w-full border border-black shadow-md"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="REMARKS" className="block text-sm font-medium text-gray-700">Remarks:</label>
//                   <textarea
//                     id="REMARKS"
//                     name="REMARKS"
//                     value={newItem.REMARKS}
//                     onChange={handleItemChange}
//                     required
//                     className="input w-full border border-black shadow-md"
//                   ></textarea>
//                 </div>
//               </div>
//               <div className="mt-4 flex justify-end">
//                 <button
//                   type="button"
//                   className="bg-red-500 text-white py-2 px-4 rounded-md mr-2"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="bg-green-500 text-white py-2 px-4 rounded-md"
//                   onClick={handleAddItem}
//                 >
//                   Add Item
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

       
//       </form>
//     </div>
//   );
// };

// export default JobOrder;






// import React, { useState } from 'react';
// import axios from 'axios';

// const JobOrder = () => {
//   const [jobOrder, setJobOrder] = useState({
//     jobOrder_no: '',
//     indentNo: '',
//     customer: '',
//     orderNo: '',
//     orderDate: '',
//     orderMode: '',
//     serviceMode: '',
//     rfq: '',
//     orderType: '',
//     expectedDate: '',
//     employee: '',
//     source: '',
//     destination: '',
//     consignor: '',
//     consignee: ''
//   });
//   const [errorMessage, setErrorMessage] = useState('');

//   const fetchIndentDetails = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/getsingleindentdetails/${jobOrder.indentNo}`);
//       const indent = response.data;
//       setJobOrder({
//         ...jobOrder,
//         customer: indent.customer,
//         orderNo: indent.orderNo,
//         orderDate: indent.orderDate,
//         orderMode: indent.orderMode,
//         serviceMode: indent.serviceMode,
//         rfq: indent.rfq,
//         orderType: indent.orderType,
//         expectedDate: indent.expectedDate,
//         employee: indent.employee,
//         source: indent.source,
//         destination: indent.destination,
//         consignor: indent.other?.consignor || '',
//         consignee: indent.other?.consignee || ''
//       });
//       setErrorMessage('');
//     } catch (error) {
//       console.error('Error fetching indent details', error);
//       setErrorMessage('Indent not found');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/createJobOrder', jobOrder);
//       alert('Job order created successfully!');
//     } catch (error) {
//       console.error('Error creating job order', error);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//       <h1 className="text-3xl font-bold mb-4">Create Job Order</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mt-6 mb-4">
//           <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//             Submit
//           </button>
//         </div>
//         <div className="space-y-4 bg-[#FFFFFF] p-2 sm:flex sm:flex-wrap gap-2">
//           <div className="mb-4">
//             <label htmlFor="jobOrder_no" className="block text-sm font-medium text-gray-700">Job Order No:</label>
//             <input
//               type="text"
//               id="jobOrder_no"
//               value={jobOrder.jobOrder_no}
//               onChange={(e) => setJobOrder({ ...jobOrder, jobOrder_no: e.target.value })}
//               required
//               className="input w-full border border-black shadow-md"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="indentNo" className="block text-sm font-medium text-gray-700">Indent No:</label>
//             <input
//               type="text"
//               id="indentNo"
//               value={jobOrder.indentNo}
//               onChange={(e) => setJobOrder({ ...jobOrder, indentNo: e.target.value })}
//               onBlur={fetchIndentDetails}
//               required
//               className="input w-full border border-black shadow-md"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Customer:</label>
//             <input type="text" id="customer" value={jobOrder.customer} readOnly className="input w-full border border-black shadow-md"/>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="orderNo" className="block text-sm font-medium text-gray-700">Order No:</label>
//             <input type="text" id="orderNo" value={jobOrder.orderNo} readOnly className="input w-full border border-black shadow-md"/>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700">Order Date:</label>
//             <input type="text" id="orderDate" value={jobOrder.orderDate} readOnly className="input w-full border border-black shadow-md" />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="orderMode" className="block text-sm font-medium text-gray-700">Order Mode:</label>
//             <input type="text" id="orderMode" value={jobOrder.orderMode} readOnly className="input w-full border border-black shadow-md" />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="serviceMode" className="block text-sm font-medium text-gray-700">Service Mode:</label>
//             <input type="text" id="serviceMode" value={jobOrder.serviceMode} readOnly className="input w-full border border-black shadow-md"/>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="rfq" className="block text-sm font-medium text-gray-700">RFQ:</label>
//             <input type="number" id="rfq" value={jobOrder.rfq} readOnly className="input w-full border border-black shadow-md"/>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="orderType" className="block text-sm font-medium text-gray-700">Order Type:</label>
//             <input type="text" id="orderType" value={jobOrder.orderType} readOnly className="input w-full border border-black shadow-md"/>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="expectedDate" className="block text-sm font-medium text-gray-700">Expected Date:</label>
//             <input
//               type="text"
//               id="expectedDate"
//               value={jobOrder.expectedDate}
//               onChange={(e) => setJobOrder({ ...jobOrder, expectedDate: e.target.value })}
//               className="input w-full border border-black shadow-md"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="employee" className="block text-sm font-medium text-gray-700">Employee:</label>
//             <input type="text" id="employee" value={jobOrder.employee} readOnly className="input w-full border border-black shadow-md"/>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="source" className="block text-sm font-medium text-gray-700">Source:</label>
//             <input type="text" id="source" value={jobOrder.source} readOnly className="input w-full border border-black shadow-md"/>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destination:</label>
//             <input type="text" id="destination" value={jobOrder.destination} readOnly className="input w-full border border-black shadow-md"/>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="consignor" className="block text-sm font-medium text-gray-700">Consignor:</label>
//             <input type="text" id="consignor" value={jobOrder.consignor} readOnly className="input w-full border border-black shadow-md"/>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="consignee" className="block text-sm font-medium text-gray-700">Consignee:</label>
//             <input type="text" id="consignee" value={jobOrder.consignee} readOnly className="input w-full border border-black shadow-md"/>
//           </div>
//         </div>
//       </form>
//       {errorMessage && <p>{errorMessage}</p>}
//     </div>
//   );
// };

// export default JobOrder;




// import React, { useState } from 'react';
// import axios from 'axios';

// const JobOrder = () => {
//   const [jobOrder, setJobOrder] = useState({
//     jobOrder_no: '',
//     indentNo: '',
//     customer: '',
//     orderNo: '',
//     orderDate: '',
//     orderMode: '',
//     serviceMode: '',
//     rfq: '',
//     orderType: '',
//     expectedDate: '',
//     employee: '',
//     source: '',
//     destination: ''
//   });
//   const [errorMessage, setErrorMessage] = useState('');

//   const fetchIndentDetails = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/getsingleindentdetails/${jobOrder.indentNo}`);
//       const indent = response.data;
//       setJobOrder({
//         ...jobOrder,
//         customer: indent.customer,
//         orderNo: indent.orderNo,
//         orderDate: indent.orderDate,
//         orderMode: indent.orderMode,
//         serviceMode: indent.serviceMode,
//         rfq: indent.rfq,
//         orderType: indent.orderType,
//         expectedDate: indent.expectedDate,
//         employee: indent.employee,
//         source: indent.source,
//         destination: indent.destination
//       });
//       setErrorMessage('');
//     } catch (error) {
//       console.error('Error fetching indent details', error);
//       setErrorMessage('Indent not found');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/createJobOrder', jobOrder);
//       alert('Job order created successfully!');
//     } catch (error) {
//       console.error('Error creating job order', error);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//       <h1 className="text-3xl font-bold mb-4">Create Job Order</h1>
//       <form onSubmit={handleSubmit}>
//       <div className="mt-6 mb-4">
//                             <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                                 submit
//                             </button>
//                         </div>
//       <div className="space-y-4 bg-[#FFFFFF] p-2  sm:flex sm:flex-wrap gap-2">
//         <div>
//           <label>Indent No:</label>
//           <input
//             type="text"
//             value={jobOrder.indentNo}
//             onChange={(e) => setJobOrder({ ...jobOrder, indentNo: e.target.value })}
//             onBlur={fetchIndentDetails}
//             required
//             className="input w-full border border-black shadow-md"
//           />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="code" className="block text-sm font-medium text-gray-700">Job Order No:</label>
//           <input
//             type="text"
//             value={jobOrder.jobOrder_no}
//             onChange={(e) => setJobOrder({ ...jobOrder, jobOrder_no: e.target.value })}
//             required
//             className="input w-full border border-black shadow-md"
//           />
//         </div>
//         <div htmlFor="customer" className="block text-sm font-medium text-gray-700">
//           <label>Customer:</label>
//           <input type="text" value={jobOrder.customer} readOnly className="input w-full border border-black shadow-md"/>
//         </div>
//         <div>
//           <label>Order No:</label>
//           <input type="text" value={jobOrder.orderNo} readOnly className="input w-full border border-black shadow-md"/>
//         </div>
//         <div>
//           <label>Order Date:</label>
//           <input type="date" value={jobOrder.orderDate} readOnly className="input w-full border border-black shadow-md" />
//         </div>
//         <div>
//           <label>Order Mode:</label>
//           <input type="text" value={jobOrder.orderMode} readOnly className="input w-full border border-black shadow-md" />
//         </div>
//         <div>
//           <label>Service Mode:</label>
//           <input type="text" value={jobOrder.serviceMode} readOnly className="input w-full border border-black shadow-md"/>
//         </div>
//         <div>
//           <label>RFQ:</label>
//           <input type="number" value={jobOrder.rfq} readOnly className="input w-full border border-black shadow-md"/>
//         </div>
//         <div>
//           <label>Order Type:</label>
//           <input type="text" value={jobOrder.orderType} readOnly className="input w-full border border-black shadow-md"/>
//         </div>
//         <div>
//           <label>Expected Date:</label>
//           <input type="date" value={jobOrder.expectedDate} readOnly className="input w-full border border-black shadow-md"/>
//         </div>
//         <div>
//           <label>Employee:</label>
//           <input type="text" value={jobOrder.employee} readOnly className="input w-full border border-black shadow-md"/>
//         </div>
//         <div>
//           <label>Source:</label>
//           <input type="text" value={jobOrder.source} readOnly className="input w-full border border-black shadow-md"/>
//         </div>
//         <div>
//           <label>Destination:</label>
//           <input type="text" value={jobOrder.destination} readOnly className="input w-full border border-black shadow-md"/>
//         </div>

//         </div>

//       </form>
//       {errorMessage && <p>{errorMessage}</p>}
//     </div>
//   );
// };

// export default JobOrder;



// // src/App.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const JobOrder = () => {
//   const [indentId, setIndentId] = useState('');
//   const [jobOrder, setJobOrder] = useState({
//     jobOrder_no: '',
//     indent_no: '',
//     indentNo: '',
//     customer: '',
//     orderNo: '',
//     orderDate: '',
//     orderMode: '',
//     serviceMode: '',
//     rfq: '',
//     orderType: '',
//     expectedDate: '',
//     employee: '',
//     source: '',
//     destination: ''
//   });

//   const fetchIndentDetails = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/getindent/${indentId}`);
//       const indent = response.data;
//       setJobOrder({
//         ...jobOrder,
//         indent_no: indent._id,
//         indentNo: indent.indentNo,
//         customer: indent.customer,
//         orderNo: indent.orderNo,
//         orderDate: indent.orderDate,
//         orderMode: indent.orderMode,
//         serviceMode: indent.serviceMode,
//         rfq: indent.rfq,
//         orderType: indent.orderType,
//         expectedDate: indent.expectedDate,
//         employee: indent.employee,
//         source: indent.source,
//         destination: indent.destination
//       });
//     } catch (error) {
//       console.error('Error fetching indent details', error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('/api/job-orders', jobOrder);
//       alert('Job order created successfully!');
//     } catch (error) {
//       console.error('Error creating job order', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Create Job Order</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Indent ID:</label>
//           <input
//             type="text"
//             value={indentId}
//             onChange={(e) => setIndentId(e.target.value)}
//             onClick={fetchIndentDetails}
//           />

//         </div>
//         <div>
//           <label>Job Order No:</label>
//           <input
//             type="text"
//             value={jobOrder.jobOrder_no}
//             onChange={(e) =>
//               setJobOrder({ ...jobOrder, jobOrder_no: e.target.value })
//             }
//             required
//           />
//         </div>
//         <div>
//           <label>Indent No:</label>
//           <input type="text" value={jobOrder.indentNo} readOnly />
//         </div>
//         <div>
//           <label>Customer:</label>
//           <input type="text" value={jobOrder.customer} readOnly />
//         </div>
//         <div>
//           <label>Order No:</label>
//           <input type="text" value={jobOrder.orderNo} readOnly />
//         </div>
//         <div>
//           <label>Order Date:</label>
//           <input type="date" value={jobOrder.orderDate} readOnly />
//         </div>
//         <div>
//           <label>Order Mode:</label>
//           <input type="text" value={jobOrder.orderMode} readOnly />
//         </div>
//         <div>
//           <label>Service Mode:</label>
//           <input type="text" value={jobOrder.serviceMode} readOnly />
//         </div>
//         <div>
//           <label>RFQ:</label>
//           <input type="number" value={jobOrder.rfq} readOnly />
//         </div>
//         <div>
//           <label>Order Type:</label>
//           <input type="text" value={jobOrder.orderType} readOnly />
//         </div>
//         <div>
//           <label>Expected Date:</label>
//           <input type="date" value={jobOrder.expectedDate} readOnly />
//         </div>
//         <div>
//           <label>Employee:</label>
//           <input type="text" value={jobOrder.employee} readOnly />
//         </div>
//         <div>
//           <label>Source:</label>
//           <input type="text" value={jobOrder.source} readOnly />
//         </div>
//         <div>
//           <label>Destination:</label>
//           <input type="text" value={jobOrder.destination} readOnly />
//         </div>
//         <button type="submit">Create Job Order</button>
//       </form>
//     </div>
//   );
// };

// export default JobOrder;




// import React, { useState } from 'react';
// import axios from 'axios';
// import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';
// import { useNavigate } from 'react-router-dom';

// function JobOrder() {
//   const navigate = useNavigate(); 
//   const [formData, setFormData] = useState({
//     jobOrder_no: '     ',
//     indent_no:"",

//   });

//   const [responseMessage, setResponseMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/createJobOrder', formData);
//       setResponseMessage(`Job Order created successfully. Job Order ID: ${response.data._id}`);
//       setFormData({
//         JobIdNum: '',
//         IndentNum:"",
//         date: '',
//         customer: '',
//         against: '',
//         orderNo: '',
//         orderDate: '',
//         orderMode: '',
//         orderType: '',
//         expectedDate: '',
//         location: '',
//         gstin: '',
//         assignedToBranch: '',
//         consignor: '',
//         consignee: '',
//         forwarder: '',
//         source: '',
//         destination: '',
//         serviceMode: '',
//         loadType: '',
//         via: '',
//         port: '',
//         marketingPerson: '',
//       });
//     } catch (error) {
//       setResponseMessage('Error creating job order. Please try again.');
//       console.error(error);
//     }
//   };

//   const handleListClick = () => {
//     // Navigate to the viewjoborders page
//     navigate('/sidebar/ordermanagement/viewjoborders');
//   };

//   const [activeTab, setActiveTab] = useState("Total");

//   const openTab = (tabName) => {
//     setActiveTab(tabName);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//       <div className='flex justify-between'>
//         <h2 className="text-2xl font-bold mb-4">Job Order / Create</h2>
//         <button type="button" onClick={handleListClick} className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">List view</button>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4 bg-[#FFFFFF] p-2 sm:flex sm:flex-wrap">
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="no">JobIdNum</label>
//           <input type="text" id="no" name="no" value={formData.no} onChange={handleChange} readOnly className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="IndentNum">IndentNum</label>
//           <input type="text" id="IndentNum" name="IndentNum" value={formData.IndentNum} onChange={handleChange} readOnly className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="date">Date</label>
//           <input type="datetime-local" id="date" name="date" value={formData.date} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="customer">Customer</label>
//           <input type="text" id="customer" name="customer" value={formData.customer} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="location">Location</label>
//           <select id="location" name="location" value={formData.location} onChange={handleChange} required className="input w-full border border-black shadow-md">
//             <option value="">Select Location</option>
//             {/* Add location options */}
//           </select>
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="gstin">GSTIN</label>
//           <input type="text" id="gstin" name="gstin" value={formData.gstin} onChange={handleChange} readOnly className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="against">Against</label>
//           <select id="against" name="against" value={formData.against} onChange={handleChange} required className="input w-full border border-black shadow-md">
//             <option value="DIRECT">DIRECT</option>
//             <option value="INDIRECT">INDIRECT</option>
//           </select>
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="orderNo">No.</label>
//           <input type="text" id="orderNo" name="orderNo" value={formData.orderNo} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="assignedToBranch">Assigned to Branch</label>
//           <input type="text" id="assignedToBranch" name="assignedToBranch" value={formData.assignedToBranch} onChange={handleChange} readOnly className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="orderMode">Order Mode</label>
//           <select id="orderMode" name="orderMode" value={formData.orderMode} onChange={handleChange} required className="input w-full border border-black shadow-md">
//             <option value="Phone">Phone</option>
//             <option value="Mail">Mail</option>
//             <option value="Letter">Letter</option>
//             <option value="Other">Other</option>
//           </select>
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="orderType">Order Type</label>
//           <select id="orderType" name="orderType" value={formData.orderType} onChange={handleChange} required className="input w-full border border-black shadow-md">
//             <option value="">Select Order Type</option>
//             <option value="auction">Auction</option>
//             <option value="cnmt">CNMT</option>
//             <option value="cnmt market">CNMT Market</option>
//             <option value="distuff">Distuff</option>
//             <option value="domestics">Domestics</option>
//             <option value="export">Export</option>
//             <option value="import">Import</option>
//             <option value="sale">Sale</option>
//             <option value="tfn">TFN</option>
//           </select>
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="expectedDate">Expected Date</label>
//           <input type="datetime-local" id="expectedDate" name="expectedDate" value={formData.expectedDate} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="consignor">Consignor</label>
//           <input type="text" id="consignor" name="consignor" value={formData.consignor} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="consignee">Consignee</label>
//           <input type="text" id="consignee" name="consignee" value={formData.consignee} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="forwarder">Forwarder</label>
//           <input type="text" id="forwarder" name="forwarder" value={formData.forwarder} onChange={handleChange} className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="source">Source</label>
//           <input type="text" id="source" name="source" value={formData.source} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="destination">Destination</label>
//           <input type="text" id="destination" name="destination" value={formData.destination} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="serviceMode">Service Mode</label>
//           <select id="serviceMode" name="serviceMode" value={formData.serviceMode} onChange={handleChange} required className="input w-full border border-black shadow-md">
//             <option value="ROAD">ROAD</option>
//             <option value="AIR">AIR</option>
//             <option value="SEA">SEA</option>
//             <option value="RAIL">RAIL</option>
//             <option value="COURIER">COURIER</option>
//             <option value="EXPRESS">EXPRESS</option>
//           </select>
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="loadType">Load Type</label>
//           <select id="loadType" name="loadType" value={formData.loadType} onChange={handleChange} required className="input w-full border border-black shadow-md">
//             <option value="">Select Load Type</option>
//             <option value="ftl">FTL</option>
//             <option value="ltl">LTL</option>
//             <option value="parcel">Parcel</option>
//             <option value="bulk">Bulk</option>
//           </select>
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="via">Via</label>
//           <input type="text" id="via" name="via" value={formData.via} onChange={handleChange} className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="port">Port</label>
//           <input type="text" id="port" name="port" value={formData.port} onChange={handleChange} className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="marketingPerson">Marketing Person</label>
//           <input type="text" id="marketingPerson" name="marketingPerson" value={formData.marketingPerson} onChange={handleChange} className="input w-full border border-black shadow-md" />
//         </div>
//         <div className='flex gap-2'>
//           <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">Submit</button>
//           <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">Discard</button>
//           <div>{responseMessage}</div>
//         </div>
//       </form>
//       {/* Display response message */}

//       <div className="container mx-auto px-4 py-8 h-screen bg-[#FFFFFF]">
//         <div className="flex border-b border-gray-200">
//           <button
//             onClick={() => openTab("Total")}
//             className={`${
//               activeTab === "Total"
//                 ? "border-indigo-500 text-indigo-600"
//                 : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//             } flex-1 inline-flex items-center justify-center py-2 border-b-2 font-medium text-xs`}
//           >
//             Total
//           </button>
//           <button
//             onClick={() => openTab("Others")}
//             className={`${
//               activeTab === "Others"
//                 ? "border-indigo-500 text-indigo-600"
//                 : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//             } flex-1 inline-flex items-center justify-center py-2 border-b-2 font-medium text-xs`}
//           >
//             Others
//           </button>
//         </div>

//         {/* Fixed-height container for tab content */}
//         <div className="h-auto overflow-y-auto px-4 py-5 sm:px-6">
//           {activeTab === "Total" && (
//             <div>
//               <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">Submit</button>
//               <table className="table-auto w-full">
//                 <thead>
//                   <tr>
//                     <th className="bg-blue-600 border w-10">
//                       <RiEdit2Line className="inline-block w-4 h-4" />
//                     </th>
//                     <th className="bg-blue-600 w-10 border">
//                       <RiDeleteBinLine className="inline-block w-4 h-4" />
//                     </th>
//                     <th className="px-4 py-2 bg-blue-950 text-white">#</th>
//                     <th className="px-4 py-2 bg-blue-950 text-white">Load Type</th>
//                     <th className="px-4 py-2 bg-blue-950 text-white">Pkgs.</th>
//                     <th className="px-4 py-2 bg-blue-950 text-white">Weight</th>
//                     <th className="px-4 py-2 bg-blue-950 text-white">Rate Type</th>
//                     <th className="px-4 py-2 bg-blue-950 text-white">Rate</th>
//                     <th className="px-4 py-2 bg-blue-950 text-white">Freight</th>
//                     <th className="px-4 py-2 bg-blue-950 text-white">Advance</th>
//                     <th className="px-4 py-2 bg-blue-950 text-white">Balance</th>
//                     <th className="px-4 py-2 bg-blue-950 text-white">No. of Vehicle</th>
//                     <th className="px-4 py-2 bg-blue-950 text-white">Remarks</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* Sample table row */}
//                   <tr>
//                     <td className="border px-4 py-2">Edit</td>
//                     <td className="border px-4 py-2">Delete</td>
//                     <td className="border px-4 py-2">John Doe</td>
//                     <td className="border px-4 py-2">John Doe</td>
//                     <td className="border px-4 py-2">John Doe</td>
//                     <td className="border px-4 py-2">John Doe</td>
//                     <td className="border px-4 py-2">John Doe</td>
//                     <td className="border px-4 py-2">John Doe</td>
//                     <td className="border px-4 py-2">John Doe</td>
//                     <td className="border px-4 py-2">John Doe</td>
//                     <td className="border px-4 py-2">John Doe</td>
//                     <td className="border px-4 py-2">John Doe</td>
//                     <td className="border px-4 py-2">John Doe</td>
//                   </tr>
//                   {/* Add more table rows as needed */}
//                 </tbody>
//               </table>
//             </div>
//           )}
//           {activeTab === "Others" && (
//             <div>
//               <p>Content for Tab 2 goes here.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default JobOrder;


// import React from 'react'

// function JobOrder() {
//   return (
//     <div>
//       job order
//     </div>
//   )
// }

// export default JobOrder
