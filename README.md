# Evidence for Every Investor

**Live page:** https://faranmustafa.github.io/psx-evidence-lab/

This is an independent proposal for an evidence layer in Pakistani retail investing apps, written with Nafa and Ticker Analysts in mind. It is built on a point-in-time research engine for the Pakistan Stock Exchange (PSX) that I developed in 2026.

## The problem

New PSX investors get screens, filings and tips with no track record attached. Costs also go unseen, so many short-hold trades end up losing to charges alone.

## What the page proposes

1. **Screen scorecards:** how the stocks each screen flagged did afterwards, after charges, against the KSE-100.
2. **Announcement context:** one line of history next to each filing summary.
3. **Break-even hints:** the price move a trade needs to cover its costs, shown before the order is confirmed.
4. **Extended accountability:** a public scoreboard for screens and calls.
5. **A two-week pilot** to start.

## Notes

- This is a static page (`index.html`, `styles.css`, `app.js`) with no build step and no dependencies. Fonts are IBM Plex, under the SIL Open Font License.
- Mock-ups are illustrative. The only figures are aggregate averages from my own announcement study. No PSX market data is republished.
- This is not affiliated with Nafa, Ticker Analysts, Polygot Labs or Chase Securities, and it is not investment advice.

Run it locally with `python3 -m http.server 8866`.

Syed Faran Mustafa · [LinkedIn](https://www.linkedin.com/in/faranmustafa) · [GitHub](https://github.com/FaranMustafa)
