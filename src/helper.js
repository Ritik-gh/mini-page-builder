export const handleElementDragStart = (e, element) => {
  console.log("drag started for already added element", e);
  e.dataTransfer.setData("class", element.className);
  e.dataTransfer.setData("id", element.id);
};
