
'use client';
import React, { useCallback, useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToParentElement } from '@dnd-kit/modifiers';

import { Page } from '@/domain/model';
import { Separator } from '@/components/elements';
import { StepItem, AddPage } from '@/components/blocks/stepper';

interface StepperProps {
  pages: Page[];
  activeId: string;
  setActive(id: string): void;
  reorder(from: number, to: number): void;
  addAfter(index: number, title?: string): void;
  rename(id: string, title: string): void;
  duplicate(id: string): void;
  remove(id: string): void;
}

export const Stepper: React.FC<StepperProps> = ({
  pages,
  activeId,
  setActive,
  reorder,
  addAfter,
  rename,
  duplicate,
  remove,
}) => {
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
        ignore: (event: { target: HTMLElement }) =>
          !!event.target.closest('[aria-label="Open context menu"]'),
      },
    })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    document.body.classList.add('dragging');
    setDraggingId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      document.body.classList.remove('dragging');
      setDraggingId(null);

      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const from = pages.findIndex((p) => p.id === active.id);
      const to = pages.findIndex((p) => p.id === over.id);
      if (from !== -1 && to !== -1) reorder(from, to);
    },
    [pages, reorder]
  );

  const draggingPage = pages.find((p) => p.id === draggingId);

  const getStepItemProps = (page: Page) => ({
    page,
    isActive: page.id === activeId,
    isDragging: draggingId === page.id,
    setActive,
    onRename: () => {
      const newTitle = prompt('Rename', page.title);
      if (newTitle) rename(page.id, newTitle);
    },
    onDuplicate: () => duplicate(page.id),
    onDelete: () => remove(page.id),
  });

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
    >
      <SortableContext items={pages.map((p) => p.id)} strategy={horizontalListSortingStrategy}>
        <div className="flex items-center justify-center w-full px-4 ">
          {pages.map((page, index) => (
            <React.Fragment key={page.id}>
              {index > 0 && <Separator />}
              <StepItem {...getStepItemProps(page)} />
              {index === 1 && (
                <>
                  <Separator />
                  <AddPage key={page.id} variant='between' onClick={(name) => addAfter(index, name)} />
                </>
              )}
            </React.Fragment>
          ))}
          <Separator />
          <AddPage variant='end' onClick={(name) => addAfter(pages.length - 1, name)} />
        </div>
      </SortableContext>

      <DragOverlay dropAnimation={{ duration: 200, easing: 'ease' }}>
        {draggingPage ? (
          <div className="pointer-events-none scale-100 opacity-100">
            <StepItem {...getStepItemProps(draggingPage)} isActive={false} isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
