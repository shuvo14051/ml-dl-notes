function showSection(id) {
  document.querySelectorAll('main section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMode() {
  document.body.classList.toggle("light-mode");
  const btn = document.getElementById("mode-toggle");
  btn.textContent = document.body.classList.contains("light-mode") ? "🌞" : "🌙";
}

// topic JSON mapping
const topics = {
  pandas: "pandas.json",
  numpy: "numpy.json",
  ml: "ml.json",
  dl: "dl.json",
  math: "math.json",
  viz: "viz.json"
};

// Mock data for demonstration
const mockData = {
  pandas: [
    {
      question: "How do you filter a DataFrame?",
      answer: "Use boolean indexing with conditions.",
      code: "df[df['column'] > 5]",
      language: "python"
    },
    {
      question: "How do you merge two DataFrames?",
      answer: "Use the merge() function.",
      code: "pd.merge(df1, df2, on='key')",
      language: "python"
    }
  ],
  numpy: [
    {
      question: "How do you create a NumPy array?",
      answer: "Use np.array() function.",
      code: "arr = np.array([1, 2, 3])",
      language: "python"
    }
  ],
  ml: [
    {
      question: "What is overfitting?",
      answer: "When a model learns training data too well, capturing noise instead of the underlying pattern.",
      code: ""
    }
  ],
  dl: [
    {
      question: "What is backpropagation?",
      answer: "An algorithm for training neural networks by computing gradients of the loss function.",
      code: ""
    }
  ],
  math: [
    {
      question: "What is a derivative?",
      answer: "A measure of how a function changes as its input changes.",
      code: "f'(x) = lim(h->0) [f(x+h) - f(x)] / h"
    }
  ],
  viz: [
    {
      question: "How do you create a line plot?",
      answer: "Use plt.plot() function.",
      code: "plt.plot(x, y)\nplt.show()",
      language: "python"
    }
  ]
};

// Simulate loading data
for (let topic in topics) {
  setTimeout(() => {
    const data = mockData[topic] || [];
    const container = document.getElementById(topic + "-qa");
    if (container) {
      data.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("qa-card");

        let html = `<h3>Q: ${item.question}</h3><p>A: ${item.answer}</p>`;
        if (item.code && item.code.trim() !== "") {
          html += `<pre><code class="language-${item.language || 'python'}">${item.code}</code></pre>`;
        }

        card.innerHTML = html;
        container.appendChild(card);
      });
    }
    Prism.highlightAll();
  }, 300);
}