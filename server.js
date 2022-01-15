const express = require("express");
const app = express();
const axios = require("axios").default;
const PORT = 3000;
const NUMBERS_ARRAY = [
  { number: 1, frequency: 0 },
  { number: 2, frequency: 0 },
  { number: 3, frequency: 0 },
  { number: 4, frequency: 0 },
  { number: 5, frequency: 0 },
  { number: 6, frequency: 0 },
  { number: 7, frequency: 0 },
  { number: 8, frequency: 0 },
  { number: 9, frequency: 0 },
];
let NUMBERS_ARRAY_PERCENTAGES = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let totalFrequenciesSum = 0;

app.use(express.json());
// gerek olmazsa kaldır
// gerçi css lazım
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/canvas", (req, res) => {
  res.render("result");
});

app.get("/", async (req, res) => {
  const country = req.query.country;

  try {
    const data = await axios.get(
      "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json"
    );
    data.data.forEach((countryItem) => {
      if (countryItem.country === `${country}`) {
        countryItem.data.forEach((vaccinationInfo) => {
          if (vaccinationInfo.total_vaccinations !== undefined) {
            //if not undefined because some of them were
            /* Get the results of get request 
                -Get the first digit with substring,
                -Search that first digit in the NUMBERS_ARRAY
                -Then increase its frequency
            */
            const firstDigit = NUMBERS_ARRAY.find(
              (numberObject) =>
                numberObject.number ==
                String(vaccinationInfo.total_vaccinations).substring(0, 1)
            );

            // TODO first Digit'i 0 olanlar için hata vercek düzelt
            //düzelttm
            if (firstDigit !== undefined) firstDigit.frequency++;
          }
        });
      }
    });

    NUMBERS_ARRAY.forEach((numberObject) => {
      totalFrequenciesSum += numberObject.frequency;
    });

    // Convert Frequencies to Percentages
    for (let i = 0; i < NUMBERS_ARRAY.length; i++) {
      NUMBERS_ARRAY_PERCENTAGES[i] =
        (Number(NUMBERS_ARRAY[i].frequency) / totalFrequenciesSum) * 100;
    }

    res.send(NUMBERS_ARRAY_PERCENTAGES);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
