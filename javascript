function order(serviceType) {
    const message = `مرحباً، أريد ${serviceType}`;
    const url = `https://t.me/A_G_T4?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}
