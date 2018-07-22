export default function ({params, route, redirect}) {
    
    // redirect /rates.html to /tours
    if (route.path === '/rates.html') {
        redirect('301', '/tours');
    }

    if (route.path === '/privatechartercruises.html') {
        redirect('301', '/boat-charters');
    }

    if (route.path === '/events.html') {
        redirect('301', '/group-events');
    }

    if (route.path === '/specials.html') {
        redirect('301', '/specials');
    }

    if (route.path === '/links.html') {
        redirect('301', '/links');
    }

    if (route.path === '/faq.html') {
        redirect('301', '/faq');
    }
}