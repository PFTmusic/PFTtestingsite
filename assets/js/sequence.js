// PFT genetic sequence generator v5
const track = document.querySelector('[data-sequence-track]');
if (track) {
  let seed = 0x504654;
  const bases = 'ACGT', keywords = ['PRECISION', 'BIOTECHNOLOGY', 'HEALTHCARE', 'FUTURE', 'TECHNOLOGY'];
  const random = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32;
  const fill = length => Array.from({ length }, () => bases[Math.floor(random() * 4)]).join('');
  const sequence = (keyword, columns) => { const filler = fill(columns - keyword.length), offset = 2 + Math.floor(random() * Math.max(1, filler.length - 3)); return `${filler.slice(0, offset)}<b class="motif">${keyword}</b>${filler.slice(offset)}`; };
  const motifPositions = (count, total) => { const positions = new Set(), gap = Math.max(4, Math.floor(total / count)); let tries = 0; while (positions.size < count && tries++ < 200) { const candidate = Math.floor(random() * total); if ([...positions].every(position => Math.min(Math.abs(candidate - position), total - Math.abs(candidate - position)) >= gap)) positions.add(candidate); } return positions; };
  const render = () => { const parent = track.parentElement, sample = track.querySelector('.sequence-string'), style = getComputedStyle(sample || track), fontSize = parseFloat(style.fontSize) || 16, rowHeight = track.firstElementChild?.getBoundingClientRect().height || 48, visible = Math.max(1, Math.ceil(parent.clientHeight / rowHeight)), total = visible + 6, columns = Math.max(20, Math.min(42, Math.floor(parent.clientWidth / (fontSize * .7)))), motifs = motifPositions(visible > 9 ? 2 : 1, total), rows = Array.from({ length: total }, (_, i) => { const keyword = motifs.has(i) ? keywords[Math.floor(random() * keywords.length)] : ''; return `<div class="sequence-row"><span class="sequence-string">${keyword ? sequence(keyword, columns) : fill(columns)}</span></div>`; }).join(''); track.innerHTML = rows + rows; track.style.setProperty('--scan-duration', `${Math.max(24, total * 2.4)}s`); };
  render();
  new ResizeObserver(render).observe(track.parentElement);
}