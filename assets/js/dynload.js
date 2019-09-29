const intersectionOptions = {
  rootMargin: '100px',
}
const loadHtml = {}
const loadNow = (entries, observer) => {
  entries.filter(entry => entry.isIntersecting).forEach(entry => {
    intersectionObserver.unobserve(entry.target)
    const newEl = document.createElement('picture')
    newEl.innerHTML = loadHtml[entry.target.getAttribute('id')]
    entry.target.parentNode.replaceChild(newEl, entry.target)
  })
}

const intersectionObserver = new IntersectionObserver(loadNow, intersectionOptions)
const registerDynLoad = (targetId, html) => {
  const target = document.getElementById(targetId)
  loadHtml[targetId] = html
  intersectionObserver.observe(target)
}

export { registerDynLoad }
