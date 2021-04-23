let calculate = ["a", "a", "a", "b", "b", "c",];

calculate.reduce((curr, val) => {
  if (!curr[val]) curr[val] = 0
  curr[val]++;
  return curr
}, {})
calculate = Object.entries(calculate).map(data => {
  const [key, value] = data;
  return { name: key, total: value };
})

console.log(calculate);