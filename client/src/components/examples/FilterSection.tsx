import FilterSection from "../FilterSection";

export default function FilterSectionExample() {
  return (
    <FilterSection
      onFilterChange={(filters) => console.log("Filters applied:", filters)}
    />
  );
}
