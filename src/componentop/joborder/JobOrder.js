
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useNavigate } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';

const JobOrder = () => {
  const navigate = useNavigate();
  const [jobOrder, setJobOrder] = useState({
    jobOrder_no: '',
    indentNo: '',
    customer: '',
    customerGSTIN: '',
    customerAddress: '',
    orderNo: '',
    orderDate: '',
    orderMode: '',
    serviceMode: '',
    expectedDate: '',
    employee: '',
    consignor: '',
    consignorGSTIN: '',
    consignorAddress: '',
    consignee: '',
    consigneeGSTIN: '',
    consigneeAddress: '',
    from: '',
    to: '',
    weight: '',
    quantumrate: '',
    effectiverate: '',
    cost: ''
  });

  const [fromOptions, setFromOptions] = useState([]);
  const [toOptions, setToOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [indentItems, setIndentItems] = useState([]);
  const [consignorData, setConsignorData] = useState([]);
  const [consigneeData, setConsigneeData] = useState([]);

  const fetchIndentDetails = async (indentNo) => {
    try {
      const response = await axios.get(`http://localhost:5000/getsingleindentdetails/${indentNo}`);
      const indent = response.data;

      setJobOrder((prevOrder) => ({
        ...prevOrder,
        customer: indent.customer,
        customerGSTIN: indent.customerGSTIN,
        customerAddress: indent.customerAddress,
        orderNo: indent.orderNo,
        orderDate: indent.orderDate,
        orderMode: indent.orderMode,
        serviceMode: indent.serviceMode,
        expectedDate: indent.expectedDate,
        employee: indent.employee,
        from: '',
        to: '',
        weight: '',
        quantumrate: '',
        effectiverate: '',
        cost: ''
      }));

      setIndentItems(indent.additem);

      const uniqueFromOptions = [...new Set(indent.additem.map((item) => item.from))];
      setFromOptions(uniqueFromOptions);

      const uniqueToOptions = [...new Set(indent.additem.map((item) => item.to))];
      setToOptions(uniqueToOptions);

      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching indent details', error);
      setErrorMessage('Indent not found');
    }
  };

  const fetchFromToDetails = async (from, to) => {
    try {
      const selectedItem = indentItems.find(item => item.from === from && item.to === to);
      if (selectedItem) {
        setJobOrder((prevOrder) => ({
          ...prevOrder,
          weight: selectedItem.WEIGHT || '',
          quantumrate: selectedItem.QUANTUMRATE || '',
          effectiverate: selectedItem.EFFECTIVERATE || '',
          cost: selectedItem.COST || ''
        }));
        setErrorMessage('');
      } else {
        setErrorMessage('Selected route not found in indent details');
      }
    } catch (error) {
      console.error('Error fetching from-to details', error);
      setErrorMessage('Error fetching from-to details');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value
    }));

    if (name === 'from') {
      const availableToOptions = indentItems.filter(item => item.from === value).map(item => item.to);
      setToOptions([...new Set(availableToOptions)]);
      setJobOrder((prevOrder) => ({
        ...prevOrder,
        to: '',
        weight: '',
        quantumrate: '',
        effectiverate: '',
        cost: ''
      }));
    }

    if (name === 'to') {
      const { from } = jobOrder;
      if (from && value) {
        fetchFromToDetails(from, value);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/createJobOrder', jobOrder);
      alert('Job order created successfully!');
      setJobOrder({
        jobOrder_no: '',
        indentNo: '',
        customer: '',
        orderNo: '',
        orderDate: '',
        orderMode: '',
        serviceMode: '',
        expectedDate: '',
        employee: '',
        consignor: '',
        consignee: '',
        from: '',
        to: '',
        weight: '',
        quantumrate: '',
        effectiverate: '',
        cost: ''
      });
    } catch (error) {
      console.error('Error creating job order', error);
      setErrorMessage('Error creating job order');
    }

    
  };

  useEffect(() => {
    const fetchConsignorSuggestions = async () => {
      try {
        if (jobOrder.consignor) {
          const consignorResponse = await axios.get('http://localhost:5000/getcustomer2', {
            params: { name: jobOrder.consignor }
          });
          setConsignorData(consignorResponse.data);
        } else {
          setConsignorData([]);
        }
      } catch (error) {
        console.error('Error fetching consignor suggestions:', error);
      }
    };

    fetchConsignorSuggestions();
  }, [jobOrder.consignor]);

  useEffect(() => {
    const fetchConsigneeSuggestions = async () => {
      try {
        if (jobOrder.consignee) {
          const consigneeResponse = await axios.get('http://localhost:5000/getcustomer2', {
            params: { name: jobOrder.consignee }
          });
          setConsigneeData(consigneeResponse.data);
        } else {
          setConsigneeData([]);
        }
      } catch (error) {
        console.error('Error fetching consignee suggestions:', error);
      }
    };

    fetchConsigneeSuggestions();
  }, [jobOrder.consignee]);

  const handleListClick = () => {
    navigate('/protected/componentop/sidebarop/Sidebarop/ordermanagement/viewjoborders');
  };

  return (
    <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
      <h1 className="text-3xl font-bold mb-4 text-indigo-800">Create Job Order</h1>
      <form onSubmit={handleSubmit}>
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
            className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            List view
          </button>
        </div>
        <div className="space-y-4 bg-white p-4 rounded-lg shadow-lg">
        <div className='sm:flex sm:flex-wrap gap-4'>
          <div className="mb-4">
            <label htmlFor="jobOrder_no" className="block text-sm font-medium text-gray-700">Job Order No:</label>
            <input
              type="text"
              id="jobOrder_no"
              name="jobOrder_no"
              value={jobOrder.jobOrder_no}
              onChange={handleChange}
              required
              className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="indentNo" className="block text-sm font-medium text-gray-700">Indent No:</label>
            <input
              type="text"
              id="indentNo"
              name="indentNo"
              value={jobOrder.indentNo}
              onChange={handleChange}
              onBlur={() => fetchIndentDetails(jobOrder.indentNo)}
              required
              className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Customer:</label>
            <input type="text" id="customer" value={jobOrder.customer} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="customerGSTIN" className="block text-sm font-medium text-gray-700">customerGSTIN:</label>
            <input type="text" id="customerGSTIN" value={jobOrder.customerGSTIN} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700">customerAddress:</label>
            <input type="text" id="customerAddress" value={jobOrder.customerAddress} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="orderNo" className="block text-sm font-medium text-gray-700">Order No:</label>
            <input type="text" id="orderNo" value={jobOrder.orderNo} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700">Order Date:</label>
            <input type="text" id="orderDate" value={jobOrder.orderDate} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="orderMode" className="block text-sm font-medium text-gray-700">Order Mode:</label>
            <input type="text" id="orderMode" value={jobOrder.orderMode} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="serviceMode" className="block text-sm font-medium text-gray-700">Service Mode:</label>
            <input type="text" id="serviceMode" value={jobOrder.serviceMode} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="expectedDate" className="block text-sm font-medium text-gray-700">Expected Date:</label>
            <input
              type="date"
              id="expectedDate"
              name="expectedDate"
              value={jobOrder.expectedDate}
              onChange={handleChange}
              required
              className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="employee" className="block text-sm font-medium text-gray-700">Employee:</label>
            <input type="text" id="employee" value={jobOrder.employee} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="from" className="block text-sm font-medium text-gray-700">From:</label>
            <select
              id="from"
              name="from"
              value={jobOrder.from}
              onChange={handleChange}
              required
              className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">Select Source</option>
              {fromOptions.map((from, index) => (
                <option key={index} value={from}>
                  {from}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="to" className="block text-sm font-medium text-gray-700">To:</label>
            <select
              id="to"
              name="to"
              value={jobOrder.to}
              onChange={handleChange}
              required
              className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">Select Destination</option>
              {toOptions.map((to, index) => (
                <option key={index} value={to}>
                  {to}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="consignor" className="block text-sm font-medium text-gray-700">Consignor:</label>
            <input
              type="text"
              id="consignor"
              name="consignor"
              value={jobOrder.consignor}
              onChange={handleChange}
              list="consignorSuggestions"
              className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            <datalist id="consignorSuggestions">
              {consignorData.map((customer) => (
                <option key={customer._id} value={customer.name} />
              ))}
            </datalist>
          </div>



          <div className="mb-4">
            <label htmlFor="consignee" className="block text-sm font-medium text-gray-700">Consignee:</label>
            <input
              type="text"
              id="consignee"
              name="consignee"
              value={jobOrder.consignee}
              onChange={handleChange}
              list="consigneeSuggestions"
              className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            <datalist id="consigneeSuggestions">
              {consigneeData.map((customer) => (
                <option key={customer._id} value={customer.name} />
              ))}
            </datalist>
          </div>
        </div>
        </div>
        <Tabs className="bg-white mt-4 rounded-lg shadow-lg">
          <TabList className="flex flex-wrap border-b border-gray-200 bg-indigo-100 rounded-t-lg">
            <Tab
              className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto"
              onClick={() => fetchFromToDetails(jobOrder.from, jobOrder.to)}
            >
              VIEW ITEMS
            </Tab>
          </TabList>
          <TabPanel>
            <div className="mt-4">
              <h3 className="text-lg font-semibold p-2">VIEW ITEMS</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight:</label>
                  <input type="text" id="weight" value={jobOrder.weight} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                  <label htmlFor="quantumrate" className="block text-sm font-medium text-gray-700">Quantumrate:</label>
                  <input type="text" id="quantumrate" value={jobOrder.quantumrate} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                  <label htmlFor="effectiverate" className="block text-sm font-medium text-gray-700">Effective Rate:</label>
                  <input type="text" id="effectiverate" value={jobOrder.effectiverate} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                  <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Cost:</label>
                  <input type="text" id="cost" value={jobOrder.cost} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
              </div>
            </div>
          </TabPanel>
        </Tabs>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default JobOrder;
