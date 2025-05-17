import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get("symbol");
    const timeframe = searchParams.get("timeframe");
    const direction = searchParams.get("direction");
    const confidenceMin = searchParams.get("confidenceMin");
    const confidenceMax = searchParams.get("confidenceMax");
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit") as string) : 20;
    
    // Build filter object
    const filter: any = {
      where: {},
      include: {
        cryptocurrency: true,
        indicators: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    };
    
    // Add filters if provided
    if (symbol) {
      filter.where.cryptocurrency = {
        symbol: symbol,
      };
    }
    
    if (timeframe) {
      filter.where.timeframe = timeframe;
    }
    
    if (direction) {
      filter.where.direction = direction;
    }
    
    if (confidenceMin || confidenceMax) {
      filter.where.confidence = {};
      
      if (confidenceMin) {
        filter.where.confidence.gte = parseFloat(confidenceMin);
      }
      
      if (confidenceMax) {
        filter.where.confidence.lte = parseFloat(confidenceMax);
      }
    }
    
    const signals = await prisma.signal.findMany(filter);
    
    return NextResponse.json({ signals });
  } catch (error) {
    console.error("Error fetching signals:", error);
    return NextResponse.json(
      { error: "Failed to fetch signals" },
      { status: 500 }
    );
  }
}