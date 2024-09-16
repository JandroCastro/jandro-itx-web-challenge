import { comicsAdapter } from "@/api/adapter";
import { api, getMarvelParams } from "@/app/api/utils";
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const characterId = url.pathname.split("/").slice(-2, -1)[0];

  const params = getMarvelParams({
    formatType: "comic",
    orderBy: "onsaleDate",
    limit: 20,
  });

  try {
    const response = await api.get(`${characterId}/comics`, { params });

    const comics = comicsAdapter(response.data.data.results);

    return NextResponse.json(comics);
  } catch (error) {
    console.error("Error al obtener información del personaje:", error);
    return NextResponse.json(
      { error: "Error fetching character comics" },
      { status: 500 }
    );
  }
}
