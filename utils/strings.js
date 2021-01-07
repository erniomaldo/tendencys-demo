
const pad = (s) => {
  return (s < 10) ? '0' + s : s;
}

export const formatedDate = input => {
  console.log(input);
  const date = new Date(input);
  return [
    pad(date.getDate()),
    pad(date.getMonth() + 1),
    date.getFullYear()
  ].join('/')
}

export const formatedDateTime = input => {
  const date = new Date(input);
  return [
    pad(date.getDate()),
    pad(date.getMonth() + 1),
    date.getFullYear()
  ].join('/') + ' ' + [
    pad(date.getHours() - (date.getHours() > 12 ? 12 : 0) + (date.getHours() === 0 ? 12 : 0)),
    pad(date.getMinutes())
  ].join(':') + ' ' + (date.getHours() > 12 ? 'PM' : 'AM')
}