
import { useEffect, useState } from "react";

function ItemForm({ initialValues, onSubmit, submitText }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    discountPercentage: 0,
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (initialValues) {
      setFormData({
        name: initialValues.name || "",
        category: initialValues.category || "",
        price: initialValues.price ?? "",
        discountPercentage: initialValues.discountPercentage ?? 0,
        description: initialValues.description || "",
        imageUrl: initialValues.imageUrl || "",
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const discount = Number(formData.discountPercentage);

    if (!Number.isFinite(discount) || discount < 0 || discount > 100) {
      alert("Discount Percentage must be between 0 and 100.");
      return;
    }

    onSubmit({
      ...formData,
      price: Number(formData.price),
      discountPercentage: discount,
    });
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>{submitText}</h2>

      <label>Item Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label>Category</label>
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      />

      <label>Price</label>
      <input
        type="number"
        name="price"
        min="0"
        step="0.01"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <label>Discount Percentage (%)</label>
      <input
        type="number"
        name="discountPercentage"
        min="0"
        max="100"
        step="0.01"
        value={formData.discountPercentage}
        onChange={handleChange}
        required
      />

      <label>Description</label>
      <textarea
        name="description"
        rows="4"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label>Image URL</label>
      <input
        type="url"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
      />

      <button className="btn primary" type="submit">
        {submitText}
      </button>
    </form>
  );
}

export default ItemForm;