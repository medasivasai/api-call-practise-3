// Import required modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Enable JSON parsing
app.use(bodyParser.json());

// State Table data
const states = [
  { stateId: 1, stateName: "Andaman and Nicobar Islands", population: 380581 },
  // Add more states as per your requirement
];

// District Table data
const districts = [
  { districtId: 322, districtName: "Haveri", stateId: 36, cases: 2816, cured: 2424, active: 172, deaths: 220 },
  // Add more districts as per your requirement
];

// API 1: Get all states
app.get('/states', (req, res) => {
  res.json(states);
});

// API 2: Get a state by ID
app.get('/states/:stateId', (req, res) => {
  const stateId = parseInt(req.params.stateId);
  const state = states.find(state => state.stateId === stateId);
  
  if (state) {
    res.json(state);
  } else {
    res.status(404).json({ message: 'State not found' });
  }
});

// API 3: Create a district
app.post('/districts', (req, res) => {
  const { districtName, stateId, cases, cured, active, deaths } = req.body;
  
  const districtId = districts.length + 1;
  const newDistrict = {
    districtId,
    districtName,
    stateId,
    cases,
    cured,
    active,
    deaths
  };
  
  districts.push(newDistrict);
  res.json({ message: 'District Successfully Added' });
});

// API 4: Get a district by ID
app.get('/districts/:districtId', (req, res) => {
  const districtId = parseInt(req.params.districtId);
  const district = districts.find(district => district.districtId === districtId);
  
  if (district) {
    res.json(district);
  } else {
    res.status(404).json({ message: 'District not found' });
  }
});

// API 5: Delete a district by ID
app.delete('/districts/:districtId', (req, res) => {
  const districtId = parseInt(req.params.districtId);
  const districtIndex = districts.findIndex(district => district.districtId === districtId);
  
  if (districtIndex !== -1) {
    districts.splice(districtIndex, 1);
    res.json({ message: 'District Removed' });
  } else {
    res.status(404).json({ message: 'District not found' });
  }
});

// API 6: Update a district by ID
app.put('/districts/:districtId', (req, res) => {
  const districtId = parseInt(req.params.districtId);
  const { districtName, stateId, cases, cured, active, deaths } = req.body;
  
  const district = districts.find(district => district.districtId === districtId);
  
  if (district) {
    district.districtName = districtName;
    district.stateId = stateId;
    district.cases = cases;
    district.cured = cured;
    district.active = active;
    district.deaths = deaths;
    res.json({ message: 'District Details Updated' });
  } else {
    res.status(404).json({ message: 'District not found' });
  }
});

// API 7: Get statistics of a specific state
app.get('/states/:stateId/stats', (req, res) => {
  const stateId = parseInt(req.params.stateId);
  const state = states.find(state => state.stateId === stateId);
  
  if (state) {
    const stateStats = {
      totalCases: 0,
      totalCured: 0,
      totalActive: 0,
      totalDeaths: 0
    };
    
    districts.forEach(district => {
      if (district.stateId === stateId) {
        stateStats.totalCases += district.cases;
        stateStats.totalCured += district.cured;
        stateStats.totalActive += district.active;
        stateStats.totalDeaths += district.deaths;
      }
    });
    
    res.json(stateStats);
  } else {
    res.status(404).json({ message: 'State not found' });
  }
});

// API 8: Get the state name of a district
app.get('/districts/:districtId/details', (req, res) => {
  const districtId = parseInt(req.params.districtId);
  const district = districts.find(district => district.districtId === districtId);
  
  if (district) {
    const state = states.find(state => state.stateId === district.stateId);
    
    if (state) {
      res.json({ stateName: state.stateName });
    } else {
      res.status(404).json({ message: 'State not found' });
    }
  } else {
    res.status(404).json({ message: 'District not found' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
