import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useNavigate } from 'react-router-dom';

const VehiclePlacement = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vehicle_placement_no: '',
    date: '',
    paymentto: '',
    jobOrder_no: '',
    dimensions: '',
    weight: '',
    quantumrate: '',
    effectiverate: '',
    cost: '',
    from: '',
    to: '',
    vehicleNo: '',
    broker: '',
    owner: '',
    loadType: '',
    ownerPhone: '',
    ownerAddress: '',
    brokerPhone:'',
    brokerAddress:'',
    brokerdetails: {
      name: '',
      Address: '',
      City: '',
      PIN: '',
      State: '',
      Country: '',
      Mobile: '',
      Email: '',
      PAN: '',
      photo: '',
      Remarks: '',
    },
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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

  const handleBrokerdetailChange = (e) => {
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

  const fetchJobOrderDetails = async (jobOrderNo) => {
    try {
      const response = await axios.get(`https://twi-e-logistics.onrender.com/job-orders/${jobOrderNo}`);
      const { from, to, dimensions, weight, quantumrate, effectiverate, cost } = response.data;
      setFormData((prevFormData) => ({
        ...prevFormData,
        dimensions,
        weight,
        quantumrate,
        effectiverate,
        cost,
        from,
        to,
      }));
    } catch (error) {
      console.error('Error fetching job order details:', error);
    }
  };

  const fetchVehicleDetails = async (vehicleNo) => {
    try {
      const response = await axios.get(`https://twi-e-logistics.onrender.com/getvehicle-registrations/${vehicleNo}`);
      const { broker, owner, loadType, ownerPhone, ownerAddress, brokerPhone, brokerAddress } = response.data.data.vehicleRegistration;
      setFormData((prevFormData) => ({
        ...prevFormData,
        broker,
        owner,
        loadType,
        ownerPhone,
        ownerAddress,
        brokerPhone,
        brokerAddress,
      }));
    } catch (error) {
      console.error('Error fetching vehicle details:', error);
    }
  };

  useEffect(() => {
    if (formData.jobOrder_no) {
      fetchJobOrderDetails(formData.jobOrder_no);
    }
  }, [formData.jobOrder_no]);

  useEffect(() => {
    if (formData.vehicleNo) {
      fetchVehicleDetails(formData.vehicleNo);
    }
  }, [formData.vehicleNo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    


    try {
      const response = await axios.post('https://twi-e-logistics.onrender.com/vehicle-placements', formData);
      setMessage('Vehicle Placement created successfully');
      setFormData({
        vehicle_placement_no: '',
        date: '',
        paymentto: '',
        jobOrder_no: '',
        dimensions: '',
        weight: '',
        quantumrate: '',
        effectiverate: '',
        cost: '',
        from: '',
        to: '',
        vehicleNo: '',
        broker: '',
        owner: '',
        loadType: '',
        ownerPhone: '',
        ownerAddress: '',
        brokerPhone:'',
        brokerAddress:'',
        brokerdetails: {
          name: '',
          Address: '',
          City: '',
          PIN: '',
          State: '',
          Country: '',
          Mobile: '',
          Email: '',
          PAN: '',
          photo: '',
          Remarks: '',
        },
      });
    } catch (error) {
      setError('Error creating Vehicle Placement');
      console.error(error.response?.data || error.message);
    }
  };

  const handleListClick = () => {
    navigate('/protected/componentop/sidebarop/Sidebarop/ordermanagement/viewvahicleplacement');
  };

  return (
    <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
      <h2 className="text-3xl font-bold mb-4 text-indigo-800">Create Vehicle Placement</h2>
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
          <div>
            <label className="block text-sm font-medium text-gray-700">Vehicle Placement No:</label>
            <input
              type="text"
              name="vehicle_placement_no"
              value={formData.vehicle_placement_no}
              onChange={handleChange}
              className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Order No:</label>
            <input
              type="text"
              name="jobOrder_no"
              value={formData.jobOrder_no}
              onChange={handleChange}
              className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Dimensions:</label>
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              readOnly
              className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Weight:</label>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              readOnly
              className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantumrate:</label>
            <input
              type="text"
              name="quantumrate"
              value={formData.quantumrate}
              onChange={handleChange}
              readOnly
              className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Effectiverate:</label>
            <input
              type="text"
              name="effectiverate"
              value={formData.effectiverate}
              onChange={handleChange}
              readOnly
              className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cost:</label>
            <input
              type="text"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              readOnly
              className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">From:</label>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">To:</label>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          </div>
        </div>

        <Tabs className="bg-white mt-4 rounded-lg shadow-lg">
          <TabList className="flex flex-wrap border-b border-gray-200 bg-indigo-100 rounded-t-lg">
            <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">
              VEHICLE DETAILS
            </Tab>
            <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">
              BROKER DETAILS
            </Tab>
          </TabList>

          <TabPanel>
            <div className="mt-4 p-2">
              <h3 className="text-lg font-semibold">Vehicle Details</h3>
              <div className="grid grid-cols-6 gap-6 p-2">
                <div className="mb-4">
                  <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">
                    Vehicle No
                  </label>
                  <input
                    type="text"
                    id="vehicleNo"
                    name="vehicleNo"
                    value={formData.vehicleNo}
                    onChange={handleChange}
                    className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>



                <div className="mb-4">
                  <label htmlFor="owner" className="block text-sm font-medium text-gray-700">
                    Transporter
                  </label>
                  <input
                    type="text"
                    id="owner"
                    name="owner"
                    value={formData.owner}
                    onChange={handleChange}
                    className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="ownerPhone" className="block text-sm font-medium text-gray-700">
                  Transporter Phone
                  </label>
                  <input
                    type="text"
                    id="ownerPhone"
                    name="ownerPhone"
                    value={formData.ownerPhone}
                    onChange={handleChange}
                    className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="ownerAddress" className="block text-sm font-medium text-gray-700">
                  Transporter Address
                  </label>
                  <input
                    type="text"
                    id="ownerAddress"
                    name="ownerAddress"
                    value={formData.ownerAddress}
                    onChange={handleChange}
                    className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
                    readOnly
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="owner" className="block text-sm font-medium text-gray-700">
                    loadType
                  </label>
                  <input
                    type="text"
                    id="loadType"
                    name="loadType"
                    value={formData.loadType}
                    onChange={handleChange}
                    className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Payment To:</label>
                  <select
                    name="paymentto"
                    value={formData.paymentto}
                    onChange={handleChange}
                    className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
                  >
                    <option value="">Select an option</option>
                    <option value="BROKER">BROKER</option>
                    <option value="OWNER">OWNER</option>
                  </select>
                </div>

              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-6 gap-6 p-2">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="brokerdetails.name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="brokerdetails.name" name="brokerdetails.name" value={formData.brokerdetails.name} onChange={handleBrokerdetailChange}   className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="brokerdetails.Address" className="block text-sm font-medium text-gray-700">Address</label>
                <input type="text" id="brokerdetails.Address" name="brokerdetails.Address" value={formData.brokerdetails.Address} onChange={handleBrokerdetailChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="brokerdetails.City" className="block text-sm font-medium text-gray-700">City</label>
                <input type="text" id="brokerdetails.City" name="brokerdetails.City" value={formData.brokerdetails.City} onChange={handleBrokerdetailChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2"/>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="brokerdetails.PIN" className="block text-sm font-medium text-gray-700">PIN</label>
                <input type="text" id="brokerdetails.PIN" name="brokerdetails.PIN" value={formData.brokerdetails.PIN} onChange={handleBrokerdetailChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              {/* State */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="brokerdetails.State" className="block text-sm font-medium text-gray-700">State</label>
                <input type="text" id="brokerdetails.State" name="brokerdetails.State" value={formData.brokerdetails.State} onChange={handleBrokerdetailChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              {/* Country */}
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="brokerdetails.Country" className="block text-sm font-medium text-gray-700">Country</label>
                <input type="text" id="brokerdetails.Country" name="brokerdetails.Country" value={formData.brokerdetails.Country} onChange={handleBrokerdetailChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="brokerdetails.Mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
                <input type="text" id="brokerdetails.Mobile" name="brokerdetails.Mobile" value={formData.brokerdetails.Mobile} onChange={handleBrokerdetailChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="brokerdetails.Email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="text" id="brokerdetails.Email" name="brokerdetails.Email" value={formData.brokerdetails.Email} onChange={handleBrokerdetailChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="brokerdetails.PAN" className="block text-sm font-medium text-gray-700">PAN</label>
                <input type="text" id="brokerdetails.PAN" name="brokerdetails.PAN" value={formData.brokerdetails.PAN} onChange={handleBrokerdetailChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2"/>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="brokerdetails.photo" className="block text-sm font-medium text-gray-700">photo</label>
                <input type="text" id="brokerdetails.photo" name="brokerdetails.photo" value={formData.brokerdetails.photo} onChange={handleBrokerdetailChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div className="col-span-6">
                <label htmlFor="brokerdetails.Remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
                <textarea id="brokerdetails.Remarks" name="brokerdetails.Remarks" value={formData.brokerdetails.Remarks} onChange={handleBrokerdetailChange} rows="3" className="input w-full border border-gray-300 rounded-md shadow-sm p-2"/>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </form>
    </div>
  );
};

export default VehiclePlacement;
