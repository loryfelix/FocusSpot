"use client";

import { useSearchParams } from "next/navigation";

export default function UsersPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("q");

  return (
    <div>
      {id}
    </div>
  );
}

// TODOs:
// - in base a search param fai problema/feature
// - q = suggerisci
// - q = terms
// - q = segnala