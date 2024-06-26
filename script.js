$(document).ready(function() {
    $('#submit').on('click', function() {
        const url = $('#url').val();
        const proxies = $('#proxies').val().split('\n').map(proxy => proxy.trim()).filter(proxy => proxy);

        if (url && proxies.length > 0) {
            $('#status').show();
            proxies.forEach(proxy => {
                const img = new Image();
                img.src = `${url}?proxy=${proxy}`;
                img.onload = function() {
                    console.log(`Request sent using proxy ${proxy}`);
                };
                img.onerror = function() {
                    console.error(`Failed to send request using proxy ${proxy}`);
                };
                $('#status').append(`<div>Request sent using proxy ${proxy}</div>`);
            });
            $('#status').hide();
            alert('All requests completed.');
        } else {
            alert('Please enter both URL and Proxies');
        }
    });
});
