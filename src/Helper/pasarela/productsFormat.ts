// interface Product {
//     name: string;
//     price: number;
//     units: number;
// }
interface Output {
    price_data: {
        currency: string,
        unit_amount: number,
        product_data: {
            name: string
        },
    },
    quantity: number,
}

export function orderFormat(data: any) {
    try {
        // console.log(data.data)
        const order = {
            user: data.data.user.id,
            orderItems: data.data.data.map((p: any) => {
                return {
                    name: p.title,
                    qty: p.qty,
                    image: p.img[0],
                    price: p.price,
                    product: p._id
                }
            }),
            address: {
                street_name: data.data.user.street_name,
                street_number: data.data.user.street_number,
                zip_code: data.data.user.zip_code
            },
            userPaymentInfo: {
                name: data.data.user.name,
                lastname: data.data.user.surname,
                phone: data.data.user.phone
            },
            PaymentMethod: data.data.PaymentMethod
    
        }
        // console.log(order)
        return order;
    } catch (error) {
        console.log("helper/productFormat/orderFormat", error);
        return{}
    }
}

export async function stripeFormat(data: any): Promise<Output[] | string> {
    try {
        if (data.data === null) {
            return ("Nada por aca bro")
        }
        const newData = data.map((p:any) => {
            return ({
                price_data: {
                    currency: "ars",
                    unit_amount: p.price * 100,//el precio esta en centavos 50000 === 500,00 ARS
                    product_data: {
                        name: p.title
                    },
                },
                quantity: p.qty,
            })
        })

        return newData;
    } catch (error) {
        console.log("/helper/pasarela/productFormat", error);
        return "Error CaptureOrder";
    }
}
// [
//     {
//         price_data: {
//             currency: "ars",
//             unit_amount: 250000,//el precio esta en centavos 50000 === 500,00 ARS
//             product_data: {
//                 name: "Saco"
//             },
//         },
//         quantity: 1,
//     },
//     {
//         price_data: {
//             currency: "ars",
//             unit_amount: 250000,//el precio esta en centavos 50000 === 500,00 ARS
//             product_data: {
//                 name: "Saco"
//             },
//         },
//         quantity: 1,
//     },
// ]
// [
//     {
//         name:"producto 1",
//         price: 500,
//         units: 3
//     },
//     {
//         name:"producto 2",
//         price: 750,
//         units: 6
//     },
// ]