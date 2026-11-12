const metrics = {
  qps: { label: '吞吐量 · QPS 越高越好', digits: 0, cap: 500 },
  read: { label: '实际读盘量 · KiB / 查询 越低越好', digits: 1, cap: 100 },
  p99: { label: 'P99 时延 · ms 越低越好', digits: 2, cap: 2 },
  mean: { label: '平均时延 · ms 越低越好', digits: 2, cap: 2 },
};
let dataset = benchmarks[0];
let metric = 'qps';
const datasetButtons = document.querySelectorAll('[data-set]');
const metricButtons = document.querySelectorAll('[data-metric]');
const all = document.querySelector('#all');
const fmt = (value, digits) => value.toLocaleString('zh-CN', {minimumFractionDigits: digits, maximumFractionDigits: digits});

function render() {
  const spec = metrics[metric];
  const rows = all.checked ? dataset.rows : dataset.rows.filter(row => row.mode === 'fixed');
  const max = Math.ceil(Math.max(...rows.map(row => row[metric])) / spec.cap) * spec.cap;
  document.querySelector('#dataset-meta').textContent = dataset.size + ' · ' + dataset.target;
  document.querySelector('#chart-caption').textContent = spec.label;
  document.querySelector('#chart-rows').innerHTML = rows.map(row =>
    '<div class="bar-row ' + row.engine.toLowerCase() + '">' +
    '<div class="bar-name"><strong>' + row.engine + '</strong><small>' + row.variant + '</small></div>' +
    '<div class="bar-track" aria-hidden="true"><i style="--v:' + (100 * row[metric] / max) + '%"></i></div>' +
    '<b class="bar-value">' + fmt(row[metric], spec.digits) + '</b></div>'
  ).join('') + '<div class="scale" aria-hidden="true"><span></span><div><span>0</span><span>' + fmt(max/2,0) + '</span><span>' + fmt(max,0) + '</span></div><span></span></div>';
  document.querySelector('#chart-note').textContent = dataset.note;
  document.querySelector('#table-caption').textContent = dataset.label + ' 完整结果';
  document.querySelector('#table-body').innerHTML = dataset.rows.map(row =>
    '<tr><th scope="row"><span class="table-engine ' + row.engine.toLowerCase() + '">' + row.engine +
    '</span><small>' + row.variant + (row.rounds === 1 ? ' · 单轮' : '') + '</small></th>' +
    '<td>' + fmt(row.recall,2) + '%</td><td>' + fmt(row.qps,0) + '</td><td>' + fmt(row.read,1) +
    '</td><td>' + fmt(row.mean,2) + '</td><td>' + fmt(row.p99,2) + '</td><td>' +
    (row.rss === null ? '—' : fmt(row.rss,2)) + '</td></tr>'
  ).join('');
  for (const button of datasetButtons) button.setAttribute('aria-pressed', String(button.dataset.set === dataset.id));
  for (const button of metricButtons) button.setAttribute('aria-pressed', String(button.dataset.metric === metric));
}

for (const button of datasetButtons) button.addEventListener('click', () => {
  dataset = benchmarks.find(item => item.id === button.dataset.set);
  render();
});
for (const button of metricButtons) button.addEventListener('click', () => {
  metric = button.dataset.metric;
  render();
});
all.addEventListener('change', render);
render();
