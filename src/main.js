document.querySelectorAll(".dropdown-button").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.stopPropagation();

    const menu = this.nextElementSibling;

    document.querySelectorAll(".dropdown-menu").forEach((otherMenu) => {
      if (otherMenu !== menu) {
        otherMenu.classList.add("hidden");
      }
    });

    menu.classList.toggle("hidden");
  });
});

document.addEventListener("click", function (e) {
  document.querySelectorAll(".dropdown-menu").forEach((menu) => {
    const button = menu.previousElementSibling;

    if (!menu.contains(e.target) && (!button || !button.contains(e.target))) {
      menu.classList.add("hidden");
    }
  });
});
