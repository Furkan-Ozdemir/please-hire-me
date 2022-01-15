/*
- Makes a get request to http://localhost:3000/ and retrieves
a frequency array
- Then constructs two charts with;
    - One with the retrieved data 
    - One with Benford's hard-coded values
*/
const getData = async () => {
  try {
    let country = "";
    const params = new URLSearchParams(window.location.search);
    const data = await fetch(
      `http://localhost:3000/?country=${params.get("country")}`
    );
    const dataJson = await data.json();

    new Chart(document.getElementById("bar-chart"), {
      type: "bar",
      data: {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        datasets: [
          {
            label: "Turkish Vax Rate %",
            backgroundColor: [
              "#3cba9f",
              "#3cba9f",
              "#3cba9f",
              "#3cba9f",
              "#3cba9f",
              "#3cba9f",
              "#3cba9f",
              "#3cba9f",
              "#3cba9f",
              "#3cba9f",
              "#3cba9f",
            ],
            data: dataJson,
          },
        ],
      },
      options: {
        responsive: false,
        legend: { display: false },
        title: {
          display: false,
          text: "Predicted world population (millions) in 2050",
        },
      },
    });
    new Chart(document.getElementById("bar-chart2"), {
      type: "bar",
      data: {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        datasets: [
          {
            label: "Benford's Graph %",
            backgroundColor: [
              "#3e95cd",
              "#3e95cd",
              "#3e95cd",
              "#3e95cd",
              "#3e95cd",
              "#3e95cd",
              "#3e95cd",
              "#3e95cd",
              "#3e95cd",
              "#3e95cd",
              "#3e95cd",
            ],
            data: [30.1, 17.6, 12.5, 9.7, 7.9, 6.7, 5.8, 5.1, 4.6],
          },
        ],
      },
      options: {
        responsive: false,
        legend: { display: false },
        title: {
          display: false,
          text: "Predicted world population (millions) in 2050",
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

getData();
