const ctx = document.getElementById('myChart').getContext('2d');
const DATA_COUNT = 5;
const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};
const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: [
          'XP 62,5%',
          'Clear 12,5%',
          'Rico 25%'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            '#ffb600',
            '#b19f00',
            '#6e8300'
          ],
         hoverOffset: 4,
         borderColor: '#ffffff',
         borderWidth: 0,
         color: '#ffffff'
        }]
    },
    options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false,
            text: 'Chart.js Doughnut Chart'
          }
        }
    },
});