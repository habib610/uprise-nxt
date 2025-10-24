"use server";

import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
const CURRENCY: string = "USD";

export async function createCheckoutSession(data: FormData) {
    const ui_mode: string = "hosted";

    const courseId = (data.get("courseId") || "") as string;
    const title = (data.get("title") || "") as string;
    const price = (data.get("price") || 0) as number;

    const origin: string = headers().get("origin") || "";

    const checkoutSession = await stripe.checkout.sessions.create({
        mode: "payment",
        submit_type: "pay",
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: CURRENCY,
                    product_data: {
                        name: title,
                    },
                    unit_amount: price * 100,
                },
            },
        ],

        ...(ui_mode === "hosted" && {
            success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=${courseId}`,
            cancel_url: `${origin}/courses`,
        }),
        ui_mode: "hosted",
    });

    return {
        client_secret: checkoutSession.client_secret,
        url: checkoutSession.url,
    };
}

export async function createPaymentIntent(data: FormData) {
    const price: number = (data.get("price") || 0) as number;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: price * 100,
        automatic_payment_methods: { enabled: true },
        currency: CURRENCY,
    });
    return { client_secret: paymentIntent.client_secret };
}
