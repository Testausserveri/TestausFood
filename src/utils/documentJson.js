export default (document) => {
  if (!document) return {};
  const object = document.toJSON();
  delete object._id;
  delete object.__v;
  return object;
}