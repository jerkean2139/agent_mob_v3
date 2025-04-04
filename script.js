
const API_URL = 'https://wxiafhgopezovizvnkuu.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4aWFmaGdvcGV6b3ZpenZua3V1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MzkxODcsImV4cCI6MjA1OTMxNTE4N30.izZ1L0nHvmxqiXVe8MGLWWoACKFGJtcthn6LgmwQeh4';

async function loadAgents() {
  const response = await fetch(`${API_URL}/rest/v1/agents`, {
    headers: {
      apikey: API_KEY,
      Authorization: `Bearer ${API_KEY}`
    }
  });

  const agents = await response.json();
  const leadContainer = document.getElementById("lead-agent");
  const grid = document.getElementById("agentGrid");
  grid.innerHTML = '';

  agents.forEach(agent => {
    const card = document.createElement("div");
    card.className = "agent-card";

    const tags = agent.categories.map(cat => {
      const safe = cat.replace(/\s+/g, '\\ ');
      return `<span class="category-tag ${safe}">${cat}</span>`;
    }).join('');

    card.innerHTML = `
      <img src="${agent.avatar}" alt="${agent.name}" />
      <h3>@${agent.name}</h3>
      <p>${agent.role}</p>
      ${tags}
    `;

    if (agent.name.toLowerCase() === 'donna') {
      card.style.transform = 'scale(1.1)';
      card.style.marginBottom = '2rem';
      leadContainer.appendChild(card);
    } else {
      grid.appendChild(card);
    }
  });
}

loadAgents();
