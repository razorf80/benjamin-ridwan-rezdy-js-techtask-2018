export const todayDate = () => {
  let today = new Date(Date.now());
  return today.setHours(0,0,0,0);
}