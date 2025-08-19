fetch("http://localhost:5000/api/usage")
  .then(res => res.json())
  .then(data => {
    const report = document.getElementById("report");
    data.forEach(entry => {
      const div = document.createElement("div");
      div.textContent = `${entry.domain}: ${Math.round(entry.timeSpent / 60000)} min`;
      div.className = entry.domain.includes("code") ? "productive" : "unproductive";
      report.appendChild(div);
    });
  });
