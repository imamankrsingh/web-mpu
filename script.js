/* Basic interactivity for MPU demo site */
document.addEventListener("DOMContentLoaded", () => {
    // Hamburger toggle (mobile)
    const hamburger = document.getElementById("hamburger");
    const mainNav = document.getElementById("mainNav");
    if (hamburger && mainNav) {
      hamburger.addEventListener("click", () => {
        // toggle show of links for mobile (simple)
        mainNav.classList.toggle("open");
        // show/hide links (simple approach: toggle display)
        const links = mainNav.querySelectorAll("a, .btn");
        links.forEach((l) => {
          if (window.innerWidth < 640) {
            l.style.display =
              l.style.display === "inline-block" ? "none" : "inline-block";
          } else {
            l.style.display = "inline-block";
          }
        });
      });
    }
    // Search (index)
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    if (searchBtn && searchInput) {
      searchBtn.addEventListener("click", () => {
        const q = searchInput.value.trim().toLowerCase();
        if (!q) {
          alert('Please type a keyword to search (e.g., "computer")');
          return;
        }
        // very simple search: if matches course name, go to courses page and filter
        // store query in sessionStorage for courses page to pick up
        sessionStorage.setItem("mpu_search", q);
        window.location.href = "courses.html";
      });
    }
    // Virtual tour button (opens external or modal)
    const openTour = document.getElementById("openTour");
    if (openTour) {
      openTour.addEventListener("click", () => {
        // Replace URL with actual campus tour link when available
        window.open(
          "https://www.youtube.com/results?search_query=virtual+campus+tour",
          "_blank"
        );
      });
    }
    // Admissions form validation + pseudo-submit
    const admissionForm = document.getElementById("admissionForm");
    if (admissionForm) {
      admissionForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const course = document.getElementById("courseSelect").value;
  
        const msg = document.getElementById("formMsg");
        if (!fullname || !email || !phone || !course) {
          msg.textContent = "Please fill all required fields (*)";
          return;
        }
        // basic email and phone check
        if (!/.+@.+\..+/.test(email)) {
          msg.textContent = "Please enter a valid email.";
          return;
        }
        if (!/^\+?\d{10,15}$/.test(phone.replace(/\s+/g, ""))) {
          msg.textContent = "Please enter a valid phone number.";
          return;
        }
  
        // fake submit: show success and reset
        msg.textContent = "Submitting...";
        setTimeout(() => {
          msg.textContent =
            "Application submitted successfully. We will contact you at " + email;
          admissionForm.reset();
        }, 900);
      });
    }
    // Courses page: apply filters (and read session search)
    const courseFilter = document.getElementById("courseFilter");
    const levelFilter = document.getElementById("levelFilter");
    const coursesGrid = document.getElementById("coursesGrid");
    if (coursesGrid) {
      const cards = Array.from(coursesGrid.querySelectorAll(".course-card"));
      function applyFilters() {
        const q =
          (courseFilter ? courseFilter.value.trim().toLowerCase() : "") ||
          sessionStorage.getItem("mpu_search") ||
          "";
        const level = levelFilter ? levelFilter.value : "";
        cards.forEach((card) => {
          const title = (
            card.querySelector("h3")?.textContent || ""
          ).toLowerCase();
          const matchesQuery = !q || title.includes(q);
          const cardLevel = card.dataset.level || "";
          const matchesLevel = !level || cardLevel === level;
          card.style.display = matchesQuery && matchesLevel ? "flex" : "none";
        });
        // clear session search after used
        if (sessionStorage.getItem("mpu_search"))
          sessionStorage.removeItem("mpu_search");
      }
      if (courseFilter) courseFilter.addEventListener("input", applyFilters);
      if (levelFilter) levelFilter.addEventListener("change", applyFilters);
  
      // apply initial (in case search came from home)
      applyFilters();
    }
  });