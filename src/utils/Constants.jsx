export const apiKey = "fbf7ca117e3ded783d431c40d7303b1c";
export const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${34.850746}&lon=${-82.398964}&units=imperial&appid=${apiKey} `;
export const baseUrl = "http://localhost:3001";


export const processRes = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};
