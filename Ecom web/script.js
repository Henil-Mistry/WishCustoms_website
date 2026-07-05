document.addEventListener("DOMContentLoaded", () => {

  // ---------------- HOMEPAGE CUSTOMIZE HANDLER ----------------
  window.openCustomizer = function (productId) {
    console.log("Customize clicked:", productId);

    if (productId === 1) {
      // Custom T-Shirt
      window.location.href = "tshirt.html";
    } else {
      alert("🚧 This product is coming soon.");
    }
  };

  const canvas = document.getElementById("canvas");
  const ctx = canvas ? canvas.getContext("2d") : null;

  // ---------------- SHIRT IMAGES ----------------
  const whiteShirt = new Image();
  const blackShirt = new Image();

  let shirtsLoaded = 0;

  function onShirtLoad() {
    shirtsLoaded++;
    if (shirtsLoaded === 2) {
      drawPreview();
    }
  }

  whiteShirt.onload = onShirtLoad;
  blackShirt.onload = onShirtLoad;

  whiteShirt.src = "shirt/t-shirt white.png";
  blackShirt.src = "shirt/t-shirt black.png";

  // ---------------- MODE SWITCH ----------------
  window.selectMode = function (mode) {
    document.getElementById("modeSelect").style.display = "none";

    document.getElementById("generateSection").classList.add("hidden");
    document.getElementById("uploadSection").classList.add("hidden");

    if (mode === "generate") {
      document.getElementById("generateSection").classList.remove("hidden");
    } else {
      document.getElementById("uploadSection").classList.remove("hidden");
    }
    drawPreview();
    updateAddToCartState();
  };

  // ---------------- UPLOAD IMAGE ----------------
  let uploadedDesign = null;
  
  function updateAddToCartState() {
    const btn = document.getElementById("addToCartBtn");
    if (!btn) return;

    const text = document.getElementById("designText")?.value.trim() || "";
    const hasText = text.length > 0;
    const hasImage = uploadedDesign !== null;

    btn.disabled = !(hasText || hasImage);
  }

  const uploadInput = document.getElementById("designUpload");
  if (uploadInput) {
    uploadInput.addEventListener("change", e => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        uploadedDesign = new Image();
        uploadedDesign.onload = () => {
          drawPreview();
          updateAddToCartState();
        };
        uploadedDesign.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // ---------------- DRAW PREVIEW ----------------
  
  window.drawPreview = function () {
    if (!ctx || shirtsLoaded < 2) return;

    const colorInput = document.querySelector('input[name="color"]:checked');
    if (!colorInput) return;

    const shirt = colorInput.value === "black" ? blackShirt : whiteShirt;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the front view of the shirt (left half of the template)
    ctx.drawImage(
      shirt,
      0, 0,                    // Source X, Y (start from left side)
      shirt.width / 2,         // Source width (left half only)
      shirt.height,            // Source height (full height)
      0, 0,                    // Destination X, Y
      canvas.width,            // Destination width
      canvas.height            // Destination height
    );

    // Define the printable area on the t-shirt
    // These values position the design in the center chest area
    const printAreaX = canvas.width * 0.30;      // 30% from left
    const printAreaY = canvas.height * 0.40;     // 40% from top
    const printAreaWidth = canvas.width * 0.40;  // 40% of canvas width (smaller)
    const printAreaHeight = canvas.height * 0.30; // 30% of canvas height (smaller)

    // Draw text if exists
    const textInput = document.getElementById("designText");
    if (textInput && textInput.value) {
      ctx.fillStyle = colorInput.value === "black" ? "#fff" : "#000";
      ctx.font = "bold 28px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // Center text in the print area
      ctx.fillText(
        textInput.value, 
        printAreaX + printAreaWidth / 2, 
        printAreaY + printAreaHeight / 2
      );
    }

    // Draw uploaded image if exists
    if (uploadedDesign && uploadedDesign.width) {
      // FIXED SIZE for all uploaded designs
      // This ensures consistent sizing regardless of original image dimensions
      const fixedDesignWidth = canvas.width * 0.35;   // 35% of canvas width
      const fixedDesignHeight = canvas.height * 0.25; // 25% of canvas height
      
      // Center position on the t-shirt chest area
      const designX = (canvas.width - fixedDesignWidth) / 2;
      const designY = canvas.height * 0.42; // Positioned at 42% from top
      
      // Draw the image stretched/shrunk to the fixed size
      ctx.drawImage(
        uploadedDesign,
        designX,
        designY,
        fixedDesignWidth,
        fixedDesignHeight
      );
    }
  };

  // Color change listener
  document.querySelectorAll('input[name="color"]').forEach(radio => {
    radio.addEventListener("change", drawPreview);
  });

  // Text input listener
  const textInput = document.getElementById("designText");
  if (textInput) {
    textInput.addEventListener("input", () => {
      drawPreview();
      updateAddToCartState();
    });
  }

  // ---------------- CART ----------------
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  window.addCustomTshirtToCart = function () {
    const colorInput = document.querySelector('input[name="color"]:checked');
    if (!colorInput) {
      alert("⚠️ Please select a t-shirt color");
      return;
    }
    
    const color = colorInput.value;
    const text = document.getElementById("designText")?.value || null;

    cart.push({
      id: Date.now(),
      product: "Custom T-Shirt",
      color,
      designType: uploadedDesign ? "Image" : "Text",
      text
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Added to cart!");
    window.location.href = "/";
  };

});

function updateCheckoutState() {
  const name = document.getElementById("addrName")?.value.trim();
  const addr = document.getElementById("addrLine")?.value.trim();
  const city = document.getElementById("addrCity")?.value.trim();
  const pin = document.getElementById("addrPin")?.value.trim();

  const paymentSelected = document.querySelector('input[name="paymentMethod"]:checked');

  const btn = document.getElementById("checkoutBtn");
  if (!btn) return;

  const addressOk = name && addr && city && pin;
  const paymentOk = !!paymentSelected;

  btn.disabled = !(addressOk && paymentOk);
}