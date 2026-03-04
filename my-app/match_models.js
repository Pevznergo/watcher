const https = require('https');

async function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function run() {
  const ycData = await fetchJSON('https://yieldcars.com/api/pricing');
  const orData = await fetchJSON('https://openrouter.ai/api/v1/models');
  
  const yieldModels = ycData.data;
  const orModels = orData.data;
  
  const orIds = new Set(orModels.map(m => m.id));
  
  console.log("Unmatched models:");
  for (const ym of yieldModels) {
    if (!orIds.has(ym.model_name)) {
      console.log(ym.model_name);
    }
  }
}

run();
