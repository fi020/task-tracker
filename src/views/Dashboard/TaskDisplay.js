// TaskDisplay.js
export function toggleTaskDisplayPreference(currentType) {
    return currentType === 'list' ? 'icon' : 'list'; // Toggle between list and icon views
  }
  
  export function filterAndDisplayTasks(tasks, displayType) {
    if (displayType === 'list') {
      return tasks.map(task => {
        return {
          type: 'list',
          content: `
            <div>
              Title: ${task.title}
            </div>
            <div>
              Description: ${task.description}
            </div>
            <div>Completed: ${task.completed}</div>
          `
        };
      });
    } else if (displayType === 'icon') {
      return tasks.map(task => {
        return {
          type: 'icon',
          content: `
            <div class="task-icon">
              <span class="task-title">${task.title}</span>
              <span class="task-icon-status">${task.completed ? '✔️' : '❌'}</span>
            </div>
          `
        };
      });
    }
    return []; // Default empty if no display type
  }
  