"use client";

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function Notes() {
  const [notes, setNotes] = useState<any>([]);
  useEffect(() => {
    const supabase = createClient();
    supabase.from("notes").select().then(({ data }) => {
      setNotes(data);
    });

    const handleInserts = (payload: any) => {
      setNotes((prevNotes: any) => [...prevNotes, payload.new]);
    };

    supabase
      .channel("notes")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "notes" }, handleInserts)
      .subscribe();
  }, []);

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}