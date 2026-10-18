/**
 * @file index.js
 * Server startup entry point.
 */
import app from './app.js';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`BuildForce API server listening on http://localhost:${PORT}`);
});
