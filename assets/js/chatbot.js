        const messagesContainer = document.getElementById("chat-messages");
        const inputField = document.getElementById("input-field");
        const sendButton = document.getElementById("send-btn");
        const chatbot = document.getElementById("chatbot");
        const chatToggle = document.getElementById("chat-toggle");
        const faqData = [
            // 🔹 Edukasi Sampah Bijak
            {
                keywords: ["edukasi Sampah Bijak", "Sampah Bijak", "belajar Sampah Bijak", "keuangan pribadi", "literasi Sampah Bijak"],
                response: "Edukasi Sampah Bijak adalah proses belajar mengelola uang, memahami cara menabung, berinvestasi, dan menggunakan uang dengan bijak agar masa depan lebih terjamin."
            }, {
                keywords: ["investasi", "apa itu investasi", "cara investasi", "investasi pemula", "mulai investasi", "investasi"],
                response: "Investasi adalah cara mengembangkan uang dengan menaruh dana di instrumen seperti emas, saham, reksa dana, atau deposito. Untuk pemula, bisa mulai dengan reksa dana atau emas."
            }, {
                keywords: ["kenapa harus nabung", "pentingnya menabung", "alasan menabung", "nabung", "tabung"],
                response: "Menabung penting agar punya dana darurat, bisa capai tujuan Sampah Bijak, dan menghindari utang yang tidak perlu. Tips menabung: tetapkan tujuan, sisihkan minimal 10% dari pendapatan, gunakan rekening khusus tabungan, dan hindari pengeluaran yang tidak perlu"
            }, {
                keywords: ["utang", "pinjaman", "cara mengelola utang", "utang baik", "utang buruk", "hutang"],
                response: "Utang ada dua jenis: utang baik (misalnya untuk pendidikan atau usaha produktif) dan utang buruk (seperti pinjaman konsumtif). Pastikan cicilan utang tidak melebihi 30% dari penghasilan."
            }, {
                keywords: ["asuransi", "apa itu asuransi", "fungsi asuransi", "perlu asuransi"],
                response: "Asuransi adalah perlindungan keuangan dari risiko yang tidak terduga, seperti sakit atau kecelakaan. Dengan asuransi, beban biaya bisa lebih ringan."
            }, {
                keywords: ["darurat", "dana darurat", "apa itu dana darurat", "uang darurat", "tabungan darurat"],
                response: "Dana darurat adalah tabungan khusus untuk kebutuhan mendesak, seperti sakit atau kehilangan pekerjaan. Idealnya sebesar 3–6 kali pengeluaran bulanan."
            }, {
                keywords: ["budgeting", "anggaran", "cara buat anggaran", "mengatur keuangan", "atur uang bulanan"],
                response: "Buat budgeting dengan metode 50/30/20: 50% untuk kebutuhan pokok, 30% untuk keinginan, dan 20% untuk tabungan atau investasi."
            }, {
                keywords: ["pensiun", "persiapan pensiun", "tabungan pensiun", "cara menyiapkan pensiun"],
                response: "Persiapan pensiun sebaiknya dimulai sejak dini. Sisihkan dana setiap bulan ke tabungan pensiun atau investasi jangka panjang agar hari tua lebih tenang."
            },
            // 🔹 Info perusahaan
            {
                keywords: ["nama perusahaan", "bisnis", "apa nama perusahaan", "apa nama bisnis", "nama"],
                response: "Nama perusahaan kami adalah SampahBijak dibuat oleh Syafiq Bamazruk dalam Partisipasi Lomba Web Design Intechfest."
            }, {
                keywords: ["layanan", "apa layanan", "produk", "jenis produk"],
                response: "Kami menyediakan layanan edukasi Sampah Bijak, perencanaan keuangan, serta tips menabung dan investasi."
            }, {
                keywords: ["alamat", "lokasi", "dimana perusahaan", "letak", "jalan"],
                response: "Kami berlokasi di Jl Sechmagelung Kejaksan Kota Cirebon Jawa Barat."
            }, {
                keywords: ["hubungi", "kontak", "cara menghubungi", "informasi kontak"],
                response: "Anda bisa menghubungi kami melalui WhatsApp, email, atau halaman kontak di website SampahBijak."
            }, {
                keywords: ["jam buka", "jam operasional", "buka jam berapa", "jam kerja", "jam layanan", "jam buka kantor", "buka hari apa saja"],
                response: "Kami buka Senin–Jumat pukul 08:00–20:00, dan untuk konsultasi online bisa janjian lebih fleksibel."
            }, {
                keywords: ["membantu", "bantu", "menolong", "tolong", "nolong"],
                response: "Tentu! Saya siap membantu menjawab pertanyaan Anda seputar edukasi Sampah Bijak."
            },
            // 🔹 Keyword umum
            {
                keywords: ["halo", "hai", "hello", "permisi", "assalamualaikum", "woi", "hi", "ok"],
                response: "Halo! 👋 Ada yang bisa saya bantu terkait Sampah Bijak Anda?"
            }, {
                keywords: ["mau tanya", "ingin tanya", "boleh tanya", "saya mau tanya", "nanya", "tanya"],
                response: "Silakan, apa yang ingin Anda tanyakan? 😊"
            }, {
                keywords: ["apa kabar", "kabarnya gimana", "kabar"],
                response: "Alhamdulillah, baik! Semoga Anda juga dalam keadaan sehat ya."
            }, {
                keywords: ["terima kasih", "thanks", "makasih", "terimakasih"],
                response: "Sama-sama! Senang bisa membantu Anda. 🙏"
            }, {
                keywords: ["fitur apa saja", "ada fitur apa", "fitur"],
                response: `Berikut fitur-fitur SampahBijak: 
1. Kalkulator Perencanaan Anggaran Pintar
2. Tabungan Tujuan Impian
3. Quiz Edukasi Sampah Bijak
4. Kalkulator Investasi Cerdas`
            }, {
                keywords: ["siapa kamu", "kamu siapa", "bot apa ini", "siapa"],
                response: "Saya adalah chatbot SampahBijak 🤖 yang diciptakan oleh Syafiq Bamazruk, siap membantu Anda dalam hal edukasi Sampah Bijak."
            }
        ];

        function addMessage(text, sender) {
            const message = document.createElement("div");
            message.classList.add("message");
            if (sender === "user") message.classList.add("parker");
            message.textContent = text;
            messagesContainer.appendChild(message);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function getResponse(userInput) {
            userInput = userInput.trim();
            const emojiOnly = /^[\p{Emoji}\s]+$/u;
            if (emojiOnly.test(userInput)) {
                return `${userInput} Mantap emotenya! Ada pertanyaan seputar SampahBijak yang bisa saya bantu?`;
            }
            const lowerInput = userInput.toLowerCase();
            for (const faq of faqData) {
                for (const keyword of faq.keywords) {
                    if (lowerInput.includes(keyword.toLowerCase())) {
                        return faq.response;
                    }
                }
            }
            return "Maaf, saya tidak mengerti pertanyaan Anda. Silakan bertanya seputar SampahBijak.";
        }
        sendButton.addEventListener("click", () => {
            const userInput = inputField.value.trim();
            if (userInput === "") return;
            addMessage(userInput, "user");
            inputField.value = "";
            const response = getResponse(userInput);
            setTimeout(() => {
                addMessage(response, "bot");
            }, 600);
        });
        inputField.addEventListener("keypress", (e) => {
            if (e.key === "Enter") sendButton.click();
        });
        chatToggle.addEventListener("click", () => {
            const show = (chatbot.style.display === "none" || chatbot.style.display === "");
            chatbot.style.display = show ? "block" : "none";
            if (show) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
                inputField.focus({
                    preventScroll: true
                });
            }
        });
        window.addEventListener("load", () => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });
        const micButton = document.querySelector(".fa-microphone");
        micButton.addEventListener("click", () => {
            if (!('webkitSpeechRecognition' in window)) {
                alert("Speech Recognition tidak didukung di browser ini");
                return;
            }
            const recognition = new webkitSpeechRecognition();
            recognition.lang = "id-ID";
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.start();
            micButton.style.color = "red";
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                inputField.value += transcript;
            };
            recognition.onerror = (event) => {
                console.error("Speech recognition error:", event.error);
            };
            recognition.onend = () => {
                micButton.style.color = "#666";
            };
        });
        const emojiButton = document.querySelector(".fa-laugh-beam");
        const inputContainer = document.querySelector(".input");
        const picker = document.querySelector("emoji-picker");
        emojiButton.addEventListener("click", (e) => {
            e.stopPropagation();
            picker.style.display = picker.style.display === "block" ? "none" : "block";
        });
        picker.addEventListener("emoji-click", event => {
            inputField.value += event.detail.unicode;
            inputField.focus();
        });
        // tutup emoji picker kalau klik di luar
        document.addEventListener("click", (e) => {
            if (!inputContainer.contains(e.target)) {
                picker.style.display = "none";
            }
        });
        // WIB 
        function updateLocalWIBTime() {
            const now = new Date();
            const utc = now.getTime() + now.getTimezoneOffset() * 60000;
            const wibDate = new Date(utc + (7 * 60 * 60 * 1000));
            const hours = String(wibDate.getHours()).padStart(2, '0');
            const minutes = String(wibDate.getMinutes()).padStart(2, '0');
            const display = document.getElementById('time-display');
            display.textContent = `Sekarang Jam ${hours}:${minutes} WIB`;
        }
        window.addEventListener('DOMContentLoaded', () => {
            updateLocalWIBTime();
            setInterval(updateLocalWIBTime, 60000);
        });
        const chipsContainer = document.getElementById("suggested-chips");
        let isDown = false;
        let startX;
        let scrollLeft;
        let isDragging = false;
        // Event gabungan: mouse & touch
        function startDrag(e) {
            isDown = true;
            isDragging = false;
            startX = e.type.includes("touch") ? e.touches[0].pageX : e.pageX;
            scrollLeft = chipsContainer.scrollLeft;
            chipsContainer.style.cursor = "grabbing";
        }

        function endDrag(e) {
            chipsContainer.style.cursor = "grab";
            if (!isDragging && !e.type.includes("touch")) {
                const chip = e.target.closest(".chip");
                if (chip) {
                    inputField.value = chip.textContent;
                    sendButton.click();
                }
            }
            isDown = false;
        }

        function moveDrag(e) {
            if (!isDown) return;
            e.preventDefault();
            const x = e.type.includes("touch") ? e.touches[0].pageX : e.pageX;
            const walk = (x - startX) * 1.5;
            if (Math.abs(walk) > 5) isDragging = true;
            chipsContainer.scrollLeft = scrollLeft - walk;
        }
        chipsContainer.addEventListener("mousedown", startDrag);
        chipsContainer.addEventListener("mouseup", endDrag);
        chipsContainer.addEventListener("mouseleave", endDrag);
        chipsContainer.addEventListener("mousemove", moveDrag);
        chipsContainer.addEventListener("touchstart", startDrag, {
            passive: false
        });
        chipsContainer.addEventListener("touchend", endDrag);
        chipsContainer.addEventListener("touchmove", moveDrag, {
            passive: false
        });

        function getResponse(userInput) {
            userInput = userInput.trim();
            const emojiOnly = /^[\p{Emoji}\s]+$/u;
            if (emojiOnly.test(userInput)) {
                return `${userInput} Mantap emotenya! Ada pertanyaan seputar SampahBijak yang bisa saya bantu?`;
            }
            const lowerInput = userInput.toLowerCase();
            for (const faq of faqData) {
                for (const keyword of faq.keywords) {
                    if (lowerInput.includes(keyword.toLowerCase())) {
                        return faq.response;
                    }
                }
            }
            return "Maaf, saya tidak mengerti pertanyaan Anda. Silakan bertanya seputar SampahBijak.";
        }