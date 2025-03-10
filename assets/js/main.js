(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        const yearSpan = document.getElementById("current-year");
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();

        const themeToggle = document.getElementById("theme-toggle");
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme) {
            document.body.classList.add(savedTheme);
            themeToggle.textContent = savedTheme === "light-mode" ? "🌞" : "🌙";
        } else {
            themeToggle.textContent = document.body.classList.contains("light-mode") ? "🌞" : "🌙";
        }

        themeToggle?.addEventListener("click", function () {
            document.body.classList.toggle("light-mode");
            const theme = document.body.classList.contains("light-mode") ? "light-mode" : "";
            localStorage.setItem("theme", theme);
            themeToggle.textContent = theme ? "🌞" : "🌙";
        });

        const modalHandler = function (modalId, triggerId) {
            const modal = document.getElementById(modalId);
            const trigger = document.getElementById(triggerId);
            if (!modal || !trigger) return;

            const closeModal = modal.querySelector(".close");
            const skillLevels = modal.querySelectorAll(".skill-level");

            const open = function () {
                modal.classList.add("active");
                skillLevels.forEach((bar) => {
                    const targetWidth = getComputedStyle(bar).getPropertyValue("--target-width");
                    bar.style.width = targetWidth;
                });
            };

            const close = function () {
                modal.classList.remove("active");
                skillLevels.forEach((bar) => {
                    bar.style.width = "0";
                });
            };

            trigger.addEventListener("click", open);
            closeModal?.addEventListener("click", close);
            window.addEventListener("click", function (event) {
                if (event.target === modal) close();
            });
        };

        modalHandler("modal-roguelike", "open-modal");

        if (typeof AOS !== "undefined") {
            AOS.init({ duration: 1000 });
        } else {
            console.error("AOS library failed to load.");
        }
    });
})();
