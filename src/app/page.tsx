"use client";

import React from "react";
import { usePages } from "@/hooks/use-pages/use-pages.hook";
import { Stepper } from "@/components/blocks/";

export default function HomePage() {
  const {
    pages,
    activeId,
    setActiveId,
    reorder,
    addAfter,
    rename,
    duplicate,
    remove,
  } = usePages();

  const currentPageTitle =
    pages.find((page) => page.id === activeId)?.title || "Untitled";

  const handleNextClick = () => {
    const currentIndex = pages.findIndex((page) => page.id === activeId);
    if (currentIndex >= 0 && currentIndex < pages.length - 1) {
      setActiveId(pages[currentIndex + 1].id);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Form Builder</h1>
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 font-nunito text-[#111827]">{currentPageTitle}</h2>
          <button
            onClick={handleNextClick}
            className="font-[Nunito] mt-4 px-4 py-2 bg-[#fbba59] text-[#111827] text-xl font-medium leading-6 rounded hover:bg-[#FAA931] transition-colors cursor-pointer"
          >
            Next
          </button>
        </section>
      </main>
      <footer className="p-4 bg-white border-t">
        <Stepper
          pages={pages}
          activeId={activeId}
          setActive={setActiveId}
          reorder={reorder}
          addAfter={addAfter}
          rename={rename}
          duplicate={duplicate}
          remove={remove}
        />
      </footer>
    </div>
  );
}
