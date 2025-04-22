// CategorySidebar.jsx
const categories = [
  "Összes",
  "Pólók",
  "Farmerek",
  "Dzsekik",
  "Alsóneműk",
  "Parfümök",
  "Kabátok",
  "Mellény",
  "Cipők",
  "Fülhallgató"
];

const CategorySidebar = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <aside className="min-w-[150px] text-left">
      <h3 className="text-xl font-bold mb-4">Kategóriák</h3>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat}
            onClick={() =>
              setSelectedCategory(cat === "Összes" ? null : cat)
            }
            className={`cursor-pointer hover:underline ${
              selectedCategory === cat ||
              (cat === "Összes" && selectedCategory === null)
                ? "font-semibold text-white"
                : "text-gray-400"
            }`}
          >
            {cat}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategorySidebar;
