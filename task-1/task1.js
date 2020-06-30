const config = [
  {
    HeaderName: 'Organization',
    Column: 'Organization',
    Merge: true,
  },
  {
    HeaderName: 'Department',
    Column: 'Department',
    Merge: true,
  },
  {
    HeaderName: 'UserName',
    Column: 'UserName',
    Merge: true,
  },
  {
    HeaderName: 'Date',
    Column: ({ CheckInTime }) => {
      return moment(CheckInTime).format('DD/MM/YYYY');
    },
    Merge: false,
  },
  {
    HeaderName: 'Time',
    Column: ({ CheckInTime, CheckOutTime }) => {
      const secs = (CheckOutTime - CheckInTime) / 1000;
      return secs / 60 + ' Mins';
    },

    Merge: false,
  },
];

const input = [
  {
    Organization: 'Google',
    UserId: 'akumar',
    UserName: 'Ashok Kumar',
    Department: 'Sales',
    Designation: 'Sales',
    CheckInTime: 1548909000000,
    CheckOutTime: 1548945000000,
  },
  {
    Organization: 'Google',
    UserId: 'akumar',
    UserName: 'Ashok Kumar',
    Department: 'Sales',
    Designation: 'Sales',
    CheckInTime: 1549081800000,
    CheckOutTime: 1549110600000,
  },
  {
    Organization: 'FB',
    UserId: 'phanis',
    UserName: 'Phani Sai',
    Department: 'Sales',
    Designation: 'Sales',
    CheckInTime: 1548909000000,
    CheckOutTime: 1548945000000,
  },
  {
    Organization: 'FB',
    UserId: 'phanis',
    UserName: 'Phani Sai',
    Department: 'Sales',
    Designation: 'Sales',
    CheckInTime: 1549081800000,
    CheckOutTime: 1549110600000,
  },
  {
    Organization: 'FB',
    UserId: 'lakshmig',
    UserName: 'Laskhmi Gayathri',
    Department: 'Quality',
    Designation: 'QA Engineer',
    CheckInTime: 1549081800000,
    CheckOutTime: 1549110600000,
  },
  {
    Organization: 'FB',
    UserId: 'lakshmig',
    UserName: 'Laskhmi Gayathri',
    Department: 'Quality',
    Designation: 'QA Engineer',
    CheckInTime: 1549081800000,
    CheckOutTime: 1549110600000,
  },
];

// receives data, input and config
// data (Array of objects) consists of the data to be displayed in the report
/*
    const data = [
    {
      'Sales': 
      [
        {
          'Ashok Kumar': [
            { '31 Jan': null },
          ],
        },
        {
          'Ashoka Kumar' : 
          [{ '31 Jan': null }],
        },
      ],
    },
  ],
  */
// inputObj (Object) and config (Array of objects) together generate the data
function generateReportData(data, inputObj, config) {
  config.forEach((configObj, index) => {
    const obj = {};
    const { Column, Merge } = configObj;
    let key;

    // retrieve each cell value
    if (typeof Column === 'string') {
      key = inputObj[Column];
    } else if (Object.prototype.toString.call(Column) === '[object Function]') {
      key = Column(inputObj);
    }

    const lastIndex = config.length - 1;

    if (index !== lastIndex) {
      if (Merge) {
        const objIndex = data.findIndex((o) => Object.keys(o).includes(key));

        if (objIndex === -1) {
          obj[key] = [];

          data.push(obj);

          data = obj[key];
        } else {
          data = data[objIndex][key];
        }
      } else {
        obj[key] = [];

        data.push(obj);

        data = obj[key];
      }
    } else {
      obj[key] = null;

      data.push(obj);
    }
  });
}

// receives obj (Object) which consists of the values in table
// the obj is nested
// each key in the obj points to an array (consisting nested cells) or is null
// rowspan is calculates based on the array length and nest
function getRowspan(obj) {
  let num = 0;
  const key = Object.keys(obj)[0];

  if (obj[key] && obj[key].length) {
    for (let i = 0; i < obj[key].length; i++) {
      num += getRowspan(obj[key][i]);
    }
  } else num = 1;

  return num;
}

// receives contentObj and row
// contentObj (Object) consists of the values in table
// nested structure of the contentObj specifies how each row spans
// row can be null or "".
// if null, a new row is created for the cells
// else if "", cell is included in the current row
function createTableRow(contentObj, row) {
  if (row == null) {
    row = '<tr>';
  }

  // a key in contentObj is the text (Google, Sales, FB etc) displayed on each cell
  const key = Object.keys(contentObj)[0];

  // creating rows
  row += '<td rowspan="' + getRowspan(contentObj) + '">' + key + '</td>';

  if (contentObj[key] && contentObj[key].length) {
    contentObj[key].forEach((cell, index) => {
      if (index === 0) {
        row += createTableRow(cell, '');
      } else {
        row += createTableRow(cell);
      }
    });
  } else {
    row += '</tr>';
  }

  return row;
}

// receives input and config
// input (Array of Objects) consists of table content
// config (Array of Objects) config specifies table structure
const generateReportTable = (input, config) => {
  // stores data to be displayed in report
  const reportData = [];

  // FOT ASSESSING PURPOSE ONLY. SAMPLE EXAMPLES CONTAINED JSON OBJECTS
  try {
    input = JSON.parse(input);
  } catch (e) {
    console.log('Input is not a json');
  }

  // manipulate each object in input with config
  input.forEach((inputObj) => {
    generateReportData(reportData, inputObj, config);
  });

  // make table header
  let tableHeader = '<tr>';

  config.forEach((configObj) => {
    tableHeader += `<th>${configObj['HeaderName']}</th>`;
  });

  tableHeader += '</tr>';

  // make table body
  let tableBody = '';

  reportData.forEach((contentObj) => {
    tableBody += createTableRow(contentObj);
  });

  document.getElementById('table-cont').innerHTML = `<table>
    ${tableHeader}
    ${tableBody}
  </table>`;
};

// generate html table containing the report
generateReportTable(input, config);
