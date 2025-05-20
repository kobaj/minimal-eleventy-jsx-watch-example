/*
 * Node (and more specifically TSX) implores a very strong cache system on import. Meaning
 * Eleventy's `--watch` and `--serve` don't actually hot reload. So this file makes sure
 * that every user defined import is cache busted.
 *
 * You might be able to use the TSX_DISABLE_CACHE environment variable instead of this file.
 */

export async function initialize() { }

export async function resolve(specifier, context, nextResolve) {
  // One extra check you could do is if the `require.resolve(specifier)` full
  // path includes node_modules and then also resolve without cache busting.
  // But the following set of checks /should/ already exclude node_modules anyway.

  if (specifier.startsWith('node:')) {
    return nextResolve(specifier, context);
  }

  if (!specifier.startsWith('.')) {
    return nextResolve(specifier, context);
  }

  const cacheBustKey = 'version=';
  if (specifier.includes(cacheBustKey)) {
    return nextResolve(specifier, context);
  }

  // There is a small memory leak here by always cache busting and not
  // clearing the cache. You might be able to do something like
  // `delete require.cache[require.resolve(specifier)]` to help alleviate that.

  const prefix = specifier.includes('?') ? '&' : '?';
  const cacheBustedSpecifier = `${specifier}${prefix}${cacheBustKey}${Date.now()}`
  return nextResolve(cacheBustedSpecifier, context);
}

export async function load(url, context, nextLoad) {
  return nextLoad(url, context);
}
