// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         try {
//             const { products } = req.body; // Assuming you're sending cart items in the request body
//             console.log("checkoutProds" + " " + products);

//             const totalPrice = products.reduce((total, product) => {
//                 console.log("checkoutProds" + " " + product.price);
//                 return total += parseFloat(product.price);
//             }, 0);
//             console.log("checkoutProds" + " " + totalPrice);

//             const session = await stripe.checkout.sessions.create({
//                 // payment_method_types: ['card'],
//                 line_items: [
//                     {
//                         price_data: {
//                             currency: 'eur',
//                             unit_amount: totalPrice,
//                             product_data: {
//                                 name: products.name,
//                             },
//                         },
//                         quantity: 1,
//                     },
//                 ],
//                 mode: 'payment',
//                 success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/paymentPages/Success/?success=true`,
//                 cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/paymentPages/NoPayment/?canceled=true`,
//             });

//             res.redirect(303, session.url);
//         } catch (err) {
//             res.status(err.statusCode || 500).json(err.message);
//         }
//     } else {
//         res.setHeader('Allow', 'POST');
//         res.status(405).end('Method Not Allowed');
//     }
// }

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { products } = req.body;

            const totalPrice = products.reduce((total, product) => {
                return total += parseFloat(product.price);
            }, 0) * 100;

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: products.map(product => ({
                    price_data: {
                        currency: 'eur',
                        unit_amount: totalPrice,
                        product_data: {
                            name: product.name,
                        },
                    },
                    quantity: 1,
                })),
                mode: 'payment',
                success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/paymentPages/Success/?success=true`,
                cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/paymentPages/NoPayment/?canceled=true`,
            });

            res.redirect(303, session.url);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
