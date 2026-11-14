// Announcement-context chart. No dependencies. Aggregate averages from my own event study only.
(() => {
  // Edge over the universe's baseline (%) at 1/3/5/20 sessions after the announcement.
  const EVENTS = [
    { label: "Dividend", n: 388, v: [0.22, 0.45, 0.23, 0.12] },
    { label: "Financial results", n: 1017, v: [0.06, 0.17, 0.02, -0.61] },
    { label: "Board meeting", n: 969, v: [0.04, 0.06, -0.17, -0.68] },
    { label: "Regulatory action", n: 1147, v: [-0.09, -0.31, -0.43, -1.36] },
  ];
  const el = document.getElementById("chart-events");
  if (!el) return;

  const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const fmt = (v) => (v > 0 ? "+" : v < 0 ? "−" : "") + Math.abs(v).toFixed(2);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  let w = 1;

  function draw() {
    const min = -1.5, max = 0.6;
    const W = Math.max(280, el.clientWidth);
    const narrow = W < 460;
    const labelW = narrow ? 0 : Math.min(170, W * 0.32);
    const plotL = labelW + 8 + 70, plotR = W - 8 - 70;
    const x = (v) => plotL + ((v - min) / (max - min)) * (plotR - plotL);
    const zero = x(0), barH = 20;
    let y = 4, out = "";
    for (const e of EVENTS) {
      const v = e.v[w];
      if (narrow) {
        out += `<text class="lbl" x="0" y="${y + 12}" font-weight="600">${esc(e.label)}</text>`;
        y += 20;
      } else {
        out += `<text class="lbl" x="0" y="${y + 14}" font-weight="600">${esc(e.label)}</text>`;
      }
      const x0 = Math.min(zero, x(v)), bw = Math.max(1.5, Math.abs(x(v) - zero));
      const fill = v >= 0 ? css("--pos") : css("--neg");
      out += `<rect x="${x0}" y="${y}" width="${bw}" height="${barH}" rx="3" fill="${fill}"><title>${esc(e.label)} ${fmt(v)}%</title></rect>`;
      const right = v >= 0;
      out += `<text class="val" x="${right ? x(v) + 6 : x(v) - 6}" y="${y + 14}" text-anchor="${right ? "start" : "end"}">${fmt(v)}%</text>`;
      y += barH + (narrow ? 18 : 22);
    }
    const H = y - 8;
    el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Average move compared with the market ${[1, 3, 5, 20][w]} sessions after each announcement type"><line class="axis" x1="${zero}" x2="${zero}" y1="0" y2="${H}"/>${out}</svg>`;
  }

  const btns = document.querySelectorAll("[data-w]");
  btns.forEach((b) => b.addEventListener("click", () => {
    btns.forEach((o) => o.setAttribute("aria-pressed", String(o === b)));
    w = Number(b.dataset.w);
    draw();
  }));
  draw();
  let t;
  addEventListener("resize", () => { clearTimeout(t); t = setTimeout(draw, 120); });
  matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", draw);
})();
