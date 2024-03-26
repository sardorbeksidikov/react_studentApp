import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Edit = () => {
  const navigate = useNavigate();
  const  id  = useParams();
  const [product, setProduct] = useState({
    name: "",
    lastName: "",
    group: "N45",
    doesWork: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/students/${id}`
        );
        const fetchedProduct = response.data;
        setProduct({
          name: fetchedProduct.name,
          lastName: fetchedProduct.lastName,
          group: fetchedProduct.group,
          doesWork: fetchedProduct.doesWork,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const hendelChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setProduct({ ...product, doesWork: e.target.checked });
  };

  const btnClose = () => {
    navigate("/");
  };

  const editSave = async () => {
    try {
      await axios.put(`http://localhost:3000/students/${id}`, product);
      btnClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="add-product">
        <div className="container">
          <div className="mb-3 container mt-5 border">
            <label htmlFor="fristname" className="form-label">
              FristName
            </label>
            <input
              name="name"
              type="text"
              id="fristname"
              className="form-control"
              value={product.name}
              onChange={hendelChange}
            />
            <label htmlFor="lastname" className="form-label">
              LastName
            </label>
            <input
              name="lastName"
              type="text"
              id="lastname"
              className="form-control"
              value={product.lastName}
              onChange={hendelChange}
            />
            <select
              name="group"
              id="group"
              className="form-select mt-3 w-auto"
              value={product.group}
              onChange={hendelChange}>
              <option value="N45">N45</option>
              <option value="N208">N208</option>
              <option value="N210">N210</option>
              <option value="N11">N11</option>
            </select>
            <label
              className="form-check-label mt-3 d-flex gap-2"
              htmlFor="doeswork">
              <input
                type="checkbox"
                className="form-check-input"
                defaultChecked={product.doesWork}
                id="doeswork"
                onChange={handleCheckboxChange}
              />
              DoesWork
            </label>
          </div>
          <div className="d-flex gap-3">
            <button className="btn btn-success" onClick={editSave}>
              Сохранить
            </button>
            <button className="btn btn-danger" onClick={btnClose}>
              Отмена
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Edit;
