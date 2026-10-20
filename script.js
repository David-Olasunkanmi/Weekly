(function () {
    var NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var KEY = "work-hours-week";
    //  limit is blank by default, and there is a rate
    var state = { limit: "", rate: "", days: NAMES.map(function () { return { start: "", end: "", brk: 0 }; }) };

    try {
        var saved = localStorage.getItem(KEY);
        if (saved) {
            var parsed = JSON.parse(saved);
            if (parsed && Array.isArray(parsed.days) && parsed.days.length === 7) state = parsed;
        }
    } catch (e) { }
    // older saved data has no rate
    if (state.rate === undefined) state.rate = "";

    function save() {
        try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { }
    }

    function toMin(t) {
        if (!t) return null;
        var p = t.split(":");
        return parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
    }

    function dayHours(d) {
        var s = toMin(d.start), e = toMin(d.end);
        if (s === null || e === null) return 0;
        var diff = e - s;
        if (diff < 0) diff += 1440; // shift went past midnight
        var mins = diff - (Number(d.brk) || 0);
        return Math.max(0, mins) / 60;
    }

    // formats a number as money
    function money(n) {
        return "$" + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    var daysEl = document.getElementById("days");
    var hrsEls = [];

    NAMES.forEach(function (name, i) {
        var row = document.createElement("div");
        row.className = "row";
        row.innerHTML =
            '<div class="day">' + name + '</div>' +
            '<label>Start<input type="time" data-i="' + i + '" data-f="start"></label>' +
            '<label>End<input type="time" data-i="' + i + '" data-f="end"></label>' +
            '<label>Break (min)<input type="number" min="0" step="5" data-i="' + i + '" data-f="brk"></label>' +
            '<div class="hrs">0.00 h</div>';
        daysEl.appendChild(row);
        hrsEls.push(row.querySelector(".hrs"));
    });

    function fillInputs() {
        var inputs = daysEl.querySelectorAll("input");
        for (var k = 0; k < inputs.length; k++) {
            var el = inputs[k];
            var v = state.days[el.dataset.i][el.dataset.f];
            el.value = (el.dataset.f === "brk" && !v) ? "" : v;
        }
        document.getElementById("limit").value = state.limit || "";
        document.getElementById("rate").value = state.rate; 
    }

    function update() {
        var total = 0;
        state.days.forEach(function (d, i) {
            var h = dayHours(d);
            total += h;
            hrsEls[i].textContent = h.toFixed(2) + " h";
        });

        var limit = Number(state.limit) || 0;   // 0 means no limit
        var rate = parseFloat(state.rate) || 0; 
        var fill = document.getElementById("fill");
        var bar = fill.parentElement;
        var status = document.getElementById("status");
        document.getElementById("total").textContent = total.toFixed(2) + " hours";

        // Only show the bar and status when a limit is set
        if (limit > 0) {
            bar.style.display = "";
            fill.style.width = Math.min(100, (total / limit) * 100) + "%";
            if (total <= limit) {
                fill.style.background = "var(--ok)";
                status.className = "status ok";
                status.textContent = "Within the " + limit + " hour limit. " + (limit - total).toFixed(2) + " hours left.";
            } else {
                fill.style.background = "var(--bad)";
                status.className = "status bad";
                status.textContent = "Over the " + limit + " hour limit by " + (total - limit).toFixed(2) + " hours.";
            }
        } else {
            bar.style.display = "none";
            status.className = "status";
            status.textContent = "";
        }

        // pay math
        var weekPay = total * rate;
        document.getElementById("payWeek").textContent = money(weekPay);
        document.getElementById("payBi").textContent = money(weekPay * 2);
        document.getElementById("payMonth").textContent = money(weekPay * 52 / 12);
    }

    daysEl.addEventListener("input", function (e) {
        var el = e.target;
        if (!el.dataset.f) return;
        state.days[el.dataset.i][el.dataset.f] = el.dataset.f === "brk" ? (parseInt(el.value, 10) || 0) : el.value;
        save(); update();
    });

    document.getElementById("limit").addEventListener("input", function (e) {
        state.limit = Number(e.target.value) || "";
        save(); update();
    });

    // NEW
    document.getElementById("rate").addEventListener("input", function (e) {
        state.rate = e.target.value;
        save(); update();
    });

    document.getElementById("reset").addEventListener("click", function () {
        state.days = NAMES.map(function () { return { start: "", end: "", brk: 0 }; });
        save(); fillInputs(); update();
    });

    fillInputs();
    update();
})();
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}