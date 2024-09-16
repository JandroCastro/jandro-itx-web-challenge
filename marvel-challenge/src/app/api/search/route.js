import { api, getMarvelParams } from "../utils";
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const searchText = url.searchParams.get("nameStartsWith");

  if (!searchText) {
    return NextResponse.json(
      { error: "Search text is required" },
      { status: 400 }
    );
  }

  const params = getMarvelParams({
    nameStartsWith: searchText,
  });

  try {
    const response = await api.get("", { params });
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
