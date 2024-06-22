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
    from: '',
    to: '',
    vehicletype: '',
    DIMENSIONS: '',
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
    let updatedItem = { ...newItem, [name]: value };

    // Automatically set dimensions and quantum rate based on selected vehicle type
    if (name === 'vehicletype') {
      switch (value) {
        case 'TRUCK':
          updatedItem = { ...updatedItem, DIMENSIONS: '0x0x0' };

          break;
        case 'TROLLEY':
          updatedItem = { ...updatedItem, DIMENSIONS: '0x0x0' };

          break;
        case 'CONTAINER':
          updatedItem = { ...updatedItem, DIMENSIONS: '0x0x0' };

          break;
        case 'TANKER':
          updatedItem = { ...updatedItem, DIMENSIONS: '0x0x0' };

          break;
        default:
          updatedItem = { ...updatedItem, DIMENSIONS: '' };

      }
    }

    setNewItem({ ...updatedItem });
  };

  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem({
      from: '',
      to: '',
      vehicletype: '',
      DIMENSIONS: '',
      WEIGHT: 0,
      QUANTUMRATE: 0,
      EFFECTIVERATE: 0,
      COST: 0,
      REMARKS: ''
    });
    setShowModal(false);
  };

  const [submitted, setSubmitted] = useState(false);
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
      if (!response.ok) {
        throw new Error('Failed to create registration');
    }
    console.log("response", response)
    const data = await response.json();
    console.log('Registration created:', data);
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

  const vehicletype = [
    'TRUCK', 'TROLLEY', 'CONTAINER', 'TANKER', 'OTHER'
  ];

  return (
    <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">

          
        <h1 className="text-3xl font-bold mb-4 text-indigo-800">Indent/Create</h1>
   
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
        
      <div className="space-y-4 bg-white p-4 rounded-lg shadow-lg">
        <div className='sm:flex sm:flex-wrap gap-4'>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="indentNo">Indent Number</label>
            <input type="text" id="indentNo" name="indentNo" value={formData.indentNo} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="date">Date</label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Customer</label>
            <input
              type="text"
              id="customer"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              list="customer1Suggestions"
              className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            <datalist id="customer1Suggestions">
              {customer.map((customer1) => (
                <option key={customer1._id} value={customer1.name} />
              ))}
            </datalist>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="orderNo">Order No.</label>
            <input type="text" id="orderNo" name="orderNo" value={formData.orderNo} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="orderDate">Order Date</label>
            <input type="date" id="orderDate" name="orderDate" value={formData.orderDate} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="orderMode">Order Mode</label>
            <select id="orderMode" name="orderMode" value={formData.orderMode} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
              <option value="">Select Order Mode</option>
              <option value="MAIL">Mail</option>
              <option value="PHONE">Phone</option>
              <option value="IN_PERSON">In Person</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="serviceMode">Service Mode</label>
            <select id="serviceMode" name="serviceMode" value={formData.serviceMode} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
              <option value="">Select Service Mode</option>
              <option value="AIR">Air</option>
              <option value="SEA">Sea</option>
              <option value="LAND">Land</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="rfq">RFQ</label>
            <input type="text" id="rfq" name="rfq" value={formData.rfq} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="expectedDate">Expected Date</label>
            <input type="date" id="expectedDate" name="expectedDate" value={formData.expectedDate} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="employee">Employee</label>
            <input type="text" id="employee" name="employee" value={formData.employee} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
        </div>
        </div>

        <div className="bg-[#FFFFFF] p-4 mt-4 rounded-lg shadow-lg">
      <div className="mt-6 mb-4">
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Add Item
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2">FROM</th>
              <th className="border border-black px-4 py-2">TO</th>
              <th className="border border-black px-4 py-2">VEHICLE TYPE</th>
              <th className="border border-black px-4 py-2">DIMENSIONS</th>
              <th className="border border-black px-4 py-2">WEIGHT(KG)</th>
              <th className="border border-black px-4 py-2">QUANTUMRATE</th>
              <th className="border border-black px-4 py-2">EFFECTIVE RATE</th>
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
      </div>

      <Tabs className="bg-white mt-4 rounded-lg shadow-lg">
        <TabList className="flex flex-wrap border-b border-gray-200 bg-indigo-100 rounded-t-lg">
          <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">TOTAL</Tab>
          <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">OTHER</Tab>
        </TabList>

        <TabPanel>
          <div className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 p-2">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="totalWeight">Total WEIGHT</label>
                <input type="number" id="totalWeight" value={formData.total.weight} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="totalquantumrate">Total Quantumrate</label>
                <input type="number" id="totalquantumrate" value={formData.total.quantumrate} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="totaleffectiverate">Total Effective Rate</label>
                <input type="number" id="totaleffectiverate" value={formData.total.effectiverate} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="totalcost">Total Cost</label>
                <input type="number" id="totalcost" value={formData.total.cost} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="status">Status</label>
                <select id="status" value={formData.total.status} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
                  <option value="Open">Open</option>
                  <option value="Close">Close</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="approvedComment">Approved Comment</label>
                <input type="text" id="approvedComment" value={formData.total.approvedComment} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700" htmlFor="remark">Remark</label>
                <input type="text" id="remark" value={formData.total.remark} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
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
                    className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
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
                    className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  <datalist id="consignorSuggestions">
                    {consigneeData.map((customer2) => (
                      <option key={customer2._id} value={customer2.name} />
                    ))}
                  </datalist>
                </div>

                <div className="mb-4">
                  <label htmlFor="other.remark" className="block text-sm font-medium text-gray-700">remark</label>
                  <input type="text" id="other.remark" name="other.remark" value={formData.other.remark} onChange={handleOtherChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>

              </div>
        </TabPanel>
      </Tabs>
    </div>

    {showModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 overflow-y-auto">
    <div className="bg-white p-4 rounded-lg shadow-lg w-1/2">
      <h2 className="text-xl font-bold mb-4">Add Item</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="text-sm mb-1" htmlFor="vehicletype">Vehicle Type</label>
          <select
            id="vehicletype"
            name="vehicletype"
            value={newItem.vehicletype}
            onChange={handleItemChange}
            required
            className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Select</option>
            {vehicletype.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="text-sm mb-1" htmlFor="from">From</label>
          <input
            type="text"
            id="from"
            name="from"
            value={newItem.from}
            onChange={handleItemChange}
            required
            className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm mb-1" htmlFor="from">To</label>
          <input
            type="text"
            id="to"
            name="to"
            value={newItem.to}
            onChange={handleItemChange}
            required
            className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4 col-span-2">
          <label className="text-sm mb-1" htmlFor="DIMENSIONS">Dimensions</label>
          <div className="flex">
            <span className='mt-2'>LWH:</span>
            {newItem.DIMENSIONS.split('x').map((dimension, index) => (
              <input
                key={index}
                type="text"
                name={`DIMENSIONS_${index}`}
                value={dimension}
                onChange={(e) => {
                  const { value } = e.target;
                  const dimensions = newItem.DIMENSIONS.split('x');
                  dimensions[index] = value;
                  const updatedDimensions = dimensions.join('x');
                  const updatedItem = { ...newItem, DIMENSIONS: updatedDimensions };
                  setNewItem(updatedItem);
                }}
                required
                className="input flex-1 border border-gray-300 rounded-md shadow-sm p-2 mr-2"
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm mb-1" htmlFor="WEIGHT">Weight(kg)</label>
          <input
            type="number"
            id="WEIGHT"
            name="WEIGHT"
            value={newItem.WEIGHT}
            onChange={handleItemChange}
            required
            className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm mb-1" htmlFor="QUANTUMRATE">Quantum Rate</label>
          <input
            type="number"
            id="QUANTUMRATE"
            name="QUANTUMRATE"
            value={newItem.QUANTUMRATE}
            onChange={handleItemChange}
            className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm mb-1" htmlFor="EFFECTIVERATE">Effective Rate</label>
          <input
            type="number"
            id="EFFECTIVERATE"
            name="EFFECTIVERATE"
            value={newItem.EFFECTIVERATE}
            onChange={handleItemChange}
            className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label className="text-sm mb-1" htmlFor="COST">RATE</label>
          <input
            type="number"
            id="COST"
            name="COST"
            value={newItem.COST}
            onChange={handleItemChange}
            className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4 col-span-2">
          <label className="text-sm mb-1" htmlFor="REMARKS">Remarks</label>
          <input
            type="text"
            id="REMARKS"
            name="REMARKS"
            value={newItem.REMARKS}
            onChange={handleItemChange}
            className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
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
//     orderNo: '',
//     orderDate: '',
//     orderMode: '',
//     serviceMode: '',
//     rfq: '',
//     expectedDate: '',
//     employee: '',
//     additem: '',
//     other: {
//       consignor: '',
//       consignee: '',
//       remarks: '',
//     },
//     total: {
//       weight: 0,
//       quantumrate: 0,
//       effectiverate: 0,
//       cost: 0,
//       status: 'open',
//       approvedComment: '',
//       remark: ''
//     }

//   });

//   const [items, setItems] = useState([]);
//   const [responseMessage, setResponseMessage] = useState('');
//   const [customer, setCustomer] = useState([]);
//   const [showModal, setShowModal] = useState(false);
  

//   const [newItem, setNewItem] = useState({
//     from:'',
//     to:'',
//     vehicletype: '',
//     DIMENSIONS:'',
//     WEIGHT: 0,
//     QUANTUMRATE: '',
//     EFFECTIVERATE: 0,
//     COST: 0,
//     REMARKS: ''
//   });



//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes('.')) {
//       const [fieldName, nestedFieldName] = name.split('.');
//       setFormData({
//         ...formData,
//         [fieldName]: {
//           ...formData[fieldName],
//           [nestedFieldName]: value
//         }
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value
//       });
//     }
//   };

//   const handleOtherChange = (e) => {
//     const { name, value } = e.target;
//     const [parentField, fieldName] = name.split('.');
//     setFormData({
//       ...formData,
//       [parentField]: {
//         ...formData[parentField],
//         [fieldName]: value
//       }
//     });
//   };



//   const handleItemChange = (e) => {
//     const { name, value } = e.target;
//     let updatedItem = { ...newItem, [name]: value };
  
//     // Automatically set dimensions and jagdish based on selected vehicle type
//     if (name === 'vehicletype') {
//       switch (value) {
//         case 'TRUCK':
//           updatedItem = { ...updatedItem, DIMENSIONS: '19x7x7', INITIALVOUME: 931 };
//           updatedItem.QUANTUMRATE = 10000; // Auto fill Quantum Rate
//           updatedItem.COST = 10000;
//           break;
//         case 'TROLLEY':
//           updatedItem = { ...updatedItem, DIMENSIONS: '20x8x8', INITIALVOUME: 1280 };
//           updatedItem.QUANTUMRATE = 20000; // Auto fill Quantum Rate
//           updatedItem.COST = 20000;
//           break;
//         case 'CONTAINER':
//           updatedItem = { ...updatedItem, DIMENSIONS: '19x8x7', INITIALVOUME: 1064 };
//           updatedItem.QUANTUMRATE = 18000; // Auto fill Quantum Rate
//           updatedItem.COST = 18000;
//           break;
//         case 'TANKER':
//           updatedItem = { ...updatedItem, DIMENSIONS: '22x8x7', INITIALVOUME: 1232 };
//           updatedItem.QUANTUMRATE = 21000; // Auto fill Quantum Rate
//           updatedItem.COST = 21000;
//           break;
//         default:
//           updatedItem = { ...updatedItem, DIMENSIONS: '', INITIALVOUME: 1 };
//           updatedItem.QUANTUMRATE = 0; // Auto fill Quantum Rate
//       }
//     }
  
//     // Set the updated item state
//     setNewItem(updatedItem);
  
//     // Recalculate the effective rate and cost based on dimensions
//     const dimensions = updatedItem.DIMENSIONS.split('x').map(Number); // Convert strings to numbers
  
//     // Multiply dimensions together to get volume
//     const volume = dimensions.reduce((acc, curr) => acc * curr, 1);
  
//     // Calculate COST
//     const quantumRate = parseFloat(updatedItem.QUANTUMRATE) || 0;
//     let effectiveRate = quantumRate * (volume / updatedItem.INITIALVOUME); // Use actual volume instead of the constant
//     effectiveRate = parseFloat(effectiveRate.toFixed(2));
//     updatedItem.EFFECTIVERATE = effectiveRate;
//     if (effectiveRate < updatedItem.QUANTUMRATE) {
//       effectiveRate = updatedItem.QUANTUMRATE;
     
//     }
  
//     let cost = Math.ceil(effectiveRate);
//     if (cost < updatedItem.QUANTUMRATE) {
//       cost = updatedItem.QUANTUMRATE;
//     }

  
//     updatedItem.COST = cost;
  
//     // Update the newItem state again with the recalculated effective rate and cost
//     setNewItem({ ...updatedItem, EFFECTIVERATE: effectiveRate });
//   };

//   const [submitted, setSubmitted] = useState(false);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/indents', { ...formData, additem: items });
//       setResponseMessage(`Indent created successfully. Indent ID: ${response.data._id}`);
//       setFormData({
//         indentNo: '',
//         date: '',
//         customer: '',
//         orderNo: '',
//         orderDate: '',
//         orderMode: '',
//         serviceMode: '',
//         rfq: '',
//         expectedDate: '',
//         employee: '',
//         additem: '',
//         other: {
//           consignor: '',
//           consignee: '',
//           remarks: '',
//         },

//         total: {
//           weight: 0,
//           quantumrate: 0,
//           effectiverate: 0,
//           cost: 0,
//           status: 'open',
//           approvedComment: '',
//           remark: ''

//         }
//       });
//       if (!response.ok) {
//         throw new Error('Failed to create registration');
//     }
//     console.log("response", response)
//     const data = await response.json();
//     console.log('Registration created:', data);
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


//   const [consignorData, setConsignorData] = useState([]);
//   const [consigneeData, setConsigneeData] = useState([]);

//   useEffect(() => {
//     const fetchConsignorAndConsignee = async () => {
//       try {
//         if (formData.other.consignor) {
//           const consignorResponse = await axios.get('http://localhost:5000/getcustomer2', {
//             params: { name: formData.other.consignor }
//           });
//           setConsignorData(consignorResponse.data);
//         } else {
//           setConsignorData([]);
//         }

//         if (formData.other.consignee) {
//           const consigneeResponse = await axios.get('http://localhost:5000/getcustomer2', {
//             params: { name: formData.other.consignee }
//           });
//           setConsigneeData(consigneeResponse.data);
//         } else {
//           setConsigneeData([]);
//         }
//       } catch (error) {
//         console.error('Error fetching consignor and consignee:', error);
//       }
//     };

//     fetchConsignorAndConsignee();
//   }, [formData.other.consignor, formData.other.consignee]);


//   const handleAddItem = () => {
//     setItems([...items, newItem]);
//     setNewItem({
//       from:'',
//       to:'',
//       vehicletype: '',
//       DIMENSIONS:'',
//       WEIGHT: 0,
//       QUANTUMRATE: 0,
//       EFFECTIVERATE: 0,
//       COST: 0,
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

//   useEffect(() => {
//     calculateTotals();
//   }, [items]);

//   const vehicletype = [
//     'TRUCK','TROLLEY','CONTAINER','TANKER','OTHER' 
//   ];


//   const calculateTotals = () => {
//     let weight = 0;
//     let quantumrate = 0;
//     let cost = 0;
//     let effectiverate = 0;

//     items.forEach(item => {
//       weight += parseInt(item.WEIGHT) || 0;
//       quantumrate += parseInt(item.QUANTUMRATE) || 0;
//       effectiverate += parseInt(item.EFFECTIVERATE) || 0;
//       cost += parseInt(item.COST) || 0;
//     });

//     setFormData(prevState => ({
//       ...prevState,
//       total: {
//         weight,
//         quantumrate,
//         effectiverate,
//         cost

//       }
//     }));
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//          {!submitted ? ( 
//            <>
//         <h1 className="text-3xl font-bold mb-4 text-indigo-800">Indent/Create</h1>
   
//       <form onSubmit={handleSubmit} >

//         <div className="mt-1 mb-4 flex justify-between">
//           <button
//             type="submit"
//             className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Submit
//           </button>
//           <button
//             type="button"
//             onClick={handleListClick}
//             className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600"
//           >
//             List view
//           </button>
//         </div>
        
//       <div className="space-y-4 bg-white p-4 rounded-lg shadow-lg">
//         <div className='sm:flex sm:flex-wrap gap-4'>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700" htmlFor="indentNo">Indent Number</label>
//             <input type="text" id="indentNo" name="indentNo" value={formData.indentNo} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700" htmlFor="date">Date</label>
//             <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Customer</label>
//             <input
//               type="text"
//               id="customer"
//               name="customer"
//               value={formData.customer}
//               onChange={handleChange}
//               list="customer1Suggestions"
//               className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
//             />
//             <datalist id="customer1Suggestions">
//               {customer.map((customer1) => (
//                 <option key={customer1._id} value={customer1.name} />
//               ))}
//             </datalist>
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700" htmlFor="orderNo">Order No.</label>
//             <input type="text" id="orderNo" name="orderNo" value={formData.orderNo} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700" htmlFor="orderDate">Order Date</label>
//             <input type="date" id="orderDate" name="orderDate" value={formData.orderDate} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700" htmlFor="orderMode">Order Mode</label>
//             <select id="orderMode" name="orderMode" value={formData.orderMode} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
//               <option value="">Select Order Mode</option>
//               <option value="MAIL">Mail</option>
//               <option value="PHONE">Phone</option>
//               <option value="IN_PERSON">In Person</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700" htmlFor="serviceMode">Service Mode</label>
//             <select id="serviceMode" name="serviceMode" value={formData.serviceMode} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
//               <option value="">Select Service Mode</option>
//               <option value="AIR">Air</option>
//               <option value="SEA">Sea</option>
//               <option value="LAND">Land</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700" htmlFor="rfq">RFQ</label>
//             <input type="text" id="rfq" name="rfq" value={formData.rfq} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700" htmlFor="expectedDate">Expected Date</label>
//             <input type="date" id="expectedDate" name="expectedDate" value={formData.expectedDate} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700" htmlFor="employee">Employee</label>
//             <input type="text" id="employee" name="employee" value={formData.employee} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//           </div>
//         </div>
//         </div>

//         <div className="bg-[#FFFFFF] p-4 mt-4 rounded-lg shadow-lg">
//       <div className="mt-6 mb-4">
//         <button
//           type="button"
//           onClick={() => setShowModal(true)}
//           className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
//         >
//           Add Item
//         </button>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full">
//           <thead>
//             <tr>
//               <th className="border border-black px-4 py-2">FROM</th>
//               <th className="border border-black px-4 py-2">TO</th>
//               <th className="border border-black px-4 py-2">VEHICLE TYPE</th>
//               <th className="border border-black px-4 py-2">DIMENSIONS</th>
//               <th className="border border-black px-4 py-2">WEIGHT(KG)</th>
//               <th className="border border-black px-4 py-2">QUANTUMRATE</th>
//               <th className="border border-black px-4 py-2">EFFECTIVE RATE</th>
//               <th className="border border-black px-4 py-2">COST</th>
//               <th className="border border-black px-4 py-2">REMARK</th>
//               <th className="border border-black px-4 py-2">ACTIONS</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((item, index) => (
//               <tr key={index}>
//                 <td className="border border-black px-4 py-2">{item.from}</td>
//                 <td className="border border-black px-4 py-2">{item.to}</td>
//                 <td className="border border-black px-4 py-2">{item.vehicletype}</td>
//                 <td className="border border-black px-4 py-2">{item.DIMENSIONS}</td>
//                 <td className="border border-black px-4 py-2">{item.WEIGHT}</td>
//                 <td className="border border-black px-4 py-2">{item.QUANTUMRATE}</td>
//                 <td className="border border-black px-4 py-2">{item.EFFECTIVERATE}</td>
//                 <td className="border border-black px-4 py-2">{item.COST}</td>
//                 <td className="border border-black px-4 py-2">{item.REMARKS}</td>
//                 <td className="border border-black px-4 py-2">
//                   <button type="button" onClick={() => handleEditItem(index)} className="text-blue-600 hover:text-blue-900">
//                     <RiEdit2Line />
//                   </button>
//                   <button type="button" onClick={() => handleDeleteItem(index)} className="text-red-600 hover:text-red-900 ml-2">
//                     <RiDeleteBinLine />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <Tabs className="bg-white mt-4 rounded-lg shadow-lg">
//         <TabList className="flex flex-wrap border-b border-gray-200 bg-indigo-100 rounded-t-lg">
//           <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">TOTAL</Tab>
//           <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">OTHER</Tab>
//         </TabList>

//         <TabPanel>
//           <div className="mt-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 p-2">
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700" htmlFor="totalWeight">Total WEIGHT</label>
//                 <input type="number" id="totalWeight" value={formData.total.weight} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700" htmlFor="totalquantumrate">Total Quantumrate</label>
//                 <input type="number" id="totalquantumrate" value={formData.total.quantumrate} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700" htmlFor="totaleffectiverate">Total Effective Rate</label>
//                 <input type="number" id="totaleffectiverate" value={formData.total.effectiverate} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700" htmlFor="totalcost">Total Cost</label>
//                 <input type="number" id="totalcost" value={formData.total.cost} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700" htmlFor="status">Status</label>
//                 <select id="status" value={formData.total.status} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
//                   <option value="Open">Open</option>
//                   <option value="Close">Close</option>
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700" htmlFor="approvedComment">Approved Comment</label>
//                 <input type="text" id="approvedComment" value={formData.total.approvedComment} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700" htmlFor="remark">Remark</label>
//                 <input type="text" id="remark" value={formData.total.remark} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//               </div>
//             </div>
//           </div>
//         </TabPanel>
//         <TabPanel>
//         <div className="grid grid-cols-6 gap-6 p-2">
//                 <div className="mb-4">
//                   <label htmlFor="other.consignor" className="text-sm mb-1">consignor</label>
//                   <input
//                     type="text"
//                     id="other.consignor"
//                     name="other.consignor"
//                     value={formData.other.consignor}
//                     onChange={handleChange}
//                     list="consignorSuggestions"
//                     className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
//                   />
//                   <datalist id="consignorSuggestions">
//                     {consignorData.map((customer2) => (
//                       <option key={customer2._id} value={customer2.name} />
//                     ))}
//                   </datalist>
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="other.consignor" className="text-sm mb-1">consignee</label>
//                   <input
//                     type="text"
//                     id="other.consignee"
//                     name="other.consignee"
//                     value={formData.other.consignee}
//                     onChange={handleChange}
//                     list="consignorSuggestions"
//                     className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
//                   />
//                   <datalist id="consignorSuggestions">
//                     {consigneeData.map((customer2) => (
//                       <option key={customer2._id} value={customer2.name} />
//                     ))}
//                   </datalist>
//                 </div>

//                 <div className="mb-4">
//                   <label htmlFor="other.remark" className="block text-sm font-medium text-gray-700">remark</label>
//                   <input type="text" id="other.remark" name="other.remark" value={formData.other.remark} onChange={handleOtherChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                 </div>

//               </div>
//         </TabPanel>
//       </Tabs>
//     </div>

//         {/* <div className="bg-[#FFFFFF] p-2 mt-4 rounded-lg shadow-lg">
//         <div className="mt-6 mb-4">
//         <button
//             type="button"
//             onClick={() => setShowModal(true)}
//             className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
//           >
//             Add Item
//           </button>
//         </div>
//           <table className="table-auto w-full">
//             <thead>
//               <tr>
//                 <th className="border border-black px-4 py-2">FROM</th>
//                 <th className="border border-black px-4 py-2">TO</th>
//                 <th className="border border-black px-4 py-2">VEHICLE TYPE</th>
//                 <th className="border border-black px-4 py-2">DIMENSIONS</th>
//                 <th className="border border-black px-4 py-2">WEIGHT(KG)</th>
//                 <th className="border border-black px-4 py-2">QUANTUMRATE</th>
//                 <th className="border border-black px-4 py-2">EFFECTIVE RATE</th>
//                 <th className="border border-black px-4 py-2">COST</th>
//                 <th className="border border-black px-4 py-2">REMARK</th>
//                 <th className="border border-black px-4 py-2">ACTIONS</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item, index) => (
//                 <tr key={index}>
//                   <td className="border border-black px-4 py-2">{item.from}</td>
//                   <td className="border border-black px-4 py-2">{item.to}</td>
//                   <td className="border border-black px-4 py-2">{item.vehicletype}</td>
//                   <td className="border border-black px-4 py-2">{item.DIMENSIONS}</td>
//                   <td className="border border-black px-4 py-2">{item.WEIGHT}</td>
//                   <td className="border border-black px-4 py-2">{item.QUANTUMRATE}</td>
//                   <td className="border border-black px-4 py-2">{item.EFFECTIVERATE}</td>
//                   <td className="border border-black px-4 py-2">{item.COST}</td>
//                   <td className="border border-black px-4 py-2">{item.REMARKS}</td>
//                   <td className="border border-black px-4 py-2">
//                     <button type="button" onClick={() => handleEditItem(index)} className="text-blue-600 hover:text-blue-900">
//                       <RiEdit2Line />
//                     </button>
//                     <button type="button" onClick={() => handleDeleteItem(index)} className="text-red-600 hover:text-red-900 ml-2">
//                       <RiDeleteBinLine />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <Tabs className="bg-[#FFFFFF] pt-2">
//             <TabList className="flex flex-wrap border-b border-gray-200">
//               <Tab className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto">TOTAL</Tab>
//               <Tab className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto">OTHER</Tab>
//             </TabList>
            
//             <TabPanel>
//               <div className="mt-4">
//                 <h3 className="text-lg font-semibold">Totals</h3>
//                 <div className="grid grid-cols-6 gap-6 p-2">
//                   <div className="mb-4">
//                     <label className="text-sm mb-1" htmlFor="totalWeight">Total WEIGHT</label>
//                     <input type="number" id="totalWeight" value={formData.total.weight} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                   </div>
//                   <div className="mb-4">
//                     <label className="text-sm mb-1" htmlFor="totalquantumrate">Total Quantumrate</label>
//                     <input type="number" id="totalquantumrate" value={formData.total.quantumrate} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                   </div>

//                   <div className="mb-4">
//                     <label className="text-sm mb-1" htmlFor="totaleffectiverate">Total Effective Rate</label>
//                     <input type="number" id="totaleffectiverate" value={formData.total.effectiverate} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2"/>
//                   </div>

//                   <div className="mb-4">
//                     <label className="text-sm mb-1" htmlFor="totalcost">Total Cost</label>
//                     <input type="number" id="totalcost" value={formData.total.cost} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                   </div>
              
//                   <div className="mb-4">
//                     <label className="text-sm mb-1" htmlFor="status">Status</label>
//                     <select id="status" value={formData.total.status} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
//                       <option value="Open">Open</option>
//                       <option value="Close">Close</option>
//                     </select>
//                   </div>
//                   <div className="mb-4">
//                     <label className="text-sm mb-1" htmlFor="approvedComment">Approved Comment</label>
//                     <input type="text" id="approvedComment" value={formData.total.approvedComment} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                   </div>
//                   <div className="mb-4">
//                     <label className="text-sm mb-1" htmlFor="remark">Remark</label>
//                     <input type="text" id="remark" value={formData.total.remark} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                   </div>
//                 </div>
//               </div>
//             </TabPanel>
//             <TabPanel>
//               <div className="grid grid-cols-6 gap-6 p-2">
//                 <div className="mb-4">
//                   <label htmlFor="other.consignor" className="text-sm mb-1">consignor</label>
//                   <input
//                     type="text"
//                     id="other.consignor"
//                     name="other.consignor"
//                     value={formData.other.consignor}
//                     onChange={handleChange}
//                     list="consignorSuggestions"
//                     className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
//                   />
//                   <datalist id="consignorSuggestions">
//                     {consignorData.map((customer2) => (
//                       <option key={customer2._id} value={customer2.name} />
//                     ))}
//                   </datalist>
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="other.consignor" className="text-sm mb-1">consignee</label>
//                   <input
//                     type="text"
//                     id="other.consignee"
//                     name="other.consignee"
//                     value={formData.other.consignee}
//                     onChange={handleChange}
//                     list="consignorSuggestions"
//                     className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
//                   />
//                   <datalist id="consignorSuggestions">
//                     {consigneeData.map((customer2) => (
//                       <option key={customer2._id} value={customer2.name} />
//                     ))}
//                   </datalist>
//                 </div>

//                 <div className="mb-4">
//                   <label htmlFor="other.remark" className="block text-sm font-medium text-gray-700">remark</label>
//                   <input type="text" id="other.remark" name="other.remark" value={formData.other.remark} onChange={handleOtherChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                 </div>

//               </div>
//             </TabPanel>
//           </Tabs>
//         </div> */}

//         {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <h2 className="text-xl font-bold mb-4">Add Item</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="mb-4">
//                 <label className="text-sm mb-1" htmlFor="vehicletype">Vehicle Type</label>
//                 <select id="vehicletype" name="vehicletype" value={newItem.vehicletype} onChange={handleItemChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
//                   <option value="">Select</option>
//                   {vehicletype.map((type, index) => (
//                     <option key={index} value={type}>{type}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="text-sm mb-1" htmlFor="from">From</label>
//                 <input type="text" id="from" name="from" value={newItem.from} onChange={handleItemChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//               </div>
//               <div className="mb-4">
//                 <label className="text-sm mb-1" htmlFor="to">To</label>
//                 <input type="text" id="to" name="to" value={newItem.to} onChange={handleItemChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//               </div>
//                 <div className="mb-4">
//                   <label className="text-sm mb-1" htmlFor="DIMENSIONS">Dimensions</label>
//                   <div className="flex">
//                     <span className='mt-2'>LWH:</span>
//                     {newItem.DIMENSIONS.split('x').map((dimension, index) => (
//                       <input
//                         key={index}
//                         type="text"
//                         name={`DIMENSIONS_${index}`}
//                         value={dimension}
//                         onChange={(e) => {
//                           const { value } = e.target;
//                           const dimensions = newItem.DIMENSIONS.split('x');
//                           dimensions[index] = value;
//                           const updatedDimensions = dimensions.join('x');
//                           const updatedItem = { ...newItem, DIMENSIONS: updatedDimensions };

//                           // Recalculate EFFECTIVERATE based on updated dimensions
//                           const volume = dimensions.reduce((acc, curr) => acc * parseInt(curr, 10), 1);

//                           // Calculate COST
//                           const quantumRate = parseFloat(updatedItem.QUANTUMRATE) || 0;
//                           let effectiveRate = quantumRate * (volume / newItem.INITIALVOUME); // Use actual volume instead of the constant
//                           effectiveRate = parseFloat(effectiveRate.toFixed(2));
//                           if (effectiveRate < updatedItem.QUANTUMRATE) {
//                             effectiveRate = updatedItem.QUANTUMRATE;
//                           }

//                           let cost = Math.ceil(effectiveRate);
//                           if (cost < updatedItem.QUANTUMRATE) {
//                             cost = updatedItem.QUANTUMRATE;
//                           }
//                           updatedItem.EFFECTIVERATE = effectiveRate;
//                           updatedItem.COST = cost;

//                           setNewItem(updatedItem);
//                         }}
//                         required
//                         className="input flex-1 border border-gray-300 rounded-md shadow-sm p-2 mr-2"
//                       />
//                     ))}
//                   </div>
//                 </div>

//               <div className="mb-4">
//                 <label className="text-sm mb-1" htmlFor="WEIGHT">Weight(kg)</label>
//                 <input type="number" id="WEIGHT" name="WEIGHT" value={newItem.WEIGHT} onChange={handleItemChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//               </div>
//               <div className="mb-4">
//                 <label className="text-sm mb-1" htmlFor="QUANTUMRATE">Quantum Rate</label>
//                 <input type="number" id="QUANTUMRATE" name="QUANTUMRATE" value={newItem.QUANTUMRATE} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//               </div>
//                 <div className="mb-4">
//                   <label className="text-sm mb-1" htmlFor="EFFECTIVERATE">Effective Rate</label>
//                   <input type="number" id="EFFECTIVERATE" name="EFFECTIVERATE" value={newItem.EFFECTIVERATE} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                 </div>
//               <div className="mb-4">
//                 <label className="text-sm mb-1" htmlFor="COST">RATE</label>
//                 <input type="number" id="COST" name="COST" value={newItem.COST} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//               </div>
//               <div className="mb-4 col-span-2">
//                 <label className="text-sm mb-1" htmlFor="REMARKS">Remarks</label>
//                 <input type="text" id="REMARKS" name="REMARKS" value={newItem.REMARKS} onChange={handleItemChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//               </div>
//             </div>
//             <div className="mt-4 flex justify-end">
//               <button
//                 type="button"
//                 onClick={handleAddItem}
//                 className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
//               >
//                 Save
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setShowModal(false)}
//                 className="ml-4 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//         {responseMessage && <p className="mt-4">{responseMessage}</p>}
//       </form>
//       </>
//     ) : (
//       <div className="text-center">
//                     <h1 className="text-3xl font-bold mb-4 text-green-600">Registration submitted successfully!</h1>
//                 </div>
//             )}
//     </div>
//   );
// }

// export default Indent;



