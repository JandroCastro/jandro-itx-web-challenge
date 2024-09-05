"use client";
import CharacterList from "@/components/CharacterList/CharacterList";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const view = useSearchParams().get("view");

  return (
    <main style={{ padding: "20px" }}>
      {view === "favorites" && (
        <h1 style={{ margin: "var(--margin-xl) 0" }}>FAVORITES</h1>
      )}
      <SearchBar />
      <CharacterList />
    </main>
  );
}
