export const handleElementDragStart = (e, element) => {
  console.log("drag started for already added element", e);
  e.dataTransfer.setData("type", element.dataset.type);
  e.dataTransfer.setData("id", element.id);
};
