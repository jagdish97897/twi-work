import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function Indent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    indentNo: '',
    date: '',
    customer: '',
    orderNo: '',
    orderDate: '',
    orderMode: '',
    serviceMode: '',
    rfq: '',
    expectedDate: '',
    employee: '',
    additem: '',
    other: {
      consignor: '',
      consignee: '',
      remarks: '',
    },
    total: {
      weight: 0,
      quantumrate: 0,
      effectiverate: 0,
      cost: 0,
      status: 'open',
      approvedComment: '',
      remark: ''
    }

  });

  const [items, setItems] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const [customer, setCustomer] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [newItem, setNewItem] = useState({
    from:'',
    to:'',
    vehicletype: '',
    DIMENSIONS:'',
    WEIGHT: 0,
    QUANTUMRATE: '',
    EFFECTIVERATE: 0,
    COST: 0,
    REMARKS: ''
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [fieldName, nestedFieldName] = name.split('.');
      setFormData({
        ...formData,
        [fieldName]: {
          ...formData[fieldName],
          [nestedFieldName]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleOtherChange = (e) => {
    const { name, value } = e.target;
    const [parentField, fieldName] = name.split('.');
    setFormData({
      ...formData,
      [parentField]: {
        ...formData[parentField],
        [fieldName]: value
      }
    });
  };


  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/indents', { ...formData, additem: items });
      setResponseMessage(`Indent created successfully. Indent ID: ${response.data._id}`);
      setFormData({
        indentNo: '',
        date: '',
        customer: '',
        orderNo: '',
        orderDate: '',
        orderMode: '',
        serviceMode: '',
        rfq: '',
        expectedDate: '',
        employee: '',
        additem: '',
        other: {
          consignor: '',
          consignee: '',
          remarks: '',
        },

        total: {
          weight: 0,
          quantumrate: 0,
          effectiverate: 0,
          cost: 0,
          status: 'open',
          approvedComment: '',
          remark: ''

        }
      });
      setItems([]);
    } catch (error) {
      setResponseMessage('Error creating indent. Please try again.');
      console.error(error);
    }
  };

  const handleListClick = () => {
    navigate('/protected/componentop/sidebarop/Sidebarop/ordermanagement/viewindents');
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getcustomer1', {
          params: { name: formData.customer }
        });
        setCustomer(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    if (formData.customer) {
      fetchCustomer();
    } else {
      setCustomer([]);
    }
  }, [formData.customer]);


  const [consignorData, setConsignorData] = useState([]);
  const [consigneeData, setConsigneeData] = useState([]);

  useEffect(() => {
    const fetchConsignorAndConsignee = async () => {
      try {
        if (formData.other.consignor) {
          const consignorResponse = await axios.get('http://localhost:5000/getcustomer2', {
            params: { name: formData.other.consignor }
          });
          setConsignorData(consignorResponse.data);
        } else {
          setConsignorData([]);
        }

        if (formData.other.consignee) {
          const consigneeResponse = await axios.get('http://localhost:5000/getcustomer2', {
            params: { name: formData.other.consignee }
          });
          setConsigneeData(consigneeResponse.data);
        } else {
          setConsigneeData([]);
        }
      } catch (error) {
        console.error('Error fetching consignor and consignee:', error);
      }
    };

    fetchConsignorAndConsignee();
  }, [formData.other.consignor, formData.other.consignee]);


  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem({
      from:'',
      to:'',
      vehicletype: '',
      DIMENSIONS:'',
      WEIGHT: 0,
      QUANTUMRATE: 0,
      EFFECTIVERATE: 0,
      COST: 0,
      REMARKS: ''
    });
    setShowModal(false);
  };

  const handleEditItem = (index) => {
    setNewItem(items[index]);
    setShowModal(true);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  useEffect(() => {
    calculateTotals();
  }, [items]);

  const vehicletype = [
    'TRUCK','TROLLEY', 'BUS', 'CAR', 'TWO WHEELER', 'CONTAINER', 'TANKER', 'OTHER' 
  ];


  const calculateTotals = () => {
    let weight = 0;
    let quantumrate = 0;
    let cost = 0;
    let effectiverate = 0;


    items.forEach(item => {
      weight += parseInt(item.WEIGHT) || 0;
      quantumrate += parseInt(item.QUANTUMRATE) || 0;
      effectiverate += parseInt(item.EFFECTIVERATE) || 0;
      cost += parseInt(item.COST) || 0;
    });

    setFormData(prevState => ({
      ...prevState,
      total: {
        weight,
        quantumrate,
        effectiverate,
        cost

      }
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
      <div className='flex justify-between'>
        <h2 className="text-2xl font-bold mb-4">Indent/Create</h2>
      </div>
      <form onSubmit={handleSubmit} >

        <div className="mt-1 mb-4 flex justify-between">
          <button
            type="submit"
            className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleListClick}
            className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600"
          >
            List view
          </button>
        </div>

        <div className="space-y-4 bg-[#FFFFFF] p-2 sm:flex sm:flex-wrap gap-2">
          <div className="mb-4">
            <label className="text-sm mb-1" htmlFor="indentNo">Indent Number</label>
            <input type="text" id="indentNo" name="indentNo" value={formData.indentNo} onChange={handleChange} required className="input w-full border border-black shadow-md" />
          </div>
          <div className="mb-4">
            <label className="text-sm mb-1" htmlFor="date">Date</label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required className="input w-full border border-black shadow-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="customer" className="text-sm mb-1">Customer</label>
            <input
              type="text"
              id="customer"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              list="customer1Suggestions"
              className="input w-full border border-black shadow-md"
            />
            <datalist id="customer1Suggestions">
              {customer.map((customer1) => (
                <option key={customer1._id} value={customer1.name} />
              ))}
            </datalist>
          </div>

          <div className="mb-4">
            <label className="text-sm mb-1" htmlFor="orderNo">Order No.</label>
            <input type="text" id="orderNo" name="orderNo" value={formData.orderNo} onChange={handleChange} required className="input w-full border border-black shadow-md" />
          </div>
          <div className="mb-4">
            <label className="text-sm mb-1" htmlFor="orderDate">Order Date</label>
            <input type="date" id="orderDate" name="orderDate" value={formData.orderDate} onChange={handleChange} required className="input w-full border border-black shadow-md" />
          </div>
          <div className="mb-4">
            <label className="text-sm mb-1" htmlFor="orderMode">Order Mode</label>
            <select id="orderMode" name="orderMode" value={formData.orderMode} onChange={handleChange} required className="input w-full border border-black shadow-md">
              <option value="">Select Order Mode</option>
              <option value="MAIL">Mail</option>
              <option value="PHONE">Phone</option>
              <option value="IN_PERSON">In Person</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="text-sm mb-1" htmlFor="serviceMode">Service Mode</label>
            <select id="serviceMode" name="serviceMode" value={formData.serviceMode} onChange={handleChange} required className="input w-full border border-black shadow-md">
              <option value="">Select Service Mode</option>
              <option value="AIR">Air</option>
              <option value="SEA">Sea</option>
              <option value="LAND">Land</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="text-sm mb-1" htmlFor="rfq">RFQ</label>
            <input type="text" id="rfq" name="rfq" value={formData.rfq} onChange={handleChange} required className="input w-full border border-black shadow-md" />
          </div>

          <div className="mb-4">
            <label className="text-sm mb-1" htmlFor="expectedDate">Expected Date</label>
            <input type="date" id="expectedDate" name="expectedDate" value={formData.expectedDate} onChange={handleChange} required className="input w-full border border-black shadow-md" />
          </div>
          <div className="mb-4">
            <label className="text-sm mb-1" htmlFor="employee">Employee</label>
            <input type="text" id="employee" name="employee" value={formData.employee} onChange={handleChange} required className="input w-full border border-black shadow-md" />
          </div>

        </div>

        <div className=" bg-[#FFFFFF] p-2   gap-2">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add Item
          </button>
        </div>

        <div className="bg-[#FFFFFF] p-2">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border border-black px-4 py-2">FROM</th>
                <th className="border border-black px-4 py-2">TO</th>
                <th className="border border-black px-4 py-2">VEHICLE TYPE</th>
                <th className="border border-black px-4 py-2">DIMENSIONS</th>
                <th className="border border-black px-4 py-2">WEIGHT(T)</th>
                <th className="border border-black px-4 py-2">QUANTUMRATE(P/T)</th>
                <th className="border border-black px-4 py-2">EFFECTIVE RATE(P/T)</th>
                <th className="border border-black px-4 py-2">COST</th>
                <th className="border border-black px-4 py-2">REMARK</th>
                <th className="border border-black px-4 py-2">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="border border-black px-4 py-2">{item.from}</td>
                  <td className="border border-black px-4 py-2">{item.to}</td>
                  <td className="border border-black px-4 py-2">{item.vehicletype}</td>
                  <td className="border border-black px-4 py-2">{item.DIMENSIONS}</td>
                  <td className="border border-black px-4 py-2">{item.WEIGHT}</td>
                  <td className="border border-black px-4 py-2">{item.QUANTUMRATE}</td>
                  <td className="border border-black px-4 py-2">{item.EFFECTIVERATE}</td>
                  <td className="border border-black px-4 py-2">{item.COST}</td>
                  <td className="border border-black px-4 py-2">{item.REMARKS}</td>
                  <td className="border border-black px-4 py-2">
                    <button type="button" onClick={() => handleEditItem(index)} className="text-blue-600 hover:text-blue-900">
                      <RiEdit2Line />
                    </button>
                    <button type="button" onClick={() => handleDeleteItem(index)} className="text-red-600 hover:text-red-900 ml-2">
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
                    <label className="text-sm mb-1" htmlFor="totalWeight">Total WEIGHT</label>
                    <input type="number" id="totalWeight" value={formData.total.weight} readOnly className="input w-full border border-black shadow-md" />
                  </div>
                  <div className="mb-4">
                    <label className="text-sm mb-1" htmlFor="totalquantumrate">Total Quantumrate</label>
                    <input type="number" id="totalquantumrate" value={formData.total.quantumrate} readOnly className="input w-full border border-black shadow-md" />
                  </div>

                  <div className="mb-4">
                    <label className="text-sm mb-1" htmlFor="totaleffectiverate">Total Effective Rate</label>
                    <input type="number" id="totaleffectiverate" value={formData.total.effectiverate} readOnly className="input w-full border border-black shadow-md" />
                  </div>

                  <div className="mb-4">
                    <label className="text-sm mb-1" htmlFor="totalcost">Total Cost</label>
                    <input type="number" id="totalcost" value={formData.total.cost} readOnly className="input w-full border border-black shadow-md" />
                  </div>
              
                  <div className="mb-4">
                    <label className="text-sm mb-1" htmlFor="status">Status</label>
                    <select id="status" value={formData.total.status} onChange={handleChange} className="input w-full border border-black shadow-md">
                      <option value="Open">Open</option>
                      <option value="Close">Close</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="text-sm mb-1" htmlFor="approvedComment">Approved Comment</label>
                    <input type="text" id="approvedComment" value={formData.total.approvedComment} onChange={handleChange} className="input w-full border border-black shadow-md" />
                  </div>
                  <div className="mb-4">
                    <label className="text-sm mb-1" htmlFor="remark">Remark</label>
                    <input type="text" id="remark" value={formData.total.remark} onChange={handleChange} className="input w-full border border-black shadow-md" />
                  </div>
                </div>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="grid grid-cols-6 gap-6 p-2">

                <div className="mb-4">
                  <label htmlFor="other.consignor" className="text-sm mb-1">consignor</label>
                  <input
                    type="text"
                    id="other.consignor"
                    name="other.consignor"
                    value={formData.other.consignor}
                    onChange={handleChange}
                    list="consignorSuggestions"
                    className="input w-full border border-black shadow-md"
                  />
                  <datalist id="consignorSuggestions">
                    {consignorData.map((customer2) => (
                      <option key={customer2._id} value={customer2.name} />
                    ))}
                  </datalist>
                </div>
                <div className="mb-4">
                  <label htmlFor="other.consignor" className="text-sm mb-1">consignee</label>
                  <input
                    type="text"
                    id="other.consignee"
                    name="other.consignee"
                    value={formData.other.consignee}
                    onChange={handleChange}
                    list="consignorSuggestions"
                    className="input w-full border border-black shadow-md"
                  />
                  <datalist id="consignorSuggestions">
                    {consigneeData.map((customer2) => (
                      <option key={customer2._id} value={customer2.name} />
                    ))}
                  </datalist>
                </div>

                <div className="mb-4">
                  <label htmlFor="other.remark" className="block text-sm font-medium text-gray-700">remark</label>
                  <input type="text" id="other.remark" name="other.remark" value={formData.other.remark} onChange={handleOtherChange} className="input w-full border border-black shadow-md" />
                </div>

              </div>
            </TabPanel>
          </Tabs>
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Add Item</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="text-sm mb-1" htmlFor="vehicletype">vehicletype</label>
                  <select id="vehicletype" name="vehicletype" value={newItem.vehicletype} onChange={handleItemChange} required className="input w-full border border-black shadow-md">
                    <option value="">Select</option>
                    {vehicletype.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="text-sm mb-1" htmlFor="from">from</label>
                  <input type="text" id="from" name="from" value={newItem.from} onChange={handleItemChange} required className="input w-full border border-black shadow-md" />
                </div>
                <div className="mb-4">
                  <label className="text-sm mb-1" htmlFor="to">from</label>
                  <input type="text" id="to" name="to" value={newItem.to} onChange={handleItemChange} required className="input w-full border border-black shadow-md" />
                </div>
                <div className="mb-4">
                  <label className="text-sm mb-1" htmlFor="DIMENSIONS">dimensions</label>
                  <input type="string" id="DIMENSIONS" name="DIMENSIONS" value={newItem.DIMENSIONS} onChange={handleItemChange} required className="input w-full border border-black shadow-md" />
                </div>
                <div className="mb-4">
                  <label className="text-sm mb-1" htmlFor="WEIGHT">WEIGHT</label>
                  <input type="number" id="WEIGHT" name="WEIGHT" value={newItem.WEIGHT} onChange={handleItemChange} required className="input w-full border border-black shadow-md" />
                </div>

                <div className="mb-4">
                  <label className="text-sm mb-1" htmlFor="QUANTUMRATE">QUANTUMRATE</label>
                  <input type="number" id="QUANTUMRATE" name="QUANTUMRATE" value={newItem.QUANTUMRATE} onChange={handleItemChange} required className="input w-full border border-black shadow-md" />
                </div>
                <div className="mb-4">
                  <label className="text-sm mb-1" htmlFor="EFFECTIVERATE">EFFECTIVERATE</label>
                  <input type="number" id="EFFECTIVERATE" name="EFFECTIVERATE" value={newItem.EFFECTIVERATE} onChange={handleItemChange} required className="input w-full border border-black shadow-md" />
                </div>
                <div className="mb-4">
                  <label className="text-sm mb-1" htmlFor="COST">COST</label>
                  <input type="number" id="COST" name="COST" value={newItem.COST} onChange={handleItemChange} required className="input w-full border border-black shadow-md" />
                </div>


                <div className="mb-4 col-span-2">
                  <label className="text-sm mb-1" htmlFor="REMARKS">REMARKS</label>
                  <input type="text" id="REMARKS" name="REMARKS" value={newItem.REMARKS} onChange={handleItemChange} className="input w-full border border-black shadow-md" />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="ml-4 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {responseMessage && <p className="mt-4">{responseMessage}</p>}
      </form>
    </div>
  );
}

export default Indent;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';

// function Indent() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     indentNo: '',
//     date: '',
//     customer: '',
//     balance: '',
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
//     additem:'',
//     total:''
    
//   });

//   const [items, setItems] = useState([]);
//   const [responseMessage, setResponseMessage] = useState('');
//   const [customer, setCustomer] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   const [newItem, setNewItem] = useState({
//     loadtype: '',
//     PKGS: 0,
//     WEIGHT: 0,
//     RATE_CALCULATE_ON: '',
//     RATE: 0,
//     FREIGHT: 0,
//     NO_OF_VEHICLE: 0,
//     ADVANCE: 0,
//     BALANCE: 0,
//     REMARKS: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleItemChange = (e) => {
//     const { name, value } = e.target;
//     setNewItem({ ...newItem, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/indents',  { ...formData, additem: items });
//       setResponseMessage(`Indent created successfully. Indent ID: ${response.data._id}`);
//       setFormData({
//         indentNo: '',
//         date: '',
//         customer: '',
//         balance: '',
//         orderNo: '',
//         orderDate: '',
//         orderMode: '',
//         serviceMode: '',
//         rfq: '',
//         orderType: '',
//         expectedDate: '',
//         employee: '',
//         source: '',
//         destination: '',
//         additem:'',
//         total:''
       
//       });
//       setItems([]);
//     } catch (error) {
//       setResponseMessage('Error creating indent. Please try again.');
//       console.error(error);
//     }
//   };

//   const handleListClick = () => {
//     navigate('/protected/componentop/sidebarop/Sidebarop/ordermanagement/viewindents');
//   };



//   useEffect(() => {
//     const fetchCustomer = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/getcustomer1', {
//           params: { name: formData.customer }
//         });
//         setCustomer(response.data);
//       } catch (error) {
//         console.error('Error fetching customers:', error);
//       }
//     };

//     if (formData.customer) {
//       fetchCustomer();
//     } else {
//       setCustomer([]);
//     }
//   }, [formData.customer]);

//   const handleAddItem = () => {
//     setItems([...items, newItem]);
//     setNewItem({
//       loadtype: '',
//       PKGS: 0,
//       WEIGHT: 0,
//       RATE_CALCULATE_ON: '',
//       RATE: 0,
//       FREIGHT: 0,
//       NO_OF_VEHICLE: 0,
//       ADVANCE: 0,
//       BALANCE: 0,
//       REMARKS: ''
//     });
//     setShowModal(false);
//   };

//   const handleEditItem = (index) => {
//     setNewItem(items[index]);
//     setShowModal(true);
//   };

//   const handleDeleteItem = (index) => {
//     const updatedItems = items.filter((_, i) => i !== index);
//     setItems(updatedItems);
//   };

//   const loadTypes = [
//     'FTCLOSE BODY', 'FT CONTAINER', 'FT DALA BODY', 'FT LPT', 'FT CONTAINER', 
//     'FT CONTAINER', 'FT CONTAINER MXL', 'FT CONTAINER SXL', 'FT TROLLA', 
//     'FT CONTAINER', 'PRIME MOVER', 'FT TRAILER XXXL', 'BY HAND PICKUP', 
//     'CANTER', 'CLOSE TRURAS', 'CLOSED BODY TRUCK', 'FTL', 'HIGH BED TRAILER', 
//     'JCB'
//   ];

//   const rateCalculateOnOptions = ['FIXED', 'PKGS', 'WEIGHT'];



//   const calculateTotals = () => {
//     let pkgs = 0;
//     let weight = 0;
//     let fright = 0;
//     let advance = 0;
//     let balance = 0;
//     let noOfVehicle = 0;
  
//     items.forEach(item => {
//       pkgs += parseInt(item.PKGS) || 0;
//       weight += parseInt(item.WEIGHT) || 0;
//       fright += parseInt(item.FREIGHT) || 0;
//       advance += parseInt(item.ADVANCE) || 0;
//       balance += parseInt(item.BALANCE) || 0;
//       noOfVehicle += parseInt(item.NO_OF_VEHICLE) || 0;
//     });
  
//     setFormData(prevState => ({
//       ...prevState,
//       total: {
//         pkgs,
//         weight,
//         fright,
//         advance,
//         balance,
//         noOfVehicle
//       }
//     }));
//   };
  

//   return (
//     <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//       <div className='flex justify-between'>
//         <h2 className="text-2xl font-bold mb-4">Indent/Create</h2>
        
//       </div>
//       <form onSubmit={handleSubmit} >


//       <div className="mt-1 mb-4 flex justify-between">
//   <button
//     type="submit"
//     className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//   >
//     Submit
//   </button>
//   <button
//     type="button"
//     onClick={handleListClick}
//     className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600"
//   >
//     List view
//   </button>
// </div>

//         <div className="space-y-4 bg-[#FFFFFF] p-2  sm:flex sm:flex-wrap gap-2">
            
//         <div className="mb-4">
//           <label className="text-sm mb-1" htmlFor="indentNo">Indent Number</label>
//           <input type="text" id="indentNo" name="indentNo" value={formData.indentNo} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="mb-4">
//           <label className="text-sm mb-1" htmlFor="date">Date</label>
//           <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="mb-4">
//           <label htmlFor="customer" className="text-sm mb-1">Customer</label>
//           <input
//             type="text"
//             id="customer"
//             name="customer"
//             value={formData.customer}
//             onChange={handleChange}
//             list="customer1Suggestions"
//             className="input w-full border border-black shadow-md"
//           />
//           <datalist id="customer1Suggestions">
//             {customer.map((customer1) => (
//               <option key={customer1._id} value={customer1.name} />
//             ))}
//           </datalist>


//         </div>
//         <div className="mb-4">
//           <label className="text-sm mb-1" htmlFor="balance">Balance</label>
//           <input type="number" id="balance" name="balance" value={formData.balance} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="mb-4">
//           <label className="text-sm mb-1" htmlFor="orderNo">Order No.</label>
//           <input type="text" id="orderNo" name="orderNo" value={formData.orderNo} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="mb-4">
//           <label className="text-sm mb-1" htmlFor="orderDate">Order Date</label>
//           <input type="date" id="orderDate" name="orderDate" value={formData.orderDate} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="mb-4">
//           <label className="text-sm mb-1" htmlFor="orderMode">Order Mode</label>
//           <select id="orderMode" name="orderMode" value={formData.orderMode} onChange={handleChange} required className="input w-full border border-black shadow-md">
//             <option value="">Select Order Mode</option>
//             <option value="MAIL">Mail</option>
//             <option value="PHONE">Phone</option>
//             <option value="IN_PERSON">In Person</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="text-sm mb-1" htmlFor="serviceMode">Service Mode</label>
//           <select id="serviceMode" name="serviceMode" value={formData.serviceMode} onChange={handleChange} required className="input w-full border border-black shadow-md">
//             <option value="">Select Service Mode</option>
//             <option value="AIR">Air</option>
//             <option value="SEA">Sea</option>
//             <option value="LAND">Land</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="text-sm mb-1" htmlFor="rfq">RFQ</label>
//           <input type="text" id="rfq" name="rfq" value={formData.rfq} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="mb-4">
//           <label className="text-sm mb-1" htmlFor="orderType">Order Type</label>
//           <select id="orderType" name="orderType" value={formData.orderType} onChange={handleChange} required className="input w-full border border-black shadow-md">
//             <option value="">Select Order Type</option>
//             <option value="NORMAL">Normal</option>
//             <option value="URGENT">Urgent</option>
//           </select>
//         </div>
//         <div className="mb-4">
//           <label className="text-sm mb-1" htmlFor="expectedDate">Expected Date</label>
//           <input type="date" id="expectedDate" name="expectedDate" value={formData.expectedDate} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="mb-4">
//           <label className="text-sm mb-1" htmlFor="employee">Employee</label>
//           <input type="text" id="employee" name="employee" value={formData.employee} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="mb-4">
//           <label className="text-sm mb-1" htmlFor="source">Source</label>
//           <input type="text" id="source" name="source" value={formData.source} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="mb-4">
//           <label className="text-sm mb-1" htmlFor="destination">Destination</label>
//           <input type="text" id="destination" name="destination" value={formData.destination} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>

//         </div>


//         <div className="mb-4  bg-[#FFFFFF] p-2   gap-2">
//           <button type="button" onClick={() => setShowModal(true)} className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">Add Item</button>
          

//                 <div >
//         <div className="overflow-x-auto">
//           <table className="table-auto w-full border border-black">
//             <thead>
//               <tr>
//                 <th className="border border-black px-4 py-2">Load Type</th>
//                 <th className="border border-black px-4 py-2">PKGS</th>
//                 <th className="border border-black px-4 py-2">Weight</th>
//                 <th className="border border-black px-4 py-2">Rate Calculate On</th>
//                 <th className="border border-black px-4 py-2">Rate</th>
//                 <th className="border border-black px-4 py-2">Freight</th>
//                 <th className="border border-black px-4 py-2">No. of Vehicle</th>
//                 <th className="border border-black px-4 py-2">Advance</th>
//                 <th className="border border-black px-4 py-2">Balance</th>
//                 <th className="border border-black px-4 py-2">Remarks</th>
//                 <th className="border border-black px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item, index) => (
//                 <tr key={index}>
//                   <td className="border border-black px-4 py-2">{item.loadtype}</td>
//                   <td className="border border-black px-4 py-2">{item.PKGS}</td>
//                   <td className="border border-black px-4 py-2">{item.WEIGHT}</td>
//                   <td className="border border-black px-4 py-2">{item.RATE_CALCULATE_ON}</td>
//                   <td className="border border-black px-4 py-2">{item.RATE}</td>
//                   <td className="border border-black px-4 py-2">{item.FREIGHT}</td>
//                   <td className="border border-black px-4 py-2">{item.NO_OF_VEHICLE}</td>
//                   <td className="border border-black px-4 py-2">{item.ADVANCE}</td>
//                   <td className="border border-black px-4 py-2">{item.BALANCE}</td>
//                   <td className="border border-black px-4 py-2">{item.REMARKS}</td>
//                   <td className="border border-black px-4 py-2">
//                     <button onClick={() => handleEditItem(index)} className="btn text-blue-500 mx-1">
//                       <RiEdit2Line />
//                     </button>
//                     <button onClick={() => handleDeleteItem(index)} className="btn text-red-500 mx-1">
//                       <RiDeleteBinLine />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
           
//           </table>


       

//           <Tabs className="bg-[#FFFFFF] pt-2">
//                             <TabList className="flex flex-wrap border-b border-gray-200">
//                                 <Tab className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto">TOTAL</Tab>
//                                 <Tab className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto">OTHER</Tab>

//                             </TabList>
                                                       
//                             <TabPanel>
//                                 <div className="grid grid-cols-6 gap-6 p-2">
                                   
                            

//                                 <div className="mb-4">
//                                 <label className="text-sm mb-1" htmlFor="pkgs">pkgs</label>
//                                <input type="text" id="pkgs" name="pkgs" value={formData.total.pkgs}  required className="input w-full border border-black shadow-md" />
//                                  </div>
//                                 <div className="mb-4">
//                                 <label className="text-sm mb-1" htmlFor="weight">weight</label>
//                                <input type="text" id="weight" name="weight" value={formData.total.weight}  required className="input w-full border border-black shadow-md" />
//                                  </div>
//                                 <div className="mb-4">
//                                 <label className="text-sm mb-1" htmlFor="fright">fright</label>
//                                <input type="text" id="fright" name="fright" value={formData.total.fright}  required className="input w-full border border-black shadow-md" />
//                                  </div>
//                                 <div className="mb-4">
//                                 <label className="text-sm mb-1" htmlFor="advance">advance</label>
//                                <input type="text" id="advance" name="advance" value={formData.total.advance}  required className="input w-full border border-black shadow-md" />
//                                  </div>
//                                 <div className="mb-4">
//                                 <label className="text-sm mb-1" htmlFor="balance">balance</label>
//                                <input type="text" id="balance" name="balance" value={formData.total.balance}  required className="input w-full border border-black shadow-md" />
//                                  </div>
//                                 <div className="mb-4">
//                                 <label className="text-sm mb-1" htmlFor="noOfVehicle">noOfVehicle</label>
//                                <input type="text" id="noOfVehicle" name="noOfVehicle" value={formData.total.noOfVehicle}  required className="input w-full border border-black shadow-md" />
//                                  </div>

//                                 </div>

//                             </TabPanel>

//                             <TabPanel>
//                                 <div className="grid grid-cols-6 gap-6 p-2">
                                   
//                                 OTHER TABLE
//                                 </div>

//                             </TabPanel>
//                             </Tabs>
//         </div>
//       </div>
//         </div>
//         {responseMessage && <p className="mt-4">{responseMessage}</p>}


        
//       </form>

      
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded shadow-md w-11/12 sm:w-3/4 md:w-1/2">
//             <h3 className="text-lg font-semibold mb-4">Add Item</h3>
//             <div className="mb-4">
//               <label className="block text-sm mb-1" htmlFor="loadtype">Load Type</label>
//               <select id="loadtype" name="loadtype" value={newItem.loadtype} onChange={handleItemChange} required className="input w-full border border-black shadow-md">
//                 <option value="">Select Load Type</option>
//                 {loadTypes.map((type, index) => (
//                   <option key={index} value={type}>{type}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm mb-1" htmlFor="PKGS">PKGS</label>
//               <input type="number" id="PKGS" name="PKGS" value={newItem.PKGS} onChange={handleItemChange} className="input w-full border border-black shadow-md" />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm mb-1" htmlFor="WEIGHT">Weight</label>
//               <input type="number" id="WEIGHT" name="WEIGHT" value={newItem.WEIGHT} onChange={handleItemChange} className="input w-full border border-black shadow-md" />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm mb-1" htmlFor="RATE_CALCULATE_ON">Rate Calculate On</label>
//               <select id="RATE_CALCULATE_ON" name="RATE_CALCULATE_ON" value={newItem.RATE_CALCULATE_ON} onChange={handleItemChange} required className="input w-full border border-black shadow-md">
//                 <option value="">Select Rate Calculate On</option>
//                 {rateCalculateOnOptions.map((option, index) => (
//                   <option key={index} value={option}>{option}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm mb-1" htmlFor="RATE">Rate</label>
//               <input type="number" id="RATE" name="RATE" value={newItem.RATE} onChange={handleItemChange} className="input w-full border border-black shadow-md" />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm mb-1" htmlFor="FREIGHT">Freight</label>
//               <input type="number" id="FREIGHT" name="FREIGHT" value={newItem.FREIGHT} onChange={handleItemChange} className="input w-full border border-black shadow-md" />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm mb-1" htmlFor="NO_OF_VEHICLE">No. of Vehicle</label>
//               <input type="number" id="NO_OF_VEHICLE" name="NO_OF_VEHICLE" value={newItem.NO_OF_VEHICLE} onChange={handleItemChange} className="input w-full border border-black shadow-md" />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm mb-1" htmlFor="ADVANCE">Advance</label>
//               <input type="number" id="ADVANCE" name="ADVANCE" value={newItem.ADVANCE} onChange={handleItemChange} className="input w-full border border-black shadow-md" />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm mb-1" htmlFor="BALANCE">Balance</label>
//               <input type="number" id="BALANCE" name="BALANCE" value={newItem.BALANCE} onChange={handleItemChange} className="input w-full border border-black shadow-md" />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm mb-1" htmlFor="REMARKS">Remarks</label>
//               <input type="text" id="REMARKS" name="REMARKS" value={newItem.REMARKS} onChange={handleItemChange} className="input w-full border border-black shadow-md" />
//             </div>
//             <div className="flex justify-end">
//               <button onClick={() => setShowModal(false)} className="btn bg-red-500 text-white py-2 px-4 border border-black hover:bg-red-600 mr-2">Cancel</button>
//               <button onClick={handleAddItem} className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600">Add Item</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Indent;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';

// function Indent() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     indentNo: '',
//     date: '',
//     customer: '',
//     balance: '',
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
//     additem:'',
//     total:''
    
//   });

//   const [items, setItems] = useState([]);
//   const [responseMessage, setResponseMessage] = useState('');
//   const [customer, setCustomer] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   const [newItem, setNewItem] = useState({
//     loadtype: '',
//     PKGS: 0,
//     WEIGHT: 0,
//     RATE_CALCULATE_ON: '',
//     RATE: 0,
//     FREIGHT: 0,
//     NO_OF_VEHICLE: 0,
//     ADVANCE: 0,
//     BALANCE: 0,
//     REMARKS: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleItemChange = (e) => {
//     const { name, value } = e.target;
//     setNewItem({ ...newItem, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/indents', formData);
//       setResponseMessage(`Indent created successfully. Indent ID: ${response.data._id}`);
//       setFormData({
//         indentNo: '',
//         date: '',
//         customer: '',
//         balance: '',
//         orderNo: '',
//         orderDate: '',
//         orderMode: '',
//         serviceMode: '',
//         rfq: '',
//         orderType: '',
//         expectedDate: '',
//         employee: '',
//         source: '',
//         destination: '',
//         additem:'',
//         total:''
       
//       });
//     } catch (error) {
//       setResponseMessage('Error creating indent. Please try again.');
//       console.error(error);
//     }
//   };

//   const handleListClick = () => {
//     navigate('/protected/componentop/sidebarop/Sidebarop/ordermanagement/viewindents');
//   };



//   useEffect(() => {
//     const fetchCustomer = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/getcustomer1', {
//           params: { name: formData.customer }
//         });
//         setCustomer(response.data);
//       } catch (error) {
//         console.error('Error fetching customers:', error);
//       }
//     };

//     if (formData.customer) {
//       fetchCustomer();
//     } else {
//       setCustomer([]);
//     }
//   }, [formData.customer]);

//   const handleAddItem = () => {
//     setItems([...items, newItem]);
//     setNewItem({
//       loadtype: '',
//       PKGS: 0,
//       WEIGHT: 0,
//       RATE_CALCULATE_ON: '',
//       RATE: 0,
//       FREIGHT: 0,
//       NO_OF_VEHICLE: 0,
//       ADVANCE: 0,
//       BALANCE: 0,
//       REMARKS: ''
//     });
//     setShowModal(false);
//   };

//   const handleEditItem = (index) => {
//     setNewItem(items[index]);
//     setShowModal(true);
//   };

//   const handleDeleteItem = (index) => {
//     const updatedItems = items.filter((_, i) => i !== index);
//     setItems(updatedItems);
//   };

//   const loadTypes = [
//     'FTCLOSE BODY', 'FT CONTAINER', 'FT DALA BODY', 'FT LPT', 'FT CONTAINER', 
//     'FT CONTAINER', 'FT CONTAINER MXL', 'FT CONTAINER SXL', 'FT TROLLA', 
//     'FT CONTAINER', 'PRIME MOVER', 'FT TRAILER XXXL', 'BY HAND PICKUP', 
//     'CANTER', 'CLOSE TRURAS', 'CLOSED BODY TRUCK', 'FTL', 'HIGH BED TRAILER', 
//     'JCB'
//   ];

//   const rateCalculateOnOptions = ['FIXED', 'PKGS', 'WEIGHT'];


//   return (
//     <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//       <div className='flex justify-between'>
//         <h2 className="text-2xl font-bold mb-4">Indent/ Create</h2>
//         <button type="button" onClick={handleListClick} className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">List view</button>
//       </div>
//       <form onSubmit={handleSubmit} className="space-y-4 bg-[#FFFFFF] p-2 sm:flex sm:flex-wrap">
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="indentNo">Indent Number</label>
//           <input type="text" id="indentNo" name="indentNo" value={formData.indentNo} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="date">Date</label>
//           <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label htmlFor="customer" className="text-sm mb-1">Customer</label>
//           <input
//             type="text"
//             id="customer"
//             name="customer"
//             value={formData.customer}
//             onChange={handleChange}
//             list="customer1Suggestions"
//             className="input w-full border border-black shadow-md"
//           />
//           <datalist id="customer1Suggestions">
//             {customer.map((customer1) => (
//               <option key={customer1._id} value={customer1.name} />
//             ))}
//           </datalist>
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="balance">Balance</label>
//           <input type="number" id="balance" name="balance" value={formData.balance} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="orderNo">Order No.</label>
//           <input type="text" id="orderNo" name="orderNo" value={formData.orderNo} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="orderDate">Order Date</label>
//           <input type="date" id="orderDate" name="orderDate" value={formData.orderDate} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="orderMode">Order Mode</label>
//           <select id="orderMode" name="orderMode" value={formData.orderMode} onChange={handleChange} required className="input w-full border border-black shadow-md">
//             <option value="">Select Order Mode</option>
//             <option value="MAIL">Mail</option>
//             <option value="PHONE">Phone</option>
//             <option value="IN_PERSON">In Person</option>
//           </select>
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="serviceMode">Service Mode</label>
//           <select id="serviceMode" name="serviceMode" value={formData.serviceMode} onChange={handleChange} required className="input w-full border border-black shadow-md">
//             <option value="">Select Service Mode</option>
//             <option value="AIR">Air</option>
//             <option value="SEA">Sea</option>
//             <option value="LAND">Land</option>
//           </select>
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="rfq">RFQ</label>
//           <input type="text" id="rfq" name="rfq" value={formData.rfq} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="orderType">Order Type</label>
//           <select id="orderType" name="orderType" value={formData.orderType} onChange={handleChange} required className="input w-full border border-black shadow-md">
//             <option value="">Select Order Type</option>
//             <option value="NORMAL">Normal</option>
//             <option value="URGENT">Urgent</option>
//           </select>
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="expectedDate">Expected Date</label>
//           <input type="date" id="expectedDate" name="expectedDate" value={formData.expectedDate} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="employee">Employee</label>
//           <input type="text" id="employee" name="employee" value={formData.employee} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="source">Source</label>
//           <input type="text" id="source" name="source" value={formData.source} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="destination">Destination</label>
//           <input type="text" id="destination" name="destination" value={formData.destination} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full flex justify-between">
//           <button type="button" onClick={() => setShowModal(true)} className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">Add Item</button>
//           <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">Submit</button>
//         </div>
//         {responseMessage && <p className="mt-4">{responseMessage}</p>}
//       </form>
//       <div>
//         <div className="overflow-x-auto">
//           <table className="table-auto w-full border border-black">
//             <thead>
//               <tr>
//                 <th className="border border-black px-4 py-2">Load Type</th>
//                 <th className="border border-black px-4 py-2">PKGS</th>
//                 <th className="border border-black px-4 py-2">Weight</th>
//                 <th className="border border-black px-4 py-2">Rate Calculate On</th>
//                 <th className="border border-black px-4 py-2">Rate</th>
//                 <th className="border border-black px-4 py-2">Freight</th>
//                 <th className="border border-black px-4 py-2">No. of Vehicle</th>
//                 <th className="border border-black px-4 py-2">Advance</th>
//                 <th className="border border-black px-4 py-2">Balance</th>
//                 <th className="border border-black px-4 py-2">Remarks</th>
//                 <th className="border border-black px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item, index) => (
//                 <tr key={index}>
//                   <td className="border border-black px-4 py-2">{item.loadtype}</td>
//                   <td className="border border-black px-4 py-2">{item.PKGS}</td>
//                   <td className="border border-black px-4 py-2">{item.WEIGHT}</td>
//                   <td className="border border-black px-4 py-2">{item.RATE_CALCULATE_ON}</td>
//                   <td className="border border-black px-4 py-2">{item.RATE}</td>
//                   <td className="border border-black px-4 py-2">{item.FREIGHT}</td>
//                   <td className="border border-black px-4 py-2">{item.NO_OF_VEHICLE}</td>
//                   <td className="border border-black px-4 py-2">{item.ADVANCE}</td>
//                   <td className="border border-black px-4 py-2">{item.BALANCE}</td>
//                   <td className="border border-black px-4 py-2">{item.REMARKS}</td>
//                   <td className="border border-black px-4 py-2">
//                     <button onClick={() => handleEditItem(index)} className="btn text-blue-500 mx-1">
//                       <RiEdit2Line />
//                     </button>
//                     <button onClick={() => handleDeleteItem(index)} className="btn text-red-500 mx-1">
//                       <RiDeleteBinLine />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
           
//           </table>
//         </div>
//       </div>
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded shadow-md w-11/12 sm:w-3/4 md:w-1/2">
//             <h3 className="text-lg font-semibold mb-4">Add Item</h3>
//             <div className="mb-4">
//               <label className="block text-sm mb-1" htmlFor="loadtype">Load Type</label>
//               <select id="loadtype" name="loadtype" value={newItem.loadtype} onChange={handleItemChange} required className="input w-full border border-black shadow-md">
//                 <option value="">Select Load Type</option>
//                 {loadTypes.map((type, index) => (
//                   <option key={index} value={type}>{type}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm mb-1" htmlFor="PKGS">PKGS</label>
//               <input type="number" id="PKGS" name="PKGS" value={newItem.PKGS} onChange={handleItemChange} className="input w-full border border-black shadow-md" />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm mb-1" htmlFor="WEIGHT">Weight</label>
//               <input type="number" id="WEIGHT" name="WEIGHT" value={newItem.WEIGHT} onChange={handleItemChange} className="input w-full border border-black shadow-md" />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm mb-1" htmlFor="RATE_CALCULATE_ON">Rate Calculate On</label>
//               <select id="RATE_CALCULATE_ON" name="RATE_CALCULATE_ON" value={newItem.RATE_CALCULATE_ON} onChange={handleItemChange} required className="input w-full border border-black shadow-md">
//                 <option value="">Select Rate Calculate On</option>
//                 {rateCalculateOnOptions.map((option, index) => (
//                   <option key={index} value={option}>{option}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm mb-1" htmlFor="RATE">Rate</label>
//               <input type="number" id="RATE" name="RATE" value={newItem.RATE} onChange={handleItemChange} className="input w-full border border-black shadow-md" />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm mb-1" htmlFor="FREIGHT">Freight</label>
//               <input type="number" id="FREIGHT" name="FREIGHT" value={newItem.FREIGHT} onChange={handleItemChange} className="input w-full border border-black shadow-md" />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm mb-1" htmlFor="NO_OF_VEHICLE">No. of Vehicle</label>
//               <input type="number" id="NO_OF_VEHICLE" name="NO_OF_VEHICLE" value={newItem.NO_OF_VEHICLE} onChange={handleItemChange} className="input w-full border border-black shadow-md" />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm mb-1" htmlFor="ADVANCE">Advance</label>
//               <input type="number" id="ADVANCE" name="ADVANCE" value={newItem.ADVANCE} onChange={handleItemChange} className="input w-full border border-black shadow-md" />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm mb-1" htmlFor="BALANCE">Balance</label>
//               <input type="number" id="BALANCE" name="BALANCE" value={newItem.BALANCE} onChange={handleItemChange} className="input w-full border border-black shadow-md" />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm mb-1" htmlFor="REMARKS">Remarks</label>
//               <input type="text" id="REMARKS" name="REMARKS" value={newItem.REMARKS} onChange={handleItemChange} className="input w-full border border-black shadow-md" />
//             </div>
//             <div className="flex justify-end">
//               <button onClick={() => setShowModal(false)} className="btn bg-red-500 text-white py-2 px-4 border border-black hover:bg-red-600 mr-2">Cancel</button>
//               <button onClick={handleAddItem} className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600">Add Item</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Indent;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { RiEdit2Line, RiDeleteBinLine } from 'react-icons/ri';


// function Indent() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     indentNo: '',
//     date: '',
//     customer: '',
//     balance: '',
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

//   const [items, setItems] = useState([]);
//   const [responseMessage, setResponseMessage] = useState('');
//   const [customer, setCustomer] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [total, setTotal] = useState({});
//   const [newItem, setNewItem] = useState({
//     loadtype: '',
//     PKGS: '',
//     WEIGHT: '',
//     RATE_CALCULATE_ON: '',
//     RATE: '',
//     FREIGHT: '',
//     NO_OF_VEHICLE: '',
//     ADVANCE: '',
//     BALANCE: '',
//     REMARKS: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//   const handleItemChange = (e) => {
//     const { name, value } = e.target;
//     setNewItem({ ...newItem, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/indents', formData);
//       setResponseMessage(`Indent created successfully. Indent ID: ${response.data._id}`);
//       setFormData({
//         indentNo: '',
//         date: '',
//         customer: '',
//         balance: '',
//         orderNo: '',
//         orderDate: '',
//         orderMode: '',
//         serviceMode: '',
//         rfq: '',
//         orderType: '',
//         expectedDate: '',
//         employee: '',
//         source: '',
//         destination: ''
//       });
//     } catch (error) {
//       setResponseMessage('Error creating indent. Please try again.');
//       console.error(error);
//     }
//   };

//   const handleListClick = () => {
//     // Navigate to the viewindents page
//     navigate('/protected/componentop/sidebarop/Sidebarop/ordermanagement/viewindents');
//   };

//   const [activeTab, setActiveTab] = useState("Total");

//   const openTab = (tabName) => {
//     setActiveTab(tabName);
//   };


//   useEffect(() => {
//     const fetchCustomer = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/getcustomer1', {
//           params: { name: formData.customer }
//         });
//         setCustomer(response.data);
//       } catch (error) {
//         console.error('Error fetching owners:', error);
//       }
//     };

//     if (formData.customer) {
//       fetchCustomer();
//     } else {
//       setCustomer([]);
//     }
//   }, [formData.customer]);



//   const handleAddItem = () => {
//     setItems([...items, newItem]);
//     setNewItem({
//       loadtype: '',
//       PKGS: '',
//       WEIGHT: '',
//       RATE_CALCULATE_ON: '',
//       RATE: '',
//       FREIGHT: '',
//       NO_OF_VEHICLE: '',
//       ADVANCE: '',
//       BALANCE: '',
//       REMARKS: ''
//     });
//     setShowModal(false);
//   };



//   const calculateTotal = () => {
//     const totalValues = items.reduce(
//       (acc, curr) => {
//         acc.pkgs += curr.PKGS || 0;
//         acc.weight += curr.WEIGHT || 0;
//         acc.freight += curr.FREIGHT || 0; 
//         acc.advance += curr.ADVANCE || 0;
//         acc.balance += curr.BALANCE || 0;
//         acc.noOfVehicle += curr.NO_OF_VEHICLE || 0;
//         return acc;
//       },
//       { pkgs: 0, weight: 0, fright: 0, advance: 0, balance: 0, noOfVehicle: 0 }
//     );

//     setTotal({
//       ...totalValues,
//       status: 'Pending',
//       approvedComment: '',
//       remark: 'Total values calculated'
//     });
//   };

//   // Call calculateTotal whenever items change
//   useEffect(() => {
//     calculateTotal();
//   }, [items]);

//   return (
//     <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//       <div className='flex justify-between'>
//         <h2 className="text-2xl font-bold mb-4">Indent/ Create</h2>

//         <button type="button" onClick={handleListClick} className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">List view</button>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4 bg-[#FFFFFF] p-2  sm:flex sm:flex-wrap">
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="indentNo">Indent Number</label>
//           <input type="text" id="indentNo" name="indentNo" value={formData.indentNo} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="date">Date</label>
//           <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label htmlFor="customer" className="text-sm mb-1">Customer</label>
//           <input
//             type="text"
//             id="customer"
//             name="customer"
//             value={formData.customer}
//             onChange={handleChange}
//             list="customer1Suggestions"
//             className="input w-full border border-black shadow-md"
//           />
//           <datalist id="customer1Suggestions">
//             {customer.map((customer1) => (
//               <option key={customer1._id} value={customer1.name} />
//             ))}
//           </datalist>
//         </div>

//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="balance">Balance</label>
//           <input type="number" id="balance" name="balance" value={formData.balance} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="orderNo">Order No.</label>
//           <input type="text" id="orderNo" name="orderNo" value={formData.orderNo} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="orderDate">Order Date</label>
//           <input type="date" id="orderDate" name="orderDate" value={formData.orderDate} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="orderMode">Order Mode</label>
//           <select id="orderMode" name="orderMode" value={formData.orderMode} onChange={handleChange} required className="input w-full border border-black shadow-md">
//             <option value="">Select Order Mode</option>
//             <option value="MAIL">Mail</option>
//             <option value="PHONE">Phone</option>
//             <option value="LETTER">Letter</option>
//             <option value="OTHER">Other</option>
//           </select>
//         </div>

//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="serviceMode">Service Mode</label>
//           <select id="serviceMode" name="serviceMode" value={formData.serviceMode} onChange={handleChange} required className="input w-full border border-black shadow-md">
//             <option value="">Select Service Mode</option>
//             <option value="road">Road</option>
//             <option value="air">Air</option>
//             <option value="by hand">By Hand</option>
//             <option value="cargo">Cargo</option>
//             <option value="express">Express</option>
//             <option value="multi model">Multi-Model</option>
//             <option value="train">Train</option>
//           </select>
//         </div>

//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="temperature">RFQ</label>
//           <input type="number" id="rfq" name="rfq" value={formData.rfq} onChange={handleChange} required className="input w-full border border-black shadow-md" />
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
//           <input type="date" id="expectedDate" name="expectedDate" value={formData.expectedDate} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="employee">Employee</label>
//           <input type="text" id="employee" name="employee" value={formData.employee} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="source">Source</label>
//           <input type="text" id="source" name="source" value={formData.source} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="destination">Destination</label>
//           <input type="text" id="destination" name="destination" value={formData.destination} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>




//         <div className="container mx-auto p-4">
//         <button
//           type="button"
//           onClick={() => setShowModal(true)}
//           className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4 w-full sm:w-auto"
//         >
//           Add Item
//         </button>

//         <div className="overflow-x-auto">
//           <table className="table-auto w-full">
//             <thead>
//               <tr>
//                 <th className="bg-blue-600 border w-10">
//                   <RiEdit2Line className="inline-block w-4 h-4" />
//                 </th>
//                 <th className="bg-blue-600 w-10 border">
//                   <RiDeleteBinLine className="inline-block w-4 h-4" />
//                 </th>
//                 <th className="px-4 py-2 bg-blue-950 text-white">#</th>
//                 <th className="px-4 py-2 bg-blue-950 text-white">Load Type</th>
//                 <th className="px-4 py-2 bg-blue-950 text-white">Pkgs.</th>
//                 <th className="px-4 py-2 bg-blue-950 text-white">Weight</th>
//                 <th className="px-4 py-2 bg-blue-950 text-white">Rate Type</th>
//                 <th className="px-4 py-2 bg-blue-950 text-white">Rate</th>
//                 <th className="px-4 py-2 bg-blue-950 text-white">Freight</th>
//                 <th className="px-4 py-2 bg-blue-950 text-white">Advance</th>
//                 <th className="px-4 py-2 bg-blue-950 text-white">Balance</th>
//                 <th className="px-4 py-2 bg-blue-950 text-white">No. of Vehicle</th>
//                 <th className="px-4 py-2 bg-blue-950 text-white">Remarks</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item, index) => (
//                 <tr key={index}>
//                   <td className="border px-4 py-2">Edit</td>
//                   <td className="border px-4 py-2">Delete</td>
//                   <td className="border px-4 py-2">{index + 1}</td>
//                   <td className="border px-4 py-2">{item.loadtype}</td>
//                   <td className="border px-4 py-2">{item.PKGS}</td>
//                   <td className="border px-4 py-2">{item.WEIGHT}</td>
//                   <td className="border px-4 py-2">{item.RATE_CALCULATE_ON}</td>
//                   <td className="border px-4 py-2">{item.RATE}</td>
//                   <td className="border px-4 py-2">{item.FREIGHT}</td>
//                   <td className="border px-4 py-2">{item.ADVANCE}</td>
//                   <td className="border px-4 py-2">{item.BALANCE}</td>
//                   <td className="border px-4 py-2">{item.NO_OF_VEHICLE}</td>
//                   <td className="border px-4 py-2">{item.REMARKS}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {showModal && (
//   <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//    <div className="modal-content bg-white p-4 md:p-8 rounded-md w-11/12 xl:w-3/4 max-w-3xl shadow-lg">
//       <button className="close absolute top-0 right-0 p-4 cursor-pointer" onClick={() => setShowModal(false)}>
//         &times;
//       </button>
//       <h2 className="text-xl font-bold mb-4">Add Item</h2>
//       <form>
//         <div className="mb-4">
//           <label className="block text-gray-700" htmlFor="loadtype">
//             Load Type:
//             <input
//               type="text"
//               name="loadtype"
//               value={newItem.loadtype}
//               onChange={handleItemChange}
//               className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
//             />
//           </label>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="mb-4">
//             <label className="block text-gray-700" htmlFor="PKGS">
//               PKGS:
//               <input
//                 type="number"
//                 name="PKGS"
//                 value={newItem.PKGS}
//                 onChange={handleItemChange}
//                 className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
//               />
//             </label>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700" htmlFor="WEIGHT">
//               WEIGHT:
//               <input
//                 type="number"
//                 name="WEIGHT"
//                 value={newItem.WEIGHT}
//                 onChange={handleItemChange}
//                 className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
//               />
//             </label>
//           </div>

          
// <div className="mb-4">
//   <label className="block text-gray-700" htmlFor="RATE_CALCULATE_ON">
//     Rate Type:
//     <input
//       type="text"
//       name="RATE_CALCULATE_ON"
//       value={newItem.RATE_CALCULATE_ON}
//       onChange={handleItemChange}
//       className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
//     />
//   </label>
// </div>

// <div className="mb-4">
//   <label className="block text-gray-700" htmlFor="RATE">
//     Rate:
//     <input
//       type="number"
//       name="RATE"
//       value={newItem.RATE}
//       onChange={handleItemChange}
//       className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
//     />
//   </label>
// </div>

// <div className="mb-4">
//   <label className="block text-gray-700" htmlFor="FREIGHT">
//     Freight:
//     <input
//       type="number"
//       name="FREIGHT"
//       value={newItem.FREIGHT}
//       onChange={handleItemChange}
//       className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
//     />
//   </label>
// </div>

// <div className="mb-4">
//   <label className="block text-gray-700" htmlFor="NO_OF_VEHICLE">
//     No. of Vehicle:
//     <input
//       type="number"
//       name="NO_OF_VEHICLE"
//       value={newItem.NO_OF_VEHICLE}
//       onChange={handleItemChange}
//       className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
//     />
//   </label>
// </div>

// <div className="mb-4">
//   <label className="block text-gray-700" htmlFor="ADVANCE">
//     Advance:
//     <input
//       type="number"
//       name="ADVANCE"
//       value={newItem.ADVANCE}
//       onChange={handleItemChange}
//       className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
//     />
//   </label>
// </div>

// <div className="mb-4">
//   <label className="block text-gray-700" htmlFor="BALANCE">
//     Balance:
//     <input
//       type="number"
//       name="BALANCE"
//       value={newItem.BALANCE}
//       onChange={handleItemChange}
//       className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
//     />
//   </label>
// </div>

// <div className="mb-4">
//   <label className="block text-gray-700" htmlFor="REMARKS">
//     Remarks:
//     <input
//       type="text"
//       name="REMARKS"
//       value={newItem.REMARKS}
//       onChange={handleItemChange}
//       className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
//     />
//   </label>
// </div>



//           {/* Add more fields here */}
//         </div>
//         <div className="flex justify-end">
//           <button
//             type="button"
//             onClick={handleAddItem}
//             className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mt-4 mr-2"
//           >
//             Add
//           </button>
//           <button
//             type="button"
//             onClick={() => setShowModal(false)}
//             className="btn bg-gray-300 text-gray-700 py-2 px-4 border border-gray-400 hover:bg-gray-400 mt-4"
//           >
//             Close
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// )}


// <div className="container mx-auto px-4 py-8 h-screen bg-[#FFFFFF]">
//         <div className="flex border-b border-gray-200">
//           <button
//             onClick={() => openTab("Total")}
//             className={`${activeTab === "Total"
//                 ? "border-indigo-500 text-indigo-600"
//                 : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//               } flex-1 inline-flex items-center justify-center py-2 border-b-2 font-medium text-xs`}
//           >
//             Total
//           </button>
//           <button
//             onClick={() => openTab("Others")}
//             className={`${activeTab === "Others"
//                 ? "border-indigo-500 text-indigo-600"
//                 : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//               } flex-1 inline-flex items-center justify-center py-2 border-b-2 font-medium text-xs`}
//           >
//             Others
//           </button>
//         </div>

//         {/* Fixed-height container for tab content */}
//         <div className="h-auto overflow-y-auto px-4 py-5 sm:px-6">

//           {activeTab === "Total" && (

// <div className="border p-4 rounded-md">
//   <h3 className="text-lg font-semibold mb-2">Total Values</h3>
//   <div className="grid grid-cols-2 gap-2">
//     <div>
//       <label htmlFor="pkgs" className="text-gray-700">PKGS:</label>
//       <input type="number" id="pkgs" name="pkgs" value={total.pkgs}  className="input w-full border border-black shadow-md" />
//     </div>
//     <div>
//       <label htmlFor="weight" className="text-gray-700">Weight:</label>
//       <input type="number" id="weight" name="weight" value={total.weight} className="input w-full border border-black shadow-md" />
//     </div>
//     <div>
//       <label htmlFor="freight" className="text-gray-700">Freight:</label>
//       <input type="number" id="freight" name="freight" value={total.freight}  className="input w-full border border-black shadow-md" />
//     </div>
//     <div>
//       <label htmlFor="advance" className="text-gray-700">Advance:</label>
//       <input type="number" id="advance" name="advance" value={total.advance}  className="input w-full border border-black shadow-md" />
//     </div>
//     <div>
//       <label htmlFor="balance" className="text-gray-700">Balance:</label>
//       <input type="number" id="balance" name="balance" value={total.balance}  className="input w-full border border-black shadow-md" />
//     </div>
//     <div>
//       <label htmlFor="noOfVehicle" className="text-gray-700">No. of Vehicles:</label>
//       <input type="number" id="noOfVehicle" name="noOfVehicle" value={total.noOfVehicle}  className="input w-full border border-black shadow-md" />
//     </div>
//     <div>
//       <label htmlFor="status" className="text-gray-700">Status:</label>
//       <input type="text" id="status" name="status" value={total.status}  className="input w-full border border-black shadow-md" />
//     </div>
//     <div>
//       <label htmlFor="approvedComment" className="text-gray-700">Approved Comment:</label>
//       <input type="text" id="approvedComment" name="approvedComment" value={total.approvedComment}  className="input w-full border border-black shadow-md" />
//     </div>
//     <div>
//       <label htmlFor="remark" className="text-gray-700">Remark:</label>
//       <input type="text" id="remark" name="remark" value={total.remark}  className="input w-full border border-black shadow-md" />
//     </div>
//   </div>
// </div>


//           )}
//           {activeTab === "Others" && (
//             <div className="h-auto overflow-y-auto px-4 py-5 sm:px-6">
//               <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Others</h3>
//               <p>This is the content of others tab.</p>
//               {/* Add more content as needed */}
//             </div>
//           )}
//         </div>
//       </div>










//         <div className='flex gap-2'>
//           <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">Submit</button>
//           <button
//             type="button"
//             onClick={() => setFormData({
//               indentNo: '',
//               date: '',
//               customer: '',
//               balance: '',
//               orderNo: '',
//               orderDate: '',
//               orderMode: '',
//               serviceMode: '',
//               rfq: '',
//               orderType: '',
//               expectedDate: '',
//               employee: '',
//               source: '',
//               destination: ''
//             })}
//             className="btn bg-gray-500 text-white py-2 px-4 border border-black hover:bg-gray-600 mb-4"
//           >
//             Discard
//           </button>
//           <div>{responseMessage}</div>
//         </div>







//       </form>
//       {/* Display response message */}




//     </div>
//   );
// }

// export default Indent;


