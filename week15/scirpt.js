const foods = [
    { name: "ข้าว", image: "ข้าว.jpg" },
    { name: "ข้าวมันไก่", image: "ข้าวมันไก่.jpg" },
    { name: "มาม่า", image: "มาม่า.jpg" },
    { name: "ส้มตำ", image: "ส้มตำ.jpg" },
    { name: "ไก่ย่าง", image: "ไก่ย่าง.jpg" }
];

const button = document.querySelector("#pick-button");
const buttonLabel = document.querySelector("#button-label");
const image = document.querySelector("#food-image");
const emptyState = document.querySelector("#empty-state");
const imageTag = document.querySelector("#image-tag");
const foodName = document.querySelector("#food-name");
const captionLabel = document.querySelector("#caption-label");
const menuCount = document.querySelector("#menu-count");

let lastFood = null;
let spinTimer;

menuCount.textContent = String(foods.length);

function chooseFood() {
    const options = foods.filter((food) => food !== lastFood);
    return options[Math.floor(Math.random() * options.length)];
}

function showFood(food) {
    image.src = food.image;
    image.alt = food.name;
    image.hidden = false;
    emptyState.hidden = true;
    imageTag.hidden = false;
    foodName.textContent = food.name;
    captionLabel.textContent = "เมนูที่สุ่มได้วันนี้";
}

button.addEventListener("click", () => {
    if (button.disabled) return;

    button.disabled = true;
    buttonLabel.textContent = "กำลังสุ่ม...";
    captionLabel.textContent = "กำลังเลือกเมนูให้คุณ";

    let ticks = 0;
    spinTimer = window.setInterval(() => {
        const preview = foods[Math.floor(Math.random() * foods.length)];
        showFood(preview);
        ticks += 1;

        if (ticks >= 12) {
            window.clearInterval(spinTimer);
            const selected = chooseFood();
            showFood(selected);
            lastFood = selected;
            button.disabled = false;
            buttonLabel.textContent = "สุ่มอีกครั้ง";
        }
    }, 100);
});