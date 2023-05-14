const staticDev = "5000-le-jeu"
const assets = [
    "/{repository}/",
    '/{repository}/index.html',
    '/{repository}/assets/css/styles.css',
    '/{repository}/assets/css/bootstrap.css',
    '/{repository}/assets/css/mains.css', ,
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticDev).then(cache => {
            cache.addAll(assets)
        })
    )
})