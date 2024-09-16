import { api, getMarvelParams } from "../../utils";
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const characterId = url.pathname.split("/").pop();

  const params = getMarvelParams();

  try {
    const response = await api.get(`${characterId}`, { params });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error al obtener información del personaje:", error);
    return NextResponse.json(
      { error: "Error fetching character data" },
      { status: 500 }
    );
  }
}
