import { useEffect, useState } from "react";
import Select from "react-select";

export default function CategorySelect({
  onChange,
}: {
  onChange: (val) => void;
}) {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      const formatted = data.map((cat) => ({
        value: cat.id,
        label: cat.name,
      }));
      setCategories(formatted);
    }
    loadCategories();
  }, []);

  function handleChange(selected) {
    onChange(selected);
  }

  return (
    <Select
      options={categories}
      isMulti
      placeholder="Find categories..."
      onChange={handleChange}
    />
  );
}
