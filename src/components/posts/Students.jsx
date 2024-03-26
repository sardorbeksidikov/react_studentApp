import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Students.scss";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Button, Modal } from "react-bootstrap";

const Students = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/students")
      .then((res) => {
        setData(res.data);
        setRecords(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const Filter = (event) => {
   setRecords(
     data.filter(
       (el) =>
         el.name.toLowerCase().includes(event.target.value) ||
         el.lastName.toLowerCase().includes(event.target.value) ||
         el.group.toLowerCase().includes(event.target.value)
     )
   );
    
  };
  const Sort = (event) => {
   setRecords(
     data.filter(
       (el) =>
         el.group.toLowerCase().includes(event.target.value) === el.group
         
     )
   );
    
  };
  return (
    <div className="container mt-5">
      <div className="input-group w-100">
        <input
          type="text"
          id="search"
          placeholder="Search"
          className="form-control w-75"
          onChange={Filter}
        />
        <button className="btn btn-success w-auto" onClick={handleShow}>
          Add
        </button>
      </div>
      <table className="table mt-5 text-center">
        <thead>
          <tr className="border">
            <th className="border" scope="col">
              Id
            </th>
            <th className="border" scope="col">
              FristName
            </th>
            <th className="border" scope="col">
              LastName
            </th>
            <th className="border" scope="col">
              Group
            </th>
            <th className="border" scope="col">
              DoesWork
            </th>
            <th className="border" scope="col">
              Edit/Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {records.map((el, i) => {
            return (
              <tr scope="row" key={i}>
                <td className="border">{el.id}</td>
                <td className="border">{el.name}</td>
                <td className="border">{el.lastName}</td>
                <td className="border">{el.group}</td>
                <td className="border">{el.doesWork ? "✅" : "❌"}</td>
                <td className="border  d-flex gap-2">
                  <button className="btn btn-primary w-50">
                    <FaEdit />
                  </button>
                  <button className="btn btn-danger w-50">
                    <MdDelete />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="fristname" className="form-label">
              FristName
            </label>
            <input type="text" id="fristname" className="form-control" />
            <label htmlFor="lastname" className="form-label">
              LastName
            </label>
            <input type="text" id="lastname" className="form-control" />
            <select
              name="filter"
              id="filter"
              className="form-select mt-3 w-auto">
              <option value="All">All</option>
              <option value="N45">N45</option>
              <option value="N208">N208</option>
              <option value="N210">N210</option>
              <option value="N11">N11</option>
            </select>
            <label class="form-check-label mt-3 d-flex gap-2" for="doeswork">
              <input
                type="checkbox"
                class="form-check-input"
                value="doeswork"
                id="doeswork"
              />
              DoesWork
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Students;
