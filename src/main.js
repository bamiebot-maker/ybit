import './styles.css'

const menuButton = document.querySelector('.menu-toggle')
const siteNav = document.querySelector('.site-nav')
const yearElement = document.querySelector('#year')
const formGroups = document.querySelectorAll('[data-simple-form]')
const revealItems = document.querySelectorAll('.reveal')

if (yearElement) {
  yearElement.textContent = new Date().getFullYear()
}

if (menuButton && siteNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open')
    menuButton.setAttribute('aria-expanded', String(isOpen))
  })

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open')
      menuButton.setAttribute('aria-expanded', 'false')
    })
  })
}

if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return
        }

        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    },
    {
      threshold: 0.14,
      rootMargin: '0px 0px -40px 0px',
    },
  )

  revealItems.forEach((item) => {
    revealObserver.observe(item)
  })
}

formGroups.forEach((form) => {
  const message = form.querySelector('[data-form-message]')

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    if (message) {
      message.textContent = 'Thanks. This form is ready to connect to your real email or backend later.'
    }

    form.reset()
  })
})
