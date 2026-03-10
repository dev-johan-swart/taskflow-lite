// Placeholder for future performance helpers
export const logPerformance = (label: string, fn: () => void) => {
   const start = performance.now();
   fn();
   console.log(`${label} took ${performance.now() - start}ms`);
};