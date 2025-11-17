   particlesJS("particles-js", {
       particles: {
           number: {
               value: 100,
               density: {
                   enable: true,
                   value_area: 800
               }
           },
           color: {
               value: "#6bcc0e"
           },
           shape: {
               type: "circle",
               stroke: {
                   width: 0,
                   color: "#000000"
               }
           },
           opacity: {
               value: 0.6,
               random: true
           },
           size: {
               value: 5,
               random: true
           },
           line_linked: {
               enable: true,
               distance: 120,
               color: "#6bcc0e",
               opacity: 0.4,
               width: 1
           },
           move: {
               enable: true,
               speed: 2.5,
               direction: "none",
               random: false,
               straight: false,
               out_mode: "out"
           }
       },
       interactivity: {
           detect_on: "canvas",
           events: {
               onhover: {
                   enable: true,
                   mode: "grab"
               },
               onclick: {
                   enable: true,
                   mode: "push"
               }
           },
           modes: {
               grab: {
                   distance: 140,
                   line_linked: {
                       opacity: 1
                   }
               },
               push: {
                   particles_nb: 4
               }
           }
       },
       retina_detect: true
   });

   window.addEventListener('load', function() {
       const toggle = document.getElementById('music-toggle');
       const music = document.getElementById("bg-music");
       const icon = document.getElementById("music-icon");

       if (window.innerWidth <= 768) {
           music.play().catch(() => console.log("Autoplay mungkin diblokir, tunggu interaksi"));
           return;
       }

       toggle.addEventListener('click', function() {
           if (music.paused) {
               music.play().catch(() => console.log("Klik dulu untuk autoplay"));
               icon.classList.remove("bi-volume-mute");
               icon.classList.add("bi-volume-up");
           } else {
               music.pause();
               icon.classList.remove("bi-volume-up");
               icon.classList.add("bi-volume-mute");
           }
       });

       function tryPlay() {
           music.play().catch(() => console.log("Autoplay gagal, tunggu interaksi"));
       }
       ['click', 'scroll', 'mousemove'].forEach(ev => {
           document.addEventListener(ev, tryPlay, { once: true });
       });
   });


   document.addEventListener("DOMContentLoaded", function() {
       const bar = document.getElementById("loading-bar");
       let width = 0;
       let fakeLoading = setInterval(() => {
           if (width < 90) {
               width += Math.random() * 10;
               bar.style.width = width + "%";
           }
       }, 200);

       window.addEventListener("load", () => {
           clearInterval(fakeLoading);
           bar.style.width = "100%";
           setTimeout(() => {
               bar.style.opacity = "0";
               setTimeout(() => bar.style.display = "none", 300);
           }, 500);
       });
   });