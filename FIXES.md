Fix applied:
- postcss.config.js was using ESM `export default` which Next loads as CommonJS in this setup.
- Replaced with CommonJS `module.exports` and added postcss.config.cjs for safety.

If you still see build errors:
- delete .next folder and restart dev server.
