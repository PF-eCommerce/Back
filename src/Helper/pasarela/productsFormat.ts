interface Product {
    name: string;
    price: number;
    units: number;
}
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

export async function stripeFormat(data: Product[]): Promise<Output[] | string>  {
    try {
        if(data === null){
            return("Nada por aca bro")
        }
        const newData = data.map((p) => {
            return({
                price_data: {
                    currency: "ars",
                    unit_amount: p.price*100,//el precio esta en centavos 50000 === 500,00 ARS
                    product_data: {
                        name: p.name
                    },
                },
                quantity: p.units,
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