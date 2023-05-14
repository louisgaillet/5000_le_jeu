const staticDev = "5000-le-jeu"
const assets = [
    "/",
    "/index.html",
    "/assets/css/styles.css",
    "/assets/css/bootstrap.css",
    "/assets/js/mains.js",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticDev).then(cache => {
            cache.addAll(assets)
        })
    )
})