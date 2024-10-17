function generateAlphabetString() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    
    // Tạo chuỗi ngẫu nhiên gồm 9 ký tự
    let result = '';
    for (let i = 0; i < 9; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        result += letters[randomIndex];
    }
    
    // Chèn dấu '-' vào đúng vị trí
    return result.slice(0, 3) + '-' + result.slice(3, 6) + '-' + result.slice(6, 9);
}

export { generateAlphabetString };