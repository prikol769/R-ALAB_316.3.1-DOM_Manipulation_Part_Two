import "./styles.css";

var menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

//Part 1: Getting Started

const mainEl = document.querySelector("main");

mainEl.style.backgroundColor = "var(--main-bg)";

const h1El = document.createElement("h1");
h1El.innerHTML = "DOM Manipulation";
mainEl.appendChild(h1El);

mainEl.classList.add("flex-ctr");

//Part 2: Creating a Menu Bar

const topMenuEl = document.getElementById("top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.background = "var(--top-menu-bg)";
topMenuEl.classList.add("flex-around");

//Part 3: Adding Menu Buttons

for (let i = 0; i < menuLinks.length; i++) {
  const aEl = document.createElement("a");
  aEl.href = menuLinks[i].href;
  aEl.text = menuLinks[i].text;
  topMenuEl.appendChild(aEl);
}

// *******************PART TWO*******************

//Part 3: Creating the Submenu
const subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.background = "var(--sub-menu-bg)";
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

//Part 4: Adding Menu Interaction

const topMenuLinks = topMenuEl.getElementsByTagName("a");

const buildSubmenu = (subLinks) => {
  while (subMenuEl.firstChild) {
    subMenuEl.removeChild(subMenuEl.firstChild);
  }

  for (let i = 0; i < subLinks.length; i++) {
    const aEl = document.createElement("a");
    aEl.href = subLinks[i].href;
    aEl.text = subLinks[i].text;
    subMenuEl.appendChild(aEl);
  }
};

topMenuEl.addEventListener("click", (e) => {
  e.preventDefault();
  const currentLink = e.target;
  if (currentLink.nodeName !== "A") return;
  console.log(e.target.text);

  if (currentLink.className.includes("active")) {
    currentLink.classList.remove("active");
  } else {
    currentLink.classList.add("active");
    for (let i = 0; i < topMenuLinks.length; i++) {
      if (currentLink.text !== topMenuLinks[i].text) {
        topMenuLinks[i].classList.remove("active");
      }
    }
  }

  //Part 5: Adding Submenu Interaction
  for (let i = 0; i < menuLinks.length; i++) {
    const hasSubLinks = menuLinks[i].subLinks;

    if (currentLink.text === menuLinks[i].text && hasSubLinks) {
      buildSubmenu(hasSubLinks);

      if (currentLink.className.includes("active")) {
        subMenuEl.style.top = "100%";
      } else {
        subMenuEl.style.top = "0";
      }
    }

    //If the ABOUT link is clicked, an <h1>About</h1> should be displayed.
    if (currentLink.text === menuLinks[i].text && !hasSubLinks) {
      const h1El = document.getElementsByTagName("h1")[0];
      h1El.innerHTML = currentLink.text;
      subMenuEl.style.top = "0";
    }
  }
});

subMenuEl.addEventListener("click", (e) => {
  e.preventDefault();
  const currentLink = e.target;
  if (currentLink.nodeName !== "A") return;
  console.log(currentLink.text);

  subMenuEl.style.top = 0;

  for (let i = 0; i < topMenuLinks.length; i++) {
    topMenuLinks[i].classList.remove("active");
  }

  const h1El = document.getElementsByTagName("h1")[0];
  h1El.innerHTML = currentLink.text;
});
