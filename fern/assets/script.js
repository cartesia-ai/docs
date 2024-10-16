function clickFernSidebarLinks() {
    document.querySelectorAll('div[data-state="closed"]').forEach(function (parentDiv) {
        console.log('parentDiv', parentDiv);
        const firstChild = parentDiv.firstElementChild;

        if (firstChild && firstChild.classList.contains('fern-sidebar-link-container')) {
            const button = firstChild.querySelector('button');
            if (button) {
                button.click();
            }
        }
    });
}

clickFernSidebarLinks();

// Wait for Next.js router to be available on the page
if (window.next && window.next.router) {
    const router = window.next.router;

    router.events.on('routeChangeComplete', () => {
        clickFernSidebarLinks();
    });
} else {
    console.warn('Next.js router not found');
}
