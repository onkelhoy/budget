// import statements 

export function toMoney(value: number) {
  const rounded = Math.round(value).toString();
  return rounded.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}