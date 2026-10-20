# Weekly

Weekly is a simple web app that tracks your work hours and shows your expected pay. Enter your shifts and your hourly rate, and it works out your weekly, biweekly and monthly pay so you don't have to do the math in your head.

**Live app:** https://david-olasunkanmi.github.io/Weekly/

## Features

- Enter start time, end time and unpaid break for each day, Monday to Sunday
- Calculates hours per day and your weekly total
- Enter your hourly pay to see expected weekly, biweekly and monthly pay
- Optional weekly hour limit with a progress bar, useful if your job or permit caps your hours
- Handles overnight shifts that go past midnight
- Installable on your phone or computer, and works offline
- Light and dark mode, works on desktop, tablet and mobile
- Private: entries are saved in your own browser (localStorage), nothing is sent to a server

## How it works

For each day, the app subtracts the start time from the end time. If the result is negative, the shift crossed midnight, so 24 hours is added. The unpaid break is subtracted, and the days are added together for your weekly total.

Pay is calculated from that total:

- Weekly pay = total hours x hourly pay
- Biweekly pay = weekly pay x 2
- Monthly pay = weekly pay x 52 / 12 (an average month)

Biweekly and monthly figures assume you work the same hours every week.

## Install as an app

- **iPhone (Safari):** Share, then Add to Home Screen
- **Android (Chrome):** menu, then Install app
- **Laptop (Chrome or Edge):** click the install icon in the address bar

## Tech

HTML, CSS and vanilla JavaScript. It is a Progressive Web App with a web manifest and a service worker for offline use. No frameworks or dependencies.

## Project structure

- `index.html`: page structure
- `styles.css`: styling, light and dark themes, mobile layout
- `script.js`: hours and pay calculations, saving to localStorage
- `manifest.json` and `sw.js`: install and offline support
- `icon-180.png`, `icon-192.png`, `icon-512.png`: app icons

## Run it locally

Download the repo and open `index.html` in any browser.

## Disclaimer

Weekly is a calculator for estimates only. Pay shown is before tax and deductions, so your real paycheque may differ. If your work hours are limited, for example by a student permit, always confirm the current rules on the official [IRCC off-campus work page](https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/work-off-campus.html).

## Copyright

&copy; 2026 David Olasunkanmi. All rights reserved.

## Author

David Olasunkanmi