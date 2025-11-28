        const messagesContainer = document.getElementById("chat-messages");
        const inputField = document.getElementById("input-field");
        const sendButton = document.getElementById("send-btn");
        const chatbot = document.getElementById("chatbot");
        const chatToggle = document.getElementById("chat-toggle");
        const faqData = [
            // 🔹 Edukasi Sampah Bijak
            {
                keywords: ["apa itu sampah bijak", "sampah bijak", "program sampah bijak"],
                response: "Sampah Bijak adalah gerakan edukasi untuk membantu masyarakat memilah, mengolah, dan membuang sampah dengan benar agar lingkungan menjadi lebih bersih dan berkelanjutan."
            },
            {
                keywords: ["cara memilah sampah", "pilah sampah", "jenis sampah"],
                response: "Sampah dibagi menjadi 3 kategori utama: Organik (sisa makanan/daun), Anorganik (plastik, botol, kertas), dan B3 (baterai, lampu, kaleng cat). Pisahkan sejak dari rumah ya! 😉"
            },
            {
                keywords: ["apa itu 3r", "reduce reuse recycle", "3r"],
                response: "3R adalah konsep Reduce (mengurangi), Reuse (menggunakan kembali), dan Recycle (mendaur ulang). Konsep ini membantu mengurangi jumlah sampah yang berakhir di TPA."
            },
            {
                keywords: ["apa itu bank sampah", "bank sampah", "jual sampah"],
                response: "Bank sampah adalah tempat dimana sampah anorganik seperti botol plastik, kardus, atau logam bisa ditabung dan ditukar menjadi uang atau poin."
            },
            {
                keywords: ["boleh bakar sampah", "bakar sampah", "bahaya bakar sampah"],
                response: "Membakar sampah sangat tidak disarankan karena menghasilkan zat beracun seperti dioksin yang berbahaya bagi paru-paru dan lingkungan."
            },
            {
                keywords: ["dampak sampah", "sampah ke laut", "bahaya sampah"],
                response: "Sampah yang tidak dikelola bisa mencemari tanah, air, udara, dan membahayakan hewan. Contohnya, plastik di laut bisa membunuh ikan, penyu, dan burung laut."
            },
            {
                keywords: ["kompos", "cara kompos", "organik"],
                response: "Kompos adalah proses mengubah sampah organik seperti sisa makanan, sayur, atau daun menjadi pupuk alami yang bermanfaat untuk tanaman."
            },
            {
                keywords: ["plastik", "bahaya plastik", "plastik daur ulang"],
                response: "Plastik membutuhkan ratusan tahun untuk terurai. Sebaiknya kurangi penggunaan plastik sekali pakai dan pilih alternatif ramah lingkungan."
            },
            {
                keywords: ["halo", "hai", "hello", "permisi", "hi"],
                response: "Halo 👋 Ada yang bisa aku bantu tentang cara mengelola sampah dengan bijak?"
            },
            {
                keywords: ["terima kasih", "makasih"],
                response: "Sama-sama! Semoga informasi ini bermanfaat 🌿"
            },
            {
                keywords: ["siapa kamu", "kamu siapa"],
                response: "Saya adalah Chatbot SampahBijak 🤖 yang dibuat oleh Skinfa Developers untuk membantu edukasi lingkungan!"
            },
            {
                keywords: ["nama perusahaan", "bisnis", "apa nama perusahaan", "apa nama bisnis", "nama"],
                response: "Nama perusahaan kami adalah SampahBijak dibuat oleh Skinfa Developers dalam Partisipasi Lomba Web Design Intechfest."
            }, {
                keywords: ["layanan", "apa layanan", "produk", "jenis produk"],
                response: "Kami menyediakan layanan edukasi Sampah Bijak, dengan Fitur & Ebook menarik, serta tips menabung dan investasi."
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