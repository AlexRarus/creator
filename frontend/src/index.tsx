function importBuildTarget() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return import('./entry.production');
    case 'development':
      return import('./entry.development');
    default:
      return Promise.reject(new Error('No such build target: ' + process.env.NODE_ENV));
  }
}

// Import the entry point and render it's default export
importBuildTarget().then((Environment) => {
  return Environment;
});

export {};
