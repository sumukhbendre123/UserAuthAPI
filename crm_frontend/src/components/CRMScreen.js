import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import basicAxios from '../utils/basicAxios';

const CRMScreen = ({ customerId }) => {
  const [customer, setCustomer] = useState(null);
  const [communications, setCommunications] = useState([]);
  const [newCommunication, setNewCommunication] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCustomerAndCommunications = async () => {
      try {
        const [customerResponse, communicationsResponse] = await Promise.all([
          basicAxios.get(`/customers/${customerId}/`),
          basicAxios.get(`/communications/?customer=${customerId}`),
        ]);
        setCustomer(customerResponse.data);
        setCommunications(communicationsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCustomerAndCommunications();
  }, [customerId, user]);

  const handleNewCommunicationChange = (e) => {
    setNewCommunication(e.target.value);
  };

  const handleAddCommunication = async () => {
    try {
      const response = await basicAxios.post('/communications/', {
        customer: customerId,
        conversation: newCommunication,
        sender: user.id,
      });
      setCommunications([...communications, response.data]);
      setNewCommunication('');
    } catch (error) {
      console.error('Error adding communication:', error);
    }
  };

  const handleSendEmail = async () => {
    try {
      const emailSubject = `CRM Communication: ${customer.name}`;
      const emailBody = `Dear ${customer.name},\n\n${newCommunication}\n\nBest regards,\n${user.username}`;
      const emailData = {
        subject: emailSubject,
        body: emailBody,
        to: customer.email,
      };
      await basicAxios.post('/send-email/', emailData);
      alert('Email sent successfully!');
      setNewCommunication('');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">CRM Screen</h2>
      {customer ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">
            Customer: {customer.name} ({customer.email})
          </h3>
          <h3 className="text-xl font-bold mb-4">Communication History</h3>
          {communications.map((communication) => (
            <div key={communication.id} className="bg-gray-100 p-4 rounded-md mb-4">
              <p className="text-gray-800">{communication.conversation}</p>
              <p className="text-gray-600 text-sm">
                {new Date(communication.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Add New Communication</h3>
            <textarea
              className="border border-gray-300 rounded-md p-2 w-full mb-4"
              placeholder="Enter communication details"
              value={newCommunication}
              onChange={handleNewCommunicationChange}
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleAddCommunication}
              >
                Add Communication
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSendEmail}
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          <p>Loading customer data...</p>
        </div>
      )}
    </div>
  );
};

export default CRMScreen;