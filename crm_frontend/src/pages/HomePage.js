import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import basicAxios from "../utils/basicAxios";
import CRMScreen from "../components/CRMScreen";

const HomePage = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await basicAxios.get("/customers/");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, [user]);

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h2>
      <div className="flex">
        <div className="w-1/4 bg-white shadow-md rounded-lg p-6 mr-4">
          <h3 className="text-xl font-bold mb-4">Customers</h3>
          {customers.map((customer) => (
            <div
              key={customer.id}
              className={`bg-gray-100 p-4 rounded-md mb-2 cursor-pointer ${
                selectedCustomer?.id === customer.id ? "bg-blue-100" : ""
              }`}
              onClick={() => handleCustomerSelect(customer)}
            >
              {customer.name}
            </div>
          ))}
        </div>
        <div className="flex-1">
          {selectedCustomer ? (
            <CRMScreen customerId={selectedCustomer.id} />
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6">
              <p>Select a customer to view their CRM screen.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
