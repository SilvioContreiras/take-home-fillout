import {
    CopyIcon,
    DeleteIcon,
    DuplicateIcon,
    FlagIcon,
    RenameIcon,
  } from "@/components/icons";
  
  export const PageContextMenu: React.FC<{
    isOpen: boolean;
    onClose(): void;
    onRename(): void;
    onDuplicate(): void;
    onDelete(): void;
  }> = ({ isOpen, onClose, onRename, onDuplicate, onDelete }) => {
    if (!isOpen) return null;
  
    return (
      <div className="absolute left-1/2 bottom-6 z-10 w-[240px] bg-white border border-gray-200 rounded-xl shadow-sm -translate-x-1/35 mb-4 overflow-hidden flex flex-col text-gray-900">
        {/* Header */}
        <div className="bg-gray-50 font-medium tracking-tight px-4 py-3 border-b border-gray-200 h-10 flex items-center font-melodicAlt text-base">
          Settings
        </div>
        
        {/* Menu Items */}
        <button
          onClick={() => {
            onClose();
          }}
          className="flex items-center gap-2 w-full px-4 py-2 mt-2 hover:bg-gray-100 text-left font-inter text-sm leading-5 cursor-pointer"
        >
          <FlagIcon />
          <span className="flex-1">Set as first page</span>
        </button>
        
        <button
          onClick={() => {
            onRename();
            onClose();
          }}
          className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-left font-inter text-sm leading-5 cursor-pointer"
        >
          <RenameIcon />
          <span className="flex-1">Rename</span>
        </button>
        
        <button
          onClick={() => {
            onClose();
          }}
          className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-left font-inter text-sm leading-5 cursor-pointer"
        >
          <CopyIcon />
          <span className="flex-1">Copy</span>
        </button>
        
        <button
          onClick={() => {
            onDuplicate();
            onClose();
          }}
          className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-left font-inter text-sm leading-5 cursor-pointer"
        >
          <DuplicateIcon />
          <span className="flex-1">Duplicate</span>
        </button>
  
        {/* Delete Section */}
        <div>
          <div className="w-[216px] h-px bg-gray-200 mx-auto my-2" />
          <button
            onClick={() => {
              onDelete();
              onClose();
            }}
            className="flex items-center gap-2 w-full px-4 py-2 mb-2 hover:bg-red-50 text-left font-inter text-sm leading-5 cursor-pointer text-red-500"
          >
            <DeleteIcon />
            <span className="flex-1">Delete</span>
          </button>
        </div>
      </div>
    );
  };
  