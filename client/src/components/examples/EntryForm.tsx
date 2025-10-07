import EntryForm from "../EntryForm";

export default function EntryFormExample() {
  return (
    <EntryForm
      onAddEntry={(entry) => console.log("Entry added:", entry)}
    />
  );
}
