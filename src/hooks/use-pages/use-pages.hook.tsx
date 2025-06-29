import { useState, useEffect, useCallback } from 'react';
import { Page } from '@/domain/model';
import { v4 as uuid } from 'uuid';

interface UsePagesOptions {
  initial?: string[];
  storageKey?: string;
}

interface StoredData {
  pages: Page[];
  activeId: string;
}

const DEFAULT_INITIAL_TITLES = ["Info", "Details", "Other", "Ending"];
const DEFAULT_STORAGE_KEY = "form-builder";

function getDefaultPages(titles: string[]): Page[] {
  return titles.map((title) => ({
    id: uuid(),
    title,
  }));
}

function loadFromStorage(key: string, fallback: string[]): StoredData {
  if (typeof window === 'undefined') {
    return { pages: [], activeId: '' };
  }

  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {
    console.warn(`Failed to parse localStorage for key: ${key}`);
  }

  const pages = getDefaultPages(fallback);
  return {
    pages,
    activeId: pages[0]?.id || '',
  };
}

export function usePages({
  initial = DEFAULT_INITIAL_TITLES,
  storageKey = DEFAULT_STORAGE_KEY,
}: UsePagesOptions = {}) {
  const { pages: initialPages, activeId: initialActiveId } = loadFromStorage(
    storageKey,
    initial
  );

  const [pages, setPages] = useState<Page[]>(() => initialPages);
  const [activeId, setActiveId] = useState<string>(() => initialActiveId);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify({ pages, activeId })
    );
  }, [pages, activeId, storageKey]);

  const reorder = useCallback((from: number, to: number) => {
    setPages((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated;
    });
  }, []);

  const addAfter = useCallback((index: number) => {
    setPages((prev) => {
      const updated = [...prev];
      updated.splice(index + 1, 0, { id: uuid(), title: "New" });
      return updated;
    });
  }, []);

  const rename = useCallback((id: string, title: string) => {
    setPages((prev) =>
      prev.map((page) =>
        page.id === id ? { ...page, title } : page
      )
    );
  }, []);

  const duplicate = useCallback((id: string) => {
    setPages((prev) => {
      const index = prev.findIndex((p) => p.id === id);
      if (index === -1) return prev;

      const copy = { ...prev[index], id: uuid() };
      const updated = [...prev];
      updated.splice(index + 1, 0, copy);
      return updated;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setPages((prev) => prev.filter((page) => page.id !== id));
  }, []);

  return {
    pages,
    activeId,
    setActiveId,
    reorder,
    addAfter,
    rename,
    duplicate,
    remove,
  };
}