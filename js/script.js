const quizRange = document.getElementById("quizRange");
const rangeValue = document.getElementById("rangeValue");
const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = ".pdf,.docx,.txt";

document.querySelector(".btn-outline-primary").addEventListener("click", () => {
  fileInput.click();
});

let uploadedFileContent = "";

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const previewBox = document.getElementById("filePreview");

  if (!file) return;

  if (file.type === "text/plain") {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedFileContent = e.target.result;
      previewBox.textContent = uploadedFileContent;
    };
    reader.readAsText(file);
  } else {
    previewBox.textContent =
      "📄 File uploaded, but preview is only available for .txt files.";
    alert(
      "Preview only available for .txt files. PDF/DOCX require backend support."
    );
  }
});

quizRange.addEventListener("input", () => {
  const value = quizRange.value;
  rangeValue.textContent = value;

  const percent =
    ((value - quizRange.min) / (quizRange.max - quizRange.min)) * 100;
  quizRange.style.setProperty("--progress", `${percent}%`);
});

document.querySelector(".btn-primary").addEventListener("click", () => {
  const numQuestions = quizRange.value;
  const quizData = [];

  for (let i = 1; i <= numQuestions; i++) {
    quizData.push({
      question: `Sample Question ${i}`,
      answer: `Sample Answer ${i}`,
    });
  }

  console.log("Generated Questions:", quizData);
  displayExportOptions(quizData);
});

function displayExportOptions(data) {
  let exportDiv = document.getElementById("export-options");
  exportDiv.innerHTML = `
    <h6 class="mt-4">📤 Export Options</h6>
    <button class="btn btn-success me-2" onclick="exportToPDF()">Export to PDF</button>
    <button class="btn btn-secondary" onclick="exportToCSV()">Export to CSV</button>
  `;
  window.generatedQuiz = data;
}

function exportToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Generated Quiz Questions", 10, 10);

  window.generatedQuiz.forEach((item, index) => {
    doc.text(`${index + 1}. ${item.question}`, 10, 20 + index * 10);
  });

  doc.save("quiz_questions.pdf");
}

function exportToCSV() {
  const csv = Papa.unparse(window.generatedQuiz);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.setAttribute("href", url);
  link.setAttribute("download", "quiz_questions.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
