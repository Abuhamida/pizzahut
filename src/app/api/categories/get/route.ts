import { NextResponse, NextRequest } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from("menu_categories")
      .select("*")
      .order("position", { ascending: true });

    if (error) {
      console.error("Error fetching categories:", error.message);
      return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ message: "No categories found" }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Unexpected error occurred" }, { status: 500 });
  }
}
