const input = {
  id: '0001',
  type: 'donut',
  name: 'Cake',
  ppu: 0.55,
  batters: {
    batter: [
      { id: '1001', type: 'Regular' },
      { id: '1002', type: 'Chocolate' },
      { id: '1003', type: 'Blueberry' },
      { id: '1004', type: "Devil's Food" },
    ],
  },
  topping: [
    { id: '5001', type: 'None' },
    { id: '5002', type: 'Glazed' },
    { id: '5005', type: 'Sugar' },
    { id: '5007', type: 'Powdered Sugar' },
    { id: '5006', type: 'Chocolate with Sprinkles' },
    { id: '5003', type: 'Chocolate' },
    { id: '5004', type: 'Maple' },
  ],
};

// check if something is an object
const isObject = (value) => {
  return Object.prototype.toString.call(value) === '[object Object]';
};

// receives the object to flatten
// prefix contains the parent keys of a nested key in the object
const flattenObject = (obj, prefix) => {
  // FOT ASSESSING PURPOSE ONLY. SAMPLE EXAMPLES CONTAINED JSON OBJECTS
  try {
    obj = JSON.parse(obj);
  } catch (e) {
    console.log('Input is not a json');
  }

  const keys = Object.keys(obj);

  return keys.reduce((result, key) => {
    if (isObject(obj[key])) {
      result = result.concat(flattenObject(obj[key], [...prefix, key]));
    } else {
      result.push({ key: [...prefix, key], value: obj[key] });
    }
    return result;
  }, []);
};

const output = flattenObject(input, []);

console.log(output);
