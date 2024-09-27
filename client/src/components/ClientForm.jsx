import React, { useState, useEffect } from "react";
import axios from "axios";
import endpoint from "../../endpoints";

export default function ClientForm({ client, onClose }) {
  const [clientID, setClientID] = useState("");
  const [clientName, setClientName] = useState("");
  const [currency, setCurrency] = useState("");
  const [bu, setBU] = useState("");
  const [location, setLocation] = useState("");
  const [billingMethod, setBillingMethod] = useState("");
  const [email_id, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [clients, setClients] = useState([]);
  const [locationToCurrency, setLocationToCurrency] = useState({});
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (client) {
      setClientID(client.client_id || "");
      setClientName(client.client_name || "");
      setCurrency(client.currency || "");
      setBU(client.bu || "");
      setBillingMethod(client.billing_method || "");
      setEmail(client.email_id || "");
      setFirstName(client.first_name || "");
      setLastName(client.last_name || "");
      setLocation(client.location || "");
    }
    console.log(client)
  }, [client]);

  useEffect(() => {
    fetchClientData();
    fetchLocationToCurrency();
  }, []);

  useEffect(() => {
    if (location && locationToCurrency[location]) {
      setCurrency(locationToCurrency[location]);
    }
  }, [location, locationToCurrency]);

  const fetchClientData = async () => {
    try {
      const response = await fetch(
        "https://chic-enthusiasm-production.up.railway.app/client"
      );
      if (response.ok) {
        const data = await response.json();
        setClients(data);
        if (data.length > 0 && !client) {
          const latestClientID = getLatestClientID(data);
          generateClientID(latestClientID);
        } else if (client) {
          setClientID(client.client_id);
        } else {
          generateClientID(0);
        }
      } else {
        console.error("Failed to fetch client data");
      }
    } catch (error) {
      console.error("Error fetching client data:", error);
    }
  };

  // Function to extract the highest client ID
  const getLatestClientID = (clients) => {
    const ids = clients.map((client) =>
      parseInt(client.client_id.replace("CL", ""), 10)
    );
    return Math.max(...ids);
  };

  // Function to generate the new client ID
  const generateClientID = (latestID) => {
    const newID = latestID + 1;
    const paddedID = String(newID).padStart(3, "0");
    setClientID(`CL${paddedID}`);
  };

  const fetchLocationToCurrency = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const data = response.data;
      const mapping = {};
      const locationList = data.map((country) => ({
        name: country.name.common,
        currency: country.currencies ? Object.keys(country.currencies)[0] : "",
      }));
      locationList.forEach((country) => {
        mapping[country.name] = country.currency;
      });
      setLocationToCurrency(mapping);
      setLocations(locationList);
    } catch (error) {
      console.error("Error fetching location to currency data:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const clientData = {
      client_id: clientID,
      client_name: clientName,
      currency,
      bu,
      location,
      billing_method: billingMethod,
      email_id,
      first_name: firstName,
      last_name: lastName,
    };
    console.log(clientID)
    try {
      const response = client
        ? await fetch(
            `https://chic-enthusiasm-production.up.railway.app/client/${clientID}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(clientData),
            }
          )
        : await fetch(
            "https://chic-enthusiasm-production.up.railway.app/client",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(clientData),
            }
          );

      if (response.ok) {
        alert("Client saved successfully!");
        onClose();
      } else {
        const errorMessage = await response.text();
        alert("Failed to save client: " + errorMessage);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving the client.");
    }
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className=" p-4 border rounded shadow-md bg-white"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Client ID:
          </label>
          <input
            type="text"
            value={clientID}
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Client Name:
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            First Name:
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Last Name:
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email-ID:
          </label>
          <input
            type="email"
            value={email_id}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Business Unit:
          </label>
          <select
            value={bu}
            onChange={(e) => setBU(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="">Select</option>
            <option value="ES">ES</option>
            <option value="Sales">Sales</option>
            <option value="Procurement">Procurement</option>
            <option value="Management">Management</option>
            <option value="GPE">GPE</option>
            <option value="STG - HO">STG - HO</option>
            <option value="Marketing">Marketing</option>
            <option value="ITKM - STG">ITKM - STG</option>
            <option value="GTSS">GTSS</option>
            <option value="Finance">Finance</option>
            <option value="Administration">Administration</option>
            <option value="E360">E360</option>
            <option value="Digital Practice">Digital Practice</option>
            <option value="Corporate - Quality">Corporate - Quality</option>
            <option value="HR">HR</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Location:
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="">Select</option>
            {locations.map((loc, index) => (
              <option key={index} value={loc.name}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Currency:
          </label>
          <input
            type="text"
            value={currency}
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Billing Method:
          </label>
          <select
            value={billingMethod}
            onChange={(e) => setBillingMethod(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="">Select</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
