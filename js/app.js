let currentMode = 'checklist';
let taskData = {};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadProgress();
    updateOutput();
    
    // Set up input event listener
    document.getElementById('markdownInput').addEventListener('input', function() {
        updateOutput();
        saveProgress();
    });

    // Set up mode toggle
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentMode = this.dataset.mode;
            updateOutput();
        });
    });
});

function updateOutput() {
    const input = document.getElementById('markdownInput').value.trim();
    const output = document.getElementById('output');
    
    if (!input) {
        output.innerHTML = `
            <div class="empty-state">
                <h3>Ready to get organized?</h3>
                <p>Paste your markdown content on the left to see it transformed into an interactive checklist.</p>
            </div>
        `;
        return;
    }

    if (currentMode === 'markdown') {
        // Regular markdown preview
        output.innerHTML = marked.parse(input);
    } else {
        // Interactive checklist mode
        output.innerHTML = convertToInteractiveChecklist(input);
        addEventListeners();
        updateStats();
    }
}

function convertToInteractiveChecklist(markdown) {
    // Parse markdown and convert list items to interactive checkboxes
    let html = marked.parse(markdown);
    let taskId = 0;
    
    // Make headers collapsible (h2, h3, h4)
    html = html.replace(/<(h[2-4])([^>]*)>(.*?)<\/h[2-4]>/g, function(match, tag, attrs, content) {
        const headerId = `header-${Math.random().toString(36).substr(2, 9)}`;
        return `
            <${tag}${attrs} class="collapsible-header" onclick="toggleSection('${headerId}')">
                <span class="collapse-icon">▼</span>
                ${content}
            </${tag}>
            <div class="collapsible-content" id="${headerId}">
        `;
    });
    
    // Close the collapsible sections properly
    html = html.replace(/<h([2-4])/g, function(match, level) {
        return '</div>' + match;
    });
    
    // Add final closing div
    html += '</div>';
    
    // Replace list items with interactive checkboxes
    html = html.replace(/<li>(.*?)<\/li>/gs, function(match, content) {
        const currentTaskId = `task-${taskId++}`;
        const isCompleted = taskData[currentTaskId] || false;
        const checkedAttr = isCompleted ? 'checked' : '';
        const completedClass = isCompleted ? 'completed' : '';
        
        return `
            <div class="task-item ${completedClass}" data-task-id="${currentTaskId}">
                <input type="checkbox" class="task-checkbox" ${checkedAttr}>
                <span class="task-text">${content}</span>
            </div>
        `;
    });

    return html;
}

function toggleInputPanel() {
    const inputPanel = document.getElementById('inputPanel');
    inputPanel.classList.toggle('minimized');
}

function toggleSection(headerId) {
    const section = document.getElementById(headerId);
    const header = section.previousElementSibling;
    
    if (section.style.maxHeight && section.style.maxHeight !== '0px') {
        section.style.maxHeight = '0px';
        header.classList.add('collapsed');
    } else {
        section.style.maxHeight = section.scrollHeight + 'px';
        header.classList.remove('collapsed');
    }
}

function addEventListeners() {
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskItem = this.closest('.task-item');
            const taskId = taskItem.dataset.taskId;
            
            taskData[taskId] = this.checked;
            
            if (this.checked) {
                taskItem.classList.add('completed');
            } else {
                taskItem.classList.remove('completed');
            }
            
            updateStats();
            saveProgress();
        });
    });
}

function updateStats() {
    const totalTasks = document.querySelectorAll('.task-checkbox').length;
    const completedTasks = document.querySelectorAll('.task-checkbox:checked').length;
    const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Add or update stats bar
    let statsBar = document.querySelector('.stats');
    if (!statsBar && totalTasks > 0) {
        statsBar = document.createElement('div');
        statsBar.className = 'stats';
        document.getElementById('output').insertBefore(statsBar, document.getElementById('output').firstChild);
    }

    if (statsBar && totalTasks > 0) {
        statsBar.innerHTML = `
            <div class="stat-item">
                <span class="stat-number">${completedTasks}</span>
                <span class="stat-label">Done</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">${totalTasks - completedTasks}</span>
                <span class="stat-label">Todo</span>
            </div>
            <div class="stat-item">
                <span class="stat-number">${percentage}%</span>
                <span class="stat-label">Progress</span>
            </div>
        `;

        // Add simple progress bar
        let progressBar = document.querySelector('.progress-bar');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressBar.innerHTML = `<div class="progress-fill" style="width: ${percentage}%"></div>`;
            statsBar.after(progressBar);
        } else {
            progressBar.querySelector('.progress-fill').style.width = percentage + '%';
        }
    }
}

function saveProgress() {
    const data = {
        markdown: document.getElementById('markdownInput').value,
        tasks: taskData
    };
    try {
        // Using a simple variable instead of localStorage for Claude.ai compatibility
        window.savedProgress = data;
    } catch (e) {
        console.log('Progress saving not available in this environment');
    }
}

function loadProgress() {
    try {
        const data = window.savedProgress;
        if (data) {
            document.getElementById('markdownInput').value = data.markdown || '';
            taskData = data.tasks || {};
        }
    } catch (e) {
        console.log('Progress loading not available in this environment');
    }
}

function loadSampleData() {
    const sampleMarkdown = `# My Project Tasks

## High Priority
- Complete the presentation slides
- Review the quarterly report
- Schedule team meeting

## Medium Priority  
- Update documentation
- Test new features
- Code review for pull request #42

## Low Priority
- Organize workspace
- Plan next sprint
- Update project timeline

## Completed
- Initial project setup
- Requirements gathering`;

    document.getElementById('markdownInput').value = sampleMarkdown;
    taskData = {};
    updateOutput();
    saveProgress();
}

function clearAll() {
    if (confirm('Clear all content and progress?')) {
        document.getElementById('markdownInput').value = '';
        taskData = {};
        updateOutput();
        saveProgress();
    }
}

function resetProgress() {
    if (confirm('Reset all task progress?')) {
        taskData = {};
        updateOutput();
        saveProgress();
    }
}

function clearCompleted() {
    if (confirm('Remove all completed tasks?')) {
        // Get the current markdown
        let markdown = document.getElementById('markdownInput').value;
        const lines = markdown.split('\n');
        const filteredLines = [];
        let taskId = 0;
        
        for (let line of lines) {
            // Check if this line would become a task
            if (line.trim().match(/^[-*+]\s+/)) {
                const currentTaskId = `task-${taskId++}`;
                if (!taskData[currentTaskId]) {
                    filteredLines.push(line);
                }
            } else {
                filteredLines.push(line);
                if (line.trim().match(/^[-*+]\s+/)) {
                    taskId++;
                }
            }
        }
        
        document.getElementById('markdownInput').value = filteredLines.join('\n');
        
        // Reset task data for remaining tasks
        const newTaskData = {};
        let newTaskId = 0;
        for (let line of filteredLines) {
            if (line.trim().match(/^[-*+]\s+/)) {
                const oldTaskId = `task-${newTaskId}`;
                if (taskData[oldTaskId] === false) {
                    newTaskData[`task-${newTaskId}`] = false;
                }
                newTaskId++;
            }
        }
        
        taskData = newTaskData;
        updateOutput();
        saveProgress();
    }
}