const intersectionOptions = {
  rootMargin: '100px',
}
const loadNow = (entries, observer) => {
  entries.filter(entry => entry.isIntersecting).forEach(entry => {
    const newEl =  document.importNode(
      entry.target.querySelector('template').content, true)
    entry.target.parentNode.replaceChild(newEl, entry.target)
  })
}

const intersectionObserver = new IntersectionObserver(loadNow, intersectionOptions)

const Load = () => {
  for (let target of document.querySelectorAll('.dynload')) {
    intersectionObserver.observe(target)
  }
}

if (document.readyState === 'loading') {
  window.addEventListener('load', Load)
} else {
  Load()
}
