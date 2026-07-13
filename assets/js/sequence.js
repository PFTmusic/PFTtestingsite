// PFT genetic sequence generator v5
const track = document.querySelector('[data-sequence-track]');
if (track) {
  let seed = 0x504654;
  const bases = 'ACGT', keywords = ['PRECISION', 'HEALTHCARE', 'BIOLOGY', 'BIO-SIGNALS', 'TECHNOLOGY', 'SYSTEMS', 'ENTERPRISE', 'BIOTECHNOLOGY', 'PFT', 'INTEGRATIONS', "AUTOMATIONS", "OPTIMISATION", "MEDTECH", "HEALTHTECH"];
  const complement = { A: 'T', T: 'A', C: 'G', G: 'C' };
  const random = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32;
  const fill = length => Array.from({ length }, () => bases[Math.floor(random() * 4)]).join('');
  const motifPositions = (count, total) => { const positions = new Set(), gap = Math.max(3, Math.floor(total / count)); let tries = 0; while (positions.size < count && tries++ < 200) { const candidate = Math.floor(random() * total); if ([...positions].every(position => Math.min(Math.abs(candidate - position), total - Math.abs(candidate - position)) >= gap)) positions.add(candidate); } return positions; };
  const row = (sequence, keyword) => { const start = keyword ? 2 + Math.floor(random() * Math.max(1, sequence.length - keyword.length - 3)) : -1, mask = new Set(Array.from({ length: keyword.length }, (_, i) => start + i)); return { sequence, mask, html: keyword ? `${sequence.slice(0, start)}<b class="motif">${keyword}</b>${sequence.slice(start + keyword.length)}` : sequence }; };
  const paired = previous => [...previous.sequence].map((base, index) => previous.mask.has(index) ? bases[Math.floor(random() * 4)] : complement[base]).join('');
  const render = () => { const parent = track.parentElement, sample = track.querySelector('.sequence-string'), style = getComputedStyle(sample || track), fontSize = parseFloat(style.fontSize) || 16, rowHeight = track.firstElementChild?.getBoundingClientRect().height || 48, visible = Math.max(1, Math.ceil(parent.clientHeight / rowHeight)), total = visible + 6, columns = Math.max(20, Math.min(42, Math.floor(parent.clientWidth / (fontSize * .7)))), motifs = motifPositions(Math.min(keywords.length, Math.max(2, Math.ceil(visible / 2))), total), terms = [...keywords], rows = []; for (let i = 0; i < total; i++) { const keyword = motifs.has(i) ? terms.shift() : ''; rows.push(row(i ? paired(rows[i - 1]) : fill(columns), keyword)); } track.innerHTML = rows.map(({ html }) => `<div class="sequence-row"><span class="sequence-string">${html}</span></div>`).join('').repeat(2); track.style.setProperty('--scan-duration', `${Math.max(24, total * 2.4)}s`); };
  render();
  new ResizeObserver(render).observe(track.parentElement);
}
