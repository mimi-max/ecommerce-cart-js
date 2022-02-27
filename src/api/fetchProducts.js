export function fetchProducts() {
    return fetch("./json/file.json")
        .then(response => response.json())
}

