const intersectionOptions = {
  rootMargin: '100px',
}
const loadNow = (entries, observer) => {
  entries.filter(entry => entry.isIntersecting).forEach(entry => {
    intersectionObserver.unobserve(entry.target)
    const newEl = document.createElement('picture')
    newEl.innerHTML = entry.target.getAttribute('data-html')
    entry.target.parentNode.replaceChild(newEl, entry.target)
  })
}

const intersectionObserver = new IntersectionObserver(loadNow, intersectionOptions)
const registerDynLoad = (target) => {
  intersectionObserver.observe(target)
}

const Load = () => {
  for (let target of document.querySelectorAll('.dynload')) {
    registerDynLoad(target)
  }
}

if (document.readyState === 'loading') {
  window.addEventListener('load', Load)
} else {
  Load()
}
