const staticDev = "5000-le-jeu"
const assets = [
    "/5000_le_jeu/",
    '/5000_le_jeu/index.html',
    '/5000_le_jeu/assets/css/styles.css',
    '/5000_le_jeu/assets/css/bootstrap.css',
    '/5000_le_jeu/assets/css/mains.css', ,
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticDev).then(cache => {
            cache.addAll(assets)
        })
    )
})