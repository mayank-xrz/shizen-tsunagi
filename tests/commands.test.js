#!/usr/bin/env node
// Every shizen skill must also ship as a file-based command for the hosts that
// need one: Claude Code (commands/*.toml, which Gemini CLI reuses) and
// OpenCode (.opencode/command/*.md). /shizen-help was advertised in the
// README and the help card but missing both files; this guards that drift --
// a shipped skill with no adapter file fails here.

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

// skills/ registers the canonical command set.
const commands = fs.readdirSync(path.join(root, 'skills'))
  .filter((name) => fs.existsSync(path.join(root, 'skills', name, 'SKILL.md')));

test('skills/ ships at least the base command', () => {
  assert.ok(commands.includes('shizen'), 'expected skills/ to ship a shizen command');
});

test('every registered command ships a Claude commands/*.toml', () => {
  for (const name of commands) {
    assert.ok(
      fs.existsSync(path.join(root, 'commands', `${name}.toml`)),
      `missing commands/${name}.toml`,
    );
  }
});

test('every registered command ships an OpenCode .opencode/command/*.md', () => {
  for (const name of commands) {
    assert.ok(
      fs.existsSync(path.join(root, '.opencode', 'command', `${name}.md`)),
      `missing .opencode/command/${name}.md`,
    );
  }
});
