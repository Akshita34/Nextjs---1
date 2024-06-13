import { getCountries } from "@/lib/data-service";

// Let's imagine your colleague already built this component 😃

async function SelectCountry({ defaultCountry, name, id, className }) {
  const countries = await getCountries();
  console.log(countries.data);
  const data = countries.data;

  Object.entries(countries.data).map(([code, country]) =>
    console.log(country.country)
  );

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}`}
      className={className}
    >
      <option value="">Select country...</option>
      {Object.entries(countries.data).map(([code, country]) => (
        <option key={code} value={country.country}>
          {country.country}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;

{
  /* <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value="">Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select> */
}
