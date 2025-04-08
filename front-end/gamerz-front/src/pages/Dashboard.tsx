import { useEffect, useState } from "react";
import SearchUser from "../components/SearchUser";

function Dashboard() {
  interface User {
    _id: string;
    username: string;
    email: string;
    motivation: string;
    status: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5006/users", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Erreur lors du fetch");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Erreur de récupération des utilisateurs :", error);
      }
    };
    fetchUsers();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`http://localhost:5006/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Erreur lors de la mise à jour du statut");

      alert("Statut mis à jour avec succès !");
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const handleDelete = async (id: string, status: string) => {
    try {
      const res = await fetch(`http://localhost:5006/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Erreur lors de la suppression");

      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleConfirmDelete = (id: string) => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
    );
    if (confirmDelete) {
      handleDelete(id, "deleted");
      alert("Utilisateur supprimé avec succès !");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-4">
      <h1 className="text-3xl sm:text-4xl text-center text-gray-200 mt-10 mb-10">
        Dashboard
      </h1>

      <div className="w-full flex items-center justify-center py-6 sm:py-10">
        <div className="w-full md:w-4/5 rounded-lg bg-white/10 p-4 sm:p-10 overflow-x-auto">
          <h2 className="text-xl sm:text-2xl text-center text-gray-200 mb-5">
            Liste des utilisateurs
          </h2>

          <div className="mb-5">
            <SearchUser search={search} onSearchChange={setSearch} />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm sm:text-base divide-y divide-gray-200 text-gray-100">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase">
                    Nom
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase">
                    Email
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase">
                    Motivation
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-700 divide-y divide-gray-600">
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      {user.username}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      {user.email}
                    </td>
                  <td className="px-4 sm:px-6 py-4 italic text-xs sm:text-sm max-h-[100px] overflow-y-auto w-[600px]">
                    <div className="max-h-[100px] overflow-y-auto">
                      {user.motivation}
                    </div>
                  </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap capitalize">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-evenly">
                        <select
                          className="bg-gray-800 text-white border border-gray-600 px-2 py-1 rounded "
                          value={user.status}
                          onChange={(e) =>
                            handleStatusChange(user._id, e.target.value)
                          }
                        >
                          <option value="pending">En attente</option>
                          <option value="approved">Validé</option>
                          <option value="refused">Refusé</option>
                        </select>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => handleConfirmDelete(user._id)}
                        >
                          🗑️ Delete !
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-center text-gray-400"
                    >
                      Aucun utilisateur trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
