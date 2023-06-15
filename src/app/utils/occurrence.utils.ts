export function isoDateToCalendar(date: string) {
  const dateFromOccurrence = new Date(date);
  const day = dateFromOccurrence.getDate().toString().padStart(2, '0');
  const month = (dateFromOccurrence.getMonth() + 1).toString().padStart(2, '0');
  const year = dateFromOccurrence.getFullYear().toString();
  return `${day}/${month}/${year}`;
}

export function dateToIsoString(dateString?: string) {
  if (!dateString) return '01/01/1970';
  const dateParts = dateString.split('/');
  const year = parseInt(dateParts[2], 10);
  const month = parseInt(dateParts[1], 10) - 1;
  const day = parseInt(dateParts[0], 10);
  const date = new Date(year, month, day);
  const isoDate = date.toISOString();
  return isoDate;
}

export const allOccurrencesMenu = {
  label: 'Ocorrências',
  icon: 'pi pi-fw pi-map',
  id: 'all',
};
export const mineOccurences = {
  label: 'Minhas ocorrências',
  icon: 'pi pi-fw pi-map-marker',
  id: 'mine',
};
