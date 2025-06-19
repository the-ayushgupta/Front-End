// Ripple button effect
document.querySelectorAll('.ripple-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const circle = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.classList.add('ripple');

    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
});

// Design kit select
document.querySelectorAll('.kit-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.kit-card').forEach(c => {
      c.classList.remove('selected');
      c.querySelector('.kit-checkbox').classList.remove('checked');
    });
    card.classList.add('selected');
    card.querySelector('.kit-checkbox').classList.add('checked');
  });
});

// Customer swap
const customers = document.querySelectorAll('.customer');
setInterval(() => {
  customers.forEach(customer => {
    const alts = JSON.parse(customer.dataset.alts);
    const current = customer.textContent.trim();
    const next = current === alts[0] ? alts[1] : alts[0];
    customer.style.opacity = 0;
    setTimeout(() => {
      customer.textContent = next;
      customer.style.opacity = 1;
    }, 1000);
  });
}, 5000);

// Chart with sort
const rawData = [
  { label: 'Brex', value: 1200 },
  { label: 'Remote', value: 1100 },
  { label: 'Cursor', value: 950 },
  { label: 'ARC', value: 820 },
  { label: 'Descript', value: 790 },
  { label: 'Runway', value: 740 },
  { label: 'Figma', value: 620 },
  { label: 'Framer', value: 500 }
];

let ascending = false;
const ctx = document.getElementById('companyChart').getContext('2d');

const chartData = {
  labels: rawData.map(d => d.label),
  datasets: [{
    label: 'Visits',
    data: rawData.map(d => d.value),
    backgroundColor: [
      '#007bff', '#6610f2', '#20c997', '#ffc107',
      '#dc3545', '#fd7e14', '#6f42c1', '#17a2b8'
    ],
    borderRadius: 5,
    barThickness: 30
  }]
};

const companyChart = new Chart(ctx, {
  type: 'bar',
  data: chartData,
  options: {
    indexAxis: 'y',
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { beginAtZero: true, grid: { display: false } },
      y: { grid: { display: false } }
    }
  }
});

document.getElementById('sortIcon').addEventListener('click', () => {
  ascending = !ascending;
  const sorted = [...rawData].sort((a, b) => ascending ? a.value - b.value : b.value - a.value);
  companyChart.data.labels = sorted.map(d => d.label);
  companyChart.data.datasets[0].data = sorted.map(d => d.value);
  document.getElementById('sortIcon').textContent = ascending ? '↑' : '↓';
  companyChart.update();
});

// Theme toggle
const toggleButton = document.getElementById('themeToggle');

// Load preference
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
  toggleButton.textContent = '🌞';
}

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  if (document.body.classList.contains('light-mode')) {
    toggleButton.textContent = '🌞';
    localStorage.setItem('theme', 'light');
  } else {
    toggleButton.textContent = '🌙';
    localStorage.setItem('theme', 'dark');
  }
});
