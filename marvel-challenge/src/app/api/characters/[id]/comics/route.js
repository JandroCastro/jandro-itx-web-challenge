// marvel-challenge/src/app/api/characters/[id]/comics/route.js
import { comicsAdapter } from "@/api/adapter";
import { api, getMarvelParams } from "@/app/api/utils";
import { NextResponse } from "next/server";

export async function GET(request) {
  // Obtener el ID del personaje desde la URL
  const url = new URL(request.url);
  const characterId = url.pathname.split("/").slice(-2, -1)[0]; // Extraer el ID del personaje desde la URL

  // Configurar los parámetros de la consulta
  const params = getMarvelParams({
    formatType: "comic",
    orderBy: "onsaleDate",
    limit: 20,
  });

  try {
    // Realizar la solicitud para obtener los cómics del personaje
    const response = await api.get(`${characterId}/comics`, { params });

    // Adaptar los cómics usando el adaptador
    const comics = comicsAdapter(response.data.data.results);

    // Devolver la respuesta como JSON
    return NextResponse.json(comics);
  } catch (error) {
    console.error("Error al obtener información del personaje:", error);
    return NextResponse.json(
      { error: "Error fetching character comics" },
      { status: 500 }
    );
  }
}
