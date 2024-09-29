import React, { useState } from "react";
import "./App.css";

function App() {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "General Checkup",
      description: "Routine health checkup",
      price: 160,
    },
    {
      id: 2,
      name: "Dental Cleaning",
      description: "Professional dental cleaning",
      price: 180,
    },
    {
      id: 3,
      name: "Vision Test",
      description: "Comprehensive eye examination",
      price: 230,
    },
    {
      id: 4,
      name: "Cardiology Consultation",
      description: "Heart health consultation",
      price: 200,
    },
    
    {
      id: 6,
      name: "Vaccination",
      description: "Immunization against diseases",
      price: 130,
    },
  ]);

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
  });


  const [editingService, setEditingService] = useState(null);


  const handleInputChange = (e) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };



  const addService = (e) => {
    e.preventDefault();
    if (newService.name && newService.description && newService.price) {
      setServices([
        ...services,
        {
          id: Date.now(),
          name: newService.name,
          description: newService.description,
          price: parseFloat(newService.price),
        },

      ]);
      setNewService({ name: "", description: "", price: "" });
    }
  };

  const deleteService = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };



  const editService = (service) => {
    setEditingService(service);
    setNewService(service);
  };

  const updateService = (e) => {
    e.preventDefault();

const updatedService = {
      ...newService,  
      id: editingService.id,  
      price: parseFloat(newService.price)  
    };

    

    setServices(
      services.map((service) =>
        service.id === editingService.id ? updatedService : service
      )
    );

    setNewService({ name: "", description: "", price: "" });
    setEditingService(null);
  };

  return (
    <div className="App">
      <h1>Healthcare Services</h1>

      <form onSubmit={editingService ? updateService : addService}>
        <input
          type="text"
          name="name"
          placeholder="Service Name"
          value={newService.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Service Description"
          value={newService.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newService.price}
          onChange={handleInputChange}
          required
        />
        <button type="submit">
          {editingService ? "Update Service" : "Add Service"}
        </button>
      </form>

      {services.length === 0 ? (
        <p>No data found</p>
      ) : (

      <table>
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>


        <tbody>


          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.name}</td>
              <td>{service.description}</td>
              <td>Rs.{service.price.toFixed(2)}</td>
              <td>
                <button onClick={() => editService(service)}>
                  Edit
                  </button>

                <button onClick={() => deleteService(service.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
}

export default App;
