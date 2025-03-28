// API Configuration
const API_URL = 'https://connect.mailerlite.com/api/subscribers';
const API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZWUzMzA4YTAyNGNhYWY4ZjQxNzYzZDQzNmUyNzIzNGQ0YTQzY2NkOWY4MDYxZGZiZDQ2ODRiNDQ5MDg0MDY1MGNiN2JhM2Y2Njg3ZDc2YWIiLCJpYXQiOjE3NDMxNTYwMTMuMTcwNDgyLCJuYmYiOjE3NDMxNTYwMTMuMTcwNDg1LCJleHAiOjQ4OTg4Mjk2MTMuMTYwMzA1LCJzdWIiOiIxNDI4MjkwIiwic2NvcGVzIjpbXX0.tgIJuV8ov6-Lpop2dLtR9iwMV1vTu--EFkP5UaDhx5_gvSfvsbPGckbwo8BkvFwWG2lrWhSbxu2Zw48UvCmju_BICuOuYWswkD63srXA7w5Gy0bOedKAE-2u0XJyWeuD5L0jm3ucWRaIGoUf-gRRA34uwa5oVgRCzXeSIBLXSKXJ8-G1CnJawLABKARfUQGbC7XNRbFWEfYLVGEcWJxRmIonuufYwX3XCEiNhO_edEtgAbIuwO3oL9j1BcHtDiyHutn3SOQk1lL4MP8EIinzrIH9TJn7fW5pUnNRdsky6BC4QCERkAtq4SIVgJyW1E_ZoiGOUm_IfQXcpfBAK8PJbMrOOoGknkJC19Fq0vv5lNxakZfKWUd89uc_UTNYwCHpA5M5z37rPeK9bXC8fhWatQJvj8pl6jJU3XCIVL6jz64WZ0K0aHZeKoSpyrFubl3v8l3p_D9R4XXnPGZ7ePlul3cTATNYqNbM3UdJ7dAfIdgU36MYE82ZgW8xSJ2tz5v4Yk3ba-zeP5IaCVfwnt38O0j1IhNvwDac6PEV9nJg9LBs-dlrL9ryo-FVC8hkSZs23PxfJ6ek_ROZ_EaBg3y4yjUfUdUR95TMgQa9PpzAdlbqvXnTlZpLCnszT1DuU_BgHd4niRA5E-3fBaFXSMa6eyM74iv5ambRF2nGDRdRsps';
const GROUP_ID = '150098539514431459';

// DOM Elements
const popup = document.getElementById('popup');
const closeBtn = document.querySelector('.close-btn');
const emailForm = document.getElementById('emailForm');
const messageDiv = document.getElementById('message');

// Show popup after 2 seconds
setTimeout(() => {
    popup.style.display = 'flex';
}, 2000);

// Close popup when clicking the close button
closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Close popup when clicking outside
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.style.display = 'none';
    }
});

// Handle form submission
emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${API_TOKEN}`
            },
            body: JSON.stringify({
                email: email,
                fields: {
                    name: name
                },
                groups: [GROUP_ID]
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            showMessage('Thank you for subscribing!', 'success');
            emailForm.reset();
            setTimeout(() => {
                popup.style.display = 'none';
            }, 2000);
        } else {
            showMessage('Something went wrong. Please try again.', 'error');
        }
    } catch (error) {
        showMessage('An error occurred. Please try again later.', 'error');
        console.error('Error:', error);
    }
});

// Helper function to show messages
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
} 