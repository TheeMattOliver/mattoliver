export const debounce = (callback, wait) => {
  let timeoutId = null
  return (...args) => {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args)
    }, wait)
  }
}

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time.
export const throttle = (func, limit) => {
  let lastFunc
  let lastRan
  return function (...args) {
    if (!lastRan) {
      func.apply(null, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(null, args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}

export const slugify = (str = "") => {
  let slug = str
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")

  // If the value starts with a number, swap it out!
  // Doing this in a dumb way for now.
  if (slug.match(/^[\d]{1,2}/)) {
    slug = slug.replace(/^[\d]{1,2}/, "digit")
  }

  return slug
}
