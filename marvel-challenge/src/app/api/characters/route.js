// marvel-challenge/src/app/api/characters/route.js
import { api, getMarvelParams } from "../utils";
import { NextResponse } from "next/server";

export async function GET() {
  const params = getMarvelParams({
    limit: 50,
    orderBy: "name",
  });

  try {
    const response = await api.get("", { params }); // La URL base ya está configurada
    return NextResponse.json(response.data); // Usar NextResponse para responder
  } catch (error) {
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
