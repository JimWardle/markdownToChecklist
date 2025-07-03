const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

function loadApp() {
  const sandbox = {
    console,
    document: { addEventListener(){} },
    marked: { setOptions(){} }
  };
  vm.createContext(sandbox);
  const code = fs.readFileSync('./js/app.js', 'utf8');
  vm.runInContext(code, sandbox);
  // initialize taskData used inside app.js
  vm.runInContext('taskData = {}', sandbox);
  return sandbox;
}

function exportMarkdown(markdown, modifyTasks) {
  const ctx = loadApp();
  ctx.parseCheckboxStates(markdown);
  if (typeof modifyTasks === 'function') {
    modifyTasks({
      set(id, val) { vm.runInContext(`taskData["${id}"] = ${val}`, ctx); },
    });
  }
  return ctx.convertToProgressMarkdown(markdown);
}

// Test preserving states from markdown
const input1 = '- [x] A\n-- [ ] B\n--- [x] C';
const expected1 = '- [x] A\n-- [ ] B\n--- [x] C';
assert.strictEqual(exportMarkdown(input1), expected1);

// Test manual state update and dash preservation
const input2 = '- A\n-- B\n--- C';
const expected2 = '- [ ] A\n-- [x] B\n--- [ ] C';
assert.strictEqual(exportMarkdown(input2, td => { td.set('task-1', true); }), expected2);

console.log('All tests passed.');
