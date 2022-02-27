import { fetchProducts } from './api/fetchProducts.js'
import {insertProducts} from './helpers/insertProducts.js'
/** je crée une liste de produit avec leur total:
 * ex:{
 *  product1: 30,
 *  product3: 42,
 * }
*/
let itemsTotal = {} // je le met dans un objet pour pouvoir accéder aux clées 
function cartInvoice(productId, price, quantity) {
    itemsTotal[productId] = price * quantity;
}
function computeTotal() {
    return Object.values(itemsTotal).reduce((accumulatueur, valeurActuelle) => {
        return accumulatueur + valeurActuelle
    }, 0);
}

fetchProducts()
    .then((data)=>{
        insertProducts(data.products)
        return data
    })
    
    .then((data) => {
        const buttonListes = document.querySelectorAll(".add-btn");
        buttonListes.forEach((buttonListe) => {
            buttonListe.addEventListener("click", (e) => {

                const foundItem = data.products.find((item) => {
                    return item.id === e.target.id
                })
                const carts = document.querySelector('.cart-container');
                const cartItem = document.querySelector(`[data-cart-id="${e.target.id}"]`);
                

                if (cartItem) {
                    const input = cartItem.querySelector('input[type=number]');
                    input.value++;
                    cartInvoice(foundItem.id, foundItem.prix, input.value);
                    cartItem.querySelector(".totale").innerHTML = itemsTotal[foundItem.id].toFixed(2);
                    //Part ALL total
                    const totaux = computeTotal();
                    const totaleInvoice = document.querySelector(".totaleInvoice");
                    totaleInvoice.innerHTML = totaux.toFixed(2);
                }
                else {
                    const table = document.createElement("table");
                    table.className = 'invoice-table';
                    table.setAttribute('data-cart-id', e.target.id);
                    console.log(e.target.id)
                    table.setAttribute('data-item-price', foundItem.prix);
                    table.innerHTML += `
                        <thead class="headertable">
                            <th colspan="6" class="cart-item-seller">
                                <span class="sellerName">Vendeur:</span> ${foundItem.seller}
                            </th>
                        </thead>
                        <tbody id="cart-tbody">
                            <tr class="invoice-table-row" >
                                <th class="invoice-table-title">
                                    Wine
                                </th>
                                <th class="invoice-table-title">
                                    Fullname
                                </th>
                                <th class="invoice-table-title">
                                    Price
                                </th>
                                <th class="invoice-table-title">
                                    Q.TY
                                </th>
                                <th class="invoice-table-title">
                                    TOTAL
                                </th>
                            </tr>
                            <tr class="invoice-table-row">
                                <td class="invoice-table-image-cell">
                                    <img src=${foundItem.image}  alt="" class="imgborder">
                                </td>
                                <td>
                                    <span class="name">${foundItem.nom}
                                    </span>
                                </td>
                                <td>
                                    <p class="price">${foundItem.prix}</p>
                                </td>
                                <td>
                                    <input type="number" data-item-quantity="${e.target.id}" min="1" value="1">
                                </td>
                                <td>
                                    <p class="totale">${foundItem.prix}</p>
                                </td>
                                <td>
                                <button class="btn-trash" data-cart-id="${e.target.id}"><i class="fas fa-trash-alt"></i></button>
                                </td>
                                </tr>
                            </tbody>
                    `
                    carts.append(table);

                    let input = table.querySelector('input[type=number]')
                    const totaleItem = table.querySelector('.totale');
                    cartInvoice(foundItem.id, foundItem.prix, input.value);
                    totaleItem.innerHTML = itemsTotal[foundItem.id].toFixed(2);
                    //Part ALL total

                    const totaux = computeTotal();
                    const totaleInvoice = document.querySelector(".totaleInvoice");
                    totaleInvoice.innerHTML = totaux.toFixed(2);

                    input.addEventListener("change", () => {
                        const totaleItem = table.querySelector('.totale');
                        cartInvoice(foundItem.id, foundItem.prix, input.value);
                        totaleItem.innerHTML = itemsTotal[foundItem.id].toFixed(2);
                        //Part ALL total                      
                        const totaux = computeTotal()
                        const totaleInvoice = document.querySelector(".totaleInvoice");
                        totaleInvoice.innerHTML = totaux.toFixed(2);
                    })
                }

                // Part button trash
                let tableTrash = document.querySelector(`.invoice-table[data-cart-id="${e.target.id}"]`);
                let attributeCart = tableTrash.getAttribute('data-cart-id');
                const buttonsTrash = document.querySelectorAll(`.btn-trash[data-cart-id="${e.target.id}"]`);
                buttonsTrash.forEach((buttonTrash) => {
                    buttonTrash.addEventListener("click", (e) => {
                        const idTrash = buttonTrash.getAttribute('data-cart-id');
                        if (idTrash === attributeCart) {
                            tableTrash.remove();
                            delete itemsTotal[foundItem.id];
                            const totaux = computeTotal();
                            const totaleInvoice = document.querySelector(".totaleInvoice");
                            totaleInvoice.innerHTML = totaux.toFixed(2);
                        }
                    })
                })
            })
        })
    })

