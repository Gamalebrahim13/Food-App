import { useState } from "react";

interface Category {
  id: number;
  name: string;
  createdAt: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 4864, name: "pizza food", createdAt: "2025-06-05T14:45:34.635Z" },
    { id: 4863, name: "pizza", createdAt: "2025-06-05T14:45:16.542Z" },
    { id: 4858, name: "Welcome HI", createdAt: "2025-06-04T16:54:04.184Z" },
    { id: 4820, name: "Gonzalez", createdAt: "2025-06-02T22:12:26.296Z" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [search, setSearch] = useState(""); // 🔍 خانة البحث

  // إضافة كاتوجري
  const handleAddCategory = () => {
    if (!newCategory.trim()) return;

    const newCat: Category = {
      id: Date.now(),
      name: newCategory,
      createdAt: new Date().toISOString(),
    };

    setCategories([newCat, ...categories]);
    setNewCategory("");
    setIsModalOpen(false);
  };

  // حذف كاتوجري
  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  // فلترة الكاتوجري حسب البحث
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Categories Table Details</h1>
          <p className="text-gray-600">You can check all details</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add New Category
        </button>
      </div>

      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Creation Date</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => (
                <tr key={cat.id} className="border-t">
                  <td className="py-2 px-4">{cat.id}</td>
                  <td className="py-2 px-4">{cat.name}</td>
                  <td className="py-2 px-4">{cat.createdAt}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Add New Category</h2>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
              className="w-full border px-3 py-2 rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
