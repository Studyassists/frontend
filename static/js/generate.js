const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const askBtn = document.getElementById('askBtn');
const generateBtn = document.getElementById('generateBtn');
const questionWarning = document.getElementById('questionWarning');
const quizWarning = document.getElementById('quizWarning');
const toggleBtn = document.getElementById('toggleBtn');
const sidebar = document.getElementById('sidebar');
const mobileToggle = document.getElementById('mobileToggle');
const quizRange = document.getElementById('quizRange');
const rangeValue = document.getElementById('rangeValue');




let uploadedFiles = [];

// Upload file handler
fileInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files);
  uploadedFiles.push(...files);
  renderFileList();
});

function renderFileList() {
  fileList.innerHTML = '';
  uploadedFiles.forEach((file, index) => {
    const li = document.createElement('li');
    li.classList.add('uploaded-file-item');
    li.dataset.index = index;

    const fileNameSpan = document.createElement('span');
    fileNameSpan.textContent = file.name;
    fileNameSpan.classList.add('file-name');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-file-btn');
    deleteBtn.innerHTML = '<i class="fa fa-times"></i>';

    li.appendChild(fileNameSpan);
    li.appendChild(deleteBtn);
    fileList.appendChild(li);
  });

  attachDeleteListeners();
}

function deleteFile(index) {
  uploadedFiles.splice(index, 1);
  renderFileList();
  fileInput.value = '';
}

function attachDeleteListeners() {
  const deleteButtons = document.querySelectorAll('.delete-file-btn');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const listItem = e.target.closest('li');
      if (listItem) {
        const index = parseInt(listItem.dataset.index);
        deleteFile(index);
      }
    });
  });
}

// Ask question validation
askBtn.addEventListener('click', () => {
  if (uploadedFiles.length === 0) {
    questionWarning.style.display = 'block';
  } else {
    questionWarning.style.display = 'none';
    alert('Your question has been submitted!');
  }
});

// Ask question validation
generateBtn.addEventListener('click', () => {
  if (uploadedFiles.length === 0) {
    quizWarning.style.display = 'block';
  } else {
    quizWarning.style.display = 'none';
    alert('Your question has been submitted!');
  }
});

// Desktop sidebar toggle
toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
  const icon = toggleBtn.querySelector('i');
    icon.classList.toggle('fa-angle-double-right');
  icon.classList.toggle('fa-angle-double-left');
});

// ✅ Mobile sidebar toggle (only closes with close button)
mobileToggle.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent bubbling
  const icon = mobileToggle.querySelector('i');
  const isOpening = !sidebar.classList.contains('open');

  sidebar.classList.toggle('open', isOpening);

  if (isOpening) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// ✅ Remove "close on outside click" logic entirely
// Sidebar now closes ONLY when clicking the toggle (X) button.



