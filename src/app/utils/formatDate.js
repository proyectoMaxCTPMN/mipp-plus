export function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}
export function formatDateandHour(dateandHourString){
  const fechaformateada = new Date(dateandHourString).toLocaleString('es-CR');
  const [part1,part2] = fechaformateada.split(",");
  const [day,monthnumber,year] = part1.split("/");
  const [hour,minutes,part3] = part2.split(":");
  const [seconds, timer] = part3.split(" ");
  const Months = ["","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  const month = Months[monthnumber]
  const time = hour+":"+minutes+" "+timer;
  return {day, month, year, time}
}