document.addEventListener("DOMContentLoaded", () => {
    
    // --- Audio Initialization (Auto-Play) ---
    const audio = document.getElementById("myAudio");
    const playButton = document.getElementById("playButton");
    
    // 1. Coba Putar Audio Secara Otomatis
    audio.play().then(() => {
        // Berhasil diputar: Atur ikon ke PAUSE
        playButton.classList.add("playing");
        playButton.classList.remove("paused");
    }).catch(error => {
        // Gagal (Autoplay diblokir): Atur ikon ke PLAY
        console.log("Autoplay diblokir, menunggu interaksi pengguna.");
        playButton.classList.remove("playing");
        playButton.classList.add("paused");
    });


    // 2. Kontrol Tombol Audio
    playButton.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playButton.classList.add("playing");
            playButton.classList.remove("paused");
        } else {
            audio.pause();
            playButton.classList.add("paused");
            playButton.classList.remove("playing");
        }
    });

    // --- Flipdown Timer Initialization ---
    // Ganti nilai ini dengan UNIX Timestamp acara Anda (misalnya 1766947200 untuk 27 Des 2025)
    let timer_ = 1766966400; // DIUBAH menjadi 27 Desember 2025 00:00:00 UTC
    let flipdown = new FlipDown(timer_);
    flipdown.start();
    flipdown.ifEnded(() => {
        document.querySelector(".flipdown").innerHTML = `<h2>Timer end</h2>`;
    });

    // --- Animation Setup using Intersection Observer ---
    const animateElements = document.querySelectorAll('.will-animate');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // --- Sisa kode JS Anda (RSVP) ---
    function scrollToTop() {
        const container = document.getElementById("submittedData");
        // PERBAIKAN: Gunakan top: 0 untuk menggulir ke paling atas
        container.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    }

    const data = [
        { name: "Bari", status: "Hadir", message: "Selamat Ya" },
        { name: "Ali", status: "Tidak Hadir", message: "Maaf, tidak bisa hadir" },
        { name: "Sara", status: "Hadir", message: "Semoga bahagia selalu" },
    ];

    const submittedDataDiv = document.getElementById("submittedData");
    
    // Mengisi data awal (menggunakan prepend agar urutan sesuai CSS)
    data.forEach(item => {
        const newItem = document.createElement("div");
        newItem.classList.add("submitted-item");

        newItem.innerHTML = `
            <h3>${item.name} (${item.status})</h3>
            <p>${item.message}</p>
        `;
        submittedDataDiv.prepend(newItem); 
    });


    document.getElementById("rsvpForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const attendanceInput = document.querySelector(
            'input[name="attendance"]:checked'
        );
        
        if (!attendanceInput) {
             alert("Mohon konfirmasi kehadiran Anda.");
             return;
        }

        const attendance = attendanceInput.value;
        const message = document.getElementById("message").value;

        const newItem = document.createElement("div");
        newItem.classList.add("submitted-item");

        newItem.innerHTML = `
        <h3>${name} (${attendance})</h3>
        <p>${message}</p>
        `;
        
        submittedDataDiv.prepend(newItem); 

        document.getElementById("rsvpForm").reset();
        scrollToTop(); 
    });
    
    // Panggil showSlide sekali untuk inisialisasi awal jika ada elemen .mySlide
    if (document.querySelectorAll(".mySlide").length > 0) {
        showSlide(globalSlideIndex);
    }
});

// --- Slideshow (Fungsi Slideshow harus di scope global agar bisa diakses dari tombol HTML) ---

let globalSlideIndex = 1;

function showSlide(n) {
    let slides = document.querySelectorAll(".mySlide");
    if (slides.length === 0) return;

    if (n > slides.length) {
        globalSlideIndex = 1;
    } else if (n < 1) {
        globalSlideIndex = slides.length;
    }

    slides.forEach(slide => {
        slide.style.display = "none";
    });

    slides[globalSlideIndex - 1].style.display = "block";
}

function plusSlide(n) {
    globalSlideIndex += n;
    showSlide(globalSlideIndex);
}