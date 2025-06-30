"use client";
import React, { useEffect, useRef, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { DetailsIcon, EndingIcon, InfoIcon } from "@/components/icons/pages";
import { PageContextMenu } from "@/components/blocks/context-menu";
import { useSortable } from "@dnd-kit/sortable";
import { Page } from "@/domain/model";
import { IconProps } from "@/components/icons/icons-props";

interface StepItemProps {
  page: Page;
  isActive: boolean;
  isDragging?: boolean;
  setActive: (id: string) => void;
  onRename: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

const iconMap: Record<string, React.ReactElement<IconProps>> = {
  Info: <InfoIcon size={16} className="flex-shrink-0" />,
  Details: <DetailsIcon size={16} className="flex-shrink-0" />,
  Other: <DetailsIcon size={16} className="flex-shrink-0" />,
  Ending: <EndingIcon size={16} className="flex-shrink-0" />,
};

export const StepItem: React.FC<StepItemProps> = React.memo(
  ({
    page,
    isActive,
    isDragging = false,
    setActive,
    onRename,
    onDuplicate,
    onDelete,
  }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging: sortableDragging,
    } = useSortable({ id: page.id });

    const [isContextMenuOpen, setContextMenuOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const contextMenuRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          const target = event.target as Node;
      
          if (
            contextMenuRef.current &&
            !contextMenuRef.current.contains(target) &&
            menuButtonRef.current &&
            !menuButtonRef.current.contains(target)
          ) {
            setContextMenuOpen(false);
          }
        };
      
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);
      

    const getButtonClasses = () => {
      const base =
        "flex flex-row items-center gap-2 h-8 rounded-lg cursor-pointer select-none px-[10px] py-[4px] transition-all duration-200 font-inter text-sm";

      if (isDragging || sortableDragging) {
        return `${base} bg-white text-gray-900 border border-gray-300 shadow-sm pointer-events-none`;
      }

      if (isContextMenuOpen && isActive) {
        return `${base} bg-white border border-blue-500 shadow-focus text-gray-900`;
      }

      if (isActive) {
        return `${base} bg-white border border-gray-200 shadow-sm text-gray-900`;
      }

      if (isHovered) {
        return `${base} bg-[rgba(157,164,178,0.35)] text-gray-500`;
      }

      return `${base} bg-[rgba(157,164,178,0.15)] text-gray-500`;
    };

    const rawIcon = iconMap[page.title] ?? (
      <InfoIcon size={16} className="flex-shrink-0" />
    );
    const iconWithColor = React.isValidElement<IconProps>(rawIcon)
      ? React.cloneElement(rawIcon, {
          color: isActive || isContextMenuOpen ? "#F59D0E" : "#677289",
        })
      : null;

    return (
      <div
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition: transition || undefined,
        }}
        className="flex items-center relative"
        {...attributes}
      >
        <div
          {...listeners}
          role="button"
          tabIndex={0}
          onClick={() => setActive(page.id)}
          onMouseEnter={() => !isActive && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={getButtonClasses()}
          style={{
            minWidth: "100px",
            maxWidth: "200px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {iconWithColor}
          <span className="flex-1">{page.title}</span>

          {isActive && (
            <button
            ref={menuButtonRef}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setContextMenuOpen((prev) => !prev);
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="ml-2 w-4 h-4 flex flex-col justify-between items-center outline-none cursor-pointer"
              aria-label="Open context menu"
            >
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-gray-400" />
              ))}
            </button>
          )}
        </div>

        <div
          ref={contextMenuRef}
          className="absolute left-0 top-full mt-1 z-50"
        >
          <PageContextMenu
            isOpen={isContextMenuOpen}
            onClose={() => setContextMenuOpen(false)}
            onRename={onRename}
            onDuplicate={onDuplicate}
            onDelete={onDelete}
          />
        </div>
      </div>
    );
  }
);

StepItem.displayName = "StepItem";
