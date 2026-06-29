/* ===========================
   SÉCTION 710 — App Logic
   =========================== */

const PRODUCTS = [
  {
    id: 1,
    name: "Lumière Violet",
    category: "Zapatillas",
    type: "shoe",
    desc: "Cuero de grano completo con detalles en relieve dorado. La silueta AF de perfil bajo reinterpretada en tonos lavanda y blanco fantasma. Cada par es una declaración.",
    priceUSD: "$129",
    priceRD: "RD$7,590",
    colors: [
      { name: "Lavanda", hex: "#C89FD4", img: "gemini-2.5-flash-image_De_esta_imagen_quiero_que_la_parte_gris_sea_lavanda_claro_y_quitale_el_logo_de_n-0.jpg" },
      { name: "Violeta", hex: "#9B6BB5", img: "Gemini_Generated_Image_apsx5tapsx5tapsx.png" },
      { name: "Punta lila", hex: "#7A4FA3", img: "Gemini_Generated_Image_q4eihhq4eihhq4ei.png" },
    ],
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    tooltip: "Ver detalles del tenis",
    mainImg: "gemini-2.5-flash-image_De_esta_imagen_quiero_que_la_parte_gris_sea_lavanda_claro_y_quitale_el_logo_de_n-0.jpg",
    thumbs: ["gemini-2.5-flash-image_De_esta_imagen_quiero_que_la_parte_gris_sea_lavanda_claro_y_quitale_el_logo_de_n-0.jpg", "gemini-2.5-flash-image_Ponlo_en_otra_posicion_de_punta_no_tan_de_lado_recuerda_todo_lo_que_diga_air_deb-0.jpg", "gemini-2.5-flash-image_Ponlo_en_otra_posicion_de_punta_no_tan_de_lado_recuerda_todo_lo_que_diga_air_deb-0 (1).jpg"],
  },
  {
    id: 2,
    name: "Celestia Mini Bag",
    category: "Bolso",
    type: "bag",
    desc: "Cuero suave vegano con herrajes dorados de 24k y dije estrella exclusivo. El asa cruzada ajustable la hace perfecta del día a la noche.",
    priceUSD: "$189",
    priceRD: "RD$11,100",
    colors: [
      { name: "Caramelo", hex: "#8B5E3C", img: "Gemini_Generated_Image_hstx99hstx99hstx.png" },
      { name: "Sable", hex: "#6B4423", img: "Gemini_Generated_Image_1kae2q1kae2q1kae.png" },
      { name: "Arena", hex: "#C9A882", img: "Gemini_Generated_Image_ypbxp4ypbxp4ypbx.png" },
      { name: "Negro", hex: "#1C1C1C", img: "Gemini_Generated_Image_3xbeki3xbeki3xbe.png" },
    ],
    tooltip: "Ver detalles del bolso",
    mainImg: "Gemini_Generated_Image_hstx99hstx99hstx.png",
    thumbs: ["Gemini_Generated_Image_hstx99hstx99hstx.png", "Gemini_Generated_Image_zij5mlzij5mlzij5.png", "Gemini_Generated_Image_uvqpykuvqpykuvqp.png", "Gemini_Generated_Image_wmo638wmo638wmo6.png"],
  },
  {
    id: 3,
    name: "Estela Keychain",
    category: "Accesorio",
    type: "accessory",
    desc: "Conjunto de charms en acero inoxidable bañado en oro 18k. Tres estrellas de distintas formas —north star, spark y nova— que no pierden brillo con el tiempo.",
    priceUSD: "$39",
    priceRD: "RD$2,290",
    colors: [
      { name: "Oro", hex: "#D4A843", img: "Gemini_Generated_Image_ynypcnynypcnynyp.png" },
      { name: "Oro Rosa", hex: "#E8AA7A", img: "Gemini_Generated_Image_g69x37g69x37g69x.png" },
      { name: "Plata", hex: "#C0C0C0", img: "Gemini_Generated_Image_eu1mtaeu1mtaeu1m.png" },
    ],
    tooltip: "Ver detalles del llavero",
    mainImg: "Gemini_Generated_Image_ynypcnynypcnynyp.png",
    thumbs: ["Gemini_Generated_Image_ynypcnynypcnynyp.png", "Gemini_Generated_Image_n32o0n32o0n32o0n.png", "Gemini_Generated_Image_5a5vz75a5vz75a5v.png"],
  },
  {
    id: 4,
    name: "Boreal Urban Boot",
    category: "Botas",
    type: "shoe",
    desc: "Bota de caña media en nubuck gris topo con ribete de cuero marrón oscuro. Suela de goma vulcanizada para tracción urbana. Elegante fuera del sendero.",
    priceUSD: "$219",
    priceRD: "RD$12,900",
    colors: [
      { name: "Gris Piedra", hex: "#9B9B9B", img: "Gemini_Generated_Image_4299ri4299ri4299.png" },
      { name: "Carbón", hex: "#5A5A5A", img: "Gemini_Generated_Image_kssc91kssc91kssc.png" },
      { name: "Topo", hex: "#B5A89A", img: "Gemini_Generated_Image_bvzih5bvzih5bvzi.png" },
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    tooltip: "Ver detalles de la bota",
    mainImg: "Gemini_Generated_Image_4299ri4299ri4299.png",
    thumbs: ["Gemini_Generated_Image_4299ri4299ri4299.png", "Gemini_Generated_Image_vefdfcvefdfcvefd.png", "Gemini_Generated_Image_bvzih5bvzih5bvzi.png"],
  },
];

let cart = 0;
let currentProduct = null;
let selectedColor = 0;
let selectedSize = null;

// ---- RENDER CARDS ----
function renderCards() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  PRODUCTS.forEach((p) => {
    const colorDots = p.colors.slice(0, 4).map(c =>
      `<span class="color-dot-sm" style="background:${c.hex}" title="${c.name}"></span>`
    ).join("");

    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-3";
    col.innerHTML = `
      <div class="product-card" onclick="openModal(${p.id})">
        <div class="card-img-wrap">
          <img src="${p.mainImg}" alt="${p.name}" loading="lazy" />
          <span class="card-tooltip">${p.tooltip}</span>
        </div>
        <div class="card-body-custom">
          <p class="card-category">${p.category}</p>
          <h3 class="card-name">${p.name}</h3>
          <div class="card-price-row">
            <span class="card-price-usd">${p.priceUSD}</span>
            <span class="card-price-rd">${p.priceRD}</span>
          </div>
          <div class="color-preview">${colorDots}</div>
          <button class="btn btn-card-open">Ver producto</button>
        </div>
      </div>`;
    grid.appendChild(col);
  });
}

// ---- OPEN MODAL ----
function openModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  currentProduct = p;
  selectedColor = 0;
  selectedSize = null;

  document.getElementById("modalCategory").textContent = p.category;
  document.getElementById("modalName").textContent = p.name;
  document.getElementById("modalDesc").textContent = p.desc;
  document.getElementById("modalPriceUSD").textContent = p.priceUSD;
  document.getElementById("modalPriceRD").textContent = p.priceRD;

  // Main image
  setModalImg(p.colors[0].img);

  // Thumbs
  const thumbsEl = document.getElementById("modalThumbs");
  thumbsEl.innerHTML = p.thumbs.map((t, i) =>
    `<img src="${t}" class="thumb ${i===0?'active':''}" onclick="setModalImg('${t}', this)" />`
  ).join("");

  // Colors
  const colorLabel = document.getElementById("colorLabel");
  colorLabel.textContent = p.colors[0].name;

  const colorsEl = document.getElementById("modalColors");
  colorsEl.innerHTML = p.colors.map((c, i) =>
    `<span class="color-dot ${i===0?'selected':''}" 
      style="background:${c.hex}" 
      title="${c.name}"
      onclick="selectColor(${i}, '${c.img}', '${c.name}', this)">
    </span>`
  ).join("");

  // Sizes
  const sizeGroup = document.getElementById("sizeGroup");
  if (p.sizes && p.sizes.length) {
    sizeGroup.style.display = "block";
    const sizesEl = document.getElementById("modalSizes");
    sizesEl.innerHTML = p.sizes.map(s =>
      `<button class="size-pill" onclick="selectSize('${s}', this)">${s}</button>`
    ).join("");
  } else {
    sizeGroup.style.display = "none";
  }

  // Related
  const related = PRODUCTS.filter(x => x.id !== id).slice(0, 4);
  const relEl = document.getElementById("relatedProducts");
  relEl.innerHTML = related.map(r =>
    `<div class="related-thumb" onclick="openModal(${r.id})">
      <img src="${r.mainImg}" alt="${r.name}" />
      <p>${r.name}</p>
    </div>`
  ).join("");

  // Reset added msg
  document.getElementById("modalAddedMsg").style.display = "none";

  const modal = new bootstrap.Modal(document.getElementById("productModal"));
  modal.show();
}

function setModalImg(src, thumbEl) {
  document.getElementById("modalMainImg").src = src;
  if (thumbEl) {
    document.querySelectorAll(".thumb").forEach(t => t.classList.remove("active"));
    thumbEl.classList.add("active");
  }
}

function selectColor(idx, imgSrc, name, el) {
  selectedColor = idx;
  document.querySelectorAll(".color-dot").forEach(d => d.classList.remove("selected"));
  el.classList.add("selected");
  document.getElementById("colorLabel").textContent = name;
  setModalImg(imgSrc);
}

function selectSize(size, el) {
  selectedSize = size;
  document.querySelectorAll(".size-pill").forEach(p => p.classList.remove("selected"));
  el.classList.add("selected");
}

// ---- BUY BUTTON ----
document.getElementById("modalBuyBtn").addEventListener("click", () => {
  cart++;
  document.getElementById("cartCount").textContent = cart;
  const msg = document.getElementById("modalAddedMsg");
  msg.style.display = "block";
  showToast();
  setTimeout(() => { msg.style.display = "none"; }, 2500);
});

function showToast() {
  const toast = document.getElementById("cartToast");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

// ---- INIT ----
renderCards();
