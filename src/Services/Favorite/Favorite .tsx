// src/Favorites/Favorites.tsx
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa"; // تعديل الأيقونة

export default function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);

  // load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // delete favorite
  const handleDeleteFavorite = (id: number) => {
    const updated = favorites.filter((fav) => fav.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Favorites</h1>
        <p className="text-gray-500">All your saved recipes in one place.</p>
      </div>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No favorites added yet.
        </p>
      ) : (
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
              {favorites.map((item) => (
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
                  <td className="p-3">
                    <button
                      onClick={() => handleDeleteFavorite(item.id)}
                      className="flex items-center gap-1 text-red-600 hover:underline"
                    >
                      <FaTrash size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
