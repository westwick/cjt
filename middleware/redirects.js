export default function ({params, route, redirect}) {
    
    // redirect /rates.html to /tours
    if (route.path === '/rates.html') {
        redirect('301', '/tours');
    }
}