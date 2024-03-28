import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Pagination } from 'react-bootstrap';

const Students = () => {
  
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postParPage, setPostParPage] = useState(12);

  useEffect(() => {
    axios
      .get("http://localhost:3000/students")
      .then((res) => {
        setData(res.data);
        setRecords(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const lastPostIndex = currentPage * postParPage;
  const fristPostIndex  = lastPostIndex - postParPage;
  const currentPosts = records.slice(fristPostIndex, lastPostIndex)
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


  const editProduct = (id) => {
    navegation(`/edit/${id}`);
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

        <Link className="btn btn-success" to="add">
          Add
        </Link>
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
                <td className="border">{i + 1}</td>
                <td className="border">{el.name}</td>
                <td className="border">{el.lastName}</td>
                <td className="border">{el.group}</td>
                <td className="border">{el.doesWork ? "✅" : "❌"}</td>
                <td className="border  d-flex gap-2">
                  <Link to={"edit"} className="btn btn-primary w-50">
                    <FaEdit />
                  </Link>
                  <Link
                    className="btn btn-danger w-50">
                    <MdDelete />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination/>
    </div>
  );
};

export default Students;
