# Weekly

 Weekly is simple web app that helps international students track how many hours they work each week and see whether they are within the weekly limit (24 hours by default).

## Features

- Enter start time, end time and unpaid break for each day, Monday to Sunday
- Calculates hours per day and the weekly total
- Shows a progress bar and tells you if you are within or over the limit
- Handles overnight shifts that go past midnight
- Adjustable weekly limit
- Works on desktop and mobile, with light and dark mode
- Entries are saved in your own browser (localStorage), so nothing is sent to a server

## How it works

For each day, the app subtracts the start time from the end time. If the result is negative, the shift crossed midnight, so 24 hours is added. The unpaid break is then subtracted, and all days are added together and compared to the limit.

## Tech

HTML, CSS and vanilla JavaScript in a single file. No frameworks or dependencies.

## Run it locally

Download `index.html` and open it in any browser.

## Disclaimer

This tool is only a calculator. The 24 hour limit applies during regular academic sessions, and rules can change. Always confirm the current rules on the official [IRCC off-campus work page](https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/work-off-campus.html).

## Copyright

&copy; 2026 David Olasunkanmi. All rights reserved.

## Author

David Olasunkanmi
