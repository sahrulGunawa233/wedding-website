document.addEventListener("DOMContentLoaded", () => {
    
    // --- Logika Audio Dihapus ---
    
    // 1. Fungsi Navigasi Sederhana
    const navigateToCore = function () {
        
        // Hapus semua penyimpanan status audio (tidak diperlukan lagi)
        // localStorage.removeItem('audioTime'); 
        // localStorage.removeItem('audioPlaying');
        
        // Logika Navigasi dan Animasi
        let cover = document.getElementById("cover");
        let section = document.getElementById("sectionKecil");

        if (cover) cover.classList.add("fade-out");
        if (section) section.classList.add("slide-out");

        setTimeout(function () {
            window.location.href = "core.html"; // Navigasi ke halaman kedua
        }, 1100); 
    }

    // --- Logika Buka Undangan ---
    let bukaUndangan = document.getElementById("open");
    if (bukaUndangan) {
        // Ganti event listener agar memanggil fungsi navigasi sederhana
        bukaUndangan.addEventListener("click", navigateToCore);
    }
});