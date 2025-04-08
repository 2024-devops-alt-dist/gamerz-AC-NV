
type SearchUserProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

function SearchUser({ search, onSearchChange }: SearchUserProps) {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Rechercher par nom ou email..."
      className="w-full px-4 py-2 border border-gray-300 rounded mb-4 text-gray-800"
    />
  );
}

export default SearchUser;