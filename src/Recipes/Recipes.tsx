// src/Recipes/Recipes.tsx
import { useState } from "react";
import { FaEye, FaTrash, FaTimes } from "react-icons/fa"; // تعديل الأيقونات
import Nodata from "./Nodata/Nodata";

export default function Recipes() {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: "fajita",
      image: "",
      price: "222EG",
      description: "yummy",
      tag: "Spicy",
      category: "Spicy",
    },
    {
      id: 2,
      name: "mohsen666",
      image: "",
      price: "6666EG",
      description: "njugui",
      tag: "Dessert",
      category: "Dessert",
    },
    {
      id: 3,
      name: "Cookies",
      image: "",
      price: "200EG",
      description: "nice",
      tag: "Dessert",
      category: "Bakeries",
    },
  ]);

  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [viewRecipe, setViewRecipe] = useState<any | null>(null);

  const [newRecipe, setNewRecipe] = useState({
    name: "",
    price: "",
    description: "",
    tag: "",
    category: "",
    image: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewRecipe({ ...newRecipe, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveRecipe = () => {
    if (!newRecipe.name || !newRecipe.price)
      return alert("Please fill required fields!");
    setRecipes([...recipes, { ...newRecipe, id: Date.now() }]);
    setShowModal(false);
    setNewRecipe({
      name: "",
      price: "",
      description: "",
      tag: "",
      category: "",
      image: "",
    });
  };

  const handleDelete = (id: number) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  const handleAddFavorite = (recipe: any) => {
    const saved = localStorage.getItem("favorites");
    let favs = saved ? JSON.parse(saved) : [];

    if (favs.find((fav: any) => fav.id === recipe.id)) {
      alert("Already in favorites!");
      return;
    }

    favs.push(recipe);
    localStorage.setItem("favorites", JSON.stringify(favs));
    alert("Added to favorites!");
  };

  const filteredRecipes = recipes.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesTag = tagFilter ? item.tag === tagFilter : true;
    const matchesCategory = categoryFilter
      ? item.category === categoryFilter
      : true;
    return matchesSearch && matchesTag && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Recipe Table Details</h1>
          <p className="text-black-500">You can check all details</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          + Add New Recipe
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search By Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2"
        />
        <select
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">Tags</option>
          <option value="Spicy">Spicy</option>
          <option value="Dessert">Dessert</option>
          <option value="Healthy">Healthy</option>
          <option value="Quick">Quick</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">Category</option>
          <option value="Bakeries">Bakeries</option>
          <option value="Dessert">Dessert</option>
          <option value="Spicy">Spicy</option>
          <option value="Drinks">Drinks</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Item Name</th>
              <th className="p-3">Image</th>
              <th className="p-3">Price</th>
              <th className="p-3">Description</th>
              <th className="p-3">Tag</th>
              <th className="p-3">Category</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="p-3">{item.price}</td>
                  <td className="p-3">{item.description}</td>
                  <td className="p-3">{item.tag}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => setViewRecipe(item)}
                      className="flex items-center gap-1 text-green-600 hover:underline"
                    >
                      <FaEye size={16} /> View
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex items-center gap-1 text-red-600 hover:underline"
                    >
                      <FaTrash size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-6">
                  <Nodata />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2">
        <button className="px-3 py-1 border rounded">Previous</button>
        <span className="px-3 py-1 border rounded bg-white-100">1</span>
        <button className="px-3 py-1 border rounded">Next</button>
      </div>

      {/* Modal for Add New */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Recipe</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Recipe Name"
                value={newRecipe.name}
                onChange={(e) =>
                  setNewRecipe({ ...newRecipe, name: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Price"
                value={newRecipe.price}
                onChange={(e) =>
                  setNewRecipe({ ...newRecipe, price: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
              <textarea
                placeholder="Description"
                value={newRecipe.description}
                onChange={(e) =>
                  setNewRecipe({ ...newRecipe, description: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
              {/* Tag Select */}
              <select
                value={newRecipe.tag}
                onChange={(e) =>
                  setNewRecipe({ ...newRecipe, tag: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select Tag</option>
                <option value="Spicy">Spicy</option>
                <option value="Dessert">Dessert</option>
                <option value="Healthy">Healthy</option>
                <option value="Quick">Quick</option>
              </select>
              {/* Category Select */}
              <select
                value={newRecipe.category}
                onChange={(e) =>
                  setNewRecipe({ ...newRecipe, category: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select Category</option>
                <option value="Bakeries">Bakeries</option>
                <option value="Dessert">Dessert</option>
                <option value="Spicy">Spicy</option>
                <option value="Drinks">Drinks</option>
              </select>
              {/* Upload Image */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRecipe}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            {/* زرار الإكس */}
            <button
              onClick={() => setViewRecipe(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black z-50"
            >
              <FaTimes size={24} />
            </button>

            <h2 className="text-xl font-bold mb-4">{viewRecipe.name}</h2>
            {viewRecipe.image && (
              <img
                src={viewRecipe.image}
                alt={viewRecipe.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <p><strong>Price:</strong> {viewRecipe.price}</p>
            <p><strong>Description:</strong> {viewRecipe.description}</p>
            <p><strong>Tag:</strong> {viewRecipe.tag}</p>
            <p><strong>Category:</strong> {viewRecipe.category}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleAddFavorite(viewRecipe)}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Add to Favorite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
