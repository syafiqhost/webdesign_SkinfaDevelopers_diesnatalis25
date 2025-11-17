(function() {
    "use strict";
    // Helper - format number to Indonesian rupiah style with dots
    function fmtRupiah(n) {
        if (n === null || n === undefined || isNaN(n)) return 'Rp 0';
        const s = Math.floor(n).toString();
        return 'Rp ' + s.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    function unfmt(s) {
        if (!s) return 0;
        return Number(String(s).replace(/[^0-9]/g, '')) || 0;
    }
    // Apply money input formatting (adds dots while typing)
    function applyMoneyFormatting(el) {
        el.addEventListener('input', function(e) {
            const caret = el.selectionStart;
            const raw = unfmt(el.value);
            el.value = raw === 0 ? '0' : raw.toLocaleString('id-ID');
            try { el.selectionStart = el.selectionEnd = caret; } catch (e) {}
        });
        // initialize
        el.value = (el.value && unfmt(el.value)) ? Number(unfmt(el.value)).toLocaleString('id-ID') : '0';
    }
    // --- Budget Planner ---
    const incomeEl = document.getElementById('income');
    const expensesList = document.getElementById('expenses-list');
    const addExpenseBtn = document.getElementById('add-expense');
    const calcBudgetBtn = document.getElementById('calc-budget');
    const totalExpEl = document.getElementById('total-exp');
    const sisaEl = document.getElementById('sisa');
    const sisaPctEl = document.getElementById('sisa-pct');
    const budgetAdvice = document.getElementById('budget-advice');
    const budgetResult = document.getElementById('budget-result');

    function getExpenseRows() {
        return Array.from(expensesList.querySelectorAll('.expense-row'));
    }

    function createExpenseRow(name = '', val = 0) {
        const row = document.createElement('div');
        row.className = 'form-row expense-row';
        const nameInput = document.createElement('input');
        nameInput.className = 'form-input expense-name';
        nameInput.value = name;
        const valInput = document.createElement('input');
        valInput.className = 'form-input money expense-value';
        valInput.value = Number(val).toLocaleString('id-ID');
        const del = document.createElement('button');
        del.className = 'btn small remove-expense';
        del.textContent = 'Hapus';
        del.addEventListener('click', () => { row.remove(); });
        row.appendChild(nameInput);
        row.appendChild(valInput);
        row.appendChild(del);
        applyMoneyFormatting(valInput);
        return row;
    }
    // init money formatting
    document.querySelectorAll('#finance-widgets .money').forEach(applyMoneyFormatting);
    addExpenseBtn.addEventListener('click', () => {
        const row = createExpenseRow('Lainnya', 0);
        expensesList.appendChild(row);
    });
    calcBudgetBtn.addEventListener('click', () => {
        const income = unfmt(incomeEl.value);
        const expenses = getExpenseRows().map(r => unfmt(r.querySelector('.expense-value').value));
        const totalExp = expenses.reduce((a, b) => a + b, 0);
        const sisa = Math.max(0, income - totalExp);
        const pct = income > 0 ? Math.round((sisa / income) * 100) : 0;
        totalExpEl.textContent = fmtRupiah(totalExp);
        sisaEl.textContent = fmtRupiah(sisa);
        sisaPctEl.textContent = pct + '%';
        budgetResult.style.display = 'block';
        // Advice logic
        budgetAdvice.innerHTML = '';
        if (pct >= 20) {
            budgetAdvice.innerHTML = '<div class="advice good">Bagus! Tabungan kamu sudah di atas 20%.</div>';
        } else if (pct >= 10) {
            budgetAdvice.innerHTML = '<div class="advice">Cukup, tapi coba tingkatkan tabungan hingga 20%.</div>';
        } else {
            budgetAdvice.innerHTML = '<div class="advice">Coba kurangi pengeluaran hiburan jadi 10% atau potong pengeluaran lain.</div>';
        }
    });
    // --- Savings Goal ---
    const targetAmountEl = document.getElementById('target-amount');
    const targetMonthsEl = document.getElementById('target-months');
    const calcTargetBtn = document.getElementById('calc-target');
    const targetResult = document.getElementById('target-result');
    const perMonthEl = document.getElementById('per-month');
    const chosenIconEl = document.getElementById('chosen-icon');
    const iconChoices = document.querySelectorAll('.icon-choice');
    const simulateBtn = document.getElementById('simulate-savings');
    const resetSavingsBtn = document.getElementById('reset-savings');
    const targetProgress = document.getElementById('target-progress');
    let chosenIcon = '';
    iconChoices.forEach(b => {
        b.addEventListener('click', () => {
            iconChoices.forEach(x => x.classList.remove('active'));
            b.classList.add('active');
            chosenIcon = b.dataset.icon;
        });
    });
    calcTargetBtn.addEventListener('click', () => {
        const target = unfmt(targetAmountEl.value);
        const months = Math.max(1, Number(targetMonthsEl.value) || 1);
        const perMonth = Math.ceil(target / months);
        perMonthEl.textContent = fmtRupiah(perMonth);
        chosenIconEl.textContent = chosenIcon;
        targetResult.style.display = 'block';
        // reset progress
        targetProgress.style.width = '0%';
    });
    simulateBtn.addEventListener('click', () => {
        const target = unfmt(targetAmountEl.value);
        const perMonth = unfmt(perMonthEl.textContent);
        if (!target || !perMonth) { alert('Isi target dan hitung dulu.'); return; }
        // animate progress: simulate 12 steps or months
        let saved = 0;
        let months = 0;
        const steps = 12; // preview 12 steps animation
        const stepVal = Math.min(perMonth, target);
        const interval = setInterval(() => {
            months++;
            saved += stepVal;
            if (saved > target) saved = target;
            const pct = Math.min(100, Math.round((saved / target) * 100));
            targetProgress.style.width = pct + '%';
            if (saved >= target || months >= steps) { clearInterval(interval); }
        }, 400);
    });
    resetSavingsBtn.addEventListener('click', () => {
        targetProgress.style.width = '0%';
        targetResult.style.display = 'none';
        document.querySelectorAll('.icon-choice').forEach(x => x.classList.remove('active'));
        chosenIcon = '';
    });
    // --- Investment Calculator ---
    const investPrincipal = document.getElementById('invest-principal');
    const investRate = document.getElementById('invest-rate');
    const investYears = document.getElementById('invest-years');
    const calcInvestBtn = document.getElementById('calc-invest');
    const investResult = document.getElementById('invest-result');
    const finalAmountEl = document.getElementById('final-amount');
    const profitAmountEl = document.getElementById('profit-amount');
    const investChartCanvas = document.getElementById('invest-chart');
    let investChart = null;
    applyMoneyFormatting(investPrincipal);
    calcInvestBtn.addEventListener('click', () => {
        const P = unfmt(investPrincipal.value);
        const r = Number(investRate.value) / 100;
        const years = Number(investYears.value);
        if (!P || !years) { alert('Isi modal dan durasi.'); return; }
        // compound yearly: A = P*(1+r)^n
        const final = P * Math.pow(1 + r, years);
        const profit = final - P;
        finalAmountEl.textContent = fmtRupiah(final);
        profitAmountEl.textContent = fmtRupiah(profit);
        investResult.style.display = 'block';
        // Build dataset for chart: yearly values
        const labels = [];
        const data = [];
        for (let y = 0; y <= years; y++) {
            labels.push(y + '');
            data.push(Math.round(P * Math.pow(1 + r, y)));
        }
        if (investChart) investChart.destroy();
        investChart = new Chart(investChartCanvas.getContext('2d'), {
            type: 'line',
            data: { labels: labels, datasets: [{ label: 'Nilai Investasi', data: data, fill: true, tension: 0.3 }] },
            options: {
                animation: { duration: 1200, easing: 'easeOutQuart' },
                scales: { y: { ticks: { callback: val => fmtRupiah(val) } } }
            }
        });
    });
    document.getElementById('reset-invest').addEventListener('click', () => {
        investPrincipal.value = '0';
        investRate.value = '8';
        investYears.value = '5';
        investResult.style.display = 'none';
        if (investChart) investChart.destroy();
    });
    // --- Quiz ---
    const quizQuestions = [
        { q: 'Berapa persen minimal target tabungan ideal menurut banyak saran keuangan?', choices: ['5%', '20%', '40%', '60%'], answer: 1, explain: 'Banyak pakar menyarankan menabung minimal 20% dari pendapatan.' },
        { q: 'Jika kamu punya utang dengan bunga tinggi, apa langkah terbaik?', choices: ['Investasi lebih dulu', 'Bayar utang bunga tinggi', 'Tabung untuk liburan', 'Beli barang baru'], answer: 1, explain: 'Bayar utang berbunga tinggi mengurangi beban bunga di masa depan.' },
        { q: 'Apa yang dimaksud diversifikasi investasi?', choices: ['Menyimpan uang di rumah', 'Membagi investasi ke beberapa jenis aset', 'Meminjam uang untuk investasi', 'Menjual semua aset'], answer: 1, explain: 'Diversifikasi mengurangi risiko dengan menyebar investasi ke beberapa aset.' },
        { q: 'Apa fungsi dana darurat?', choices: ['Untuk belanja besar', 'Untuk biaya tak terduga', 'Untuk membayar cicilan liburan', 'Untuk spekulasi saham'], answer: 1, explain: 'Dana darurat untuk kejadian tak terduga seperti sakit atau kehilangan pekerjaan.' },
        { q: 'Investasi jangka panjang paling cocok untuk?', choices: ['Spekulasi harian', 'Menabung untuk pensiun', 'Menang lomba trading', 'Mencari hasil cepat dalam minggu'], answer: 1, explain: 'Investasi jangka panjang cocok untuk tujuan seperti pensiun atau rumah.' }
    ];
    let qIndex = 0,
        score = 0;
    const qTotal = quizQuestions.length;
    const qIndexEl = document.getElementById('q-index');
    const qTotalEl = document.getElementById('q-total');
    const quizQuestionEl = document.getElementById('quiz-question');
    const quizChoicesEl = document.getElementById('quiz-choices');
    const nextQBtn = document.getElementById('next-question');
    const restartQuizBtn = document.getElementById('restart-quiz');
    const quizProgressBar = document.getElementById('quiz-progress');
    const quizResultEl = document.getElementById('quiz-result');
    qTotalEl.textContent = qTotal;

    function renderQuestion() {
        const data = quizQuestions[qIndex];
        qIndexEl.textContent = qIndex + 1;
        quizQuestionEl.textContent = data.q;
        quizChoicesEl.innerHTML = '';
        data.choices.forEach((c, i) => {
            const div = document.createElement('div');
            div.className = 'choice';
            div.textContent = c;
            div.dataset.index = i;
            div.addEventListener('click', () => selectChoice(div));
            quizChoicesEl.appendChild(div);
        });
        nextQBtn.disabled = true;
        quizProgressBar.style.width = Math.round((qIndex / qTotal) * 100) + '%';
    }

    function selectChoice(div) {
        // prevent reselect
        if (div.classList.contains('disabled')) return;
        // mark choices disabled
        Array.from(quizChoicesEl.children).forEach(ch => ch.classList.add('disabled'));
        const chosen = Number(div.dataset.index);
        const correct = quizQuestions[qIndex].answer;
        if (chosen === correct) {
            div.classList.add('correct');
            score++;
        } else {
            div.classList.add('wrong');
            quizChoicesEl.children[correct].classList.add('correct');
        }
        // show explanation
        const ex = document.createElement('div');
        ex.className = 'light-gray mt-8';
        ex.textContent = quizQuestions[qIndex].explain;
        quizChoicesEl.appendChild(ex);
        nextQBtn.disabled = false;
    }
    nextQBtn.addEventListener('click', () => {
        qIndex++;
        if (qIndex >= qTotal) { showQuizResult(); return; }
        renderQuestion();
    });

    function showQuizResult() {
        quizQuestionEl.textContent = '';
        quizChoicesEl.innerHTML = '';
        quizResultEl.style.display = 'block';
        quizResultEl.innerHTML = `<div class=\"result-line\">Skor akhir: <strong>${score}/${qTotal}</strong></div>`;
        quizResultEl.innerHTML += '<div class="light-gray mt-8">Terima kasih sudah mengikuti quiz. Lihat penjelasan tiap soal untuk belajar lebih lanjut.</div>';
        quizProgressBar.style.width = '100%';
    }
    restartQuizBtn.addEventListener('click', () => {
        qIndex = 0;
        score = 0;
        quizResultEl.style.display = 'none';
        renderQuestion();
    });
    // Initialize first question
    renderQuestion();
})();