import { productService} from "../services/productsService";
import { handleError } from '../errorHandler';
export const FETCH_PRODUCTS_BEGIN = "FETCH_PRODUCTS_BEGIN";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

const ProductService = productService();
export const fetchProducts = () => {
    return dispatch => {

        dispatch(fetchProductsBegin());

        ProductService.getProduct()
            .then(handleError)
            .then(res =>{
                console.log(res)
                if(res.success){
                    dispatch(fetchProductsSuccess(res.products));
                }else{
                    dispatch(fetchProductsFailure(res.status));
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(fetchProductsFailure(parseInt(err.message)));
            })
    }
};

export const fetchProductsBegin = () => ({
    type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = products => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: { products }
});

export const fetchProductsFailure = error => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: { error }
});





//
//
// // Handle HTTP errors since fetch won't.
// function handleErrors(response) {
//     if (!response.ok) {
//         throw Error(response.statusText);
//     }
//     return response;
// }
//
// // a fake get products to test loading
// function getProducts() {
//     return fetch("/products")
//         .then(handleErrors)
//         .then(res => res.json());
// }
//
// function fakeGetProducts() {
//     return new Promise(resolve => {
//         // Resolve after a timeout so we can see the loading indicator
//         setTimeout(
//             () =>
//                 resolve({
//                     products: [
//                         {
//                             id: 0,
//                             name: "Apple"
//                         },
//                         {
//                             id: 1,
//                             name: "Bananas"
//                         },
//                         {
//                             id: 2,
//                             name: "Strawberries"
//                         }
//                     ]
//                 }),
//             1000
//         );
//     });
// }