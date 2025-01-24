const loader = document.querySelector(".loader");

const qouteGenerator = async () => {
  const response = await fetch(
    "https://jacintodesign.github.io/quotes-api/data/quotes.json"
  );
  const data = await response.json().then((data) => data);
  const random = Math.floor(Math.random() * data.length) - 1;
  const { author, tag, text } = data[random];
  return data[random];
};

const generateContainer = async () => {
  loader.style.display = "block";
  let { author, tag, text } = await qouteGenerator();

  const container = document.createElement("div");
  loader.style.display = "none";
  container.classList.add("container");
  container.innerHTML = `<p class="text"><i class="bi bi-quote sign"></i>${text}</p>
            <p class="author">${author}</p>
            <div class="btn-container">
                <button class="btn twitter"><i class="bi bi-twitter"></i></button>
                <button class="btn new-quote">New Quote </button>
            </div>`;
  document.body.appendChild(container);
  const btnNewQuote = container.querySelector(".new-quote");
  const btnTwitter = container.querySelector(".twitter");
  btnNewQuote.addEventListener("click", async () => {
    document.body.removeChild(container);
    await generateContainer();
  });
};
window.addEventListener("load", async (E) => {
  await generateContainer();
});
