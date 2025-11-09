import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const checkoutSchema = z.object({
  plan: z.enum(["Standard", "Premium"]),
});

// Plan prices (in cents for Stripe, or in dollars)
const PLAN_PRICES = {
  Standard: 1200, // $12.00
  Premium: 2900, // $29.00
};

export async function POST(request: NextRequest) {
  try {
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Please sign in to continue" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { plan } = checkoutSchema.parse(body);

    // Get full user data
    const fullUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!fullUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // If user already has this plan or higher, return error
    if (fullUser.plan === plan || (plan === "Standard" && fullUser.plan === "Premium")) {
      return NextResponse.json(
        { error: "You already have this plan or higher" },
        { status: 400 }
      );
    }

    // For now, we'll simulate a successful payment
    // In production, integrate with Stripe, Razorpay, or PayPal here
    const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const amount = PLAN_PRICES[plan] / 100; // Convert cents to dollars

    // Create purchase record
    const purchase = await prisma.purchase.create({
      data: {
        userId: user.id,
        plan,
        amount,
        transactionId,
        status: "completed",
      },
    });

    // Update user plan
    await prisma.user.update({
      where: { id: user.id },
      data: {
        plan,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Successfully upgraded to ${plan} plan`,
      purchase: {
        id: purchase.id,
        plan: purchase.plan,
        amount: purchase.amount,
        transactionId: purchase.transactionId,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    console.error("Error creating checkout:", error);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 }
    );
  }
}

// For Stripe integration (commented out - uncomment and configure when ready)
/*
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(request: NextRequest) {
  try {
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Please sign in to continue" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { plan } = checkoutSchema.parse(body);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${plan} Plan`,
            },
            unit_amount: PLAN_PRICES[plan],
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?canceled=true`,
      client_reference_id: user.id,
      metadata: {
        plan,
        userId: user.id,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Error creating checkout:", error);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 }
    );
  }
}
*/


