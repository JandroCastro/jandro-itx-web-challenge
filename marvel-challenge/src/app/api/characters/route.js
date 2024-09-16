//
import { api, getMarvelParams } from "../utils";
import { NextResponse } from "next/server";

export async function GET() {
  const params = getMarvelParams({
    limit: 50,
    orderBy: "name",
  });

  try {
    const response = await api.get("", { params });
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
