import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemForm from "../components/ItemForm.jsx";
import { getItemById, updateItem } from "../api/itemApi.js";

function EditItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await getItemById(id);
        setItem(data);
      } catch (error) {
        console.error("Failed to fetch item", error);
        setError("Failed to load item details.");
      }
    };

    fetchItem();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      await updateItem(id, formData);
      navigate("/");
    } catch (error) {
      console.error("Failed to update item", error);
      alert("Failed to update item");
    }
  };

  if (error) return <p>{error}</p>;

  if (!item) return <p>Loading item details...</p>;

  return (
    <ItemForm
      initialValues={item}
      submitText="Update Item"
      onSubmit={handleUpdate}
    />
  );
}

export default EditItemPage;