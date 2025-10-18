function showSection(id) {
  document.querySelectorAll('main section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  location.hash = id;
}

function toggleMode() {
  document.body.classList.toggle("light-mode");
  const btn = document.getElementById("mode-toggle");
  btn.textContent = document.body.classList.contains("light-mode") ? "🌞" : "🌙";
}

const topics = {
  pandas: "pandas.json",
  numpy: "numpy.json",
  ml: "ml.json",
  dl: "dl.json",
  math: "math.json",
  viz: "viz.json"
};

for (let topic in topics) {
  fetch(topics[topic])
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById(topic + "-qa");
      if (container) {
        data.forEach(item => {
          const card = document.createElement("div");
          card.classList.add("qa-card");

          let html = `<h3 class="qa-question">Q: ${item.question}</h3><p>A: ${item.answer}</p>`;
          
          if (item.code && item.code.trim() !== "") {
            html += `
              <div class="hover-container">
                <pre><code class="language-${item.language || 'python'}">${item.code}</code></pre>
                ${item.output ? `<div class="hover-output">Output:\n${item.output}</div>` : ""}
              </div>
            `;
          }

          card.innerHTML = html;
          container.appendChild(card);
        });
      }
      Prism.highlightAll();
    })
    .catch(err => console.error("Error loading", topics[topic], err));
}

window.addEventListener("load", () => {
  const section = location.hash.replace("#", "") || "home";
  showSection(section);
});

function showSection(id) {
  document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
  const section = document.getElementById(id);
  section.classList.add("active");

  document.querySelectorAll(".external-links").forEach(e => e.style.display = "none");
  if (["interview", "pandas", "numpy"].includes(id)) {
    const links = section.querySelector(".external-links");
    if (links) links.style.display = "flex";
  }
}
