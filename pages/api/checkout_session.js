const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { products } = req.body; // Assuming you're sending cart items in the request body
            console.log("checkoutProds" + " " + products);

            const totalPrice = products.reduce((total, product) => {
                console.log("checkoutProds" + " " + product.price);
                return total += parseFloat(product.price);
            }, 0);
            console.log("checkoutProds" + " " + totalPrice);

            const session = await stripe.checkout.sessions.create({
                // payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'eur', // Change to your desired currency
                            unit_amount: totalPrice, // Stripe expects amount in cents
                            product_data: {
                                name: products.name, // Change to your product name
                                price: products.price, // Change to your product price
                            },
                        },
                        quantity: 1,
                    },
                ],
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

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const userSession = await getServerSession(outhOptions);
// //import { outhOptions } from './auth/[...nextauth]';

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         try {
//             const { products } = req.body;

//             // Map products to price data
//             const lineItems = products.map(product => ({
//                 price_data: {
//                     currency: 'eur', // Change to your desired currency
//                     unit_amount: parseFloat(product.price), // Convert to cents
//                     product_data: {
//                         name: product.name, // Use product name from your database
//                         images: [product.images], // Use product images from your database
//                     },
//                 },
//                 quantity: 1,
//             }));
//             console.log("checkoutProds" + " " + lineItems.map(product => product.price_data));

//             const session = await stripe.checkout.sessions.create({
//                 //payment_method_types: ['card'],
//                 // customer_email: userSession.customer.email,
//                 line_items: lineItems,
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

