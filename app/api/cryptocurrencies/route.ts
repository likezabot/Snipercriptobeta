import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cryptocurrencies = await prisma.cryptocurrency.findMany({
      orderBy: {
        symbol: "asc",
      },
    });
    
    return NextResponse.json({ cryptocurrencies });
  } catch (error) {
    console.error("Error fetching cryptocurrencies:", error);
    return NextResponse.json(
      { error: "Failed to fetch cryptocurrencies" },
      { status: 500 }
    );
  }
}