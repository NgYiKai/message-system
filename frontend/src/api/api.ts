export async function apiCall(path: string, method: string, data:unknown = null) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
        },
        body: data ? JSON.stringify(data) : null,
    });


    const text = await response.text(); 

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    if (text === '') {
        return null; 
    }

    return JSON.parse(text);
    
}