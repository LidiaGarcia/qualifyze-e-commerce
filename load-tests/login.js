import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 10,          // 10 concurrent users
    duration: '30s',  // for 30 seconds
};

export default function () {
    const response = http.get('https://www.saucedemo.com/');
    check(response, {
        'status is 200': (r) => r.status === 200,
        'page loads correctly': (r) => r.body.includes('Swag Labs'),
    });

    sleep(1);
}